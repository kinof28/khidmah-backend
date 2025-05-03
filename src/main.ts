import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173', // Your React app's origin
      'https://hikhidma.com', // Production domain
      'http://hikhidma.com.moalime.com/', //development domain
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    // credentials: true, // If you need to pass cookies
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
