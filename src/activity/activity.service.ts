import { CreateActivityDto } from './dto/create-activity.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Activity } from './entity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
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

  async createActivity(
    createActivityDto: CreateActivityDto,
    user: User,
  ): Promise<Activity> {
    const { carId, parkingSlotId, parkingSpaceId } = createActivityDto;
    console.log(user);

    const activity = this.activityRepository.create({
      carId,
      parkingSlotId,
      parkingSpaceId,
      user,
    });

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
