import { IConnectivityCluster, Point } from '../common/interface/union-find.interface';

/**
 * Initialize | Union | Find |
 * N          | N     | 1    |
 */
export class QuickFindCluster implements IConnectivityCluster {
    data: Point[] = [];

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            this.data.push(i);
        }
    }

    isConnected(pointA: Point, pointB: Point): boolean {
        return this.data[pointA] === this.data[pointB];
    }

    connect(pointA: Point, pointB: Point): void {
        const replacebleCategoryNumber = this.data[pointB];
        this.data.forEach((currentCategory, i) => {
            if (currentCategory === replacebleCategoryNumber) {
                this.data[i] = this.data[pointA];
            }
        });
    }
}
