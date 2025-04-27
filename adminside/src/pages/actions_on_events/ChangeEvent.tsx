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
    fundWinners: boolean;
    targetedHelp: boolean;
    accessibleForDisabled: boolean;
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
        dates: "15-20 сентября 2023",
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
        console.log("Изменения сохранены:", formState);
    };

    const handleDelete = () => {
        console.log("Мероприятие удалено");
    };

    return (
        <div className="edit-event-container">
            <div className="header-section">
                <h1>Редактировать мероприятие</h1>
                <div className="volunteers-link">
                    <button type="button">Перейти к волонтерам</button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="edit-event-form">
                <div className="main-fields">
                    <div className="form-group">
                        <label>Название:</label>
                        <input
                            type="text"
                            name="title"
                            value={formState.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Локация:</label>
                        <input
                            type="text"
                            name="location"
                            value={formState.location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Сроки:</label>
                        <input
                            type="text"
                            name="dates"
                            value={formState.dates}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Ответственный:</label>
                        <input
                            type="text"
                            name="responsiblePerson"
                            value={formState.responsiblePerson}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Нужно волонтеров:</label>
                        <input
                            type="number"
                            name="volunteersNeeded"
                            value={formState.volunteersNeeded}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="description-section">
                    <h3>Описание</h3>
                    <textarea
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="format-section">
                    <h3>Формат проведения</h3>
                    <div className="radio-group">
                        {Object.values(EventFormat).map(format => (
                            <label key={format}>
                                <input
                                    type="radio"
                                    value={format}
                                    checked={formState.format === format}
                                    onChange={() => setFormState(prev => ({...prev, format}))}
                                />
                                {format}
                            </label>
                        ))}
                    </div>
                </div>

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

                <div className="form-actions">
                    <button type="button" className="delete-button" onClick={handleDelete}>
                        Удалить мероприятие
                    </button>
                    <button type="submit" className="save-button">
                        Принять изменения
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEventPage;