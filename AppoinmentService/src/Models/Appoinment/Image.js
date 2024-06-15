const dotenv = require("dotenv");
dotenv.config();

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
      "Image",
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
       
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        
      },
      {
        tableName: "iamges",
      }
    );
   
  
    return Image;
  };