import express from "express";
import "express-async-errors";
//import { json } from "body-parser";
import cookieSession from "cookie-session";
var cors = require("cors");
var bodyParser = require('body-parser')
import db from "./Models/";
import handleRouter from "./Apis";
import dotenv from "dotenv";
const cron = require('node-cron');
const axios = require('axios');
dotenv.config();
const port = process.env.PORT || 9004;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use("/api",handleRouter);
app.use("/",(req,res)=>{
    res.send("appoinment service in this port")
})

// cron.schedule('* * * * *', async () => {
//   try {
//     const response = await axios.get('http://localhost:9001/api/profile/doctorRank');
     
//       // If the API returns any data
//   } catch (error) {
//       console.error('Failed to update doctor ranks:');
//   }
// });

const start = async () => {
  
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
        db.sequelize.sync({ alter:true}).then(async () => {
          app.listen(port, async () => {
            console.log("listening", port);
          });
        });
      });
  };
  
  start();
  