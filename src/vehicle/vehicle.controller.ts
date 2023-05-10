import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('car')
@UseGuards(AuthGuard(), RolesGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
    @GetUser() user: User,
  ): Promise<Vehicle> {
    return this.vehicleService.createVehicle(createVehicleDto, user);
  }

  @Get()
  getVehicles(): Promise<Vehicle[]> {
    return this.vehicleService.getAllVehicles();
  }

  @Get('/:id')
  getVehicleById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Vehicle> {
    return this.vehicleService.getVehicleById(id, user);
  }

  @Delete('/:id')
  deleteVehicle(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.vehicleService.deleteVehicle(id, user);
  }

  @Patch('/:id/')
  updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @GetUser() user: User,
  ): Promise<Vehicle> {
    return this.vehicleService.updateVehicle(id, updateVehicleDto, user);
  }
}
