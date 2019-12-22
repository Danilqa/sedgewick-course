import { ArrayU } from './array';

describe('ArrayUtils', () => {

    describe('#init', () => {

        it('should return list of ordering array', () => {
            expect(ArrayU.init(5)).toEqual([0, 1, 2, 3, 4]);
        });
    });
});
