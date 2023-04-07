import { User } from 'src/auth/user.entity';
import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import { ParkingSlot } from './entities/parking-slot.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSlotType } from './enums/parking-slot-types.enum';
import { ParkingSlotStatus } from './enums/parking-slot-status.enum';

@Injectable()
export class ParkingSlotsService {
  constructor(
    @InjectRepository(ParkingSlot)
    private parkingSlotRepository: Repository<ParkingSlot>,
  ) {}

  async createParkingSlot(
    createParkingSlotDto: CreateParkingSlotDto,
    user: User,
  ): Promise<ParkingSlot> {
    const { number, status, type, occupiedAt, updatedAt, freedAt } =
      createParkingSlotDto;
    const parkingSlot = this.parkingSlotRepository.create({
      number,
      status: ParkingSlotStatus.FREE,
      type: ParkingSlotType.CAR,
      occupiedAt,
      updatedAt,
      freedAt,
    });
    await this.parkingSlotRepository.save(parkingSlot);
    return parkingSlot;
  }

  async getAllParkingSlot(): Promise<ParkingSlot[]> {
    const query = this.parkingSlotRepository.createQueryBuilder('parkingSlots');
    const parkingSlots = await query.getMany();
    return parkingSlots;
  }

  async getParkingSlotById(id: string): Promise<ParkingSlot> {
    const found = await this.parkingSlotRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Parking slot with ID "${id}" not found`);
    }

    return found;
  }

  async deleteParkingSlot(id: string): Promise<void> {
    const result = await this.parkingSlotRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Parking slot with id "${id}" not found`);
    }
  }

  async updateParkingSlot(
    id: string,
    status: ParkingSlotStatus,
  ): Promise<ParkingSlot> {
    const parkingSlot = await this.getParkingSlotById(id);

    parkingSlot.status = status;
    await this.parkingSlotRepository.save(parkingSlot);

    return parkingSlot;
  }
}
