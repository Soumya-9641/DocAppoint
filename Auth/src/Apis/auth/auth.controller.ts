import express, { Response, Request } from "express";
const router = express.Router();
import {publishToQueue} from "../../Utils/rabbitmq"
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
// router.get("/testing",async(req,res)=>{
//     res.send("hello")
// })


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
export default router;
