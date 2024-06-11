
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          isDoctor:{
            type: DataTypes.STRING,
            allowNull:false,
            default: false
          }
      }
    );
  
 
    return User;
  };