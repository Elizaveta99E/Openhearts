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
    under18: boolean;
    reserveRecruitment: boolean;
    attendAsVisitor: boolean;
    targetedHelp: boolean;
    accessibleForDisabled: boolean;
    withChildren: boolean;
    educationalEvent: boolean;
}

const CONDITION_LABELS: Record<keyof EventConditions, string> = {
  freeMeals: "Бесплатное питание",
  theaterTickets: "Билеты в театр",
  acknowledgments: "Благодарности",
  accommodationPayment: "Оплата проживания",
  personalTraining: "Персональное обучение",
  travel: "Проезд",
  psychologicalConsultation: "Психологическая консультация",
  souvenirs: "Сувенирная продукция",
  equipment: "Экипировка",
  protectiveEquipment: "Средства индивидуальной защиты"
};

// Русские названия для особенностей
const FEATURE_LABELS: Record<keyof EventFeatures, string> = {
  under18: "Младше 18 лет",
  reserveRecruitment: "Идет набор в резерв",
  attendAsVisitor: "Можно как посетитель",
  targetedHelp: "Адресная помощь",
  accessibleForDisabled: "Доступно для людей с инвалидностью",
  withChildren: "Можно приходить с детьми",
  educationalEvent: "Образовательное мероприятие"
};

const DIRECTIONS = [
  "Дети и молодежь",
  "Образование",
  "Поиск пропавших",
  "СВО",
  "Урбанистика",
  "Срочная помощь (ЧС)",
  "Экология",
  "Животные",
  "Ветераны и историческая память",
  "Спорт и события",
  "Здравоохранение",
  "Права человека",
  "Помощь лицам с ОВЗ",
  "Старшее поколение",
  "Культура и искусство",
  "Интеллектуальная помощь",
  "Наука",
  "Наставничество",
  "Другое"
];

// Основной интерфейс формы
interface EventFormState {
    title: string;
    location: string;
    startDate: Date | null;
    endDate: Date | null;
    responsiblePerson: string;
    volunteersNeeded: number;
    description: string;
    format: EventFormat;
    conditions: EventConditions;
    features: EventFeatures;
    photo: File | null;
    selectedDirections: string[];
}

// Компонент формы
const CreateEventForm = () => {
  const [formState, setFormState] = useState<EventFormState>({
      title: "",
      location: "",
      startDate: null,
      endDate: null,
      responsiblePerson: "",
      volunteersNeeded: 0,
      description: "",
      format: EventFormat.All,
      conditions: {
          freeMeals: false,
          theaterTickets: false,
          acknowledgments: false,
          accommodationPayment: false,
          personalTraining: false,
          travel: false,
          psychologicalConsultation: false,
          souvenirs: false,
          equipment: false,
          protectiveEquipment: false,
      },
      features: {
          under18: false,
          reserveRecruitment: false,
          attendAsVisitor: false,
          targetedHelp: false,
          accessibleForDisabled: false,
          withChildren: false,
          educationalEvent: false,
      },
      photo: null,
      selectedDirections: [],
  });

  const [showDirections, setShowDirections] = useState(false);

  const handleInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
      const { name, value } = e.target;
      setFormState(prev => ({
          ...prev,
          [name]: name === "volunteersNeeded" ? Number(value) : value
      }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setFormState(prev => ({
            ...prev,
            photo: e.target.files![0]
        }));
    }
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFormState(prev => ({
      ...prev,
      startDate: start,
      endDate: end,
    }));
  };

  const toggleDirection = (direction: string) => {
    setFormState(prev => ({
      ...prev,
      selectedDirections: prev.selectedDirections.includes(direction)
        ? prev.selectedDirections.filter(d => d !== direction)
        : [...prev.selectedDirections, direction]
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
      <h2>Создать мероприятие</h2>
  
       {/* Поле для загрузки фото */}
       <div className="form-group">
              <label>Фото мероприятия:</label>
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}/>
          </div>
      
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

      <div className="date-range-container">
        <div className="form-group">
          <label>Даты проведения:</label>
          <DatePicker
            selectsRange
            startDate={formState.startDate}
            endDate={formState.endDate}
            onChange={handleDateChange}
            dateFormat="dd.MM.yyyy"
            placeholderText="Выберите дату или диапазон"
            isClearable
            required
            className="date-picker-input"
          />
        </div>
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
  
      {/* Секция выбора направлений */}
      <div className="directions-section">
            <button 
              type="button" 
              className="add-direction-btn"
              onClick={() => setShowDirections(true)}
            >
              <span>+</span>
            </button>
            
            <div className="selected-directions">
              {formState.selectedDirections.map(direction => (
                <div key={direction} className="selected-tag">
                  {direction}
                </div>
              ))}
            </div>

            {showDirections && (
              <div className="directions-modal" onClick={() => setShowDirections(false)}>
                <div className="directions-grid" onClick={e => e.stopPropagation()}>
                  {DIRECTIONS.map(direction => (
                    <div
                      key={direction}
                      className={`direction-item ${
                        formState.selectedDirections.includes(direction) ? 'selected' : ''
                      }`}
                      onClick={() => toggleDirection(direction)}
                    >
                      {direction}
                    </div>
                  ))}
                </div>
              </div>
            )}
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


          {/* Секции условий и особенностей в двух колонках */}
          <div className="columns-container">
              <div className="conditions-section">
                  <h3>Условия проведения</h3>
                  <div className="checkbox-grid">
                      {Object.entries(formState.conditions).map(([key, value]) => (
                          <label key={key}>
                              <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={() => handleConditionChange(key as keyof EventConditions)}
                              />
                              {CONDITION_LABELS[key as keyof EventConditions]}
                          </label>
                      ))}
                  </div>
              </div>

              <div className="features-section">
                  <h3>Особенности мероприятия</h3>
                  <div className="checkbox-grid">
                      {Object.entries(formState.features).map(([key, value]) => (
                          <label key={key}>
                              <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={() => handleFeatureChange(key as keyof EventFeatures)}
                              />
                              {FEATURE_LABELS[key as keyof EventFeatures]}
                          </label>
                      ))}
                  </div>
              </div>
          </div>

          <button type="submit" className="submit-button">
              Создать
          </button>
      </form>
  );
}

export default CreateEventForm;