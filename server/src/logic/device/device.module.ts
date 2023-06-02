import { Module } from '@nestjs/common';
import { DeviceService } from './device/device.service';
import { DeviceController } from './device/device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/entity/Device';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  exports: [TypeOrmModule, DeviceService],
  providers: [DeviceService],
  controllers: [DeviceController]
})
export class DeviceModule { }
