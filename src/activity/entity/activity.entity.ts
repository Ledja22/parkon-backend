import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: ActivityStatus;

  @Column()
  opensAt: string;

  @Column()
  closesAt: string;

  @Column()
  parkingSlotType: ParkingSlotType;

  @Column()
  vehiclePlate: string;

  @Column()
  parkingSpaceId: string;

  @Column({ nullable: true })
  userId: string;
}
