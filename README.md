# business-club
## сайт-кликер с авторизацией, мобильной адаптивностью.

### Локальный запуск
1. создать в корне проекта .env файл с таким содержимым:
   
DATABASE_URL=postgresql://Melekh:postgress_password2326@postgres:5432/bisness-club-backend

POSTGRES_PASSWORD=postgress_password2326

POSTGRES_USER=Melekh

NAME_POSTGRES_DB=bisness-club-backend

PGADMIN_EMAIL=edu@hse.ru

PGADMIN_PASSWORD=edu-hse-ru

SECRET_SOULT=podlostiliglupost

2. запустить проект через docker-compose командами:

`docker compose build`

`docker compose up`
