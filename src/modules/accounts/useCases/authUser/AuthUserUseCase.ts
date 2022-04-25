
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string,
    password: string,
}

interface IResponse {
    user: {
        email: string,
        name: string,
    };
    token: string;
}

@injectable()
class AuthUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({ email, password }: IRequest): Promise<IResponse>{
        //Verificando se usuário existe
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or password incorrect", 401);
        }

        //Verificando se a senha está correta
        const passwordMatch = await compare(password, user.password);
        if(!password){
            throw new AppError("Email or password incorrect", 401);
        }

        //gerar JWT
        const token = sign({}, "941150557f05a405b447b89ee8a0404a", {
            subject: user.id,
            expiresIn: "1d"
        });//HSMD5 aleatório
        
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
        };

        return tokenReturn;
        

    }
}

export {AuthUserUseCase};