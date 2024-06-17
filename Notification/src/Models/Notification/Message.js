module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    Message.associate = (models) => {
      Message.belongTo(models.Notification, {
        foreignKey: 'messageId',
        as: 'notification',
      });
    };
  
    return Message;
  };