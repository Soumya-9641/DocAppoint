const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define(
      "Doctor",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          specialization: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          fees: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
      },
      {
        tableName: "reviews",
      }
    );
    
        // SectionWiseResult.belongsTo(models.Document, { foreignKey: "docId",   as: "docs" });
        Doctor.associate = function (models) {
            // SectionWiseResult.belongsTo(models.Document, { foreignKey: "docId",   as: "docs" });
            Doctor.belongsTo(models.User, {
              foreignKey: "doctorId",
              as: "userdetails",
            });
            Doctor.hasMany(models.Appoinment, {
              foreignKey: "doctorId",
              as: "appoinment",
            });
            Doctor.hasMany(models.TimeSlot, {
              foreignKey: "doctorId",
              as: "timeslot",
            });
            Doctor.hasMany(models.Review, {
              foreignKey: "doctorId",
              as: "reviews",
            });
            
          };
       
    
     
   
  
    return Doctor;
  };