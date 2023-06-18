import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { CapacityDto } from './capacity.dto';
export class UpdateParkingSpaceDto {
  @IsOptional()
  name: string;

  @IsOptional()
  telephone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  latitude: string;

  @IsOptional()
  longitude: string;

  @IsOptional()
  carCapacity: number;

  @IsOptional()
  bikeCapacity: number;

  @IsOptional()
  vanCapacity: number;

  @IsOptional()
  opensAt: string;

  @IsOptional()
  closesAt: string;

  @IsOptional()
  parkingSlots: ParkingSlot[];
}
