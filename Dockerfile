# Базовый образ для Node.js
FROM node:18

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Установка зависимостей
RUN npm install

# Копирование остального кода
COPY . .

# Команда для запуска (будет переопределена в docker-compose.yml)
CMD ["npm", "run", "dev"]