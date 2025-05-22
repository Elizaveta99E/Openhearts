const sequelize = require('./db');
const { DataTypes } = require('sequelize');

// Вспомогательные модели
const StaffRole = sequelize.define('StaffRole', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true }
}, { timestamps: false });

const Course = sequelize.define('Course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true }
}, { timestamps: false });

const Format = sequelize.define('Format', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true }
}, { timestamps: false });

const Condition = sequelize.define('Condition', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
}, { timestamps: false });

const Peculiarity = sequelize.define('Peculiarity', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
}, { timestamps: false });

const EventStatus = sequelize.define('EventStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true }
}, { timestamps: false });

const City = sequelize.define('City', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
},{ timestamps: false });

// Основные модели
const Staff = sequelize.define('Staff',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },    
    phone: { type: DataTypes.STRING(100) },
    birthday: { type: DataTypes.DATEONLY},
    photo: { type: DataTypes.TEXT }
}, { timestamps: false });

Staff.belongsTo(StaffRole, { foreignKey: 'staffRoleId' });

const Volunteer = sequelize.define('Volunteer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    phone: { type: DataTypes.STRING(100) },
    birthday: { type: DataTypes.DATEONLY, unique: true },
    comment: { type: DataTypes.TEXT },
    photo: { type: DataTypes.TEXT }
}, { timestamps: false });

Volunteer.belongsTo(City, { foreignKey: 'cityId' });

const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(500) },
    startDate: { type: DataTypes.DATEONLY },
    endDate: { type: DataTypes.DATEONLY },
    description: { type: DataTypes.TEXT },
    needs: { type: DataTypes.INTEGER },
    pic: { type: DataTypes.TEXT },
    time: { type: DataTypes.TIME },
    place: { type: DataTypes.TEXT }
}, { timestamps: false });

// Связи для Event
Event.belongsTo(Staff, { foreignKey: 'staffId' });
Event.belongsTo(Course, { foreignKey: 'courseId' });
Event.belongsTo(City, { foreignKey: 'cityId' });
Event.belongsTo(Format, { foreignKey: 'formatId' });
Event.belongsTo(EventStatus, { foreignKey: 'statusId' });

const PeculiaritiesOfEvents = sequelize.define('PeculiaritiesOfEvents', {
    // Если нужны дополнительные поля, укажите их здесь
}, { timestamps: false });

PeculiaritiesOfEvents.belongsTo(Event, { foreignKey: 'IdEvent' });
PeculiaritiesOfEvents.belongsTo(Peculiarity, { foreignKey: 'IdPeculiarities' });

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mail: { type: DataTypes.STRING(100) },
    regDate: { type: DataTypes.DATEONLY },
    hash: { type: DataTypes.TEXT }
}, { timestamps: false });

User.belongsTo(Staff, {
    foreignKey: 'staffId',
    onDelete: 'CASCADE' // Добавляем каскадное удаление
});

User.belongsTo(Volunteer, {
    foreignKey: 'volunteerId',
    onDelete: 'CASCADE' // Добавляем каскадное удаление
});

const Activity = sequelize.define('Activity', {
    Datetime: {
        type: DataTypes.DATE,
        primaryKey: true
    }
}, { timestamps: false });

Activity.belongsTo(Event, { foreignKey: 'IdEvent' });
Activity.belongsTo(Volunteer, { foreignKey: 'IdVolunteer' });

const ConditionsOfEvents = sequelize.define('ConditionsOfEvents', {
    // Если нужны дополнительные поля, укажите их здесь
}, { timestamps: false });

ConditionsOfEvents.belongsTo(Event, { foreignKey: 'IdEvent' });
ConditionsOfEvents.belongsTo(Condition, { foreignKey: 'IdConditions' });

// Экспорт моделей
module.exports = {
    StaffRole,
    City,
    Course,
    Format,
    Condition,
    ConditionsOfEvents,
    Peculiarity,
    EventStatus,
    Staff,
    Volunteer,
    Event,
    Activity,
    PeculiaritiesOfEvents,
    User,
    sequelize
};