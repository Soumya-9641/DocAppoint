const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          address: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          role: {
            type: DataTypes.ENUM('patient', 'doctor'),
            allowNull: false,
          },
          profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
          },
      },
      {
        tableName: "users",
      }
    );
    User.associate = function (models) {
        // SectionWiseResult.belongsTo(models.Document, { foreignKey: "docId",   as: "docs" });
        User.hasOne(models.Doctor, {
          foreignKey: "doctorId",
          as: "doctor",
        });
        User.hasOne(models.Patient, {
            foreignKey: "patientId",
            as: "patient",
          });
          
       
    
      };
  
    return User;
  };