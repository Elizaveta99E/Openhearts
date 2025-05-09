const sequelize = require('./db.js');
const {DataTypes} = require('sequelize');


// Вспомогательные модели
let StaffRoles = sequelize.define('StaffRoles', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

const Course = sequelize.define('Course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

const Format = sequelize.define('Format', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

const Conditions = sequelize.define('Conditions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

const Peculiarities = sequelize.define('Peculiarities', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

const EventsStatus = sequelize.define('EventsStatus', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

const VolunteersStatus = sequelize.define('VolunteersStatus', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

const Cities = sequelize.define('Cities', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

// Основные модели
const Staff = sequelize.define('Staff', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Mail: {type: DataTypes.STRING(100)},
    Name: {type: DataTypes.STRING(100)},
    Phone: {type: DataTypes.STRING(100)},
    Regdate: {type: DataTypes.DATEONLY},
    Birthday: {type: DataTypes.DATEONLY},
    Photo: {type: DataTypes.TEXT}
});

const Volunteers = sequelize.define('Volunteers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Mail: {type: DataTypes.STRING(100)},
    Name: {type: DataTypes.STRING(100)},
    Phone: {type: DataTypes.STRING(100)},
    Regdate: {type: DataTypes.DATEONLY},
    Birthday: {type: DataTypes.DATEONLY},
    Comment: {type: DataTypes.TEXT},
    Photo: {type: DataTypes.TEXT}
},);

const Events = sequelize.define('Events', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(100)},
    StartDate: {type: DataTypes.DATEONLY},
    EndDate: {type: DataTypes.DATEONLY},
    Description: {type: DataTypes.TEXT},
    Conditions: {type: DataTypes.ARRAY(DataTypes.STRING(500))},
    Peculiarities: {type: DataTypes.ARRAY(DataTypes.STRING(500))},
    Needs: {type: DataTypes.INTEGER},
    Pic: {type: DataTypes.TEXT},
    Time: {type: DataTypes.TIME},
    Place: {type: DataTypes.TEXT}
});

const Activity = sequelize.define('Activity', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Datetime: {type: DataTypes.DATEONLY}
}, { timestamps: false });


// Синхронизация с БД
sequelize.sync({ alter: true })
    .then(() => console.log('Все таблицы созданы'))
    .catch(error => console.error('Ошибка синхронизации:', error));


// Для модели Staff
Staff.belongsTo(StaffRoles, {
    foreignKey: 'StaffRole', // Поле в таблице Staff
    as: 'Role' // Уникальное имя для ассоциации
});

// Для модели Volunteers
Volunteers.belongsTo(Cities, {
    foreignKey: 'City',
    as: 'VolunteerCity' // Уникальное имя
});

Volunteers.belongsTo(VolunteersStatus, {
    foreignKey: 'Status',
    as: 'VolunteerStatus'
});

// Для модели Events
Events.belongsTo(Staff, {
    foreignKey: 'IdStaff',
    as: 'ResponsibleStaff'
});

Events.belongsTo(Cities, {
    foreignKey: 'City',
    as: 'EventCity'
});

Events.belongsTo(Format, {
    foreignKey: 'Format',
    as: 'EventFormat'
});

Events.belongsTo(EventsStatus, {
    foreignKey: 'Status',
    as: 'EventStatus'
});

Events.belongsTo(Course, {
    foreignKey: 'Course',
    as: 'EventCourse'
});

// Синхронизация с БД
sequelize.sync({ alter: true })
    .then(() => console.log("It's work!"))
    .catch(error => console.error('Error:', error));
