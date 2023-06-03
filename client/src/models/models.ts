export enum ConnectionType {
    Hub = 'hub',
    Device = 'device',
}

export interface Connection {
    id: number;
    vendorId: number;
    productId: number;
    descriptor: string;
    type: ConnectionType;
}

export interface Hub extends Connection {
    devices: Device[];
}

export interface Device extends Connection {
    hub: Hub;
}