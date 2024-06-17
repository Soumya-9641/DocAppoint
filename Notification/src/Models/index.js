"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../DbConfig/DbConfig.json")[env];
const db = {};
const colors = require('colors'); 
let sequelize;

if (process.env.DB_HOST) {
  sequelize = new Sequelize(
    process.env.MYSQLDB_DATABASE,
    process.env.MYSQLDB_USER,
    process.env.MYSQLDB_ROOT_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: false,
    }
  );
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: (logStr, execTime, options) => {
      if (!options) {
        options = execTime;
        execTime = undefined;
      }

      let col = null;
      switch (options &&options.type) {
        case "SELECT":
          col = colors.blue.bold;
          break;
        case "UPDATE":
          col = colors.yellow.bold;
          break;
        case "INSERT":
          col = colors.green.bold;
          break;
        default:
          col = colors.white.bold;
          break;
      }

      if (execTime) {
        if (execTime >= 10) {
          col = colors.red.bold;
          console.log(colors.magenta.bold(`[${execTime} ms]`), col(logStr));
        } else {
          console.log(col(logStr));
        }
      } else {
        console.log(col(logStr));
      }
    },
  });
}

// sequelize = new Sequelize("adm", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
// })

const importModelFiles = (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      importModelFiles(fullPath);
    } else if (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    ) {
      const modelFun = require(fullPath);
      const model = modelFun(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  }
};

importModelFiles(__dirname);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
