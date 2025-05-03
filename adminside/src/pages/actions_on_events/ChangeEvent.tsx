import { useState, ChangeEvent, FormEvent } from 'react';
import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './file.css';

// Типы для формата мероприятия
enum EventFormat {
    All = "Все",
    Online = "Онлайн",
    Offline = "Офлайн",
}

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

interface EventFeatures {
    under18: boolean;
    reserveRecruitment: boolean;
    attendAsVisitor: boolean;
    fundWinners: boolean;
    targetedHelp: boolean;
    accessibleForDisabled: boolean;
    withChildren: boolean;
    educationalEvent: boolean;
}

interface EventFormState {
    title: string;
    location: string;
    startDate: Date | null; // Заменяем dates на startDate
    endDate: Date | null;   // Добавляем endDate
    responsiblePerson: string;
    volunteersNeeded: number;
    description: string;
    format: EventFormat;
    conditions: EventConditions;
    features: EventFeatures;
    photo: File | null;
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


const FEATURE_LABELS: Record<keyof EventFeatures, string> = {
  under18: "Младше 18 лет",
  reserveRecruitment: "Идет набор в резерв",
  attendAsVisitor: "Можно как посетитель",
  fundWinners: "Победители конкурса Фонда президентских грантов",
  targetedHelp: "Адресная помощь",
  accessibleForDisabled: "Доступно для людей с инвалидностью",
  withChildren: "Можно приходить с детьми",
  educationalEvent: "Образовательное мероприятие"
};

const EditEventPage = () => {
    const [formState, setFormState] = useState<EventFormState>({
        title: "Помощь животным",
        location: "Иркутск",
        startDate: new Date('2023-09-15'), // Пример инициализации даты
        endDate: new Date('2023-09-20'), 
        responsiblePerson: "Иванова Мария Петровна",
        volunteersNeeded: 15,
        description: "Описание мероприятия",
        format: EventFormat.All,
        conditions: {
            freeMeals: true,
            theaterTickets: false,
            acknowledgments: true,
            accommodationPayment: false,
            personalTraining: false,
            travel: true,
            psychologicalConsultation: false,
            souvenirs: true,
            equipment: false,
            protectiveEquipment: true,
        },
        features: {
            under18: true,
            reserveRecruitment: true,
            attendAsVisitor: false,
            fundWinners: false,
            targetedHelp: false,
            accessibleForDisabled: true,
            withChildren: false,
            educationalEvent: true,
        },
        photo: null,
    });

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setFormState(prev => ({
            ...prev,
            startDate: start,
            endDate: end,
        }));
    };

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
        console.log("Изменения сохранены:", formState);
    };

    const handleDelete = () => {
        console.log("Мероприятие удалено");
    };

    return (
        <div className="edit-event-container">
            <form onSubmit={handleSubmit} className="edit-event-form">
                <h2>Редактировать мероприятие</h2>
                
                <div className="form-fields-column">
                    <div className="form-group">
                        <label>Фото мероприятия:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

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
                        <label>Даты проведения:</label>
                        <DatePicker
                            selectsRange
                            startDate={formState.startDate}
                            endDate={formState.endDate}
                            onChange={handleDateChange}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="Выберите даты"
                            isClearable
                            className="date-picker-input"
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
                        <label>Требуемое количество волонтеров:</label>
                        <input
                            type="number"
                            name="volunteersNeeded"
                            value={formState.volunteersNeeded}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Описание мероприятия */}
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

                {/* Секция формата проведения */}
                <div className="form-section">
                    <h3>Формат проведения</h3>
                    <div className="format-options">
                        {Object.values(EventFormat).map((format) => (
                            <React.Fragment key={format}>
                                <input
                                    type="radio"
                                    name="format"
                                    value={format}
                                    id={format}
                                    checked={formState.format === format}
                                    onChange={() => setFormState(prev => ({ ...prev, format }))}
                                />
                                <label htmlFor={format}>{format}</label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Условия и особенности */}
                <div className="conditions-features-grid">
                    <div className="framed-section">
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

                    <div className="framed-section">
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

                {/* Кнопки действий */}
                <div className="form-action-buttons">
                    <button 
                        type="button" 
                        className="delete-button-outline"
                        onClick={handleDelete}
                    >
                        Удалить
                    </button>
                    <button 
                        type="submit" 
                        className="save-button"
                    >
                        Сохранить изменения
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEventPage;