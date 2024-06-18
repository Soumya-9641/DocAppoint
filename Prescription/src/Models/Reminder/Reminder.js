const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const Reminder = sequelize.define(
      "Reminder",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          patientId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          medicationName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          reminderTime: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          message: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
     
      {
        tableName: "reminders",
      }
    );
    // Category.associate = function (models) {
    //   // Category.hasOne(models.Doctor, {
    //   //   foreignKey: "doctorId",
    //   //   as: "doctor",
    //   // });
    //   Category.hasMany(models.Appoinment, {
    //     foreignKey: "categoryId",
    //     as: "appoinments",
    //   });
    // }
    
  
    return Reminder;
  };