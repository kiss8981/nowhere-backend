import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Like } from './like.entity';
import { Event } from './event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  socialId: string;

  @Column({
    type: 'enum',
    enum: ['kakao', 'google'],
    nullable: true,
  })
  socialProvider: 'kakao' | 'google';

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
