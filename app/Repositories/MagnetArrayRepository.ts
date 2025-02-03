import Magnet from "App/Models/Magnet";
import MagnetArray from "App/Models/MagnetArray";

export default class MagnetArrayRepository {

    public async getAll(page: number, limit: number){
        return MagnetArray.query().paginate(page, limit);
    }

    public async store(payload: any){
        return MagnetArray.create({
            magnetAvail: payload.magnet_avail,
            name: payload.name
        });
    }

    public async show(id: number){
        const data = await MagnetArray.find(id);
        if(!data){
            return false;
        }
        data.load('magnet');
        return data;
    }

    public async update(data: MagnetArray, payload: any){
        data.magnetAvail = payload.magnet_avail || data.magnetAvail;
        data.name = payload.name || data.name;
        await data.save();
        return;
    }

    public async checkMagnet(id: number){
        const data = await Magnet.query().where('magnet_array_id', id).first();
        if(data){
            return false;
        }
        return true;
    }

    public async destroy(data: MagnetArray){
        await data.delete()
        return;
    }
}