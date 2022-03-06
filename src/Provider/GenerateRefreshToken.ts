import dayjs from "dayjs"
import {client} from "../prisma/client"

class GenerateRefreshToken{
    async execute(userId: string) {
        const expiresIn = dayjs().add(30, "minute").unix();
        const gernerateRefreshToken = await client.refreshToken.create({
            data:{
                userId,
                expiresIn
            }
        })
        return gernerateRefreshToken;
    }
}

export {GenerateRefreshToken}