"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dir;
var _slash = _interopRequireDefault(require("slash"));
var _fs = require("fs");
var _path = require("path");
var _constants = require("./constants");
var _util = require("./util");
var _compile = require("./compile");
var _sources = require("./sources");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { mkdir , rmdir , rm , copyFile , unlink  } = _fs.promises;
const cwd = process.cwd();
const recursive = {
    recursive: true
};
/**
 * Removes the leading directory, including all parent relative paths
 */ function stripComponents(filename) {
    const components = filename.split("/").slice(1);
    if (!components.length) {
        return filename;
    }
    while(components[0] === ".."){
        components.shift();
    }
    return components.join("/");
}
function getDest(filename, outDir, ext) {
    const relativePath = (0, _slash).default((0, _path).relative(cwd, filename));
    let base = stripComponents(relativePath);
    if (ext) {
        base = base.replace(/\.\w*$/, ext);
    }
    return (0, _path).join(outDir, base);
}
async function handleCompile(filename, outDir, sync, swcOptions) {
    const dest = getDest(filename, outDir, ".js");
    const sourceFileName = (0, _slash).default((0, _path).relative((0, _path).dirname(dest), filename));
    const options = {
        ...swcOptions,
        sourceFileName
    };
    const result = await (0, _util).compile(filename, options, sync, dest);
    if (result) {
        await (0, _compile).outputResult(result, filename, dest, options);
        return _constants.CompileStatus.Compiled;
    } else {
        return _constants.CompileStatus.Omitted;
    }
}
async function handleCopy(filename, outDir) {
    const dest = getDest(filename, outDir);
    const dir = (0, _path).dirname(dest);
    console.log(filename);
    await mkdir(dir, recursive);
    await copyFile(filename, dest);
    return _constants.CompileStatus.Copied;
}
async function beforeStartCompilation(cliOptions) {
    const { outDir , deleteDirOnStart  } = cliOptions;
    if (deleteDirOnStart) {
        const exists = await (0, _fs).existsSync(outDir);
        if (exists) {
            rm ? await rm(outDir, recursive) : await rmdir(outDir, recursive);
        }
    }
}
async function initialCompilation(cliOptions, swcOptions) {
    const { includeDotfiles , filenames , copyFiles , extensions , outDir , sync , quiet , watch ,  } = cliOptions;
    const results = new Map();
    const start = process.hrtime();
    const sourceFiles = await (0, _sources).globSources(filenames, includeDotfiles);
    const [compilable, copyable] = (0, _sources).slitCompilableAndCopyable(sourceFiles, extensions, copyFiles);
    if (sync) {
        for (const filename of compilable){
            try {
                const result = await handleCompile(filename, outDir, sync, swcOptions);
                results.set(filename, result);
            } catch (err) {
                console.error(err.message);
                results.set(filename, _constants.CompileStatus.Failed);
            }
        }
        for (const filename1 of copyable){
            try {
                const result = await handleCopy(filename1, outDir);
                results.set(filename1, result);
            } catch (err) {
                console.error(err.message);
                results.set(filename1, _constants.CompileStatus.Failed);
            }
        }
    } else {
        await Promise.all([
            Promise.allSettled(compilable.map((file)=>handleCompile(file, outDir, sync, swcOptions).catch((err)=>{
                    console.error(err.message);
                    throw err;
                })
            )),
            Promise.allSettled(copyable.map((file)=>handleCopy(file, outDir)
            )), 
        ]).then(([compiled, copied])=>{
            compiled.forEach((result, index)=>{
                const filename = compilable[index];
                if (result.status === "fulfilled") {
                    results.set(filename, result.value);
                } else {
                    results.set(filename, _constants.CompileStatus.Failed);
                }
            });
            copied.forEach((result, index)=>{
                const filename = copyable[index];
                if (result.status === "fulfilled") {
                    results.set(filename, result.value);
                } else {
                    results.set(filename, _constants.CompileStatus.Failed);
                }
            });
        });
    }
    const end = process.hrtime(start);
    let failed = 0;
    let compiled = 0;
    let copied = 0;
    for (let [_, status] of results){
        switch(status){
            case _constants.CompileStatus.Compiled:
                compiled += 1;
                break;
            case _constants.CompileStatus.Failed:
                failed += 1;
                break;
            case _constants.CompileStatus.Copied:
                copied += 1;
                break;
        }
    }
    if (!quiet && compiled + copied) {
        let message = "";
        if (compiled) {
            message += `Successfully compiled: ${compiled} ${compiled > 1 ? "files" : "file"}`;
        }
        if (compiled && copied) {
            message += ", ";
        }
        if (copied) {
            message += `copied ${copied} ${copied > 1 ? "files" : "file"}`;
        }
        message += ` with swc (%dms)`;
        console.log(message, (end[1] / 1000000).toFixed(2));
    }
    if (failed) {
        console.log(`Failed to compile ${failed} ${failed !== 1 ? "files" : "file"} with swc.`);
        if (!watch) {
            throw new Error("Failed to compile");
        }
    }
}
async function watchCompilation(cliOptions, swcOptions) {
    const { includeDotfiles , filenames , copyFiles , extensions , outDir , quiet , sync ,  } = cliOptions;
    const watcher = await (0, _sources).watchSources(filenames, includeDotfiles);
    watcher.on("ready", ()=>{
        if (!quiet) {
            console.info("Watching for file changes.");
        }
    });
    watcher.on("unlink", async (filename)=>{
        try {
            if ((0, _sources).isCompilableExtension(filename, extensions)) {
                await unlink(getDest(filename, outDir, ".js"));
            } else if (copyFiles) {
                await unlink(getDest(filename, outDir));
            }
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.error(err.stack);
            }
        }
    });
    for (const type of [
        "add",
        "change"
    ]){
        watcher.on(type, async (filename)=>{
            if ((0, _sources).isCompilableExtension(filename, extensions)) {
                try {
                    const start = process.hrtime();
                    const result = await handleCompile(filename, outDir, sync, swcOptions);
                    if (!quiet && result === _constants.CompileStatus.Compiled) {
                        const end = process.hrtime(start);
                        console.log(`Successfully compiled ${filename} with swc (%dms)`, (end[1] / 1000000).toFixed(2));
                    }
                } catch (err) {
                    console.error(err.message);
                }
            } else if (copyFiles) {
                try {
                    const start = process.hrtime();
                    const result = await handleCopy(filename, outDir);
                    if (!quiet && result === _constants.CompileStatus.Copied) {
                        const end = process.hrtime(start);
                        console.log(`Successfully copied ${filename} with swc (%dms)`, (end[1] / 1000000).toFixed(2));
                    }
                } catch (err) {
                    console.error(`Failed to copy ${filename}`);
                    console.error(err.message);
                }
            }
        });
    }
}
async function dir({ cliOptions , swcOptions  }) {
    const { watch  } = cliOptions;
    await beforeStartCompilation(cliOptions);
    await initialCompilation(cliOptions, swcOptions);
    if (watch) {
        await watchCompilation(cliOptions, swcOptions);
    }
}
