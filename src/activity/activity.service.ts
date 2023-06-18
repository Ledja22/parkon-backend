import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from 'src/activity/entity/activity.entity';
import { ParkingSlotsService } from './../parking-slots/parking-slots.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { ActivityStatus } from './enums/activity-status.enum';
import { ParkingSpacesService } from 'src/parking-spaces/parking-spaces.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @Inject(ParkingSpacesService)
    private readonly parkingSpacesService: ParkingSpacesService,
  ) {}

  async getActivity(user: User): Promise<Activity[]> {
    const query = this.activityRepository.createQueryBuilder('activity');
    const activity = await query.getMany();
    return activity;
  }

  async getActivityById(id: string, user: User): Promise<Activity> {
    const found = await this.activityRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }

    return found;
  }

  async createActivity(
    createActivityDto: CreateActivityDto,
    user: User,
  ): Promise<Activity> {
    const {
      vehiclePlate,
      parkingSlotType,
      parkingSpaceId,
      status,
      closesAt,
      opensAt,
    } = createActivityDto;

    const recentActivity = this.activityRepository.create({
      vehiclePlate,
      parkingSlotType,
      parkingSpaceId,
      status,
      closesAt,
      opensAt,
      userId: user.id,
    });

    this.parkingSpacesService.updateParkingSpaceCapacity(
      parkingSpaceId,
      user,
      parkingSlotType,
      'decrement',
    );

    await this.activityRepository.save(recentActivity);
    return recentActivity;
  }

  async deleteActivity(id: string, user: User): Promise<void> {
    const activity = await this.getActivityById(id, user);
    const result = await this.activityRepository.delete({
      id,
      userId: user.id,
    });

    this.parkingSpacesService.updateParkingSpaceCapacity(
      activity.parkingSpaceId,
      user,
      activity.parkingSlotType,
      'increment',
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Activity with ID "${id}" not found`);
    }
  }

  async updateActivity(
    id: string,
    updateActivityDto: UpdateActivityDto,
    user: User,
  ): Promise<Activity> {
    const { parkingSlotType, opensAt, closesAt, status, vehiclePlate } =
      updateActivityDto;

    const activity = await this.getActivityById(id, user);
    activity.parkingSlotType = parkingSlotType;
    activity.status = status;
    activity.closesAt = closesAt;
    activity.opensAt = opensAt;
    activity.vehiclePlate = vehiclePlate;

    await this.activityRepository.save(activity);

    if (activity.status === ActivityStatus.COMPLETED) {
      this.parkingSpacesService.updateParkingSpaceCapacity(
        activity.parkingSpaceId,
        user,
        activity.parkingSlotType,
        'increment',
      );
    }

    return activity;
  }
}
