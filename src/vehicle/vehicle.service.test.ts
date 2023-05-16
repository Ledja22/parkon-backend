// import { Test, TestingModule } from '@nestjs/testing';
// import { VehicleService } from './vehicle.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Vehicle } from './entities/vehicle.entity';
// import { NotFoundException } from '@nestjs/common';
// import { User } from 'src/auth/user.entity';
// import { CreateVehicleDto } from './dto/create-vehicle.dto';

// describe('VehicleService', () => {
//     let vehicleService: VehicleService;
//     let vehicleRepository: Repository<Vehicle>;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 VehicleService,
//                 {
//                     provide: getRepositoryToken(Vehicle),
//                     useClass: Repository,
//                 },
//             ],
//         }).compile();

//         vehicleService = module.get<VehicleService>(VehicleService);
//         vehicleRepository = module.get<Repository<Vehicle>>(
//             getRepositoryToken(Vehicle),
//         );
//     });

//     describe('getAllVehicles', () => {
//         it('should return an array of vehicles', async () => {
//             const vehicles: Vehicle[] = [{}];
//             jest.spyOn(vehicleRepository, 'createQueryBuilder').mockReturnValue({
//                 getMany: jest.fn().mockResolvedValue(vehicles),
//             } as any);

//             const result = await vehicleService.getAllVehicles();

//             expect(result).toEqual(vehicles);
//             expect(vehicleRepository.createQueryBuilder).toHaveBeenCalled();
//         });
//     });

//     describe('getVehicleById', () => {
//         it('should return the vehicle with the specified ID', async () => {
//             const vehicleId = 'vehicleId';
//             const userId = 'userId';
//             const vehicle: Vehicle = {};
//             jest.spyOn(vehicleRepository, 'findOne').mockResolvedValue(vehicle);

//             const result = await vehicleService.getVehicleById(vehicleId, {
//                 id: userId,
//             } as User);

//             expect(result).toEqual(vehicle);
//             expect(vehicleRepository.findOne).toHaveBeenCalledWith({
//                 where: { id: vehicleId, user: { id: userId } },
//             });
//         });

//         it('should throw NotFoundException if the vehicle is not found', async () => {
//             const vehicleId = 'vehicleId';
//             const userId = 'userId';
//             jest.spyOn(vehicleRepository, 'findOne').mockResolvedValue(undefined);

//             expect(
//                 vehicleService.getVehicleById(vehicleId, { id: userId } as User),
//             ).rejects.toThrow(NotFoundException);
//             expect(vehicleRepository.findOne).toHaveBeenCalledWith({
//                 where: { id: vehicleId, user: { id: userId } },
//             });
//         });
//     });

//     describe('createVehicle', () => {
//         it('should create a new vehicle', async () => {
//             const createVehicleDto: CreateVehicleDto = {};
//             const userId = 'userId';
//             const createdVehicle: Vehicle = {};
//             jest.spyOn(vehicleRepository, 'create').mockReturnValue(createdVehicle);
//             jest.spyOn(vehicleRepository, 'save').mockResolvedValue(createdVehicle);

//             const result = await vehicleService.createVehicle(createVehicleDto, {
//                 id: userId,
//             } as User);

//             expect(result).toEqual(createdVehicle);
//             expect(vehicleRepository.create).toHaveBeenCalledWith({
//                 plate: createVehicleDto.plate,
//                 type: createVehicleDto.type,
//                 user: { id: userId },
//             });
//             expect(vehicleRepository.save).toHaveBeenCalledWith(createdVehicle);
//         });
//     });

// }