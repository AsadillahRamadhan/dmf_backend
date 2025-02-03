import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import Env from '@ioc:Adonis/Core/Env'
import AIService from './AIService';

const PROTO_PATH = './proto/iot_service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const grpcObject: any = grpc.loadPackageDefinition(packageDefinition);
const IoTService = grpcObject.iot.IoTService;

const server = new grpc.Server();

server.addService(IoTService.service, {
  SendData: async (call: any, callback: any) => {
    const request = call.request;

    const ai = new AIService();
    const aiFeedback = await ai.analyzeData(request);
    callback(null, { 
        rotation_rpm: 20
     });
  },
});

// Jalankan server
const PORT = Env.get('IOT_GRPC_PORT');
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC Server running at http://localhost:${PORT}`);
});
