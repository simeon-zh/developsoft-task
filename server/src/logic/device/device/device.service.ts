import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/entity/Device';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
    constructor(@InjectRepository(Device) private readonly deviceRepository: Repository<Device>) { }

    async findAll(perPage = 10, page = 1): Promise<{ devices: Device[], totalItems: number }> {
        const res = await this.deviceRepository.findAndCount({
            relations: ['hub'],
            take: perPage,
            skip: (page - 1) * perPage,
        });
        return {
            devices: res[0],
            totalItems: res[1],
        }
    }
}
