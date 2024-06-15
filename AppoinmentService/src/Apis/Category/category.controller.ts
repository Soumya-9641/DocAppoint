import express, { Response, Request } from "express";
const router = express.Router();
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
import {createCategory,getAllCategory,getDoctor,doctorRankCategoryWise} from "./category.services"
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

router.get("/getAllCategory",async(
    req:Request,
    res:Response
)=>{
    try{
            const response = await getAllCategory();
            res.status(200).json({data:response});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong "})
    }
})


router.post("/getDoctor",async(req:Request,res:Response)=>{
        try{
            const {category} =req.body
            const response = await getDoctor(category);
            res.status(200).json(response)
        }catch(err){
            console.log(err);
            res.status(500).json({message:"something went wrong"});
        }
})

router.post("/doctorRankCategoryWise",async(req:Request,
    res:Response)=>{
try{
    const {category}= req.body
    console.log(category)
        const response = await doctorRankCategoryWise(category);
        res.status(200).json(response)
}catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong"});
}
})
export default router;