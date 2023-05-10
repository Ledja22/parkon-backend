import { ParkingSlot } from './entities/parking-slot.entity';
import { Module } from '@nestjs/common';
import { ParkingSlotsController } from './parking-slots.controller';
import { ParkingSlotsService } from './parking-slots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSlot]), AuthModule],
  controllers: [ParkingSlotsController],
  providers: [ParkingSlotsService],
  exports: [ParkingSlotsService],
})
export class ParkingSlotsModule {}
