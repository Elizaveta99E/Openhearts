const sequelize = require('./db');
const { DataTypes } = require('sequelize');

// Вспомогательные модели

const StaffRoles = sequelize.define('StaffRole', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT, unique: true}
}, { timestamps: false });

const Course = sequelize.define('Course', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32), unique: true}
}, { timestamps: false });

const Format = sequelize.define('Format', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32), unique: true}
}, { timestamps: false });

const Conditions = sequelize.define('Condition', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
}, { timestamps: false });

const Peculiarities = sequelize.define('Peculiarity', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
}, { timestamps: false });

const EventsStatus = sequelize.define('EventsStatus', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32), unique: true}
}, { timestamps: false });

const VolunteersStatus = sequelize.define('VolunteersStatus', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32), unique: true}
}, { timestamps: false });

const Cities = sequelize.define('City', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32)}

// Основные модели
const Staff = sequelize.define('Staff', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32)},
    Mail: {type: DataTypes.STRING(64), unique: true},
    Phone:{type: DataTypes.STRING(16)},
    RegDate: {type: DataTypes.DATEONLY, unique: true},
    Birthday: {type: DataTypes.DATEONLY, unique: true},
    Photo: {type: DataTypes.STRING(32), unique: true},
    Password: {type: DataTypes.STRING(128)}
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    mail: { type: DataTypes.STRING(100), unique: true },
    phone: { type: DataTypes.STRING(100) },
    birthday: { type: DataTypes.DATEONLY },
    photo: { type: DataTypes.TEXT }
}, { timestamps: false });

Staff.belongsTo(StaffRole, { foreignKey: 'staffRoleId' });

const Volunteer = sequelize.define('Volunteer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100) },
    mail: { type: DataTypes.STRING(100), unique: true },
    phone: { type: DataTypes.STRING(100) },
    birthday: { type: DataTypes.DATEONLY },
    comment: { type: DataTypes.TEXT },
    photo: { type: DataTypes.TEXT }
}, { timestamps: false });

Volunteers.belongsTo(Cities, { foreignKey: 'Cities'});
Volunteers.belongsTo(VolunteersStatus, { foreignKey: 'Status'});

const Events = sequelize.define('Event', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32)},
    StartDate: {type: DataTypes.DATEONLY},
    EndDate: {type: DataTypes.DATEONLY},
    Description:  {type: DataTypes.TEXT},
    Conditions: {type: DataTypes.ARRAY(DataTypes.STRING(500))},
    Peculiarities: {type: DataTypes.ARRAY(DataTypes.STRING(500))},
    Needs: {type: DataTypes.INTEGER},
    Pic: {type: DataTypes.TEXT},
    Time: {type: DataTypes.TIME},
    Place: {type: DataTypes.TEXT}
},{ timestamps: false });

Volunteer.belongsTo(City, { foreignKey: 'cityId' });

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

User.belongsTo(Staff, {
    foreignKey: 'staffId',
    onDelete: 'CASCADE' // Добавляем каскадное удаление
});

User.belongsTo(Volunteer, {
    foreignKey: 'volunteerId',
    onDelete: 'CASCADE' // Добавляем каскадное удаление
});

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