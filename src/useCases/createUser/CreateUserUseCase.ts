import { hash } from "bcryptjs"
import {client} from "../../prisma/client"

interface IUserRququest{
    name: string;
    password: string;
    username: string;
}

class CreateUserUseCase{
    async execute({name, username, password}: IUserRququest){
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username,
            }
        });
        if(userAlreadyExists){
            throw new Error("User already exixts!");
        }

        const passwordHash = await hash(password, 8);
        const user = await client.user.create({
            data:{
                name,
                username,
                password: passwordHash,
            },
        });
        return user;
    }

}

export {CreateUserUseCase}