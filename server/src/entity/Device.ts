import { Entity, ManyToOne } from 'typeorm';
import { Hub } from './Hub';
import { Connection } from './Connection';



@Entity()
export class Device extends Connection {
    constructor() {
        super();
    }
    @ManyToOne(() => Hub, hub => hub.devices)
    hub?: Hub;
}
