



// const fs = require('fs');
// const path = require('path');

// const COURSES = [
//     "Дети и молодежь",
//     "Образование",
//     "Поиск пропавших",
//     "СВО",
//     "Урбанистика",
//     "Срочная помощь (ЧС)",
//     "Экология",
//     "Животные",
//     "Ветераны и историческая память",
//     "Спорт и события",
//     "Здравоохранение",
//     "Права человека",
//     "Помощь лицам с ОВЗ",
//     "Старшее поколение",
//     "Культура и искусство",
//     "Интеллектуальная помощь",
//     "Наука",
//     "Наставничество",
//     "Другое"
// ];

// const filePath = path.join(__dirname, '/adminside/src/pages/events/list.ts');

// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Ошибка при чтении файла:', err);
//         return;
//     }

//     try {
//         // Разделяем содержимое файла на части до и после массива events
//         const prefix = data.split('export const events =')[0];
//         let eventsContent = data.split('export const events =')[1];
//         const suffix = eventsContent.split('];').slice(1).join('];');
//         eventsContent = eventsContent.split('];')[0] + ']';

//         // Добавляем course к каждому объекту в массиве
//         const updatedEventsContent = eventsContent.replace(
//             /\}\s*,?\s*(?=\{|$)/g,
//             (match) => {
//                 const randomCourse = COURSES[Math.floor(Math.random() * COURSES.length)];
//                 return `,\n    course: "${randomCourse}"\n}${match.includes(',') ? ',' : ''}`;
//             }
//         );

//         // Собираем обновленный файл
//         const updatedContent = `${prefix}export const events = ${updatedEventsContent}${suffix}`;

//         // Записываем обновленные данные
//         fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
//             if (err) {
//                 console.error('Ошибка при записи файла:', err);
//                 return;
//             }
//             console.log('✅ Файл успешно обновлен. Поле course добавлено ко всем записям.');
//         });

//     } catch (error) {
//         console.error('🚨 Ошибка при обработке данных:', error.message);
//     }
// });