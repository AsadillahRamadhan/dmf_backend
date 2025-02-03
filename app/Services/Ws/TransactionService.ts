import { inject } from "@adonisjs/core/build/standalone";
import TransactionRepository from "App/Repositories/TransactionRepository";
import Ws from "../Ws";

@inject()
export default class TransactionService {

    constructor(protected repository: TransactionRepository){}

    public async store(payload: any) {
        try {
            await this.repository.store(payload)
        } catch (e) {
            console.log(e)
        }

        const limit = 50;

        const data = await this.getData(limit);

        Ws.io.emit('data', data);
    }

    private async getData(limit: number) {
        let data = {}
        try {
            data = await this.repository.getData(limit);
        } catch (e) {
            console.log(e)
        }

        return data;
    }
}