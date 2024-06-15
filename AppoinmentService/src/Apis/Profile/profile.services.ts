
const isAuthenticated  =require("../../../../isAuthenticated.ts")
import getUserById  from "../../event/listner";
const {User,Patient,Doctor,Review} = require("../../Models/")
export const profileForPatient= async (data:any,user:any)=>{
    try{
        console.log(user);
        const {name,address,profilePicture,dateOfBirth,medicalHistory}= data;
        let userResult;
        if(user){
             userResult= await User.create({
                userId:user.id,
                email:user.email,
                name,
                address,
                role:"doctor",
                profilePicture
            })
            
        }
        const currUser=userResult.toJSON()
        //console.log(userResult.toJSON());
        const addPatient= await Patient.create({
            dateOfBirth,
            medicalHistory,
            patientId:currUser.id
        })
        console.log(addPatient.toJSON())
        const combinedResult = {
            user: currUser,
            patient: addPatient
        };
            return combinedResult
    }catch(err){
        console.log(err);
        return "Something went wrong"
    }
}

export const profileForDoctor = async (data:any,user:any)=>{
    try{
        console.log(user);
        const {name,address,profilePicture,specialization,fees}= data;
        let userResult;
        if(user){
             userResult= await User.create({
                userId:user.id,
                email:user.email,
                name,
                address,
                role:"doctor",
                profilePicture
            })
            
        }
        const currUser=userResult.toJSON()
        //console.log(userResult.toJSON());
        const addDoctor= await Doctor.create({
            specialization,
            fees,
            doctorId:currUser.id
        })
        console.log(addDoctor.toJSON())
        const combinedResult = {
            user: currUser,
            doctor: addDoctor
        };
            return combinedResult
    }catch(err){
        console.log(err);
         return "Something went wrong"
    }
}

export const doctorRank= async()=>{
    try{
        const doctors = await Doctor.findAll({
            include: [
                {
                    model: Review,
                    as: 'reviews',
                    attributes: ['rating'],
                }
            ],
        });
        for (let doctor of doctors) {
            const ressult= doctor.toJSON()
            console.log(ressult)
            const reviews = doctor.reviews;
            const reviewCount = reviews.length;
            let totalRating = 0;

            if (reviewCount > 0) {
                // Aggregate total rating sum
                totalRating = reviews.reduce((acc: number, review: any) => acc + parseFloat(review.rating), 0);
                const avgRating= (totalRating/reviewCount);
               
                const rank= avgRating+reviewCount
                console.log(rank)
                doctor.rank = rank;
                await doctor.save();
            }
            
        }
        const updatedDoctors = await Doctor.findAll({
            include: [
                {
                    model: User,
                    as: 'userdetails',
                    attributes: ['name', 'email', 'address'],
                },
            ],
            order: [['rank', 'DESC']],
        });

       // console.log(doctors.toJSON());
       const updatedDoctorsJSON = updatedDoctors.map((doctor: { toJSON: () => any; }) => doctor.toJSON());
        return updatedDoctorsJSON
    }catch(err){
        console.log(err);
        return "something went wrong in service file"
    }
}