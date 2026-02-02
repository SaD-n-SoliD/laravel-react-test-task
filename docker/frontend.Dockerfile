FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Копируем frontend файлы
COPY ../frontend .

# Устанавливаем зависимости и собираем приложение
RUN npm install
RUN npm run build

# Окончательный образ с nginx
FROM nginx:alpine

# Копируем конфигурацию nginx
COPY ../nginx.conf /etc/nginx/conf.d/default.conf

# Копируем скомпилированные файлы React-приложения
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

WORKDIR /var/www

# Копируем исходники Laravel
COPY ../backend .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]