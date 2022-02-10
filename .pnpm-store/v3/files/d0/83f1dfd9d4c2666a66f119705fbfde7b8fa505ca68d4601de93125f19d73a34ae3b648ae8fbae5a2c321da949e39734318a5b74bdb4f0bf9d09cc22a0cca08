"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
var _path = _interopRequireDefault(require("path"));
var _slash = _interopRequireDefault(require("slash"));
var _sourceMap = require("source-map");
var _sources = require("./sources");
var util = _interopRequireWildcard(require("./util"));
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
async function _default({ cliOptions , swcOptions  }) {
    async function concatResults(file, ...results) {
        const map = new _sourceMap.SourceMapGenerator({
            file,
            sourceRoot: swcOptions.sourceRoot
        });
        let code = "";
        let offset = 0;
        for (const result of results){
            code += result.code + "\n";
            if (result.map) {
                const consumer = await new _sourceMap.SourceMapConsumer(result.map);
                const sources = new Set();
                consumer.eachMapping((mapping)=>{
                    sources.add(mapping.source);
                    map.addMapping({
                        generated: {
                            line: mapping.generatedLine + offset,
                            column: mapping.generatedColumn
                        },
                        original: {
                            line: mapping.originalLine,
                            column: mapping.originalColumn
                        },
                        source: mapping.source
                    });
                });
                sources.forEach((source)=>{
                    const content = consumer.sourceContentFor(source, true);
                    if (content !== null) {
                        map.setSourceContent(source, content);
                    }
                });
            }
            offset = code.split("\n").length - 1;
        }
        return {
            code,
            map: JSON.stringify(map)
        };
    }
    async function output(results) {
        const file = cliOptions.sourceMapTarget || _path.default.basename(cliOptions.outFile || "stdout");
        const result = await concatResults(file, ...results);
        if (cliOptions.outFile) {
            util.outputFile(result, cliOptions.outFile, swcOptions.sourceMaps);
        } else {
            process.stdout.write(result.code + "\n");
            if (result.map) {
                const map = `//#sourceMappingURL=data:application/json;charset=utf-8;base64,${Buffer.from(JSON.stringify(result.map), "utf8").toString("base64")}`;
                process.stdout.write(map);
            }
        }
    }
    async function handle(filename) {
        const sourceFileName = (0, _slash).default(cliOptions.outFile ? _path.default.relative(_path.default.dirname(cliOptions.outFile), filename) : filename);
        return await util.compile(filename, {
            ...swcOptions,
            sourceFileName
        }, cliOptions.sync, cliOptions.outFile);
    }
    async function getProgram(previousResults = new Map()) {
        const results = new Map();
        for (const filename of (await (0, _sources).globSources(cliOptions.filenames, cliOptions.includeDotfiles))){
            if ((0, _sources).isCompilableExtension(filename, cliOptions.extensions)) {
                results.set(filename, previousResults.get(filename));
            }
        }
        return results;
    }
    async function files() {
        let results = await getProgram();
        for (const filename of results.keys()){
            try {
                const result = await handle(filename);
                if (result) {
                    results.set(filename, result);
                } else {
                    results.delete(filename);
                }
            } catch (err) {
                console.error(err.message);
                results.set(filename, err);
            }
        }
        if (cliOptions.watch) {
            const watcher = await (0, _sources).watchSources(cliOptions.filenames, cliOptions.includeDotfiles);
            watcher.on("ready", ()=>{
                Promise.resolve().then(async ()=>{
                    util.assertCompilationResult(results, cliOptions.quiet);
                    await output(results.values());
                    if (!cliOptions.quiet) {
                        console.info("Watching for file changes.");
                    }
                }).catch((err)=>{
                    console.error(err.message);
                });
            });
            watcher.on("add", async (filename1)=>{
                if ((0, _sources).isCompilableExtension(filename1, cliOptions.extensions)) {
                    // ensure consistent insertion order when files are added
                    results = await getProgram(results);
                }
            });
            watcher.on("unlink", (filename1)=>{
                results.delete(filename1);
            });
            for (const type of [
                "add",
                "change"
            ]){
                watcher.on(type, (filename1)=>{
                    if (!(0, _sources).isCompilableExtension(filename1, cliOptions.extensions)) {
                        return;
                    }
                    const start = process.hrtime();
                    handle(filename1).then(async (result)=>{
                        if (!result) {
                            results.delete(filename1);
                            return;
                        }
                        results.set(filename1, result);
                        util.assertCompilationResult(results, true);
                        await output(results.values());
                        if (!cliOptions.quiet) {
                            const [seconds, nanoseconds] = process.hrtime(start);
                            const ms = seconds * 1000 + nanoseconds * 0.000001;
                            const name = _path.default.basename(cliOptions.outFile);
                            console.log(`Compiled ${name} in ${ms.toFixed(2)}ms`);
                        }
                    }).catch((err)=>{
                        console.error(err.message);
                    });
                });
            }
        } else {
            util.assertCompilationResult(results, cliOptions.quiet);
            await output(results.values());
        }
    }
    async function stdin() {
        let code = "";
        process.stdin.setEncoding("utf8");
        for await (const chunk of process.stdin){
            code += chunk;
        }
        const res = await util.transform(cliOptions.filename, code, {
            ...swcOptions,
            sourceFileName: "stdin"
        }, cliOptions.sync, undefined);
        output([
            res
        ]);
    }
    if (cliOptions.filenames.length) {
        await files();
    } else {
        await stdin();
    }
}
