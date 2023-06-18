import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ParkingSlotsModule } from './parking-slots/parking-slots.module';
import { ParkingSpacesModule } from './parking-spaces/parking-spaces.module';
import { ActivityService } from './activity/activity.service';
import { ActivityController } from './activity/activity.controller';
import { ActivityModule } from './activity/activity.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User],
    }),
    AuthModule,
    PassportModule,
    ParkingSlotsModule,
    ParkingSpacesModule,
    ActivityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
