import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('NestJS JWT Auth API')
    .setDescription('API documentation description')
    .setVersion('1.0.0')
    .setContact(
      '@bagdenius',
      'https://github.com/bagdenius',
      'bagdenius@gmail.com',
    )
    .addBearerAuth()
    .build();
}
