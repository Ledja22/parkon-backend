import { IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';

export class CreateActivityDto {
  @IsNotEmpty()
  vehiclePlate: string;

  @IsNotEmpty()
  parkingSpaceId: string;

  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsEnum(ActivityStatus)
  status: ActivityStatus;

  @IsNotEmpty()
  @IsEnum(ParkingSlotType)
  parkingSlotType: ParkingSlotType;

  @IsOptional()
  opensAt: string;

  @IsOptional()
  closesAt: string;
}
