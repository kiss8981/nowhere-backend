import { Injectable } from '@nestjs/common';
import { EventDto } from './dtos/Event.dto';
import { Event } from 'src/database/entities/event.entity';
import { EventGateway } from './event.gateway';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from 'src/database/entities/photo.entity';

@Injectable()
export class EventService {
  constructor(
    private readonly eventGateway: EventGateway,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(userId: number, event: EventDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    const newEvent = new Event();
    newEvent.title = event.title;
    newEvent.description = event.description;
    newEvent.isAnonymous = event.isAnonymous;
    newEvent.latitude = event.latitude;
    newEvent.longitude = event.longitude;
    newEvent.address = event.address;
    newEvent.addressOfplace = event.addressOfplace;
    newEvent.user = user;
    const savedEvent = await this.eventRepository.save(newEvent);

    this.eventGateway.emitEvent('CREATE_EVENT', {
      title: savedEvent.title,
      description: savedEvent.description,
      isAnonymous: savedEvent.isAnonymous,
      user: {
        name: savedEvent.isAnonymous ? '익명' : user.name || '익명',
      },
      location: {
        latitude: savedEvent.latitude,
        longitude: savedEvent.longitude,
        address: savedEvent.address || null,
        addressOfplace: savedEvent.addressOfplace || null,
      },
    });

    return savedEvent;
  }
}
