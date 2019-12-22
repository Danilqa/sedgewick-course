import { Percolation } from './percolation';
import { ArrayU } from '../common/utils/array/array';

describe('Perlocation', () => {
    const GRID_SIZE = 5;

    let percolation: Percolation;

    beforeEach(() => {
        percolation = new Percolation(GRID_SIZE);
    });

    describe('#open', () => {

        it('should open 1 cell in the bottom right corner', () => {
            percolation.open(4, 4);
            validateCellStates(4, 4);
        });

        it('should open 1 cell in the top left corner', () => {
            percolation.open(0, 0);
            validateCellStates(0, 0);
        });

        it('should open 1 cell in the bottom left corner', () => {
            percolation.open(4, 0);
            validateCellStates(4, 0);
        });

        it('should open 1 cell in the top right corner', () => {
            percolation.open(0, 4);
            validateCellStates(0, 4);
        });
    });

    describe('#isOpened', () => {

        it('should return false for not opened cells', () => {
            ArrayU.init(GRID_SIZE).forEach(row => {
                ArrayU.init(GRID_SIZE).forEach(column => {
                    expect(percolation.isOpen(row, column)).toBeFalsy();
                });
            });
        });
    });

    describe('#numberOfOpenSites', () => {

        it('should return 3 as number of open cells', () => {
            percolation.open(1, 2);
            percolation.open(2, 3);
            percolation.open(3, 4);

            expect(percolation.numberOfOpenSites()).toBe(3);
        });
    });

    describe('#percolates', () => {

        it('should return true if system percolates', () => {
            percolation.open(0, 2);
            percolation.open(1, 2);
            percolation.open(1, 3);
            percolation.open(2, 3);
            percolation.open(3, 3);
            percolation.open(3, 2);
            percolation.open(4, 2);

            expect(percolation.percolates()).toBeTruthy();
        });

        it('should return false if system not percolates', () => {
            percolation.open(0, 2);
            percolation.open(1, 2);
            percolation.open(1, 3);
            percolation.open(2, 3);
            percolation.open(3, 3);
            percolation.open(3, 2);
            percolation.open(3, 4);

            expect(percolation.percolates()).toBeFalsy();
        });
    });

    function validateCellStates(targetRow: number, targetColumn: number): void {
        ArrayU.init(GRID_SIZE).forEach(row => {
            ArrayU.init(GRID_SIZE).forEach(column => {
                if (targetRow === row && targetColumn === column) {
                    expect(percolation.isOpen(row, column)).toBeTruthy();
                    return;
                }

                expect(percolation.isOpen(row, column)).toBeFalsy();
            });
        });
    }
});
