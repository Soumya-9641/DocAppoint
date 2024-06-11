import express from "express";
import "express-async-errors";
//import { json } from "body-parser";
import cookieSession from "cookie-session";
var cors = require("cors");
var bodyParser = require('body-parser')


import db from "./Models";
import handleRouter from "./Apis";
import dotenv from "dotenv";
//const user= require("./Apis/user/user.controller")
dotenv.config();
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

const port = process.env.PORT || 9000;
const app = express();
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use(cors());
//app.use("/user",user);


//app.use(json({ limit: "10mb" }));
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use("/api",handleRouter);
// app.use(
//   "/api/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument, {
//     swaggerOptions: { persistAuthorization: true },
//   })
// );
app.use("/",(req,res)=>{
  res.send("auth service in this port")
})
const start = async () => {
    // if (!process.env.JWT_KEY) {
    //   throw new Error("JWT_KEY must be defined ");
    // }
    // if (!process.env.rabbitMQ_HOST_URL) {
    //   throw new Error("rabbitMQ_HOST_URL must be defined");
    // }
  
    db.sequelize
      .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
      .then(async function () {
        const rawTables = await db.sequelize.query("SHOW TABLES");
        const tables = rawTables[0].map(
          (i: any) => i[Object.keys(rawTables[0][0])[0]]
        );
        for (const t of tables) {
          const rawKeys = await db.sequelize.query(`SHOW INDEX FROM ${t}`);
          const keys = rawKeys[0]
            .map((i: any) => i["Key_name"])
            .filter((i: any) => i.match(/[a-zA-Z]+_\d+/));
          for (const k of keys)
            await db.sequelize.query(`ALTER TABLE ${t} DROP INDEX ${k}`);
        }
        db.sequelize.sync({ alter: false }).then(async () => {
          
          app.listen(port, async () => {
           
            console.log("listening", port);
  
            // calculateNormalization(18, 175);
          });
        });
      });
  };
  
  start();
  