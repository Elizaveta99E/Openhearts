const sequelize = require('./db')
const {DataTypes, INTEGER} = require('sequelize')

// Вспомогательные модели
const StaffRoles = sequelize.define('StaffRole', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT, unique: true}
}, { timestamps: false });
const StaffRole = sequelize.define('StaffRole', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true }
}, { timestamps: false });

const City = sequelize.define('City', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
}, { timestamps: false });

const Course = sequelize.define('Course', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32), unique: true}
}, { timestamps: false }));

const Format = sequelize.define('Format', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32), unique: true}
}, { timestamps: false }));

const Condition = sequelize.define('Condition', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
}, { timestamps: false });

const Peculiarities = sequelize.define('Peculiarity', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
}, { timestamps: false }));
const Peculiarity = sequelize.define('Peculiarity', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT }
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
}, { timestamps: false });

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
}, { timestamps: false });

Staff.belongsTo(StaffRoles, {foreignKey: 'Role',});

const Volunteers = sequelize.define('Volunteer', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(32)},
    Mail: {type: DataTypes.STRING(64), unique: true},
    Phone:{type: DataTypes.STRING(16)},
    RegDate: {type: DataTypes.DATEONLY, unique: true},
    Birthday: {type: DataTypes.DATEONLY, unique: true},
    Password: {type: DataTypes.STRING(128)},
    Comment: {type: DataTypes.TEXT},
    Photo: {type: DataTypes.STRING(32)},

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

Events.belongsTo(Staff, { foreignKey: 'IdStaff' });
Events.belongsTo(Cities, { foreignKey: 'Cities' });
Events.belongsTo(Format, { foreignKey: 'Formates' });
Events.belongsTo(EventsStatus, { foreignKey: 'Status'});
Events.belongsTo(Course, { foreignKey: 'Courses'});

const Activity = sequelize.define('Activity', {
    Datetime: {
        type: DataTypes.DATE,
        primaryKey: true
    }
}, { timestamps: false });

Activity.belongsTo(Events, { foreignKey: 'Events' });
Activity.belongsTo(Volunteers, { foreignKey: 'Volunteers' });

// Экспорт моделей
module.exports = {
    StaffRoles,
    Course,
    Format,
    Conditions,
    Peculiarities,
    EventsStatus,
    VolunteersStatus,
    Cities,
    Staff,
    Volunteers,
    Events,
    Activity,
    sequelize
};