
import Database from "@ioc:Adonis/Lucid/Database";
import Dmf from "App/Models/Dmf";
import Electrolyzer from "App/Models/Electrolyzer";

export default class DeviceRepository {

    public async getAll(page: number, limit: number){
        return Electrolyzer.query().paginate(page | 1, limit | 10)
    }
}