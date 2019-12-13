import { IConnectivityConstructor } from '../interface/union-find.interface';

export function testConnectivityProblem(name: string, clusterClass: IConnectivityConstructor): void {
    return describe(name, () => {

        it('should initialize not connected points', () => {
            const actual = new clusterClass(5);
            expect(actual.data).toEqual([0, 1, 2, 3, 4]);
        });

        it('should connect 2 points', () => {
            const actual = new clusterClass(5);
            actual.connect(2, 3);
            expect(actual.isConnected(2, 3)).toBeTruthy();
        });

        it('should connect 3 sets of points', () => {
            const actual = new clusterClass(5);

            actual.connect(0, 1);
            actual.connect(1, 2);
            actual.connect(3, 4);

            expect(actual.isConnected(0, 1)).toBeTruthy();
            expect(actual.isConnected(1, 2)).toBeTruthy();
            expect(actual.isConnected(2, 3)).toBeFalsy();
            expect(actual.isConnected(3, 4)).toBeTruthy();
            expect(actual.isConnected(0, 3)).toBeFalsy();
        });
    });
}
