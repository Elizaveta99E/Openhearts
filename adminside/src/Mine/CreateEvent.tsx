import { useState, ChangeEvent, FormEvent } from 'react';
import './CreateEventForm.css';

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
          <h2>Создание нового мероприятия</h2>
    
          <div className="form-group">
            <label>Название мероприятия:</label>
            <input
              type="text"
              name="title"
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
              value={formState.responsiblePerson}
              onChange={handleInputChange}
              required
            />
          </div>
    
          <div className="form-group">
            <label>Количество волонтеров:</label>
            <input
              type="number"
              name="volunteersNeeded"
              value={formState.volunteersNeeded}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
    
          <div className="form-group">
            <label>Описание мероприятия:</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              required
            />
          </div>
    
          <div className="form-section">
            <h3>Формат проведения</h3>
            <div className="format-options">
              {Object.values(EventFormat).map(format => (
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
    
          <div className="form-section">
            <h3>Условия проведения</h3>
            <div className="conditions-grid">
              {Object.entries(formState.conditions).map(([key, value]) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleConditionChange(key as keyof EventConditions)}
                  />
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              ))}
            </div>
          </div>
    
          <div className="form-section">
            <h3>Особенности мероприятия</h3>
            <div className="features-grid">
              {Object.entries(formState.features).map(([key, value]) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleFeatureChange(key as keyof EventFeatures)}
                  />
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              ))}
            </div>
          </div>
    
          <button type="submit" className="submit-button">
            Создать мероприятие
          </button>
        </form>
      );
    }


export default CreateEventForm;