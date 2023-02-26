import {Container} from './container';
import {load} from './load';

const container = new Container();

async function foo() {
    await load(container);
    console.log(container);
    console.log(container.get('a'));
}

foo();
