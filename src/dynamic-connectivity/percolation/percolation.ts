import { ArrayU } from '../common/utils/array/array';
import { equals, forEach, map, pipe, without } from 'ramda';

export class Percolation {
    private readonly data: number[] = [];
    private readonly weights: number[] = [];
    private readonly opened: boolean[] = [];

    private readonly topLineCells = new Set();
    private readonly bottomLineCells = new Map();

    constructor(private gridSize: number) {
        this.data = ArrayU.init(gridSize * gridSize);
        this.opened = ArrayU.init(gridSize * gridSize).map(() => false);
    }

    open(row: number, column: number): void {
        const targetIndex = this.getIndex(row, column);

        pipe(
            () => [
                this.getTopFrom(targetIndex),
                this.getLeftFrom(targetIndex),
                this.getBottomFrom(targetIndex),
                this.getRightFrom(targetIndex)
            ],
            without<undefined | number>([undefined]),
            map<undefined | number, number>(Number),
            forEach((i) => this.connect(i, targetIndex))
        )();

        this.opened[targetIndex] = true;
    }

    isOpen(row: number, column: number): boolean {
        const targetIndex = this.getIndex(row, column);
        return this.opened[targetIndex];
    }

    // @ts-ignore
    isFull(row: number, column: number): boolean {
        return true;
    }

    numberOfOpenSites(): number {
        return this.opened.filter(equals<boolean>(true)).length;
    }

    percolates(): boolean {
        const topLineUniqueValues = new Set(this.topLineCells.values());
        let result = false;
        topLineUniqueValues.forEach(item => {
            if (this.bottomLineCells.get(item)) {
                result = true;
            }
        });
        return result;
    }

    private connect(indexA: number, indexB: number): void {
        const rootOfA = this.getRoot(indexA);
        const rootOfB = this.getRoot(indexB);

        if (rootOfA === rootOfB) {
            return;
        }

        const [child, parent] = this.weights[rootOfA] < this.weights[rootOfB] ? [rootOfA, rootOfB] : [rootOfB, rootOfA];
        this.weights[parent] += this.weights[child];
        this.data[child] = parent;

        if (indexB < this.gridSize) {
            this.topLineCells.add(parent);
        }

        if (indexA < this.gridSize) {
            this.topLineCells.add(parent);
        }

        if (this.gridSize * (this.gridSize - 1) <= indexB) {
            this.bottomLineCells.set(parent, true);
        }

        if (this.gridSize * (this.gridSize - 1) <= indexA) {
            this.bottomLineCells.set(parent, true);
        }
    }

    private getIndex(row: number, column: number): number {
        return row * this.gridSize + column;
    }

    private getLeftFrom(index: number): number | undefined {
        if (!this.opened[index - 1]) {
            return;
        }

        if (index % this.gridSize === 0) {
            return;
        }

        return index - 1;
    }

    private getRightFrom(index: number): number | undefined {
        if (index % (this.gridSize - 1) === 0) {
            return;
        }

        if (!this.opened[index + 1]) {
            return;
        }

        return index + 1;
    }

    private getTopFrom(index: number): number | undefined {
        if (index < this.gridSize) {
            return;
        }

        if (!this.opened[index - this.gridSize]) {
            return;
        }

        return index - this.gridSize;
    }

    private getBottomFrom(index: number): number | undefined {
        if (this.gridSize * (this.gridSize - 1) <= index) {
            return;
        }

        if (!this.opened[index + this.gridSize]) {
            return;
        }

        return index + this.gridSize;
    }

    private getRoot(index: number): number {
        let current = index;
        while (this.data[current] !== current) {
            current = this.data[current];
        }

        return current;
    }
}
