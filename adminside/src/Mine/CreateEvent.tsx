import { useState, ChangeEvent, FormEvent } from 'react';
import './file.css';

// Типы для формата мероприятия
enum EventFormat {
    All = "Все",
    Online = "Онлайн",
    Offline = "Офлайн",
}

// Интерфейс для условий проведения
interface EventConditions {
    freeMeals: boolean;
    theaterTickets: boolean;
    acknowledgments: boolean;
    verifiedHours: boolean;
    accommodationPayment: boolean;
    personalTraining: boolean;
    travel: boolean;
    psychologicalConsultation: boolean;
    souvenirs: boolean;
    equipment: boolean;
    protectiveEquipment: boolean;
}

// Интерфейс для особенностей мероприятия
interface EventFeatures {
    verifiedHoursOnly: boolean;
    under18: boolean;
    reserveRecruitment: boolean;
    attendAsVisitor: boolean;
    organizationStandard: boolean;
    fundWinners: boolean;
    nkoRegistry: boolean;
    targetedHelp: boolean;
    accessibleForDisabled: boolean;
    silverVolunteers: boolean;
    withChildren: boolean;
    educationalEvent: boolean;
}

// Основной интерфейс формы
interface EventFormState {
    title: string;
    location: string;
    dates: string;
    responsiblePerson: string;
    volunteersNeeded: number;
    description: string;
    format: EventFormat;
    conditions: EventConditions;
    features: EventFeatures;
}

// Компонент формы
const CreateEventForm = () => {
    const [formState, setFormState] = useState<EventFormState>({
        title: "",
        location: "",
        dates: "",
        responsiblePerson: "",
        volunteersNeeded: 0,
        description: "",
        format: EventFormat.All,
        conditions: {
            freeMeals: false,
            theaterTickets: false,
            acknowledgments: false,
            verifiedHours: false,
            accommodationPayment: false,
            personalTraining: false,
            travel: false,
            psychologicalConsultation: false,
            souvenirs: false,
            equipment: false,
            protectiveEquipment: false,
        },
        features: {
            verifiedHoursOnly: false,
            under18: false,
            reserveRecruitment: false,
            attendAsVisitor: false,
            organizationStandard: false,
            fundWinners: false,
            nkoRegistry: false,
            targetedHelp: false,
            accessibleForDisabled: false,
            silverVolunteers: false,
            withChildren: false,
            educationalEvent: false,
        },
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: name === "volunteersNeeded" ? Number(value) : value
        }));
    };

    const handleConditionChange = (condition: keyof EventConditions) => {
        setFormState(prev => ({
            ...prev,
            conditions: {
                ...prev.conditions,
                [condition]: !prev.conditions[condition],
            },
        }));
    };

    const handleFeatureChange = (feature: keyof EventFeatures) => {
        setFormState(prev => ({
            ...prev,
            features: {
                ...prev.features,
                [feature]: !prev.features[feature],
            },
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Форма отправлена:", formState);
      };
    
      return (
        <form onSubmit={handleSubmit} className="event-form">
        {/* Заголовок формы */}
        <h2>Создание нового мероприятия</h2>
    
        {/* Основные поля ввода */}
        <div className="form-group">
          <label>Название мероприятия:</label>
          <input
            type="text"
            name="title"
            placeholder="Введите название"
            value={formState.title}
            onChange={handleInputChange}
            required
          />
        </div>
    
        <div className="form-group">
          <label>Место проведения:</label>
          <input
            type="text"
            name="location"
            placeholder="Укажите место"
            value={formState.location}
            onChange={handleInputChange}
            required
          />
        </div>
    
        <div className="form-group">
          <label>Сроки проведения:</label>
          <input
            type="text"
            name="dates"
            placeholder="Пример: 15-20 сентября 2023"
            value={formState.dates}
            onChange={handleInputChange}
            required
          />
        </div>
    
        <div className="form-group">
          <label>Ответственное лицо:</label>
          <input
            type="text"
            name="responsiblePerson"
            placeholder="ФИО ответственного"
            value={formState.responsiblePerson}
            onChange={handleInputChange}
            required
          />
        </div>
    
        {/* Поле для количества волонтеров */}
        <div className="form-group">
          <label>Требуемое количество волонтеров:</label>
          <input
            type="number"
            name="volunteersNeeded"
            min="0"
            placeholder="0"
            value={formState.volunteersNeeded}
            onChange={handleInputChange}
            required
          />
        </div>
    
        {/* Текстовое поле для описания */}
        <div className="form-group">
          <label>Подробное описание:</label>
          <textarea
            name="description"
            placeholder="Опишите цели, задачи и особенности мероприятия"
            value={formState.description}
            onChange={handleInputChange}
            required
          />
        </div>
    
        {/* Секция выбора формата */}
        <div className="form-section">
          <h3>Формат проведения</h3>
          <div className="format-options">
            {Object.values(EventFormat).map((format) => (
              <label key={format}>
                <input
                  type="radio"
                  name="format"
                  value={format}
                  checked={formState.format === format}
                  onChange={() => setFormState(prev => ({ ...prev, format }))}
                />
                {format}
              </label>
            ))}
          </div>
        </div>
    
        {/* Секция условий */}
        <div className="form-section">
          <h3>Условия участия</h3>
          <div className="conditions-grid">
            {Object.entries(formState.conditions).map(([key, value]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleConditionChange(key as keyof EventConditions)}
                />
                {/* Преобразование camelCase в нормальный текст */}
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())}
              </label>
            ))}
          </div>
        </div>
    
        {/* Секция особенностей */}
        <div className="form-section">
          <h3>Особые требования</h3>
          <div className="features-grid">
            {Object.entries(formState.features).map(([key, value]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleFeatureChange(key as keyof EventFeatures)}
                />
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())}
              </label>
            ))}
          </div>
        </div>
    
        {/* Кнопка отправки */}
        <button type="submit" className="submit-button">
          Опубликовать мероприятие
        </button>
      </form>
      );
    }


export default CreateEventForm;