import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
import {makeReview,getReviews,reviewOfDoctor,reviewOfPatient} from "./review.services"
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
router.post("/makeReview",async(
    req:Request,
    res:Response
)=>{
    try{
            const response = await makeReview(req.body);
            res.status(200).json({data:response})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong"})
    }
})

router.get("/getReviews",async(
    req:Request,
    res:Response
)=>{
    try{
        const response = await getReviews();
        res.status(200).json({data:response})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/reviewOfDoctor",async(req:Request,res:Response)=>{
    try{

        const {doctorId} = req.query;
        const response = await reviewOfDoctor(doctorId);
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({message:"somthing went wrong"});
    }
})

router.get("/reviewOfPatient",async(req:Request,res:Response)=>{
    try{

        const {patientId} = req.query;
        const response = await reviewOfPatient(patientId);
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({message:"somthing went wrong"});
    }
})

export default router;