import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common/common.entity';

@Entity('photo')
export class Photo extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  path: string;

  @Column()
  entityId: number;

  @Column()
  entityType: string;
}
