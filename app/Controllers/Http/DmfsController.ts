import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DmfService from 'App/Services/DmfService';

@inject()
export default class DmfsController {
  constructor(protected service: DmfService){}

  public async index({request, response}: HttpContextContract){
      const { page, limit } = request.qs()
      
      const res = await this.service.index(page, limit);

      return response.status(res.code).json(res)
  }

  public async store({request, response}: HttpContextContract){
      const payload = request.body();

      if(!payload.name || !payload.electrolyzer_id || !payload.operation_time || !payload.rotation_rpm || !payload.power_consume){
          return response.status(422).send({
              success: false,
              message: "Fill all the field!"
          });
      }

      const res = await this.service.store(payload);

      return response.status(res.code).json(res)
  }

  public async show({request, response}: HttpContextContract){
      const { id } = request.params();

      const res = await this.service.show(id);
      return response.status(res.code).json(res)
  }

  public async update({request, response}: HttpContextContract){
    const { id } = request.params();
    const payload = request.body();

    if(!id){
        return response.status(422).send({
            success: false,
            message: "Define the id!"
        });
    }

    const res = await this.service.update(id, payload);
    return response.status(res.code).json(res);
  }

  public async destroy({request, response}: HttpContextContract){
    const { id } = request.params();

    const res = await this.service.destroy(id);
    return response.status(res.code).json(res);
  }
}
