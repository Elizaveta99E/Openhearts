import { useState, ChangeEvent, FormEvent } from 'react';
import './file2.css';
import { 
  Title, TextInput, Select, 
  Group, Stack, Button, Container,
  Table, Pagination, Checkbox, Divider,
  Text,  Box, NativeSelect} from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import 'dayjs/locale/ru';


interface EventData {
  title: string;
  city: string;
  dates: string;
  responsible: string;
  format: string;
  description: string;
  conditions: string;
  volunteers: Volunteer[];
  notifications: number;
}

interface Volunteer {
  id: number;
  fullName: string;
  district: string;
  contact: string;
  participationCount: number;
}

const EventPage: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    title: "Помощь животным",
    city: "Иркутск",
    dates: "01.09.2023 - 30.09.2023",
    responsible: "Иванова Мария Петровна",
    format: "Офлайн",
    description: "Особенности мероприятия...",
    conditions: "Условия участия...",
    volunteers: [
      {
        id: 1,
        fullName: "Петрова Анна Сергеевна",
        district: "© Свердловский район",
        contact: "+7 999 123-45-67",
        participationCount: 5
      }
    ],
    notifications: 1
  });

  const handleEdit = () => {
    // Логика редактирования
    console.log("Редактирование мероприятия");
  };

  return (
    <div className="event-container">
      <h1>Информация о мероприятии</h1>
      
      <section className="event-section">
        <h2>{eventData.title}</h2>
        <div className="event-info">
          <p>{eventData.city}</p>
          <p>Сроки: {eventData.dates}</p>
          <p>Ответственное лицо: {eventData.responsible}</p>
        </div>
        <button onClick={handleEdit} className="edit-button">Редактировать</button>
      </section>

      <hr className="section-divider" />

      <section className="event-section">
        <h3>Формат проведения: {eventData.format}</h3>
      </section>

      <hr className="section-divider" />

      <section className="event-section">
        <h3>Описание</h3>
        <p>{eventData.description}</p>
      </section>

      <hr className="section-divider" />

      <section className="event-section">
        <h3>Условия</h3>
        <p>{eventData.conditions}</p>
      </section>

      <div className="volunteers-section">
        <button className="volunteers-button">
          Перейти к волонтерам
          {eventData.notifications > 0 && 
            <span className="notification-badge">{eventData.notifications}</span>}
        </button>

        {eventData.volunteers.map(volunteer => (
          <div key={volunteer.id} className="volunteer-card">
            <h4>{volunteer.fullName}</h4>
            <p>{volunteer.district}</p>
            <p>{volunteer.contact}</p>
            <p>Участвовала: {volunteer.participationCount} раз</p>
            <button className="profile-button">Перейти в профиль</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;