import Transaction from "App/Models/Transaction";

export default class TransactionRepository {
    async store(payload: any) {
        console.log(payload)
        return Transaction.create({
            electrolyzerId: payload.electrolyzer_id,
            dmfId: payload.dmf_id,
            magnetArrayId: payload.magnet_array_id,
            operationTime: payload.operation_time,
            magnetAvail: payload.magnet_avail,
            rotationRpm: payload.rotation_rpm,
            powerConsume: payload.power_consume
        })
    }

    async getData(limit: number){
        return Transaction.query().orderBy('created_at', 'desc').limit(limit);
    }
}