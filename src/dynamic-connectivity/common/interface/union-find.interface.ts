export type Point = number;
export type PointIndex = number;

export interface IConnectivityConstructor {
    new (n: number): IConnectivityCluster;
}

export interface IConnectivityCluster {
    data: Point[];

    isConnected(pointA: PointIndex, pointB: PointIndex): boolean;
    connect(pointA: PointIndex, pointB: PointIndex): void;
}
