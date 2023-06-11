import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { CapacityDto } from './capacity.dto';
export class UpdateParkingSpaceDto {
  @IsOptional()
  name: string;

  @IsOptional()
  capacity: CapacityDto;

  @IsOptional()
  telephone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  lat: string;

  @IsOptional()
  long: string;

  @IsOptional()
  opensAt: string;

  @IsOptional()
  closesAt: string;

  @IsOptional()
  parkingSlots: ParkingSlot[];
}
