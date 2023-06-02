import { DataSource } from "typeorm"
import { Device } from "./entity/Device"
import { Hub } from "./entity/Hub"
import { Server } from "./entity/Server"

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [
        Device,
        Hub,
        Server,
    ],
})

