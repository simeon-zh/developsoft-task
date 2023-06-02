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

}
