import { Controller, Get, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from 'src/entity/Device';
@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) { }

    @Get()
    getAll(@Query() { perPage, page }): Promise<{ devices: Device[], totalItems: number }> {
        if (page < 1) page = 1;
        if (perPage < 1) perPage = 1;
        return this.deviceService.findAll(perPage, page);
    }
}
