// script.js

// Пример данных, которые могут приходить с сервера
const userData = {
    avatarUrl: "https://via.placeholder.com/100", // Ссылка на аватарку
    registrationDate: "12.03.2023",
    birthDate: "15.08.1990",
    phone: "+7 722 23 23 23",
    email: "example@mail.ru"
};

// Функция для загрузки данных (имитация запроса к серверу)
function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userData); // Имитируем задержку сети
        }, 1000);
    });
}

// Функция для отображения данных на странице
async function displayUserData() {
    const data = await fetchUserData(); // Получаем данные

    // Вставляем аватарку
    document.getElementById('avatar').src = data.avatarUrl;

    // Вставляем данные в соответствующие поля
    document.getElementById('registration-date').textContent = data.registrationDate;
    document.getElementById('birth-date').textContent = data.birthDate;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('email').textContent = data.email;
}

// Запускаем функцию при загрузке страницы
window.onload = displayUserData;