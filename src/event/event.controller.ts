import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EventDto } from './dtos/Event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: Request, @Body() event: EventDto) {
    return this.eventService.create(req.user.userId, event);
  }

  @Get()
  async getEvents(
    @Query('limit') limit: number,
    @Query('after') after: number,
  ) {
    return this.eventService.getEvents(limit, after);
  }
}
