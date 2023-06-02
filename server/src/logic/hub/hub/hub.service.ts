import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hub } from 'src/entity/Hub';
import { Repository } from 'typeorm';

@Injectable()
export class HubService {
    constructor(
        @InjectRepository(Hub)
        private readonly hubRepository: Repository<Hub>
    ) { }

    async findAll(): Promise<Hub[]> {
        return await this.hubRepository.find();
    }

    async findOneById(id: number): Promise<Hub> {
        const hub = await this.hubRepository.findOne({
            where: {
                id,
            },
            relations: ['devices']
        });
        if (!hub) {
            throw new HttpException(`No hub with id ${id} found`, HttpStatus.NOT_FOUND)
        }

        return hub;
    }

    async removeDeviceFromHub(hubId: number, deviceId: number): Promise<Hub> {
        const hub = await this.hubRepository.findOne({
            where: {
                id: hubId,
            },
            relations: ['devices']
        });
        if (!hub) {
            throw new HttpException(`No hub with id ${hubId} found`, HttpStatus.NOT_FOUND)
        }

        const device = hub.devices.find(device => device.id === deviceId);
        if (!device) {
            throw new HttpException(`No device with id ${deviceId} found`, HttpStatus.NOT_FOUND)
        }

        hub.devices = hub.devices.filter(device => device.id !== deviceId);
        return await this.hubRepository.save(hub);
    }

    async connectDeviceToHub(hubId: number, deviceId: number): Promise<Hub> {
        const hub = await this.hubRepository.findOne({
            where: {
                id: hubId,
            },
            relations: ['devices']
        });
        if (!hub) {
            throw new HttpException(`No hub with id ${hubId} found`, HttpStatus.NOT_FOUND)
        }

        const device = await this.hubRepository.findOne({
            where: {
                id: deviceId,
            },
        });
        if (!device) {
            throw new HttpException(`No device with id ${deviceId} found`, HttpStatus.NOT_FOUND)
        }

        hub.devices.push(device);
        return await this.hubRepository.save(hub);
    }

}
