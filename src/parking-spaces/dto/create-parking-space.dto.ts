import { IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { CapacityDto } from './capacity.dto';

export class CreateParkingSpaceDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  capacity: CapacityDto;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  opensAt: string;

  @IsOptional()
  closesAt: string;

  @IsOptional()
  parkingSlots: ParkingSlot[];

  @IsOptional()
  userId: string;
}
