import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConfig } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(validationConfig);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`App running on port ${port}`));
}
bootstrap();
