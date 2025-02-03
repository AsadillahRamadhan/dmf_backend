import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import Env from '@ioc:Adonis/Core/Env'
import TransactionService from '../Ws/TransactionService'
import TransactionRepository from 'App/Repositories/TransactionRepository'

const PROTO_PATH = './proto/ai_service.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const aiProto = grpc.loadPackageDefinition(packageDefinition).ai

const PORT = Env.get('AI_GRPC_PORT')
const URL = Env.get('AI_GRPC_HOST')

// @ts-ignore
const client = new aiProto.AIService(
  `${URL}:${PORT}`,
  grpc.credentials.createInsecure()
)

export default class AIService {
  public async analyzeData(data: any) {
    const transaction = new TransactionService(new TransactionRepository);
    
    const analyzedData = await new Promise((resolve, reject) => {
      client.AnalyzeData(data, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
    await transaction.store(analyzedData);
    return analyzedData;
  }
}