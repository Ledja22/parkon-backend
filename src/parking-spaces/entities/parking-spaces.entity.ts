import { ParkingSlotType } from './../enums/parking-slot-types.enum';
import { ParkingSlotStatus } from './../enums/parking-slot-status.enum';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';

@Entity()
export class ParkingSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    name: 'occupiedAt',
  })
  opensAt: Date;

  @Column({
    nullable: true,
    name: 'updatedAt',
  })
  closesAt: Date;

  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @OneToMany((_type) => ParkingSlot, (parkingSlot) => parkingSlot, {
    eager: true,
  })
  @Exclude({ toPlainOnly: true })
  parkingSlots: ParkingSlot[];
}
