import express from "express";

import user from "./auth/auth.controller"
const handleRouter= express.Router();

handleRouter.use(
    "/auth",
    //@ts-ignore
    //   allowAdmin,
    // #swagger.tags = ['admin']
    user
  );
  // handleRouter.use(
  //   "/sessionapi",
  //   //@ts-ignore
  //   //   allowAdmin,
  //   // #swagger.tags = ['admin']
  //   session
  // );
 export default handleRouter;