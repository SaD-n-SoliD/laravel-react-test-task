FROM php:8.2-fpm

# Установка зависимостей
RUN apt-get update && apt-get install -y \
	git \
	curl \
	libpng-dev \
	libonig-dev \
	libxml2-dev \
	zip \
	unzip \
	libzip-dev

# Установка расширений PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
	&& docker-php-ext-enable gd

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка рабочей директории
WORKDIR /var/www

# Копирование всех файлов
COPY ./backend .

# Установка зависимостей Laravel
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs --no-scripts

# Генерация ключа приложения, если он не установлен
RUN if [ -z "$(grep '^APP_KEY=' .env | cut -d'=' -f2)" ]; then sed -i "s/^APP_KEY=/APP_KEY=base64:$(openssl rand -base64 32)/" .env; fi

# Убедимся, что .env файл имеет правильные переносы строк
RUN tr -d '\r' < .env > .env.tmp && mv .env.tmp .env

# Создание необходимых директорий Laravel
RUN mkdir -p storage/framework/{cache,data,sessions,views} bootstrap/cache

# Установка прав на директории
RUN chmod -R 775 storage bootstrap/cache

# Установка владельца файлов на www-data (PHP-FPM)
RUN chown -R www-data:www-data storage bootstrap/cache /var/www

# Установка владельца файлов на www-data (PHP-FPM)
RUN chown -R www-data:www-data storage bootstrap/cache /var/www

# Запускаем Laravel development server вместо PHP-FPM
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
