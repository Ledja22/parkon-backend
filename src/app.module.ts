import { Task } from 'src/tasks/task.entity';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ParkingSlotsModule } from './parking-slots/parking-slots.module';
import { ParkingSpacesController } from './parking-spaces/parking-spaces.controller';
import { ParkingSpacesService } from './parking-spaces/parking-spaces.service';
import { ParkingSpacesModule } from './parking-spaces/parking-spaces.module';
import { CarModule } from './vehicle/vehicle.module';
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Task],
    }),
    AuthModule,
    PassportModule,
    ParkingSlotsModule,
    ParkingSpacesModule,
    CarModule,
  ],
  controllers: [ParkingSpacesController],
  providers: [ParkingSpacesService],
})
export class AppModule {}
