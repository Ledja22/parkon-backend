import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plate: string;

  @Column()
  ownerId: string;

  @Column()
  type: ParkingSlotType;
}
