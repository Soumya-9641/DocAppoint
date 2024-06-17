module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    //   status: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    //   messageId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'Messages',
    //       key: 'id',
    //     },
    //   },
    });
  
    Notification.associate = (models) => {
      Notification.hasMany(models.Message, {
        foreignKey: 'messageId',
        as: 'messages',
      });
    };
  
    return Notification;
  };