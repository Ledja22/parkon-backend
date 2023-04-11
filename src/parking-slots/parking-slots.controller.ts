import { ParkingSlotsService } from './parking-slots.service';
import { ParkingSlot } from './entities/parking-slot.entity';
import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('parking-slots')
export class ParkingSlotsController {
  constructor(private readonly parkingSlotService: ParkingSlotsService) {}

  @Post()
  createParkingSlot(
    @Body() createParkingSlotDto: CreateParkingSlotDto,
    @GetUser() user: User,
  ): Promise<ParkingSlot> {
    return this.parkingSlotService.createParkingSlot(
      createParkingSlotDto,
      user,
    );
  }

  @Get()
  get(): Promise<ParkingSlot[]> {
    return this.parkingSlotService.getAllParkingSlot();
  }

  @Get('/:id')
  getParkingSlotById(@Param('id') id: string): Promise<ParkingSlot> {
    return this.parkingSlotService.getParkingSlotById(id);
  }

  @Delete('/:id')
  deleteParkingSlot(@Param('id') id: string): Promise<void> {
    return this.parkingSlotService.deleteParkingSlot(id);
  }

  // @Patch('/:id/status')
  // updateParkingSlot(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  //   @GetUser() user: User,
  // ): Promise<Task> {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status, user);
  // }
}
