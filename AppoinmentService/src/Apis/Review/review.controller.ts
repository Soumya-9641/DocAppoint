import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
router.get('/testing',isAuthenticated,async(req:Request,res:Response)=>{
    try{
        //@ts-ignore
        
        //console.log( JSON.stringify(req.user));
        res.send("testing is in review")

    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

export default router;