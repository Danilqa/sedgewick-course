import { SocialNetwork } from './social-network';

describe('SocialNetwork', () => {

    it('should return true all members are connected', () => {
        const socialNetwork = new SocialNetwork(
            6,
            [
                [0, 3],
                [1, 3],
                [2, 3],
                [4, 5],
                [5, 1]
            ]
        );
        expect(socialNetwork.areAllConnected()).toBeTruthy();
    });

    it('should return false all members are not connected', () => {
        const socialNetwork = new SocialNetwork(
            6,
            [
                [0, 3],
                [1, 3],
                [2, 3],
                [4, 5]
            ]
        );
        expect(socialNetwork.areAllConnected()).toBeFalsy();
    });
});
