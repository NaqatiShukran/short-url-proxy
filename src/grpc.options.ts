import { ClientOptions, Transport } from '@nestjs/microservices'
import { join } from 'path';

// Same options object as in MS server
export const microserviceOptions: ClientOptions = {
  transport : Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../src/app.proto')
  }
};