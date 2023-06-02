import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hub } from './Hub';



@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hub, hub => hub.devices)
    hub: Hub;
}
