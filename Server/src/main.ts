import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
require('dotenv').config();

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
