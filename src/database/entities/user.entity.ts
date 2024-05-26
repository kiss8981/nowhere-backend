import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
