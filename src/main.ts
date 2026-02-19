import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';
import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptop } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new ResponseInterceptop());
  app.useGlobalFilters(new AllExceptionsFilter());
  const config = new DocumentBuilder()
    .setTitle('NestJS Movie API')
    .setDescription('API documentation description')
    .setVersion('1.0.0')
    .setContact(
      '@bagdenius',
      'https://github.com/bagdenius',
      'bagdenius@gmail.com',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'NestJS Movie API',
  });
  app.use(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
