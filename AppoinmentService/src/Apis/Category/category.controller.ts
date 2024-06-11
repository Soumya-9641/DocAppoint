import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
import {createCategory} from "./category.services"
router.get('/testing',isAuthenticated,async(req:Request,res:Response)=>{
    try{
        //@ts-ignore
        
        //console.log( JSON.stringify(req.user));
        res.send("testing is in category")

    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})


router.post("/createCategory",async(
    req:Request,
    res:Response
)=>{
    try{
            const response = await createCategory(req.body);
            res.status(200).json({data:response})
    }catch(err){
            console.log(err);
            res.status(500).json({message:"something went wrong"})
    }
})


export default router;