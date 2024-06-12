import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/database/entities/photo.entity';
import { User } from 'src/database/entities/user.entity';
import { Event } from 'src/database/entities/event.entity';
import { EventGateway } from './event.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo, Event])],
  controllers: [EventController],
  providers: [EventGateway, EventService],
})
export class EventModule {}
