import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//@ts-ignore
import { User } from "../../Models/"
import {publishToQueue} from "../../Utils/rabbitmq"
export const registerUser = async (data: any) => {
    try {
        const { email, password, isDoctor } = data;
        const existingUser = await User.findOne({ where: { email } });;
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({

            email,
            password: hashedPassword,
            isDoctor
        });
       
        return newUser;

    } catch (err) {
        console.log(err);

    }
}

export const loginUser = async (data: any) => {
    try {
        const { email, password } = data;
        if (!email || !password) {
            throw new Error('Missing required fields');
        }
        const user = await User.findOne({ where: { email: email } });
        let token=''
        if (!user) {
            return ({ isUser: "", user: user, message: 'Authentication failed', token });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return ({ isUser: "", user: user, message: 'Authentication failed', token });
        }
        token = jwt.sign({ userId: user.id }, 'secretkey', {
          expiresIn: '10h', // Set token expiration time
        });
        const userEvent = JSON.stringify({ type: 'user_registered', user });
        await publishToQueue('user_events', userEvent);
        return ({  user: user, token });
    } catch (err) {
        console.log(err);
        return {message:"something went wrong in service function"}
    }
}