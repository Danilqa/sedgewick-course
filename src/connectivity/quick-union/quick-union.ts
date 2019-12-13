import { IConnectivityCluster, Point } from '../common/interface/union-find.interface';

/**
 * Initialize | Union | Find |
 * N          | N     | N    |
 */
export class QuickUnionCluster implements IConnectivityCluster {
    data: Point[] = [];

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            this.data.push(i);
        }
    }

    isConnected(pointA: Point, pointB: Point): boolean {
        return this.getRoot(pointA) === this.getRoot(pointB);
    }

    connect(pointA: Point, pointB: Point): void {
        const rootA = this.getRoot(pointA);
        const rootB = this.getRoot(pointB);

        this.data[rootB] = rootA;
    }

    private getRoot(point: Point): Point {
        let current = point;
        while (this.data[current] !== current) {
            current = this.data[current];
        }

        return current;
    }
}
