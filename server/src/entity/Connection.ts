import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hub } from "./Hub";
import { Server } from "./Server";

@Entity()
export class Connection {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Server, server => server.connections)
    server: Server;

    @OneToMany(() => Hub, hub => hub.connection)
    hubs: Hub[];
}