import { DataSourceOptions } from "typeorm"
import { Device } from "./entity/Device"
import { Hub } from "./entity/Hub"
import { Connection } from "./entity/Connection"
import { SeederOptions } from "typeorm-extension"

export const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || 'temporal',
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'secretpassword',
    entities: [
        Connection, Hub, Device
    ],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}']
};

