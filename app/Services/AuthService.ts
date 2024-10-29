import { inject } from "@adonisjs/core/build/standalone";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import User from "App/Models/User";
import AuthRepository from "App/Repositories/AuthRepository";
import Hash from "@ioc:Adonis/Core/Hash";
import * as jwt from 'jsonwebtoken';

@inject()
export default class AuthService {
    constructor(protected authRepository: AuthRepository){}

    public async findByEmail(email: string){
        try {
            const user = await this.authRepository.findByEmail(email)

            if(user) {
                return {
                    success: false,
                    message: "Email exists!",
                    code: 422
                }
            }

            return {
                success: true,
                message: "Email doesn't exists!",
                code: 422
            }
        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async findByUsername(username: string){
        try {
            const user = await this.authRepository.findByUsername(username)

            if(user) {
                return {
                    success: false,
                    message: "Username exists!",
                    code: 422
                }
            }

            return {
                success: true,
                message: "Username doesn't exists!",
                code: 422
            }
        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async findByName(name: string){
        try {
            const user = await this.authRepository.findByName(name)

            if(user) {
                return {
                    success: false,
                    message: "Name exists!",
                    code: 422
                }
            }

            return {
                success: true,
                message: "Username doesn't exists!",
                code: 422
            }
        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async storeUser(payload: any){

        const emailIsAvail = await this.findByEmail(payload.email)
        if(!emailIsAvail.success){
            return {
                success: emailIsAvail.success,
                message: emailIsAvail.message,
                code: emailIsAvail.code
            }
        }

        const usernameIsAvail = await this.findByUsername(payload.username)
        if(!usernameIsAvail.success){
            return {
                success: usernameIsAvail.success,
                message: usernameIsAvail.message,
                code: usernameIsAvail.code
            }
        }

        const nameIsAvail = await this.findByName(payload.name)
        if(!nameIsAvail.success){
            return {
                success: nameIsAvail.success,
                message: nameIsAvail.message,
                code: nameIsAvail.code
            }
        }

        try {
            await this.authRepository.store(payload)

            return {
                success: true,
                message: "User created!",
                code: 201
            }

        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async login(payload: any, auth: AuthContract){
        let user: User | null

        try {
            user = await this.authRepository.findByEmail(payload.identifier)
    
            if(user){
                return this.processLogin(auth, payload, user)
            }

            user = await this.authRepository.findByUsername(payload.identifier)

            if(user){
                return this.processLogin(auth, payload, user)
            }
        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }

        return {
            success: false,
            message: "Invalid credentials!",
            code: 422
        }
    }

    public async processLogin(auth: AuthContract, payload: any, user: User){
        if(!(await Hash.verify(user.password, payload.password))){
            return {
                success: false,
                message: "Invaid credentials!",
                code: 422
            }
        }

        return await this.generateToken(auth, user)
    }

    public async generateToken(auth: AuthContract, user: User){
        const token = await auth.use('api').generate(user, {expiresIn: '7days'})
        const jwtToken = jwt.sign({user}, 'PeSgVkYp3s6v9y$B&E)H@McQfTjWnZq4', {expiresIn: '7d'})
        return {
            token: token.token,
            jwtToken,
            code: 200
        }
    }

    public async getUsers(page: number, limit: number){
        try {
            const data = await this.authRepository.getAll(page, limit);

            if(data.length < 1){
                return {
                    success: false,
                    message: "No Data!",
                    code: 404
                }
            }
            return {
                success: true,
                message: "Data found!",
                data,
                code: 200
            }
        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async getUser(id: number){
        try {
            const data = await this.authRepository.getEach(id)
            if(!data){
                return {
                    success: false,
                    message: 'Data not found!',
                    code: 404
                }
            }

            return {
                success: true,
                message: 'Data found!',
                data,
                code: 200
            }
        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async updateUser(id: number, payload: any){
        if(payload.email){
            const emailIsAvail = await this.findByEmail(payload.email)
            if(!emailIsAvail.success){
                return {
                    success: emailIsAvail.success,
                    message: emailIsAvail.message,
                    code: emailIsAvail.code
                }
            }
        }

        if(payload.username){
            const usernameIsAvail = await this.findByUsername(payload.username)
            if(!usernameIsAvail.success){
                return {
                    success: usernameIsAvail.success,
                    message: usernameIsAvail.message,
                    code: usernameIsAvail.code
                }
            }
        }

        if(payload.name){
            const nameIsAvail = await this.findByName(payload.name)
            if(!nameIsAvail.success){
                return {
                    success: nameIsAvail.success,
                    message: nameIsAvail.message,
                    code: nameIsAvail.code
                }
            }
        }

        if(payload.password){
            payload.password = await Hash.make(payload.password)
        }

        try {
            await this.authRepository.update(id, payload)

            return {
                success: true,
                message: "User updated!",
                code: 200
            }

        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async delete(id: number){
        try {
            const res = await this.authRepository.deleteOne(id)

            if(!res){
                return {
                    success: false,
                    message: "Data not found!",
                    code: 404
                }
            }
            return {
                success: true,
                message: "Data deleted!",
                code: 200
            }
        } catch (e) {
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }
    
}