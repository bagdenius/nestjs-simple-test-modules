import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApiModule, InfraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
