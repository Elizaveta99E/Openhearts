const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'adminside/src/pages/volunteers/list.ts');

// 1. Проверка существования файла
if (!fs.existsSync(filePath)) {
  console.error('❌ Файл не найден:', filePath);
  process.exit(1);
}

// 2. Простая генерация UUID без библиотек
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 3. Генерация волонтеров
function generateVolunteers() {
  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург'];
  const names = [
    'Иван Иванов', 'Алексей Петров', 'Мария Сидорова', 
    'Екатерина Смирнова', 'Дмитрий Кузнецов'
  ];
  
  const volunteers = [];
  let currentDate = new Date(2014, 0, 1);
  const endDate = new Date(2025, 3, 6); // 6 апреля 2025

  while (currentDate <= endDate) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const [firstName, lastName] = randomName.split(' ');
    
    volunteers.push({
      id: generateUUID(),
      mail: `${lastName.toLowerCase()}.${firstName.toLowerCase()}@example.com`,
      name: randomName,
      phone: `+7 (9${Math.floor(Math.random() * 90 + 10)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}`,
      regdate: currentDate.toISOString().split('T')[0],
      birtgday: new Date(
        currentDate.getFullYear() - (20 + Math.floor(Math.random() * 30)), 
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split('T')[0],
      city: cities[Math.floor(Math.random() * cities.length)],
      comment: ['Активный участник', 'Новичок', 'Опытный волонтер'][Math.floor(Math.random() * 3)],
      status: Math.random() > 0.2 ? 'активен' : 'заблокирован',
      photo: `/assets/volunteers/user${Math.floor(Math.random() * 10)}.jpg`
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return volunteers;
}

// 4. Чтение и обновление файла
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Ошибка чтения файла:', err);
    return;
  }

  try {
    console.log('🔄 Генерация данных волонтеров...');
    const newVolunteers = generateVolunteers();
    console.log(`📊 Сгенерировано ${newVolunteers.length} записей`);

    let updatedContent;
    const volunteersExportRegex = /export\s+const\s+volunteers\s*=\s*\[[^\]]*\]/;

    if (volunteersExportRegex.test(data)) {
      console.log('🔧 Обновление существующего массива volunteers');
      updatedContent = data.replace(
        volunteersExportRegex,
        `export const volunteers = ${JSON.stringify(newVolunteers, null, 2)}`
      );
    } else {
      console.log('➕ Добавление нового массива volunteers');
      updatedContent = data + `\n\nexport const volunteers = ${JSON.stringify(newVolunteers, null, 2)};\n`;
    }

    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error('❌ Ошибка записи файла:', err);
        return;
      }
      console.log('✅ Файл успешно обновлен!');
      console.log('📍 Проверьте:', filePath);
    });

  } catch (error) {
    console.error('🚨 Критическая ошибка:', error);
  }
});


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