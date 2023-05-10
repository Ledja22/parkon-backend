import { ParkingSlotsService } from './../parking-slots/parking-slots.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from './entity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { ParkingSpacesService } from 'src/parking-spaces/parking-spaces.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { ActivityStatus } from './enums/activity-status.enum';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @Inject(ParkingSlotsService)
    private parkingSlotsService: ParkingSlotsService,
    @Inject(ParkingSpacesService)
    private ParkingSpacesService: ParkingSpacesService,
    @Inject(VehicleService)
    private vehicleService: VehicleService,
  ) {}

  async getActivity(user: User): Promise<Activity[]> {
    const query = this.activityRepository
      .createQueryBuilder('activities')
      .where('user.id = :userId', { user });
    const activities = await query.getMany();
    return activities;
  }

  async getActivityById(id: string, user: User): Promise<Activity> {
    const found = await this.activityRepository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }

    return found;
  }

  // async createActivity(
  //   createActivityDto: CreateActivityDto,
  //   user: User,
  // ): Promise<Activity> {
  //   const { vehicleId, parkingSlotId, parkingSpaceId, status } =
  //     createActivityDto;

  //   const parkingSlot =
  //     this.parkingSlotsService.getParkingSlotById(parkingSlotId);
  //   const parkingSpace = this.ParkingSpacesService.getParkingSpaceById(
  //     parkingSpaceId,
  //     user,
  //   );
  //   const vehicle = this.vehicleService.getVehicleById(vehicleId, user);

  //   const activity = this.activityRepository.create({
  //     vehicle,
  //     status,
  //     parkingSpace,
  //     parkingSlot,
  //     user,
  //   });

  //   await this.activityRepository.save(activity);
  //   return activity;
  // }

  async createActivity(
    createActivityDto: CreateActivityDto,
    user: User,
  ): Promise<Activity> {
    const { vehicleId, parkingSlotId, parkingSpaceId, status } =
      createActivityDto;

    const parkingSlot = await this.parkingSlotsService.getParkingSlotById(
      parkingSlotId,
    );
    const parkingSpace = await this.ParkingSpacesService.getParkingSpaceById(
      parkingSpaceId,
      user,
    );
    const vehicle = await this.vehicleService.getVehicleById(vehicleId, user);

    const activity = new Activity();
    activity.status = status;
    activity.vehicle = vehicle;
    activity.parkingSpace = parkingSpace;
    activity.parkingSlot = parkingSlot;
    activity.user = user;

    await this.activityRepository.save(activity);
    return activity;
  }

  async deleteActivity(id: string, user: User): Promise<void> {
    const result = await this.activityRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
  }
}
