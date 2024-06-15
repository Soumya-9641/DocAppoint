const {Appoinment,User,Doctor,Patient} = require("../../Models/")

export const makeAppoinment = async(data:any)=>{
    try{

        const {patientId,doctorId,categoryId,totalFees,slot,date}=data;
        const result = await Appoinment.create({
            patientId,
            doctorId,
            categoryId,
            totalFees,
            slot,
            date
        });
        return result
           // return "hello"
    }catch(err){
        console.log(err);
        return "something went wrong in service function"
    }
}

export const getAppoinment= async(doctorId:any)=>{
    try{

        const getDoctorId = await User.findOne({
            where:{email:doctorId},
            include:[
                {
                    model: Doctor,
                    as: 'doctor',
                    attributes: ['id','specialization','fees'],
                }
            ]
        })
        const doctor= getDoctorId.toJSON();
        const doctorid=doctor.doctor.id;
        const appoinments= await Appoinment.findAll({
            where:{doctorId:doctorid},
            include:[
                {
                    model: Patient,
                    as: 'patient',
                    include: [
                        {
                          model: User,
                          as: 'userdetails'
                        }
                      ]
                }
            ]
        })
        
        const appoinmentsJSON = appoinments.map((appoinment: { toJSON: () => any; }) => appoinment.toJSON());
        console.log(appoinmentsJSON)
        return appoinmentsJSON
    }catch(err){
        console.log(err);
        return "something wnet wrong in service function"
    }
}