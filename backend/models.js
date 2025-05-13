const sequelize = require('./db');
const { DataTypes } = require('sequelize');

// Вспомогательные модели
const StaffRole = sequelize.define('StaffRole', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true }
}, { timestamps: false });

const City = sequelize.define('City', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
}, { timestamps: false });

const Course = sequelize.define('Course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
}, { timestamps: false });

const Format = sequelize.define('Format', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
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
    name: { type: DataTypes.TEXT }
}, { timestamps: false });

// Основные модели
const Staff = sequelize.define('Staff', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    mail: { type: DataTypes.STRING(100), unique: true },
    phone: { type: DataTypes.STRING(100) },
    regDate: { type: DataTypes.DATEONLY },
    birthday: { type: DataTypes.DATEONLY },
    photo: { type: DataTypes.TEXT }
}, { timestamps: false });

Staff.belongsTo(StaffRole, { foreignKey: 'staffRoleId' });

const Volunteer = sequelize.define('Volunteer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    mail: { type: DataTypes.STRING(100), unique: true },
    phone: { type: DataTypes.STRING(100) },
    regDate: { type: DataTypes.DATEONLY },
    birthday: { type: DataTypes.DATEONLY },
    comment: { type: DataTypes.TEXT },
    photo: { type: DataTypes.TEXT }
}, { timestamps: false });

Volunteer.belongsTo(City, { foreignKey: 'cityId' });

const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    startDate: { type: DataTypes.DATEONLY },
    endDate: { type: DataTypes.DATEONLY },
    needs: { type: DataTypes.INTEGER },
    pic: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
    time: { type: DataTypes.TIME },
    place: { type: DataTypes.TEXT }
}, { timestamps: false });

// Связи для Event
Event.belongsTo(Staff, { foreignKey: 'staffId' });
Event.belongsTo(Course, { foreignKey: 'courseId' });
Event.belongsTo(City, { foreignKey: 'cityId' });
Event.belongsTo(Format, { foreignKey: 'formatId' });
Event.belongsTo(EventStatus, { foreignKey: 'statusId' });

// Многие-ко-многим связи
const ConditionEvent = sequelize.define('ConditionEvent', {}, { timestamps: false });
Event.belongsToMany(Condition, { through: ConditionEvent });
Condition.belongsToMany(Event, { through: ConditionEvent });

const PeculiarityEvent = sequelize.define('PeculiarityEvent', {}, { timestamps: false });
Event.belongsToMany(Peculiarity, { through: PeculiarityEvent });
Peculiarity.belongsToMany(Event, { through: PeculiarityEvent });

const VolunteerEvent = sequelize.define('VolunteerEvent', {
    date: { type: DataTypes.DATE }
}, { timestamps: false });
Event.belongsToMany(Volunteer, { through: VolunteerEvent });
Volunteer.belongsToMany(Event, { through: VolunteerEvent });

// Пользователи
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hash: { type: DataTypes.TEXT },
    regDate: { type: DataTypes.DATEONLY }
}, { timestamps: false });

User.belongsTo(Staff, { foreignKey: 'staffId' });
User.belongsTo(Volunteer, { foreignKey: 'volunteerId' });

module.exports = {
    StaffRole,
    City,
    Course,
    Format,
    Condition,
    Peculiarity,
    EventStatus,
    Staff,
    Volunteer,
    Event,
    User,
    ConditionEvent,
    PeculiarityEvent,
    VolunteerEvent,
    sequelize
};