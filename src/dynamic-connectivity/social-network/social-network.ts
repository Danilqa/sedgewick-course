export type FriendshipLog = [number, number];

export class SocialNetwork {
    private weights: number[] = [];
    private members: number[] = [];

    constructor(n: number, logs: FriendshipLog[]) {
        for (let i = 0; i < n; i++) {
            this.members.push(i);
            this.weights.push(1);
        }

        logs.forEach(([memberA, memberB]) => this.makeFriends(memberA, memberB));
    }

    areAllConnected(): boolean {
        const someRootIndex = this.getRoot(this.members[0]);
        return this.weights[someRootIndex] === this.members.length;
    }

    private makeFriends(memberA: number, memberB: number): void {
        const rootA = this.getRoot(memberA);
        const rootB = this.getRoot(memberB);
        if (rootA === rootB) {
            return;
        }

        if (this.weights[rootA] < this.weights[rootB]) {
            this.members[rootB] = this.members[rootA];
            this.weights[rootA] += this.weights[rootB];
            return;
        }

        this.members[rootA] = this.members[rootB];
        this.weights[rootB] += this.weights[rootA];
    }

    private getRoot(member: number): number {
        let currentIndex = member;
        while (this.members[currentIndex] !== currentIndex) {
            currentIndex = this.members[currentIndex];
        }

        return currentIndex;
    }
}
