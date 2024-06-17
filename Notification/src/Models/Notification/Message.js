

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
      "Message",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
       
          status: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
      },
      {
        tableName: "messages",
      }
    );
  
    Message.associate = function (models) {
      // SectionWiseResult.belongsTo(models.Document, { foreignKey: "docId",   as: "docs" });
      Message.belongsTo(models.Notification, {
        foreignKey: "messageId",
        as: "notification",
      });
      
     
  
    };
    return Message;
  };