import { QuickFindMaxCluster } from './quick-find-max';
import { testConnectivityProblem } from '../common/specs/test';

describe('QuickFindMax', () => {
    testConnectivityProblem('QuickFindMax', QuickFindMaxCluster);

    it('should get maximum item from set', () => {
        const cluster = new QuickFindMaxCluster(7);
        cluster.connect(0, 1);
        cluster.connect(1, 2);
        cluster.connect(2, 3);
        cluster.connect(5, 6);

        expect(cluster.find(5)).toEqual(6);
        expect(cluster.find(0)).toEqual(3);
    });
});
