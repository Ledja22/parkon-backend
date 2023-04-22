import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CapacityDto {
  @IsOptional()
  @IsNumber()
  carCapacity: number;

  @IsOptional()
  @IsNumber()
  vanCapacity: number;

  @IsOptional()
  @IsNumber()
  bikeCapacity: number;
}
