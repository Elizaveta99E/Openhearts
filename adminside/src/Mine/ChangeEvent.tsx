import { useState } from 'react';
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

  // Обработчики изменений полей
  const handleFieldChange = (field: keyof EventData, value: string | number) => {
    setEditedEvent(prev => ({ ...prev, [field]: value }));
  };

  const handleConditionToggle = (condition: string) => {
    setEditedEvent(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setEditedEvent(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  // Обработчики действий
  const handleSave = () => {
    // Валидация перед сохранением
    if (!editedEvent.title.trim()) {
      alert('Название мероприятия обязательно');
      return;
    }
    if (editedEvent.volunteersRequired <= 0) {
      alert('Количество волонтеров должно быть положительным числом');
      return;
    }
    onSave(editedEvent);
  };

  const handleDeleteWithConfirm = () => {
    if (window.confirm('Вы уверены, что хотите удалить это мероприятие?')) {
      onDelete();
    }
  };

  // Списки для чекбоксов
  const conditionOptions = [
    'Бесплатное питание', 'Билеты в театр', 'Благодарности', 
    'Верифицированные часы', 'Оплата проживания', 'Персональное обучение',
    'Проезд', 'Психологическая консультация', 'Сувенирная продукция',
    'Экипировка', 'Средства индивидуальной защиты'
  ];

  const featureOptions = [
    'Только с верифицированными часами', 'Младше 18 лет', 'Идет набор в резерв',
    'Можно как посетитель', 'Организация работает по стандарту организатора волонтерской деятельности',
    'Победители конкурса Фонда президентских грантов', 'Организации из реестра СО НКО',
    'Адресная помощь', 'Доступно для людей с инвалидностью', 'Доступно для серебрянных волонтеров',
    'Можно приходить с детьми', 'Образовательное мероприятие'
  ];

  return (
    <div className="event-edit-container">
      <h1>Редактировать мероприятие</h1>
      
      <section className="main-info">
        <h2>
          <input
            type="text"
            value={editedEvent.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="title-input"
          />
        </h2>
        <div className="info-row">
          <input
            type="text"
            value={editedEvent.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="Место проведения"
          />
          <input
            type="text"
            value={editedEvent.dates}
            onChange={(e) => handleFieldChange('dates', e.target.value)}
            placeholder="Сроки"
          />
          <input
            type="text"
            value={editedEvent.responsible}
            onChange={(e) => handleFieldChange('responsible', e.target.value)}
            placeholder="Ответственное лицо"
          />
        </div>
        
        <div className="volunteers-section">
          <label>
            Необходимое количество волонтеров:
            <input
              type="number"
              min="1"
              value={editedEvent.volunteersRequired}
              onChange={(e) => handleFieldChange('volunteersRequired', parseInt(e.target.value) || 0)}
            />
          </label>
          <button className="link-button">Перейти к волонтерам</button>
        </div>
      </section>

      <section className="description-section">
        <h3>Описание</h3>
        <textarea 
          value={editedEvent.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          rows={5}
        />
      </section>

      <section className="format-section">
        <h3>Формат проведения</h3>
        <div className="radio-group">
          {['Все', 'Онлайн', 'Офлайн'].map((format) => (
            <label key={format}>
              <input
                type="radio"
                name="format"
                checked={editedEvent.format === format}
                onChange={() => handleFieldChange('format', format)}
              />
              {format}
            </label>
          ))}
        </div>
      </section>

      <section className="conditions-section">
        <h3>Условия проведения</h3>
        <div className="checkbox-grid">
          {conditionOptions.map((condition) => (
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
          {featureOptions.map((feature) => (
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
        <button 
          className="delete-button" 
          onClick={handleDeleteWithConfirm}
        >
          Удалить мероприятие
        </button>
        <div className="form-buttons">
          <button onClick={onCancel}>Отмена</button>
          <button 
            className="save-button" 
            onClick={handleSave}
            disabled={!editedEvent.title.trim()}
          >
            Принять изменения
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;