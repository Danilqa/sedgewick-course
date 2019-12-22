export class ArrayU {

    static init(n: number): number[] {
        return [...Array(n).keys()].map((_, i) => i);
    }
}
