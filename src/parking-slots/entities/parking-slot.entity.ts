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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ParkingSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column()
  status: ParkingSlotStatus;

  @Column()
  type: ParkingSlotType;

  @CreateDateColumn()
  occupiedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  freedAt: Date;
}
