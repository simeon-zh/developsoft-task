import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Connection } from "./Connection";
import { Device } from "./Device";

@Entity()
export class Hub {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Connection, connection => connection.hubs)
    connection: Connection;

    @OneToMany(() => Device, device => device.hub)
    devices: Device[];
}