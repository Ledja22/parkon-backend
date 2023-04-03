import { ParkingSlotsService } from './parking-slots.service';
import { ParkingSlot } from './entities/parking-slot.entity';
import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('parking-slots')
export class ParkingSlotsController {
  constructor(private readonly parkingSlotService: ParkingSlotsService) {}

  @Post()
  createTask(
    @Body() createParkingSlotDto: CreateParkingSlotDto,
    @GetUser() user: User,
  ): Promise<ParkingSlot> {
    return this.parkingSlotService.createParkingSlot(
      createParkingSlotDto,
      user,
    );
  }
}
