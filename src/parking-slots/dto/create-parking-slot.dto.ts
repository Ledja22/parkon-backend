import { IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { ParkingSlotStatus } from '../enums/parking-slot-status.enum';
import { ParkingSlotType } from '../enums/parking-slot-types.enum';

export class CreateParkingSlotDto {
  @IsNotEmpty()
  number: number;

  @IsEnum(ParkingSlotStatus)
  status: ParkingSlotStatus;

  @IsEnum(ParkingSlotType)
  type: ParkingSlotType;

  @IsOptional()
  occupiedAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  freedAt: Date;
}
