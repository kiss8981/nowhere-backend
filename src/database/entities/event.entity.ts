import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common/common.entity';

@Entity()
export class Event extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAnonymous: boolean;

  @Column({
    type: 'float',
  })
  latitude: number;

  @Column({
    type: 'float',
  })
  longitude: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  addressOfplace: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  likeCount: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  dislikeCount: number;
}
