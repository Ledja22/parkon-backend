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
import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';

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

  @CreateDateColumn({
    nullable: true,
    name: 'occupiedAt',
  })
  occupiedAt: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updatedAt',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    name: 'freedAt',
  })
  freedAt: Date;

  @ManyToOne(
    () => ParkingSpace,
    (parkingSpace: ParkingSpace) => parkingSpace.id,
  )
  parkingSpace: ParkingSpace;
}
