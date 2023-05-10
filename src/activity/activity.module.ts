import { Module } from '@nestjs/common';
import { Activity } from './entity/activity.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { User } from 'src/auth/user.entity';
import { ParkingSlotsModule } from 'src/parking-slots/parking-slots.module';
import { ParkingSpacesModule } from 'src/parking-spaces/parking-spaces.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, User]),
    AuthModule,
    ParkingSlotsModule,
    ParkingSpacesModule,
    VehicleModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
