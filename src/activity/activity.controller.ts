import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ActivityService } from './activity.service';
import { Activity } from './entity/activity.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('activity')
@UseGuards(AuthGuard(), RolesGuard)
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  getActivity(@GetUser() user: User): Promise<Activity[]> {
    return this.activityService.getActivity(user);
  }

  @Get('/:id')
  getActivityById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Activity> {
    return this.activityService.getActivityById(id, user);
  }

  @Post()
  createActivity(
    @Body() createActivityDto: CreateActivityDto,
    @GetUser() user: User,
  ): Promise<Activity> {
    return this.activityService.createActivity(createActivityDto, user);
  }

  @Delete('/:id')
  deleteActivity(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.activityService.deleteActivity(id, user);
  }
}
