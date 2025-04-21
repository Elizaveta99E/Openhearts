import { useState, ChangeEvent, FormEvent } from 'react';
import './file2.css';

interface EventData {
  title: string;
  location: string;
  dates: string;
  responsible: string;
  format: string;
  description: string;
  conditions: string;
}

interface Volunteer {
  fullName: string;
  district: string;
  contacts: string;
  participationCount: number;
}

// Инициализация данных мероприятия
const eventData: EventData = {
  title: "Помощь животным",
  location: "Иркутск",
  dates: "2023-11-01 — 2023-12-01",
  responsible: "Иванова А.П.",
  format: "Офлайн",
  description: "Особенности мероприятия...",
  conditions: "Условия участия..."
};

// Мок-данные волонтеров
const volunteers: Volunteer[] = [
  {
    fullName: "Петрова М.И.",
    district: "Ленинский район",
    contacts: "+7 (999) 123-45-67",
    participationCount: 5
  }
];

// Обработчик редактирования
document.getElementById('edit-btn')?.addEventListener('click', () => {
  console.log('Редактирование мероприятия:', eventData);
  // Здесь можно добавить логику открытия формы редактирования
});

// Обработчик перехода к волонтерам
document.getElementById('volunteers-link')?.addEventListener('click', () => {
  console.log('Загружены волонтеры:', volunteers);
  // Логика отображения списка волонтеров
});

// Рендер данных мероприятия
function renderEventData() {
  document.querySelector('#event-title')!.textContent = eventData.title;
  document.querySelector('#location')!.textContent = eventData.location;
  document.querySelector('#dates')!.textContent = eventData.dates;
  document.querySelector('#responsible')!.textContent = eventData.responsible;
  document.querySelector('#format')!.textContent = `Формат проведения: ${eventData.format}`;
  document.querySelector('#description')!.textContent = eventData.description;
  document.querySelector('#conditions')!.textContent = eventData.conditions;
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  renderEventData();
});