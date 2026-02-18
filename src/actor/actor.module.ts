import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { ActorEntity } from './entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
