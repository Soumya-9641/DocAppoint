import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
import {makeAppoinment,getAppoinment,updateAppoinment} from "./appoinment.services"
const {publishToQueue} = require("../../Utils/rabbitmq")
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
        
        await publishToQueue('testing_queue', endMessage);
        res.send("testing is in process")

    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

router.post("/makeAppoinment",isAuthenticated,async(
    req:Request,
    res:Response
)=>{
    try{
        //@ts-ignore
        const patientId = req.user.userId;
        console.log(patientId) // Extract user ID from authenticated user
        const user = getUserById(patientId);
        if(user.isDoctor==="0"){
            const response = await makeAppoinment(req.body);
            res.status(200).json({data:response})
        }else{
           res.status(400).json({message:"not authorized"})
        }
           
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"});
    }
})


router.get("/getAppoinment",isAuthenticated,async (
    req:Request,
    res:Response
)=>{
    try{
        //@ts-ignore
        const doctorId = req.user.userId;
        console.log(doctorId) // Extract user ID from authenticated user
        const user = getUserById(doctorId);
        if(user.isDoctor==="1"){

            const response = await getAppoinment(user.email);
            res.status(200).json({data:response})
        }else{
           res.status(400).json({message:"not authorized"})
        }  
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"});
    }
})

router.put("/updateAppoinment",async(req:Request,res:Response)=>{
    try{
        const appointmentId = req.params.id;
        const id= parseInt(appointmentId)
        const { status } = req.body;
        const response = await updateAppoinment(id,status)
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})
export default router;