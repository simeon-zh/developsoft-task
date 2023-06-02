import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Hub } from 'src/entity/Hub';
import { HubService } from './hub.service';

@Controller('hub')
export class HubController {
    constructor(private readonly hubService: HubService) { }
    @Get()
    findAll(): Promise<Hub[]> {
        return this.hubService.findAll();
    }


    @Get(':id')
    findOneById(@Param('id') id: number): Promise<Hub> {
        return this.hubService.findOneById(id);
    }

    @Post('/remove')
    removeDeviceFromHub(@Body() body: { hubId: number, deviceId: number }): Promise<Hub> {
        return this.hubService.removeDeviceFromHub(body.hubId, body.deviceId);
    }

    @Post('/attach')
    attachDeviceToHub(@Body() body: { hubId: number, deviceId: number }): Promise<Hub> {
        return this.hubService.connectDeviceToHub(body.hubId, body.deviceId);
    }
}
