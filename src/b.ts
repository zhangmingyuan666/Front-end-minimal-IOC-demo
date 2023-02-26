import {Provider} from './provider';

@Provider('b', [10])
export class B {
    [x: string]: number;
    constructor(p: number) {
        this.p = p;
    }
}
