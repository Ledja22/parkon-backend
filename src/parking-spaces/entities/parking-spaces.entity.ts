import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';
import { ParkingSlotStatus } from 'src/parking-slots/enums/parking-slot-status.enum';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { CapacityDto } from '../dto/capacity.dto';

@Entity()
export class ParkingSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    name: 'occupiedAt',
    type: 'time',
  })
  opensAt: string;

  @Column({
    nullable: true,
    name: 'updatedAt',
    type: 'time',
  })
  closesAt: string;

  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column({ type: 'jsonb' })
  capacity: CapacityDto;

  @OneToMany(
    (_type) => ParkingSlot,
    (parkingSlot) => parkingSlot.parkingSpace,
    {
      eager: true,
    },
  )
  parkingSlots: ParkingSlot[];

  @ManyToOne(() => User, (user) => user.parkingSpaces)
  user: User;
}
