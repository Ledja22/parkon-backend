import { IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { CapacityDto } from './capacity.dto';

export class CreateParkingSpaceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  carCapacity: number;

  @IsNotEmpty()
  bikeCapacity: number;

  @IsNotEmpty()
  vanCapacity: number;

  @IsOptional()
  opensAt: string;

  @IsOptional()
  closesAt: string;

  @IsOptional()
  parkingSlots: ParkingSlot[];

  @IsOptional()
  userId: string;
}
