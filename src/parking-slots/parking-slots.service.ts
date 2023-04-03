import { User } from 'src/auth/user.entity';
import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import { ParkingSlot } from './entities/parking-slot.entity';
import { Injectable } from '@nestjs/common';
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
    await this.parkingSlotRepository.create(parkingSlot);
    return parkingSlot;
  }
}
