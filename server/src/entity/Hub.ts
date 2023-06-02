import { Entity, OneToMany } from "typeorm";

import { Connection } from "./Connection";
import { Device } from "./Device";

@Entity()
export class Hub extends Connection {
    constructor() {
        super();
    }

    @OneToMany(() => Device, device => device.hub)
    devices?: Device[];

}