import { IConnectivityCluster, Point, PointIndex } from '../common/interface/union-find.interface';

/**
 * Initialize | Union | Find | Connected |
 * N          | logN  | logN | logN      |
 */
export class QuickFindMaxCluster implements IConnectivityCluster {
    data: Point[] = [];

    private weights: number[] = [];

    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            this.data.push(i);
        }
    }

    isConnected(pointIndexA: Point, pointIndexB: Point): boolean {
        return this.getRoot(this.data[pointIndexA]) === this.getRoot(this.data[pointIndexB]);
    }

    connect(ai: PointIndex, bi: PointIndex): void {
        const rootAi = this.getRoot(ai);
        const rootBi = this.getRoot(bi);

        if (rootAi === rootBi) {
            return;
        }

        const isRootALighterThanB = this.weights[rootAi] < this.weights[rootBi];
        const [childRoot, parentRoot] = isRootALighterThanB ? [rootAi, rootBi] : [rootBi, rootAi];
        this.weights[parentRoot] += this.weights[childRoot];

        this.data[childRoot] = parentRoot;

        if (this.data[parentRoot] < this.data[ai]) {
            this.makePointAsRoot(ai);
        }

        if (this.data[parentRoot] < this.data[bi]) {
            this.makePointAsRoot(bi);
        }
    }

    find(index: PointIndex): PointIndex {
        return this.getRoot(index);
    }

    private makePointAsRoot(pi: PointIndex): void {
        const root = this.getRoot(pi);
        const tempStoredRoot = this.data[root];
        this.data[root] = this.data[pi];
        this.data[pi] = tempStoredRoot;
    }

    private getRoot(pi: PointIndex): PointIndex {
        let current = pi;
        while (this.data[current] !== current) {
            current = this.data[current];
        }

        return current;
    }
}
