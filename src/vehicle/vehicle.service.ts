import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { ParkingSlotType } from 'src/parking-slots/enums/parking-slot-types.enum';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async getAllParkingSlot(): Promise<Vehicle[]> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    const vehicles = await query.getMany();
    return vehicles;
  }

  async getTaskById(id: string, user: User): Promise<Vehicle> {
    const found = await this.vehicleRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(
        `The car of user "${user.username}" not found`,
      );
    }

    return found;
  }

  async createTask(
    createVehicleDto: CreateVehicleDto,
    user: User,
  ): Promise<Vehicle> {
    const { plate, type } = createVehicleDto;

    const vehicle = this.vehicleRepository.create({
      plate,
      type,
    });

    await this.vehicleRepository.save(vehicle);
    return vehicle;
  }

  async deleteVehicle(id: string, user: User): Promise<void> {
    const result = await this.vehicleRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    type: ParkingSlotType,
    user: User,
  ): Promise<Vehicle> {
    const task = await this.getTaskById(id, user);

    task.type = type;
    await this.vehicleRepository.save(task);

    return task;
  }
}
