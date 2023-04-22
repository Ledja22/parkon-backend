import { Exclude } from 'class-transformer';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

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
}
