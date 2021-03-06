import {sign} from "jsonwebtoken";

class GenerateTokenProvider{
    async execute(userId: string){
        //Gerar Token do usuario
    const token = sign({}, "greenhouse", {
        subject: userId,
        expiresIn: "30m"
      });
      return token;
    }
}

export { GenerateTokenProvider };