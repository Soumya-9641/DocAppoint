const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "Category",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        
        
      },
     
      {
        tableName: "categories",
      }
    );
    Category.associate = function (models) {
      // Category.hasOne(models.Doctor, {
      //   foreignKey: "doctorId",
      //   as: "doctor",
      // });
      Category.hasMany(models.Appoinment, {
        foreignKey: "categoryId",
        as: "appoinments",
      });
    }
    
  
    return Category;
  };