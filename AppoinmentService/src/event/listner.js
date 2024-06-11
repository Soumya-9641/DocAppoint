import { consumeQueue } from "../Utils/rabbitmq";

let users = {}; 

function saveUser(user) {
    users[user.id] = user;
  }
  consumeQueue('user_events', (message) => {
    const event = JSON.parse(message);
    if (event.type === 'user_registered' || event.type === 'user_logged_in') {
      saveUser(event.user);
    }
  });
  
  export function getUserById(userId) {
    return users[userId];
  }
  
export default getUserById;  