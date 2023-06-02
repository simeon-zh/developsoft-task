import { Entity, ManyToOne } from 'typeorm';
import { Hub } from './Hub';
import { Connection } from './Connection';



@Entity()
export class Device extends Connection {
    @ManyToOne(() => Hub, hub => hub.devices)
    hub?: Hub | null;
}
