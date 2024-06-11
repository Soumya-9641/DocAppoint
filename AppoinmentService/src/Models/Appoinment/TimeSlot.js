

  const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const TimeSlot = sequelize.define(
      "TimeSlot",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          // doctorId: {
          //   type: DataTypes.UUID,
          //   allowNull: false,
          // },
          date: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          slots: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        
      },
      {
        tableName: "timeslots",
      }
    );
    TimeSlot.associate = function (models) {
      TimeSlot.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "doctor",
      });
    
    }
    
  
    return TimeSlot;
  };