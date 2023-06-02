import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/entity/Device';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
    constructor(@InjectRepository(Device) private readonly deviceRepository: Repository<Device>) { }

    async findAll(): Promise<Device[]> {
        return this.deviceRepository.find({
            relations: ['hub'],
        });
    }

    async findAllWithoutHub(): Promise<Device[]> {
        return this.deviceRepository.find({
            relations: ['hub'],
        }).then(devices => devices.filter(device => !device.hub));
    }
}
