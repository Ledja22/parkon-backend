import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ParkingSpacesService } from './parking-spaces.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateParkingSpaceDto } from './dto/create-parking-space.dto';
import { User } from 'src/auth/user.entity';
import { ParkingSpace } from './entities/parking-spaces.entity';
import { UpdateParkingSpaceDto } from './dto/update-parking-space.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('parking-spaces')
@UseGuards(AuthGuard(), RolesGuard)
export class ParkingSpacesController {
  constructor(private readonly parkingSpaceService: ParkingSpacesService) {}

  @Post()
  createParkingSlot(
    @Body() createParkingSpaceDto: CreateParkingSpaceDto,
    @GetUser() user: User,
  ): Promise<ParkingSpace> {
    return this.parkingSpaceService.createParkingSpace(
      createParkingSpaceDto,
      user,
    );
  }

  @Get()
  get(): Promise<ParkingSpace[]> {
    return this.parkingSpaceService.getAllParkingSpaces();
  }

  @Get('/:id')
  getParkingSpaceById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ParkingSpace> {
    return this.parkingSpaceService.getParkingSpaceById(id, user);
  }

  @Get('/user/:id')
  getParkingSpaceByUserId(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ParkingSpace[]> {
    return this.parkingSpaceService.getParkingSpaceByUserId(id, user);
  }

  @Delete('/:id')
  deleteParkingSpace(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.parkingSpaceService.deleteParkingSpace(id, user);
  }

  @Patch('/:id/')
  updateParkingSlot(
    @Param('id') id: string,
    @Body() updateParkingSpaceDto: UpdateParkingSpaceDto,
    @GetUser() user: User,
  ): Promise<ParkingSpace> {
    return this.parkingSpaceService.updateParkingSpace(
      id,
      updateParkingSpaceDto,
      user,
    );
  }
}
