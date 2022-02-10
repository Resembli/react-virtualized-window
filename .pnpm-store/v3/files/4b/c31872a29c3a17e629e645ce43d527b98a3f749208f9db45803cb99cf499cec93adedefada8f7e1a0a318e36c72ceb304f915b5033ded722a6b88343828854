"use strict";
var _core = require("@swc/core");
var _fs = require("fs");
var _path = require("path");
var _util = require("util");
var _options = _interopRequireDefault(require("./options"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const write = (0, _util).promisify(_fs.writeFile);
const makeDir = (0, _util).promisify(_fs.mkdir);
(async ()=>{
    const { spackOptions  } = await (0, _options).default(process.argv);
    function isUserDefinedEntry(name) {
        if (typeof spackOptions.entry === 'string') {
            return spackOptions.entry === name;
        }
        if (Array.isArray(spackOptions.entry)) {
            for (const e of spackOptions.entry){
                if (e === name) {
                    return true;
                }
            }
            return false;
        }
        return name in spackOptions.entry;
    }
    async function build() {
        var ref;
        const bundleStart = process.hrtime();
        const output = await (0, _core).bundle(spackOptions);
        const bundleEnd = process.hrtime(bundleStart);
        console.info(`Bundling done: ${bundleEnd[0]}s ${bundleEnd[1] / 1000000}ms`);
        const emitStart = process.hrtime();
        if ((ref = spackOptions.output) === null || ref === void 0 ? void 0 : ref.path) {
            await Object.keys(output).map(async (name)=>{
                let fullPath = '';
                if (isUserDefinedEntry(name)) {
                    fullPath = (0, _path).join(spackOptions.output.path, spackOptions.output.name.replace('[name]', name));
                } else {
                    const ext = (0, _path).extname(name);
                    const base = (0, _path).basename(name, ext);
                    const filename = (0, _path).relative(process.cwd(), name);
                    fullPath = (0, _path).join(spackOptions.output.path, (0, _path).dirname(filename), `${base}.js`);
                }
                await makeDir((0, _path).dirname(fullPath), {
                    recursive: true
                });
                await write(fullPath, output[name].code, 'utf-8');
                if (output[name].map) {
                    await write(`${fullPath}.map`, output[name].map, 'utf-8');
                }
            });
        } else {
            throw new Error('Cannot print to stdout: not implemented yet');
        }
        const emitEnd = process.hrtime(emitStart);
        console.info(`Done: ${emitEnd[0]}s ${emitEnd[1] / 1000000}ms`);
    }
    // if (cliOptions.watch) {
    //     throw new Error('watch is not implemented yet')
    // }
    await build();
})();
