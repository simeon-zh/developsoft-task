import { Seeder, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Hub } from 'src/entity/Hub';
import { Device } from 'src/entity/Device';
import { ConnectionType } from 'src/entity/Connection';
import { options } from 'src/data-source';
export default class InitializeDb implements Seeder {
    public async run(
        dataSource: DataSource,
        // factoryManager: SeederFactoryManager,
    ) {
        const deviceRepository = dataSource.getRepository(Device);
        const hubRepository = dataSource.getRepository(Hub);

        //generate first hub to attach devices to
        const firstHub: Partial<Hub> = {
            vendorId: 1,
            productId: 1,
            type: ConnectionType.Hub,
            descriptor: `test-hub-1`,
        }

        //generate second hub with no devices attached
        const secondHub: Partial<Hub> = {
            vendorId: 2,
            productId: 2,
            type: ConnectionType.Hub,
            descriptor: `test-hub-2`,
        }
        const first = await hubRepository.save(firstHub);
        await hubRepository.save(secondHub);



        //generate test devices for the first hub and some without a hub
        await Promise.all(
            Array.from({ length: 20 }, (_, i) => i + 1).map(async (n) => {
                const newDevice: Partial<Device> = {
                    vendorId: 0x1234,
                    productId: 0x5678,
                    type: ConnectionType.Device,
                    descriptor: `test-device-${n}`,
                    hub: n <= 10 ? first : null,
                }
                return await deviceRepository.save(newDevice);
            }),
        );
    }
}

