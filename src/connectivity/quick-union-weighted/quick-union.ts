import { IConnectivityCluster, Point } from '../common/interface/union-find.interface';

/**
 * Initialize | Union | Find |
 * N          | logN  | logN |
 */
export class QuickUnionWeightedCluster implements IConnectivityCluster {
    data: Point[] = [];

    private weights: number[] = [];

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            this.data.push(i);
            this.weights.push(1);
        }
    }

    isConnected(pointA: Point, pointB: Point): boolean {
        return this.getRoot(pointA) === this.getRoot(pointB);
    }

    connect(pointA: Point, pointB: Point): void {
        const rootA = this.getRoot(pointA);
        const rootB = this.getRoot(pointB);

        if (rootA === rootB) {
            return;
        }

        const isRootALighterThanB = this.weights[rootA] < this.weights[rootB];
        const [parentRoot, childRoot] = isRootALighterThanB ? [rootA, rootB] : [rootB, rootA];
        this.weights[parentRoot] += this.weights[childRoot];

        this.data[childRoot] = parentRoot;
    }

    private getRoot(point: Point): Point {
        let current = point;
        while (this.data[current] !== current) {
            current = this.data[current];
        }

        return current;
    }
}
