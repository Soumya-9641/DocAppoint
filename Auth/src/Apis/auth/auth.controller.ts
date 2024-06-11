import express, { Response, Request } from "express";
const router = express.Router();

import { registerUser,loginUser } from "./auth.services";


router.post("/register",async(req:Request,
    res:Response)=>{
        try{
                if(!req.body){
                    throw new Error('Request body is empty');
                }
                const response = await registerUser(req.body);
                res.status(200).json({data:response,status:true,message:"successfully called the api"})
        }catch(err){
            console.log(err);
            res.status(500).json({message:"something went wrong",status:false})
        }
    }
    
)
router.get("/testing",async(req,res)=>{
    res.send("hello")
})


router.post("/login",async(
    req:Request,
    res:Response
)=>{
    try{
            if(!req.body){
                throw new Error('Request body is empty');
            }
            const response = await loginUser(req.body);
            res.status(200).json({data:response,message:"login successful",status:true})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong",status:false})
    }
})
export default router;
