import jsonpack from 'jsonpack';

export default function unpack(pk, toplevel = true) {
    let json = toplevel ? jsonpack.unpack(pk) : pk;
    let isFile = o => o.hasOwnProperty('d') && o.hasOwnProperty('t') && Object.keys(o).length == 2;

    if(toplevel && (json.i != 1 || json.f != 0.5)) return;

    if(isFile(json)) return Buffer.from(json.d, 'base64');
    else {
        let unpacked = {};
        let keys = Object.keys(json);
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if(toplevel && (key == 'i' || key == 'f')) continue;
            unpacked[key] = unpack(json[key], false);
        }
        return unpacked;
    }
}
