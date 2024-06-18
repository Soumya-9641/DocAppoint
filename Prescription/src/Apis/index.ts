import express from "express";

//import user from "./auth/auth.controller"
import reminder from "./Reminder/reminder.controller"

const handleRouter= express.Router();

handleRouter.use(
    "/reminder",
    reminder
  );
 
 export default handleRouter;