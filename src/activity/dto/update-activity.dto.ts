import { IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';

export class UpdateActivityDto {
  @IsOptional()
  vehiclePlate: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  @IsEnum(ActivityStatus)
  status: ActivityStatus;

  @IsOptional()
  @IsEnum(ParkingSlotType)
  parkingSlotType: ParkingSlotType;

  @IsOptional()
  opensAt: string;

  @IsOptional()
  closesAt: string;
}
