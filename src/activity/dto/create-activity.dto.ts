import { IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { ActivityStatus } from '../enums/activity-status.enum';

export class CreateActivityDto {
  @IsNotEmpty()
  vehicleId: string;

  @IsNotEmpty()
  parkingSlotId: string;

  @IsNotEmpty()
  parkingSpaceId: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsEnum(ActivityStatus)
  status: ActivityStatus;
}
