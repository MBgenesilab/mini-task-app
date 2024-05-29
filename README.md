# Mini Task Management Application with Sail and Vue.js

## Setup Instructions

### Requirements
- `docker` installed on your local machine.
- `docker-compose` installed on your local machine.
- `php8.3` installed on your local machine. (required for install packages only)
- `composer` installed on your local machine. (required for install packages only)

### Clone the Repository
```bash
git clone <repository_url>
cd <repository_directory>
```

## Start Docker Environment
```bash
composer install
docker-compose up -d
```

Access Laravel Sail workspace, all commands artisan command shoud be run in the container:

```bash
docker exec -it mtma-app bash
npm install
npm run dev/build
```

## Database Setup
```bash
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

php artisan migrate --seed
```

## Jobs
Remider will be sent every 1h, but we can run it manually
```bash
php artisan notify:in_progress-tasks
```

## Mails
Check outgoing mails in the mailhog server
http://localhost:8025

## Access application in your browser at http://localhost
email: admin@gmail.com
password: password

## Features
- List of Tasks (with sub tasks)
- Create
- Edit
- Delete
- Send Email Notification
