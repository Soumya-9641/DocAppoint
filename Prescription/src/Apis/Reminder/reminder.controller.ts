
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import express, { Response, Request } from "express";
const router = express.Router();
import {createReminder} from "./reminder.services"
router.get('/testing',async(req:Request,res:Response)=>{
    try{
        //@ts-ignore
       
        const message = {
            appointmentId: 1,
            patientId: 123,
            doctorId: 456,
            status: "approved",
            time: new Date(),
            patientEmail: "patient@example.com",
            patientName: "John Doe",
            doctorName: "Dr. Smith"
        };
        const endMessage= JSON.stringify(message);
       // console.log(endMessage)
        
        
        res.send("testing is in process")

    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

router.post("/createReminder",isAuthenticated,async(
    req:Request,
    res:Response
)=>{
    try{
        //@ts-ignore
        const patientId=req.user.userId;
        //@ts-ignore
        console.log(req.user)
       
            const response = await createReminder(req.body,patientId);
            res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong"});
    }
})
export default router;