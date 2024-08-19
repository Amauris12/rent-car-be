import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173', 
      'https://mr-rent-cart.netlify.app', 
      'https://main--mr-rent-cart.netlify.app',
      'https://amaurisrentacar.com',
      'https://www.amaurisrentacar.com',
      'https://amaurisadmin.netlify.app'
    ]
  });
  await app.listen(3000);
}
bootstrap();
