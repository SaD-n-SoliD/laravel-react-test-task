FROM nginx:alpine

# Копируем конфигурацию nginx
COPY ../nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www

# Копируем исходники Laravel
COPY ../backend .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]