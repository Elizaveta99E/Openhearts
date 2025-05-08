
const sequelize = require('../backend/db');
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

Staff.belongsTo(Staff, { foreignKey: 'Staffes' });

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

Volunteers.belongsTo(Cities, { foreignKey: 'Cities' });
Volunteers.belongsTo(VolunteersStatus, { foreignKey: 'Status' });

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

Events.belongsTo(Staff, { foreignKey: 'IdStaff' });
Events.belongsTo(Format, { foreignKey: 'Formats' });
Events.belongsTo(EventsStatus, { foreignKey: 'Status' });
Events.belongsTo(Course, { foreignKey: 'Courses' });

const Activity = sequelize.define('Activity', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Datetime: {type: DataTypes.DATEONLY}
}, { timestamps: false });

Activity.belongsTo(Events, { foreignKey: 'Events' });
Activity.belongsTo(Volunteers, { foreignKey: 'Volunteeres' });

// Синхронизация с БД
sequelize.sync({ alter: true })
    .then(() => console.log("It's work!"))
    .catch(error => console.error('Error:', error));
