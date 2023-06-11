import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpace } from './entities/parking-spaces.entity';
import { CreateParkingSpaceDto } from './dto/create-parking-space.dto';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { UpdateParkingSpaceDto } from './dto/update-parking-space.dto';

@Injectable()
export class ParkingSpacesService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createParkingSpace(
    createParkingSpaceDto: CreateParkingSpaceDto,
    user: User,
  ): Promise<ParkingSpace> {
    const {
      name,
      capacity,
      telephone,
      address,
      opensAt,
      closesAt,
      parkingSlots,
    } = createParkingSpaceDto;
    console.log(user);
    // if (!user || user.role !== Roles.PARKING_OWNER) {
    //   throw new BadRequestException('User is not a parking owner');
    // }
    const parkingSpace = this.parkingSpaceRepository.create({
      name,
      capacity,
      telephone,
      address,
      opensAt,
      closesAt,
      parkingSlots,
      userId: user.id,
    });
    await this.parkingSpaceRepository.save(parkingSpace);
    return parkingSpace;
  }

  async getAllParkingSpaces(): Promise<ParkingSpace[]> {
    const query =
      this.parkingSpaceRepository.createQueryBuilder('parkingSpaces');
    const parkingSpaces = await query.getMany();
    return parkingSpaces;
  }

  async getParkingSpaceById(id: string, user: User): Promise<ParkingSpace> {
    const found = await this.parkingSpaceRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Parking space with ID "${id}" not found`);
    }

    return found;
  }

  async getParkingSpaceByUserId(
    id: string,
    user: User,
  ): Promise<ParkingSpace[]> {
    const found = await this.parkingSpaceRepository.find({
      where: { userId: id },
    });

    if (!found) {
      throw new NotFoundException(
        `Parking spaces for user with ID "${id}" not found`,
      );
    }

    return found;
  }

  async deleteParkingSpace(id: string, user: User): Promise<void> {
    const result = await this.parkingSpaceRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Parking space with id "${id}" not found`);
    }
  }

  async updateParkingSpace(
    id: string,
    updateParkingSpaceDto: UpdateParkingSpaceDto,
    user: User,
  ): Promise<ParkingSpace> {
    const {
      name,
      capacity,
      telephone,
      address,
      opensAt,
      closesAt,
      parkingSlots,
    } = updateParkingSpaceDto;

    const parkingSpace = await this.getParkingSpaceById(id, user);
    parkingSpace.name = name;
    parkingSpace.capacity = capacity;
    parkingSpace.telephone = telephone;
    parkingSpace.address = address;
    parkingSpace.closesAt = closesAt;
    parkingSpace.opensAt = opensAt;
    parkingSpace.parkingSlots = parkingSlots;

    await this.parkingSpaceRepository.save(parkingSpace);

    return parkingSpace;
  }
}
