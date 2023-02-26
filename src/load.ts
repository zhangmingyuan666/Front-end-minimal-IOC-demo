// load.ts
import * as fs from 'fs-extra';
import {CLASS_KEY} from './provider';

export async function load(container: any) {
    const list = fs.readdirSync('./');

    // 获取当前文件夹进行扫描
    for (const file of list) {
        if (/\.js$/.test(file)) {
            const exports = await import(`./${file}`);

            for (const m in exports) {
                const module = exports[m];
                if (typeof module === 'function') {
                    const metaData = Reflect.getMetadata(CLASS_KEY, module);
                    // 实例注册
                    if (metaData) {
                        container.bind(metaData.id, module, metaData.args);
                        console.log(container);
                    }
                }
            }
        }
    }
}
