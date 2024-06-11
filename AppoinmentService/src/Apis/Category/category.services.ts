
const {Category} = require("../../Models/") 
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