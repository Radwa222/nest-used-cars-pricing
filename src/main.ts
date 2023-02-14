import { NestFactory } from '@nestjs/core';
import { appSetUp } from './app-setup';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appSetUp(app);
  const builder = new DocumentBuilder()
    .setTitle('Used-Cars-pricing')
    .setDescription('Used-Cars-pricing APIs Description')
    .setVersion('1.0')
    .addTag('cars')
    .build();

  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
}
bootstrap();
