import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AuthService from 'App/Services/AuthService'

@inject()
export default class UsersController {

  constructor(protected authService: AuthService){}

  public async index({request, response}: HttpContextContract) {
    const { page, limit } = request.qs()

    const res = await this.authService.getUsers(page, limit);

    return response.status(res.code).json(res)
  }

  public async store({request, response}: HttpContextContract) {
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
        role: schema.enum(['user', 'admin', 'superadmin'])
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

  public async show({request, response}: HttpContextContract) {
    const data = await this.authService.getUser(request.param('id'))
    return response.status(data.code).json(data)
  }

  public async update({request, response}: HttpContextContract) {
    const validation = schema.create({
        username: schema.string.optional({}, [
            rules.maxLength(25)
        ]),
        password: schema.string.optional({}, [
            rules.minLength(8)
        ]),
        email: schema.string.optional({}, [
            rules.email()
        ]),
        name: schema.string.optional(),
    });

    try {
      const payload = await request.validate({ schema: validation}) 
      const res = await this.authService.updateUser(request.param('id'), payload)
      return response.status(res.code).json(res)
    } catch (e) {
      return response.unprocessableEntity({
          message: `${e.messages.errors[0].field}: ${e.messages.errors[0].message}`,
          success: false
      })
    }
  }

  public async destroy({request, response}: HttpContextContract) {
    const res = await this.authService.delete(request.param('id'))
    return response.status(res.code).json(res)
  }
}
