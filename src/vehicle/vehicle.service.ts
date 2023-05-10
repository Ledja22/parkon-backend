import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async getAllVehicles(): Promise<Vehicle[]> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    const vehicles = await query.getMany();
    return vehicles;
  }

  async getVehicleById(id: string, user: User): Promise<Vehicle> {
    const found = await this.vehicleRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(
        `The car of user "${user.username}" not found`,
      );
    }
    return found;
  }

  async createVehicle(
    createVehicleDto: CreateVehicleDto,
    user: User,
  ): Promise<Vehicle> {
    const { plate, type } = createVehicleDto;
    const vehicle = this.vehicleRepository.create({
      plate,
      type,
      user,
    });
    await this.vehicleRepository.save(vehicle);
    return vehicle;
  }

  async deleteVehicle(id: string, user: User): Promise<void> {
    const result = await this.vehicleRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID "${id}" not found`);
    }
  }

  async updateVehicle(
    id: string,
    updateVehicleDto,
    user: User,
  ): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id, user);
    vehicle.type = updateVehicleDto.type;
    await this.vehicleRepository.save(vehicle);
    return vehicle;
  }
}
