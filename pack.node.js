import jsonpack from 'jsonpack';
import { readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import mime from 'mime';

export default function pack(dir, jsonpck = true) {
    let packed = jsonpck ? {
        i: 1,
        f: 0.5
    } : {};
    let files = readdirSync(dir, { withFileTypes: true });
    for(let i = 0; i < files.length; i++) {
        let file = files[i];
        if(file.isDirectory()) packed[file.name] = pack(join(dir, file.name), false);
        else packed[file.name.replace(/\..*$/, '')] = {
            t: mime.getType(extname(file.name).slice(1)),
            d: readFileSync(join(dir, file.name)).toString('base64')
        };
    }
    return jsonpck ? jsonpack.pack(packed) : packed;
}
