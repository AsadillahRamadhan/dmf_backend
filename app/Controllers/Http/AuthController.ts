import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AuthService from 'App/Services/AuthService';

@inject()
export default class AuthController {
    constructor(protected authService: AuthService){}

    async register({request, response}: HttpContextContract){
        const validation = schema.create({
            username: schema.string({}, [
                rules.maxLength(25)
            ]),
            password: schema.string({}, [
                rules.minLength(8)
            ]),
            email: schema.string({}, [
                rules.email()
            ]),
            name: schema.string(),
        });

        try {
            const payload = await request.validate({ schema: validation}) 
            const res = await this.authService.storeUser(payload)
            return response.status(res.code).json(res)
        } catch (e) {
            return response.unprocessableEntity({
                message: `${e.messages.errors[0].field}: ${e.messages.errors[0].message}`,
                success: false
            })
        }


        
    }

    async login({request, response, auth}: HttpContextContract){
        const validation = schema.create({
            identifier: schema.string(),
            password: schema.string({}, [
                rules.minLength(8)
            ])
        })

        try {
            const payload = await request.validate({ schema: validation })
            const res = await this.authService.login(payload, auth)
            return response.status(res.code).json(res)
        } catch (e) {
            return response.unprocessableEntity({
                message: `${e.messages.errors[0].field}: ${e.messages.errors[0].message}`,
                success: false
            })
        }

    }
}
