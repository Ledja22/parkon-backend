import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';
import { Roles } from './roles/roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from 'src/activity/entity/activity.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

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

  @OneToMany((_type) => Vehicle, (vehicle) => vehicle.user, { eager: true })
  vehicle: Vehicle; // kjo duhet ber vehicles

  @OneToMany(() => ParkingSpace, (parkingSpace) => parkingSpace.user)
  parkingSpaces: ParkingSpace[];

  @OneToMany(() => Activity, (activity) => activity.user)
  activity: Activity[];
}
