import express from "express";

//import user from "./auth/auth.controller"
import notification from "./Notification/notification.controller"
const handleRouter= express.Router();

handleRouter.use(
    "/notification",

    notification
  );
 

 export default handleRouter;