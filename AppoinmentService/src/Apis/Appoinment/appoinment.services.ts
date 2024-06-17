const {Appoinment,User,Doctor,Patient} = require("../../Models/")
const {publishToQueue} = require("../../Utils/rabbitmq")
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

export const updateAppoinment=async (appointmentId:number,status:string)=>{
        try{
            const appointment = await Appoinment.findByPk(appointmentId, {
                include: [
                  { 
                    model: Patient,
                     as: 'patient',
                     include: [
                        {
                          model: User,
                          as: 'userdetails'
                        }
                      ] 
                },
                  {
                     model: Doctor, 
                     as: 'doctor',
                     include: [
                        {
                          model: User,
                          as: 'userdetails'
                        }
                      ]
                     },
                ],
              });
              if (!appointment) {
                return  'Appointment not found'
              }
          
              appointment.status = status;
              await appointment.save();
          
              // Send notification message to RabbitMQ
              const message = {
                appointmentId: appointment.id,
                patientId: appointment.patient.id,
                doctorId: appointment.doctor.id,
                status,
                time: appointment.slot,
                data:appointment.date,
                patientEmail: appointment.patient.userdetails.email,
                patientName: appointment.patient.userdetails.name,
                doctorName: appointment.doctor.userdetails.name,
              };
              const endMessage= JSON.stringify(message);
              console.log(message)
              await publishToQueue('notification_updates', endMessage);
              return appointment
        }catch(err){
            console.log(err);
            return "something went wrong in service function"
        }
}