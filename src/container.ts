import {PROPS_KEY} from './inject';

export class Container {
    bindMap = new Map();

    bind(identifier: string, clazz: any, constructorArgs?: any[]) {
        constructorArgs = constructorArgs || [];
        this.bindMap.set(identifier, {
            clazz,
            constructorArgs,
        });
    }

    //获取实例
    get<T>(identifier: string): T {
        const target = this.bindMap.get(identifier);
        const {clazz, constructorArgs} = target;
        // Reflect.construct作用类似于new
        const instance: any = Reflect.construct(clazz, constructorArgs);

        // 对类进行获取
        const props = Reflect.getMetadata(PROPS_KEY, clazz);

        // 递归进行查找
        for (let prop in props) {
            const identifier = props[prop].value;
            instance[prop] = this.get(identifier);
        }

        return instance as T;
    }
}
