import { useState } from 'react';
import { Link } from 'react-router-dom';
import './file2.css'; // Импорт стилей

const EventInfoPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Моковые данные для примера
  const eventData = {
    title: "Помощь животным",
    city: "Москва",
    dates: "15 — 20 сентября 2023",
    responsible: "Иванов И.И.",
    format: "Офлайн",
    direction: "Экология",
    description: [
      "Текст Текст Текст",
      "Текст Текст Текст",
      "Текст Текст Текст"
    ],
    conditions: "Текст условий проведения мероприятия",
    features: "Текст особенностей мероприятия"
  };

  const handleParticipate = () => {
    // Логика для участия в мероприятии
    console.log("Участие в мероприятии");
  };

  return (
    <div className="event-page-container">
      {/* Навигационная цепочка */}
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <ul>
          <li><Link to="/main">Главная</Link></li>
          <li><Link to="/events">Мероприятия</Link></li>
          <li>Информация о мероприятии</li>
        </ul>
      </nav>

      {/* Заголовок и уведомления */}
      <div className="header-section">
        <h2>Информация о мероприятии</h2>
        
      </div>

      {/* Основная информация о мероприятии */}
      <div className="event-card-head">
        <div className="event-header">
          <img 
            src="/path/to/event-image.jpg" 
            alt="Изображение мероприятия" 
            className="event-image"
          />
          
          <div className="event-info">
            <div className="name">{eventData.title}</div>
            <div className="city">{eventData.city}</div>
            <div className="dates">{eventData.dates}</div>
            <div className="responsible">
              Ответственное лицо: {eventData.responsible}
            </div>
          </div>
        </div>

        <div className="event-details">
          <div className="event-format">
            Формат проведения: {eventData.format}
          </div>
          <button 
            className="other-buttons"
            onClick={handleParticipate}
          >
            Принять участие
          </button>
        </div>

        <div className="event-details">
          <div className="event-format hybrid">
            Направление: {eventData.direction}
          </div>
        </div>
      </div>

      {/* Описание мероприятия */}
      <div className="event-card">
        <div className="event-description">
          <h3>Описание</h3>
          <div className="description-content">
            {eventData.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            
            <div className="conditions">
              <h4>Условия проведения:</h4>
              <p>{eventData.conditions}</p>
            </div>
            
            <div className="features">
              <h4>Особенности:</h4>
              <p>{eventData.features}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ссылка на таблицу волонтеров */}
      <div className="volunteers-link">
        <Link to="/volunteers-table" className="volunteers-button">
          Посмотреть таблицу волонтеров
        </Link>
      </div>
    </div>
    
  );
};

export default EventInfoPage;