import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
import {createSlot} from "./slot.services"
router.get('/testing',isAuthenticated,async(req:Request,res:Response)=>{
    try{
        //@ts-ignore
        
        //console.log( JSON.stringify(req.user));
        res.send("testing is in slot")

    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

router.post("/createSlot",async(
    req:Request,
    res:Response
)=>{
    try{
        const response = await createSlot(req.body)
        res.status(200).json({data:response});
    }catch(err){
        console.log(err);
        return "Something went wrong"
    }
})

export default router;