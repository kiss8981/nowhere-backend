import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common/common.entity';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity()
export class Like extends CommonEntity {
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Event, (event) => event.likes)
  event: Event;

  @Column({
    type: 'boolean',
    default: false,
  })
  isLiked: boolean;
}
