import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';
import { ParkingSlotStatus } from 'src/parking-slots/enums/parking-slot-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  bikeCapacity: number;

  @Column()
  vanCapacity: number;

  @Column()
  carCapacity: number;

  @OneToMany(
    (_type) => ParkingSlot,
    (parkingSlot) => parkingSlot.parkingSpace,
    {
      eager: true,
    },
  )
  parkingSlots: ParkingSlot[];

  @Column({ nullable: true })
  userId: string;
}
