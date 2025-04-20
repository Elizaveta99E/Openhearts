import { useState} from 'react';
import './file2.css';

// Типы для пропсов компонента
interface EventData {
  title: string;
  location: string;
  dates: string;
  responsible: string;
  volunteersRequired: number;
  description: string;
  format: string;
  conditions: string[];
  features: string[];
}

interface EventEditProps {
  event: EventData;
  onSave: (updatedEvent: EventData) => void;
  onDelete: () => void;
  onCancel: () => void;
}

const EventEdit: React.FC<EventEditProps> = ({ event, onSave, onDelete, onCancel }) => {
  const [editedEvent, setEditedEvent] = useState<EventData>({ ...event });

  const handleConditionToggle = (condition: string) => {
    const newConditions = editedEvent.conditions.includes(condition)
      ? editedEvent.conditions.filter(c => c !== condition)
      : [...editedEvent.conditions, condition];
    
    setEditedEvent({ ...editedEvent, conditions: newConditions });
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = editedEvent.features.includes(feature)
      ? editedEvent.features.filter(f => f !== feature)
      : [...editedEvent.features, feature];
    
    setEditedEvent({ ...editedEvent, features: newFeatures });
  };

  return (
    <div className="event-edit-container">
      <h1>Редактировать мероприятие</h1>
      
      <section className="main-info">
        <h2>{editedEvent.title}</h2>
        <div className="info-row">
          <span>{editedEvent.location}</span>
          <span>Сроки: {editedEvent.dates}</span>
          <span>Ответственное лицо: {editedEvent.responsible}</span>
        </div>
        
        <div className="volunteers-section">
          <p>Необходимое количество волонтеров: {editedEvent.volunteersRequired}</p>
          <button className="link-button">Перейти к волонтерам</button>
        </div>
      </section>

      <section className="description-section">
        <h3>Описание</h3>
        <textarea 
          value={editedEvent.description}
          onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
        />
      </section>

      <section className="format-section">
        <h3>Формат проведения</h3>
        <div className="radio-group">
          {['Все', 'Онлайн', 'Офлайн'].map((format) => (
            <label key={format}>
              <input
                type="radio"
                checked={editedEvent.format === format}
                onChange={() => setEditedEvent({ ...editedEvent, format })}
              />
              {format}
            </label>
          ))}
        </div>
      </section>

      <section className="conditions-section">
        <h3>Условия проведения</h3>
        <div className="checkbox-grid">
          {[
            'Бесплатное питание', 'Билеты в театр', 'Благодарности', 
            'Верифицированные часы', 'Оплата проживания', 'Персональное обучение',
            'Проезд', 'Психологическая консультация', 'Сувенирная продукция',
            'Экипировка', 'Средства индивидуальной защиты'
          ].map((condition) => (
            <label key={condition}>
              <input
                type="checkbox"
                checked={editedEvent.conditions.includes(condition)}
                onChange={() => handleConditionToggle(condition)}
              />
              {condition}
            </label>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h3>Особенности мероприятия</h3>
        <div className="checkbox-grid">
          {[
            'Только с верифицированными часами', 'Младше 18 лет', 'Идет набор в резерв',
            'Можно как посетитель', 'Организация работает по стандарту организатора волонтерской деятельности',
            'Победители конкурса Фонда президентских грантов', 'Организации из реестра СО НКО',
            'Адресная помощь', 'Доступно для людей с инвалидностью', 'Доступно для серебрянных волонтеров',
            'Можно приходить с детьми', 'Образовательное мероприятие'
          ].map((feature) => (
            <label key={feature}>
              <input
                type="checkbox"
                checked={editedEvent.features.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </section>

      <div className="actions-section">
        <button className="delete-button" onClick={onDelete}>Удалить мероприятие</button>
        <div className="form-buttons">
          <button onClick={onCancel}>Отмена</button>
          <button className="save-button" onClick={() => onSave(editedEvent)}>Принять изменения</button>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;