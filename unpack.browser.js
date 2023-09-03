window.assetpack = window.assetpack || {};

window.assetpack.unpack = (data, toplevel = true) => {
    let { jsonpack } = window;
    if(!jsonpack) throw new Error('Cannot find jsonpack');

    let json = toplevel ? jsonpack.unpack(data) : data;

    let isFile = o => o.hasOwnProperty('d') && o.hasOwnProperty('t') && Object.keys(o).length == 2;

    if(toplevel && (json.i != 1 || json.f != 0.5)) return;

    if(isFile(json)) return `data:${json.t};base64,${json.d}`;
    else {
        let unpacked = {};
        let keys = Object.keys(json);
        for(let i = 0; i< keys.length; i++) {
            let key = keys[i];
            if(toplevel && (key == 'i' || key == 'f')) continue;
            unpacked[key] = unpackAssets(json[key], false);
        }
        return unpacked;
    }
}