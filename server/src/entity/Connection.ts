import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ConnectionType {
    Hub = "hub",
    Device = "device",
}

@Entity()
export class Connection {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vendorId: number;

    @Column()
    productId: number;

    @Column()
    type: ConnectionType;

    @Column()
    descriptor: string;
}