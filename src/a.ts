import {Provider} from './provider';
import {Inject} from './inject';
import {B} from './b';
@Provider('a')
export class A {
    @Inject()
    private b!: B;
}
