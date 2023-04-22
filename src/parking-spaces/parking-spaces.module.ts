import { Module } from '@nestjs/common';
import { ParkingSpace } from './entities/parking-spaces.entity';
import { ParkingSpacesController } from './parking-spaces.controller';
import { ParkingSpacesService } from './parking-spaces.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpace, User]), AuthModule],
  controllers: [ParkingSpacesController],
  providers: [ParkingSpacesService],
})
export class ParkingSpacesModule {}
