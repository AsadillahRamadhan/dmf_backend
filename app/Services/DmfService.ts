import { inject } from "@adonisjs/core/build/standalone";
import DmfRepository from "App/Repositories/DmfRepository";

@inject()
export default class DmfService {
    constructor(protected repository: DmfRepository){}

    async index(page: number, limit: number){
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

    public async store(payload: any){
        try {
            await this.repository.store(payload);
            return {
                success: true,
                message: `Data Stored!`,
                code: 201
            }
        } catch (e){
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }
    
    public async show(id: number){
        try {
            const data = await this.repository.show(id);

            if(!data){
                return {
                    success: false,
                    message: 'Data not found!',
                    code: 404
                }
            }

            return {
                success: true,
                message: 'Data found!',
                data,
                code: 200
            }
        } catch (e){
            return {
                success: false,
                message: e.message,
                code: 500
            }
        }
    }

    public async update(id: number, payload: any){
        try {
            const data = await this.repository.show(id);
            if(!data){
                return {
                    success: false,
                    message: 'Data not found!',
                    code: 404
                }
            }
            await this.repository.update(data, payload);
            return {
                success: true,
                message: 'Data updated!',
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

    public async destroy(id: number){
        try {
            const data = await this.repository.show(id);
            if(!data){
                return {
                    success: false,
                    message: 'Data not found!',
                    code: 404
                }
            }

            const magnetRelation = await this.repository.checkMagnetArray(id);

            if(!magnetRelation){
                return {
                    success: false,
                    message: 'There are magnet array(s) linked!',
                    code: 404
                }
            }

            await this.repository.destroy(data);
            return {
                success: true,
                message: 'Data deleted!',
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