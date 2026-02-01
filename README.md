# Тестовое задание: Простой блог с комментариями

## Описание
Реализация простого блога с комментариями по требованиям:
- Backend: Laravel с REST API
- Frontend: React
- Контейнеризация: Docker

## Структура проекта
```
├── backend/          # Laravel приложение
├── frontend/         # React приложение
├── docker/           # Docker конфигурации
├── docker-compose.yml
├── nginx.conf
└── README.md
```

## Запуск

1. Убедитесь, что у вас установлен Docker и Docker Compose
2. Выполните команду:
   ```bash
   docker-compose up -d
   ```
3. После запуска контейнеров выполните миграции и заполнение данными:
   ```bash
   docker-compose exec backend php artisan migrate --seed
   ```
4. Проект запущен и готов к использованию
   Frontend: http://localhost:3000
   Backend: http://localhost:8000


## Сброс базы данных к исходному состоянию

Для сброса базы данных к исходному состоянию (с миграциями и сидами) выполните команду:
```bash
docker-compose exec backend php artisan migrate:fresh --seed
```

## Особенности репозитория

В репозиторий включены файлы `.env` как для backend, так и для frontend части проекта, чтобы обеспечить готовность к запуску сразу после клонирования.