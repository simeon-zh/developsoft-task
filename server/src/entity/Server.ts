import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Connection } from "./Connection";
@Entity()
export class Server {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Connection, connection => connection.server)
    connections: Connection[];
}