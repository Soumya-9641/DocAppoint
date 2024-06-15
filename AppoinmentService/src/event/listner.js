import { consumeQueue } from "../Utils/rabbitmq";
import fs from 'fs';


const filePath = './users.json';

function loadUsers() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    return {};
}

function saveUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

let users = loadUsers();

function saveUser(user) {
    users[user.id] = user;
    saveUsers(users);
}
  consumeQueue('user_events', (message) => {
    const event = JSON.parse(message);
    if (event.type === 'user_registered') {
      saveUser(event.user);
    }
  });

  consumeQueue('testing_queue', (message) => {
    const event = JSON.parse(message);
    console.log("rabbitmq testing consume successfully")
    console.log(event)
  });
  
  export function getUserById(userId) {
    return users[userId];
  }
  
export default getUserById;