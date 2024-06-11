const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
      "Review",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          // doctorId: {
          //   type: DataTypes.INTEGER,
          //   allowNull: false,
          // },
          // patientId: {
          //   type: DataTypes.INTEGER,
          //   allowNull: false,
          // },
          rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
              min: 1,
              max: 5,
            },
          },
          comment: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        
      },
      {
        tableName: "reviews",
      }
    );
    Review.associate = function (models) {
      Review.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "doctor",
      });
      Review.belongsTo(models.Patient, {
        foreignKey: "patientId",
        as: "patient",
      });
    }
  
    return Review;
  };