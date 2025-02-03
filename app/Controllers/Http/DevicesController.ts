import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DeviceService from 'App/Services/DeviceService';

@inject()
export default class DevicesController {
    constructor(protected service: DeviceService){}

    public async index({request, response}: HttpContextContract){
        const { page, limit } = request.qs()

        const res = await this.service.getDevices(page, limit);

        return response.status(res.code).json(res)
    }
}
