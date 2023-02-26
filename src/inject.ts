// inject.ts
import 'reflect-metadata';

export const PROPS_KEY = 'ioc:inject_props';

export function Inject() {
    return function (target: any, targetKey: string) {
        // 拿到类的构造函数
        const annotationTarget = target.constructor;
        let props: any = {};

        // 去构造函数上找，如果此构造函数也有消费
        if (Reflect.hasOwnMetadata(PROPS_KEY, annotationTarget)) {
            // 那么获取当前消费
            props = Reflect.getMetadata(PROPS_KEY, annotationTarget);
        }

        // 否则：props['b'] => value: 'b'
        props[targetKey] = {
            value: targetKey,
        };

        // 定义上去的是Props，其value
        Reflect.defineMetadata(PROPS_KEY, props, annotationTarget);
    };
}
