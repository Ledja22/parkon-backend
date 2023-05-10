import { IsNotEmpty } from 'class-validator';
import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';

export class UpdateVehicleDto {
  @IsNotEmpty()
  plate: string;

  @IsNotEmpty()
  type: ParkingSlotType;
}
