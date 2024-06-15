
const {Category,Doctor,User} = require("../../Models/") 
export const createCategory = async (data:any)=>{
    try{
            const {name} = data;
            const result = await Category.create({
                
                name
            })
            if(!result){
                throw new Error("cannot create category")
            }else{
                return result;
            }
    }catch(err){
        console.log(err);
        return "something went wrong"
    }
}

export const getAllCategory = async ()=>{
    try{

        const result= await Category.findAll();
        return result;

    }catch(err){
        console.log(err);
        return "something went wrong"
    }
}

export const getDoctor = async (category:any)=>{
    try{
        const doctors = await Doctor.findAll({
            where: { specialization: category },
            attributes: ['id', 'specialization', 'fees'], // Include relevant doctor attributes
            include: [
                {
                    model: User,
                    as: 'userdetails',
                    attributes: ['name', 'email', 'address'], // Include relevant user attributes
                },
            ],
        });

        return doctors

    }catch(err){
        console.log(err);
        return "something went wrong"
    }
}

export const doctorRankCategoryWise = async (category:string)=>{
    try{
        const updatedDoctors = await Doctor.findAll({
            where: { specialization: category },
            include: [
                {
                    model: User,
                    as: 'userdetails',
                    attributes: ['name', 'email', 'address'],
                },
            ],
            order: [['rank', 'DESC']],
        });
        return updatedDoctors;

    }catch(err){
        console.log(err);
       return "something went wrong in service function"
    }
}