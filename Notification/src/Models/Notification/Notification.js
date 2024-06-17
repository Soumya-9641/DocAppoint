
  

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
      "Notification",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
       
          patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
      },
      {
        tableName: "notifications",
      }
    );
  
    Notification.associate = function (models) {
      // SectionWiseResult.belongsTo(models.Document, { foreignKey: "docId",   as: "docs" });
      Notification.hasMany(models.Message, {
        foreignKey: "messageId",
        as: "messages",
      });
      
     
  
    };
    return Notification;
  };