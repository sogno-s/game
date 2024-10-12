const express = require('express');
const path = require('path');

const app = express();

// Указываем путь к статическим файлам
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('HTTP-сервер запущен на порту 3000');
});