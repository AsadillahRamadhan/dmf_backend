import Magnet from "App/Models/Magnet";

export default class MagnetRepository {

    public async getAll(page: number, limit: number){
        return Magnet.query().paginate(page, limit);
    }

    public async store(payload: any){
        return Magnet.create({
            magnetActive: payload.magnet_active,
            magnetArrayId: payload.magnet_array_id,
            magnetStrength: payload.magnet_strength,
            name: payload.name
        });
    }

    public async show(id: number){
        return Magnet.find(id);
    }

    public async update(data: Magnet, payload: any){
        data.magnetActive = payload.magnet_active || data.magnetActive;
        data.magnetStrength = payload.magnet_strength || data.magnetStrength;
        data.magnetArrayId = payload.magnet_array_id || data.magnetArrayId;
        data.name = payload.name || data.name;
        await data.save();
        return;
    }

    public async destroy(data: Magnet){
        await data.delete()
        return;
    }
}