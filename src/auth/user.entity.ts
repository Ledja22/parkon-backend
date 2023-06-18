import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';
import { Roles } from './roles/roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from 'src/activity/entity/activity.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: Roles;
}
