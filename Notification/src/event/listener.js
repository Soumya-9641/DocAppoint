const { consumeQueue }= require( "../Utils/rabbitmq");

const {Message,Notification} = require("../Models/")
const startNotificationListener = async () => {
    // await consumeQueue('notification_updates', (message) => {
    //   const event = JSON.parse(message);
    //   console.log("Notification event received:", event);
    //   sendNotification(event);
    // });
  
    await consumeQueue('notification_updates',async(message)=>{
        const parseMessage= JSON.parse(message);
        try {
            console.log(parseMessage.status)
            const notify= await Notification.create({
                patientId: parseMessage.patientId,
                doctorId: parseMessage.doctorId,
                appointmentId: parseMessage.appointmentId,
                
                
              });
              const newnotify=notify.toJSON();
          const newMessage = await Message.create({
            content: `Your appointment with Dr. ${parseMessage.doctorName} has been ${parseMessage.status} time ${parseMessage.time} on ${parseMessage.data}.`,
            status:parseMessage.status,
            messageId: newnotify.id,
          });
         
      const processMessage= newMessage.toJSON();
      //console.log(processMessage)
        
      
      console.log(processMessage)
          console.log(`Notification saved for patient ${message.patientId}`);
        } catch (error) {
          console.error('Error saving notification:', error);
        }
    } );
  };

  module.exports = { startNotificationListener };
  const saveNotificationToDatabase = async (message) => {
    try {
        console.log(message.status)
    //   const newMessage = await Message.create({
    //     content: `Your appointment with Dr. ${message.doctorName} has been ${message.status} time ${message.time} on ${message.data}.`,
    //     status:message.status
    //   });
     // console.log(newMessage)
  
    //   await Notification.create({
    //     patientId: message.patientId,
    //     doctorId: message.doctorId,
    //     appointmentId: message.appointmentId,
        
    //     messageId: newMessage.id,
    //   });
  
      //console.log(`Notification saved for patient ${message.patientId}`);
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };
  
//   await consumeQueue('notification_updates', (message) => {
//     const event = JSON.parse(message);
//     console.log("Test event received:", event);
//   });