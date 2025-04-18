import { useState, ChangeEvent, FormEvent } from 'react';

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
    console.log(formState);
  };

  // Остальная часть компонента без изменений
  // ...
};

export default CreateEventForm;