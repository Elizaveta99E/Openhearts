import { useState } from 'react';
import { Link } from 'react-router-dom';
import './file2.css';

const EventInfoPage = () => {
  const [isAdmin] = useState(true); // Моковая проверка прав админа

  const eventData = {
    title: "Помощь животным",
    city: "Москва",
    dates: "15 — 20 сентября 2023",
    responsible: "Иванов И.И.",
    format: "Офлайн",
    direction: "Экология",
    description: [
      "Комплексная помощь бездомным животным городского приюта",
      "Ежедневный уход, кормление и медицинские процедуры",
      "Организация адаптации и поиска новых хозяев"
    ],
    conditions: "Обязательная регистрация за 3 дня до мероприятия. Требуется медицинская книжка.",
    features: "Возможность участия несовершеннолетних с сопровождением взрослых"
  };

  return (
    <div className="event-page-container">
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
            <span className="event-title">{eventData.title}</span>
            <div className="event-meta">
              <span className="city">{eventData.city}</span>
              <span className="dates">{eventData.dates}</span>
              <span className="responsible">Ответственное лицо: {eventData.responsible}</span>
            </div>
          </div>
        </div>

        <div className="event-format-section">
          <div className="format-label">Формат проведения:</div>
          <div className="format-value">{eventData.format}</div>
        </div>

        <div className="direction-badge">
          {eventData.direction}
        </div>
      </div>

      {/* Блок описания с рамкой */}
      <div className="description-section">
        <h3 className="section-title">Описание</h3>
    
        <div className="description-content">
          {eventData.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="features-block">
          <h4>Особенности</h4>
          <p>{eventData.features}</p>
        </div>

        <div className="conditions-block">
          <h4>Условия участия</h4>
          <p>{eventData.conditions}</p>
        </div>
      </div>

      {/* Ссылка на волонтеров */}
      <div className="volunteers-link-wrapper">
        <Link to="/volunteers-table" className="simple-link">
          Посмотреть список волонтеров
        </Link>
      </div>

      <h3 className="notification-title">Уведомления</h3>
      {/* Админские уведомления */}
      {isAdmin && (
        <div className="admin-notifications"> 
          <div className="notification-example">
            <div className="notification-header">
              <span className="notification-type new">Новая заявка: </span>
              <span className="notification-time">2 часа назад</span>
            </div>
            <div className="notification-body">
              <p>Петрова А.С. хочет присоединиться к мероприятию</p>
              <div className="user-details">
              </div>
            </div>
            <div className="notification-actions">
              <button className="accept-btn">Принять</button>
              <button className="reject-btn">Отклонить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInfoPage;