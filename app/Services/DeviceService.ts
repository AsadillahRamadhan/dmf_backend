import { inject } from "@adonisjs/core/build/standalone";
import DeviceRepository from "App/Repositories/DeviceRepository";

@inject()
export default class DeviceService {
    constructor(protected repository: DeviceRepository){}

    public async getDevices(page: number, limit: number){
        try {
            const data = await this.repository.getAll(page, limit);

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
}