import { Vehicle } from './../../vehicle/entities/vehicle.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityStatus } from '../enums/activity-status.enum';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: ActivityStatus;

  @ManyToOne((_type) => Vehicle, (vehicle) => vehicle, { eager: false })
  @Exclude({ toPlainOnly: true })
  vehicle: Vehicle;

  @ManyToOne((_type) => ParkingSpace, (parkingSpace) => parkingSpace, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  parkingSpace: ParkingSpace;

  @ManyToOne((_type) => ParkingSlot, (parkingSlot) => parkingSlot, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  parkingSlot: ParkingSlot;

  @ManyToOne((_type) => User, (user) => user.activity, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
