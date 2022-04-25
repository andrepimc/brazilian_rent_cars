import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuth(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
    const {sub: user_id}=verify(token, "941150557f05a405b447b89ee8a0404a") as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if(!user){
        throw new AppError("User doesn't exists", 401);
    }

    req.user = {
        id: user_id
    }

    next();
    } catch{
        throw new AppError("Inavalid token", 401);
    }

};