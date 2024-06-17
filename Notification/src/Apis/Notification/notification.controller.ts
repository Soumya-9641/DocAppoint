import express, { Response, Request } from "express";
const router = express.Router();

import { publishToQueue } from "../../Utils/rabbitmq";
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
        
        await publishToQueue('testing', endMessage);
        res.send("testing is in process")

    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

export default router;