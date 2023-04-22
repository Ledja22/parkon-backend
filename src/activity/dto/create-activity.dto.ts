import { IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  carId: string;

  @IsNotEmpty()
  parkingSlotId: string;

  @IsNotEmpty()
    parkingSpaceId: string;
    
     //ktu duhen ruajtur dhe statusi i ktij aktiviteti
    
}
