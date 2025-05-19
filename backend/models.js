const sequelize = require('./db');
const { DataTypes } = require('sequelize');

// Вспомогательные модели

const StaffRoles = sequelize.define('StaffRole', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT, unique: true}
}, { timestamps: false });

const Course = sequelize.define('Course', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT, unique: true}
});

const Format = sequelize.define('Format', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT, unique: true}
});

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
    Name: {type: DataTypes.TEXT, unique: true}
});


const Cities = sequelize.define('City', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.TEXT}
});

// Основные модели
const Staff = sequelize.define('Staff', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(100)},    
    Phone:{type: DataTypes.STRING(100)},
    Birthday: {type: DataTypes.DATEONLY, unique: true},
    Photo: {type: DataTypes.TEXT, unique: true}
});

Staff.belongsTo(StaffRoles, {foreignKey: 'StaffRole',});

const Volunteers = sequelize.define('Volunteer', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(100)},
    Phone:{type: DataTypes.STRING(100)},
    Birthday: {type: DataTypes.DATEONLY, unique: true},
    Comment: {type: DataTypes.TEXT},
    Photo: {type: DataTypes.TEXT},

});

Volunteers.belongsTo(Cities, { foreignKey: 'City'});


const Events = sequelize.define('Event', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING(100)},
    StartDate: {type: DataTypes.DATEONLY},
    EndDate: {type: DataTypes.DATEONLY},
    Description:  {type: DataTypes.TEXT},
    Needs: {type: DataTypes.INTEGER},
    Pic: {type: DataTypes.TEXT},
    Time: {type: DataTypes.TIME},
    Place: {type: DataTypes.TEXT}
},{ timestamps: false });

Events.belongsTo(Staff, { foreignKey: 'IdStaff' });
Events.belongsTo(Cities, { foreignKey: 'City' });
Events.belongsTo(Format, { foreignKey: 'Format' });
Events.belongsTo(EventsStatus, { foreignKey: 'Status'});
Events.belongsTo(Course, { foreignKey: 'Course'});

const PeculiaritiesOfEvents = sequelize.define('PeculiaritiesOfEvents');

PeculiaritiesOfEvents.belongsTo(Events, { foreignKey: 'IdEvent' });
PeculiaritiesOfEvents.belongsTo(Peculiarities, { foreignKey: 'IdPeculiarities' });

const Users = sequelize.define('Users', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    Mail: {type: DataTypes.STRING(100)},
    RegDate: {type: DataTypes.DATEONLY},
    Hash: {type: DataTypes.TEXT}
});
Users.belongsTo(Volunteers, { foreignKey: 'IdVolunteer' });
Users.belongsTo(Staff, { foreignKey: 'IdStaff' });

const Activity = sequelize.define('Activity', {
    Datetime: {
        type: DataTypes.DATE,
        primaryKey: true
    }
}, { timestamps: false });

Activity.belongsTo(Events, { foreignKey: 'Event' });
Activity.belongsTo(Volunteers, { foreignKey: 'Volunteer' });

const ConditionsOfEvents = sequelize.define('ConditionsOfEvents');
ConditionsOfEvents.belongsTo(Events, { foreignKey: 'IdEvent' });
ConditionsOfEvents.belongsTo(Conditions, { foreignKey: 'IdConditions' });
// Экспорт моделей
module.exports = {
    StaffRoles,
    Cities,
    Course,
    Format,
    Conditions,
    ConditionsOfEvents,
    Peculiarities,
    EventsStatus,
    Staff,
    Volunteers,
    Events,
    Activity,
    PeculiaritiesOfEvents,
    Users,
    sequelize
};