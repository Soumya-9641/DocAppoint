const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define(
      "Patient",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          
          dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          medicalHistory: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        
      },
      {
        tableName: "patients",
      }
    );
    Patient.associate = function (models) {
        // SectionWiseResult.belongsTo(models.Document, { foreignKey: "docId",   as: "docs" });
        Patient.belongsTo(models.User, {
          foreignKey: "patientId",
          as: "userdetails",
        });
        Patient.hasMany(models.Appoinment, {
          foreignKey: "patientId",
          as: "appoinment",
        });
        Patient.hasMany(models.Review, {
          foreignKey: "patientId",
          as: "reviews",
        });
    
      };
  
  
    return Patient;
  };