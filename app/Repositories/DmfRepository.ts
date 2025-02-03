import Dmf from "App/Models/Dmf";
import MagnetArray from "App/Models/MagnetArray";

export default class DmfRepository {
    public async getAll(page: number, limit: number){
        return Dmf.query().paginate(page, limit);
    }

    public async store(payload: any){
        return Dmf.create({
            operationTime: payload.operation_time,
            rotationRpm: payload.rotation_rpm,
            powerConsume: payload.power_consume,
            electrolyzerId: payload.electrolyzer_id,
            name: payload.name
        });
    }

    public async show(id: number){
        const data = await Dmf.find(id);
        if(!data){
            return false;
        }
        await data.load('magnetArray');
        return data;
    }

    public async update(data: Dmf, payload: any){
        data.operationTime = payload.operation_time || data.operationTime;
        data.rotationRpm = payload.rotation_rpm || data.rotationRpm;
        data.powerConsume = payload.power_consume || data.powerConsume;
        data.electrolyzerId = payload.electrolyzer_id || data.electrolyzerId;
        data.name = payload.name || data.name;
        await data.save();
        return;
    }

    public async checkMagnetArray(id: number) {
        const data = await MagnetArray.query().where('dmf_id', id).first();
        if(data){
            return false;
        }
        return true;
    }

    public async destroy(data: Dmf){
        await data.delete()
        return;
    }
}