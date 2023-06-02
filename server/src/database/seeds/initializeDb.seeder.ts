import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Hub } from 'src/entity/Hub';
import { Device } from 'src/entity/Device';
import { ConnectionType } from 'src/entity/Connection';
import { CreateDeviceDto } from 'src/logic/device/device/device.model';

export default class InitializeDb implements Seeder {
    public async run(
        dataSource: DataSource,
        // factoryManager: SeederFactoryManager,
    ) {
        const deviceRepository = dataSource.getRepository(Device);
        const hubRepository = dataSource.getRepository(Hub);

        //generate a single hub
        const newHub: Partial<Hub> = {
            vendorId: 0x1234,
            productId: 0x5678,
            type: ConnectionType.Hub,
            descriptor: `test-hub`,
        }
        const generatedHub = await hubRepository.save(newHub);


        //generate test devices for the hub
        await Promise.all(
            Array.from({ length: 10 }, (_, i) => i + 1).map(async (n) => {
                const newDevice: Partial<Device> = {
                    vendorId: 0x1234,
                    productId: 0x5678,
                    type: ConnectionType.Device,
                    descriptor: `test-device-${n}`,
                    hub: generatedHub,
                }
                return await deviceRepository.save(newDevice);
            }),
        );
    }
}