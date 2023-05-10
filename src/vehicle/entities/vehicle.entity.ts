import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne((_type) => User, (user) => user.vehicle, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
