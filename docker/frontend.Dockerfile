FROM node:18-alpine

WORKDIR /app

# Копируем package.json
COPY ../frontend/package.json .

# Копируем package-lock.json если он существует (создаем копию на всякий случай)
RUN if [ -f ../frontend/package-lock.json ]; then cp ../frontend/package-lock.json .; fi

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY ../frontend .

# Устанавливаем права доступа
RUN chmod -R 755 /app

# Собираем проект
RUN npm run build

# Устанавливаем nginx для раздачи статических файлов
RUN apk add --no-cache nginx

# Копируем собранные файлы в директорию nginx
RUN cp -r dist /usr/share/nginx/html

# Копируем конфигурацию nginx для корректной обработки SPA
RUN echo 'server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Обработка маршрутов SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API прокси
    location /api {
        proxy_pass http://backend:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]