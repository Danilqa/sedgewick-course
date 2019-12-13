export type Point = number;

export interface IConnectivityConstructor {
    new (n: number): IConnectivityCluster;
}

export interface IConnectivityCluster {
    data: Point[];

    isConnected(pointA: Point, pointB: Point): boolean;
    connect(pointA: Point, pointB: Point): void;
}
