"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.outputResult = outputResult;
exports.compile = compile;
var _slash = _interopRequireDefault(require("slash"));
var _fs = require("fs");
var _path = require("path");
var _core = require("@swc/core");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { mkdir , stat , writeFile  } = _fs.promises;
function withSourceMap(output, options, destFile, destDir) {
    if (!output.map || options.sourceMaps === "inline") {
        return {
            sourceCode: output.code
        };
    }
    // TODO: remove once fixed in core https://github.com/swc-project/swc/issues/1388
    const sourceMap = JSON.parse(output.map);
    if (options.sourceFileName) {
        sourceMap['sources'][0] = options.sourceFileName;
    }
    if (options.sourceRoot) {
        sourceMap['sourceRoot'] = options.sourceRoot;
    }
    output.map = JSON.stringify(sourceMap);
    const sourceMapPath = destFile + ".map";
    output.code += `\n//# sourceMappingURL=${(0, _slash).default((0, _path).relative(destDir, sourceMapPath))}`;
    return {
        sourceMap: output.map,
        sourceMapPath,
        sourceCode: output.code
    };
}
async function outputResult(output, sourceFile, destFile, options) {
    const destDir = (0, _path).dirname(destFile);
    const { sourceMap , sourceMapPath , sourceCode  } = withSourceMap(output, options, destFile, destDir);
    await mkdir(destDir, {
        recursive: true
    });
    const { mode  } = await stat(sourceFile);
    if (!sourceMapPath) {
        await writeFile(destFile, sourceCode, {
            mode
        });
    } else {
        await Promise.all([
            writeFile(destFile, sourceCode, {
                mode
            }),
            writeFile(sourceMapPath, sourceMap, {
                mode
            })
        ]);
    }
}
async function compile(filename, opts, sync, outputPath) {
    const options = {
        ...opts
    };
    if (outputPath) {
        options.outputPath = outputPath;
    }
    try {
        const result = sync ? (0, _core).transformFileSync(filename, options) : await (0, _core).transformFile(filename, options);
        return result;
    } catch (err) {
        if (!err.message.includes("ignored by .swcrc")) {
            throw err;
        }
    }
}
