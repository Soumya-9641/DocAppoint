import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated = require("../../../../isAuthenticated.ts")
import getUserById from "../../event/listner";
import { profileForPatient, profileForDoctor,doctorRank } from "./profile.services"
const { Image ,Patient,User,Doctor} = require("../../Models/")
const { s3 } = require("../../Utils/aws")
const multer = require('multer');
const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { upload } = require("../../Utils/multer")
dotenv.config();
router.get('/testing', isAuthenticated, async (req: Request, res: Response) => {
    try {
        //@ts-ignore

        res.send("testing is in profile")

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" })
    }
})
router.post('/profileForPatient', isAuthenticated,(req,res,next)=>{
    upload(req, res, async (err:any) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, async (req, res) => {
    
    try {
        const  {name, address, dateOfBirth, medicalHistory } = req.body;
        console.log(address)
        //@ts-ignore
        const patientId = req.user.userId;
        const user = await getUserById(patientId);
        let role:string;
        if(user.isDoctor==="0"){
                //@ts-ignore
                console.log(req.file.location)
                //@ts-ignore
                let userResult;
                     userResult= await User.create({
                        userId:user.id,
                        email:user.email,
                        name,
                        address,
                        role:"patient",
                        //@ts-ignore
                        profilePicture:req.file.location
                    })
                const currUser=userResult.toJSON()
                //console.log(userResult.toJSON());
                const addPatient= await Patient.create({
                    dateOfBirth,
                    medicalHistory,
                    patientId:currUser.id
                })
                const combinedResult = {
                    user: currUser,
                    patient: addPatient
                };
                res.status(200).json({combinedResult});
        }else{
            res.status(400).json({message:"user not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create user profile' });
    }

});

router.post("/profileForDoctor", isAuthenticated,(req,res,next)=>{
    upload(req, res, async (err:any) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, async (
    req: Request,
    res: Response
) => {
    try {
        const  {name, address, specialization, fees } = req.body;
        console.log(name)
        const actualFees = parseFloat(fees)
        //@ts-ignore
        const patientId = req.user.userId;
        const user = await getUserById(patientId);
        if(user.isDoctor==="1"){
            //@ts-ignore
            let userResult;
            userResult= await User.create({
               userId:user.id,
               email:user.email,
               name,
               address,
               role:"doctor",
               //@ts-ignore
               profilePicture:req.file.location
           })
           const currUser=userResult.toJSON()
           const addDoctor= await Doctor.create({
            specialization,
            fees:actualFees,
            doctorId:currUser.id
        })
        console.log(addDoctor.toJSON())
        const combinedResult = {
            user: currUser,
            doctor: addDoctor
        };
        res.status(200).json( combinedResult);
        }else{
            res.status(400).json({message:"Doctor not found"})
        }
    } catch (err) {

    }
})

router.get("/getImage", async (req: Request,
    res: Response
) => {
    const images = await Image.findByPk(1);
    res.json(images);
})

router.get("/getDoctorWithUser",async(
    req:Request,
    res:Response
)=>{
    try{

        
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"})
    }
})

router.get("/doctorRank",async(req:Request,
    res:Response)=>{
try{
        const response = await doctorRank();
        res.status(200).json(response)
}catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong"});
}
})

export default router;