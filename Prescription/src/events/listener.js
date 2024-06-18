
import fs from 'fs';
const filePath= "../../../AppoinmentService/users.json"
function loadUsers() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    return {};
}

let users = loadUsers();
console.log(users)