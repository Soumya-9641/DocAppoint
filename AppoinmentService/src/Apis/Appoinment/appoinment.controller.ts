import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
router.get('/testing',isAuthenticated,async(req:Request,res:Response)=>{
    try{
        //@ts-ignore
        const patientId = req.user.userId;
        console.log(patientId) // Extract user ID from authenticated user
        const user = getUserById(patientId);
        console.log(user)
        //console.log( JSON.stringify(req.user));
        res.send("testing is in process")

    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

export default router;