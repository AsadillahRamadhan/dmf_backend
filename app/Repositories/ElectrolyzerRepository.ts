import Dmf from "App/Models/Dmf";
import Electrolyzer from "App/Models/Electrolyzer";

export default class ElectrolyzerRepository {
    public async getAll(page: number, limit: number){
        return Electrolyzer.query().paginate(page, limit);
    }

    public async store(payload: any){
        return Electrolyzer.create({
            name: payload.name
        });
    }

    public async show(id: number){
        const data = await Electrolyzer.find(id);
        if(!data){
            return false;
        }
        await data.load('dmf');
        return data;
    }

    public async update(data: Electrolyzer, payload: any){
        data.name = payload.name || data.name;
        await data.save();
        return;
    }

    public async checkDmf(id: number) {
        const data = await Dmf.query().where('electrolyzer_id', id).first();
        if(data){
            return false;
        }
        return true;
    }

    public async destroy(data: Electrolyzer){
        await data.delete()
        return;
    }
}