const sequelize = require('./db');
const { DataTypes } = require('sequelize');

// Вспомогательные модели
const StaffRoles = sequelize.define('StaffRole', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT, unique: true }
}, { timestamps: false });

const Course = sequelize.define('Course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT, unique: true }
});

const Format = sequelize.define('Format', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT, unique: true }
});

const Conditions = sequelize.define('Condition', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT }
}, { timestamps: false });

const Peculiarities = sequelize.define('Peculiarity', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT }
}, { timestamps: false });

const EventsStatus = sequelize.define('EventsStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT, unique: true }
});

const Cities = sequelize.define('City', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.TEXT }
});

// Основные модели
const Staff = sequelize.define('Staff', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING(100) },    
    Phone: { type: DataTypes.STRING(100) },
    Birthday: { type: DataTypes.DATEONLY},
    Photo: { type: DataTypes.TEXT }
});

Staff.belongsTo(StaffRoles, { foreignKey: 'IdStaffRole' });

const Volunteers = sequelize.define('Volunteer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING(100) },
    Phone: { type: DataTypes.STRING(100) },
    Birthday: { type: DataTypes.DATEONLY, unique: true },
    Comment: { type: DataTypes.TEXT },
    Photo: { type: DataTypes.TEXT }
});

Volunteers.belongsTo(Cities, { foreignKey: 'IdCity' });

const Events = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING(100) },
    StartDate: { type: DataTypes.DATEONLY },
    EndDate: { type: DataTypes.DATEONLY },
    Description: { type: DataTypes.TEXT },
    Needs: { type: DataTypes.INTEGER },
    Pic: { type: DataTypes.TEXT },
    Time: { type: DataTypes.TIME },
    Place: { type: DataTypes.TEXT }
}, { timestamps: false });

Events.belongsTo(Staff, { foreignKey: 'IdStaff' });
Events.belongsTo(Cities, { foreignKey: 'IdCity' });
Events.belongsTo(Format, { foreignKey: 'IdFormat' });
Events.belongsTo(EventsStatus, { foreignKey: 'Status' });
Events.belongsTo(Course, { foreignKey: 'IdCourse' });

const PeculiaritiesOfEvents = sequelize.define('PeculiaritiesOfEvents', {
    // Если нужны дополнительные поля, укажите их здесь
}, { timestamps: false });

PeculiaritiesOfEvents.belongsTo(Events, { foreignKey: 'IdEvent' });
PeculiaritiesOfEvents.belongsTo(Peculiarities, { foreignKey: 'IdPeculiarities' });

const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Mail: { type: DataTypes.STRING(100) },
    RegDate: { type: DataTypes.DATEONLY },
    Hash: { type: DataTypes.TEXT }
});

Users.belongsTo(Volunteers, { foreignKey: 'IdVolunteer' });
Users.belongsTo(Staff, { foreignKey: 'IdStaff' });

const Activity = sequelize.define('Activity', {
    Datetime: {
        type: DataTypes.DATE,
        primaryKey: true
    }
}, { timestamps: false });

Activity.belongsTo(Events, { foreignKey: 'IdEvent' });
Activity.belongsTo(Volunteers, { foreignKey: 'IdVolunteer' });

const ConditionsOfEvents = sequelize.define('ConditionsOfEvents', {
    // Если нужны дополнительные поля, укажите их здесь
}, { timestamps: false });

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