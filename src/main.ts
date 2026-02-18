import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';
import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptop } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new ResponseInterceptop());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
