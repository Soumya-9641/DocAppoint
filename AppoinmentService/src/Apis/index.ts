import express from "express";

//import user from "./auth/auth.controller"
import appoinment from "./Appoinment/appoinment.controller"
import profile from "./Profile/profile.controller"
import category from "./Category/category.controller"
import review from "./Review/review.controller"
import slot from "./Slot/slot.controller"
const handleRouter= express.Router();

handleRouter.use(
    "/appoinment",
    //@ts-ignore
    //   allowAdmin,
    // #swagger.tags = ['admin']
    appoinment
  );
  handleRouter.use(
    "/profile",
    //@ts-ignore
    //   allowAdmin,
    // #swagger.tags = ['admin']
    profile
  );
  handleRouter.use(
    "/category",
    //@ts-ignore
    //   allowAdmin,
    // #swagger.tags = ['admin']
    category
  );
  handleRouter.use(
    "/review",
    //@ts-ignore
    //   allowAdmin,
    // #swagger.tags = ['admin']
    review
  );
  handleRouter.use(
    "/slot",
    //@ts-ignore
    //   allowAdmin,
    // #swagger.tags = ['admin']
    slot
  );
  // handleRouter.use(
  //   "/sessionapi",
  //   //@ts-ignore
  //   //   allowAdmin,
  //   // #swagger.tags = ['admin']
  //   session
  // );
 export default handleRouter;