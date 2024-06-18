
const {Reminder} = require("../../Models/")
export const createReminder=async(data:any,patientId:number)=>{
    try{
        const {medicationName,reminderTime,message}= data;
        const reminder= await Reminder.create({
            patientId,
            medicationName,
            reminderTime,
            message
        });
        return reminder;
           
    }catch(err){
        console.log(err);
        return "something went wrong"
    }
}