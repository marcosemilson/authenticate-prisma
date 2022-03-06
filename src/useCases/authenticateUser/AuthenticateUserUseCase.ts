import { compare } from "bcryptjs";
import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../Provider/GenerateRefreshToken"
import {GenerateTokenProvider} from "../../Provider/GenerateTokenProvider"

interface IAuthenticateRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IAuthenticateRequest) {
    // Verificar se o usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });
    if (!userAlreadyExists) {
      throw new Error("User or password incorrect")
    }
    // Verificar se a senha esta correta
    const passwordMatch = await compare(password, userAlreadyExists.password)
    if (!passwordMatch) {
      throw new Error("User or password incorrect")
    }
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id)

    await client.refreshToken.deleteMany({
      where:{
        userId: userAlreadyExists.id
      }
    })


    const gernerateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await gernerateRefreshToken.execute(userAlreadyExists.id);

    return {token, refreshToken: refreshToken};
  }
}

export { AuthenticateUserUseCase };