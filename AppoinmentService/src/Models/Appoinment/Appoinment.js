const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const Appoinment = sequelize.define(
      "Appoinment",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
        //   patientId: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //   },
        //   doctorId: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //   },
        //   categoryId: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //   },
          // appointmentTime: {
          //   type: DataTypes.STRING,
          //   allowNull: false,
          // },
          status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            defaultValue: 'pending',
          },
          googleMeetLink: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          totalFees: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          slot: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          date:{
            type: DataTypes.STRING,
            allowNull:false
          }
      },
      {
        tableName: "appoinments",
      }
    );
  
    Appoinment.associate = function (models) {
      // SectionWiseResult.belongsTo(models.Document, { foreignKey: "docId",   as: "docs" });
      Appoinment.belongsTo(models.Patient, {
        foreignKey: "patientId",
        as: "patient",
      });
      
      Appoinment.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "doctor",
      });
      Appoinment.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
  
    };
    return Appoinment;
  };