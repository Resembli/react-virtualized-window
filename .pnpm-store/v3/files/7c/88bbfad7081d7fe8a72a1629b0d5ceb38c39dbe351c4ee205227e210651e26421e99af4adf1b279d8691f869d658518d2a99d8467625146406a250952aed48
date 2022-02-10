"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transform = transform;
exports.compile = compile;
exports.outputFile = outputFile;
exports.assertCompilationResult = assertCompilationResult;
var swc = _interopRequireWildcard(require("@swc/core"));
var _slash = _interopRequireDefault(require("slash"));
var _fs = require("fs");
var _path = require("path");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                    };
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
async function transform(filename, code, opts, sync, outputPath) {
    opts = {
        filename,
        ...opts
    };
    if (outputPath) {
        opts.outputPath = outputPath;
    }
    if (sync) {
        return swc.transformSync(code, opts);
    }
    return swc.transform(code, opts);
}
async function compile(filename, opts, sync, outputPath) {
    opts = {
        ...opts
    };
    if (outputPath) {
        opts.outputPath = outputPath;
    }
    try {
        const result = sync ? swc.transformFileSync(filename, opts) : await swc.transformFile(filename, opts);
        if (result.map) {
            // TODO: fix this in core
            // https://github.com/swc-project/swc/issues/1388
            const sourceMap = JSON.parse(result.map);
            if (opts.sourceFileName) {
                sourceMap['sources'][0] = opts.sourceFileName;
            }
            if (opts.sourceRoot) {
                sourceMap['sourceRoot'] = opts.sourceRoot;
            }
            result.map = JSON.stringify(sourceMap);
        }
        return result;
    } catch (err) {
        if (!err.message.includes("ignored by .swcrc")) {
            throw err;
        }
    }
}
function outputFile(output, filename, sourceMaps) {
    const destDir = (0, _path).dirname(filename);
    (0, _fs).mkdirSync(destDir, {
        recursive: true
    });
    let code = output.code;
    if (output.map && sourceMaps !== "inline") {
        // we've requested for a sourcemap to be written to disk
        const fileDirName = (0, _path).dirname(filename);
        const mapLoc = filename + ".map";
        code += "\n//# sourceMappingURL=" + (0, _slash).default((0, _path).relative(fileDirName, mapLoc));
        (0, _fs).writeFileSync(mapLoc, output.map);
    }
    (0, _fs).writeFileSync(filename, code);
}
function assertCompilationResult(result, quiet = false) {
    let compiled = 0;
    let copied = 0;
    let failed = 0;
    for (const value of result.values()){
        if (value instanceof Error) {
            failed++;
        } else if (value === 'copied') {
            copied++;
        } else if (value) {
            compiled++;
        }
    }
    if (!quiet && compiled + copied > 0) {
        const copyResult = copied === 0 ? " " : ` (copied ${copied}) `;
        console.info(`Successfully compiled ${compiled} ${compiled !== 1 ? "files" : "file"}${copyResult}with swc.`);
    }
    if (failed > 0) {
        throw new Error(`Failed to compile ${failed} ${failed !== 1 ? "files" : "file"} with swc.`);
    }
}
