"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.globSources = globSources;
exports.isCompilableExtension = isCompilableExtension;
exports.slitCompilableAndCopyable = slitCompilableAndCopyable;
exports.requireChokidar = requireChokidar;
exports.watchSources = watchSources;
var _fastGlob = _interopRequireDefault(require("fast-glob"));
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
async function globSources(sources, includeDotfiles = false) {
    const globConfig = {
        dot: includeDotfiles,
        nodir: true
    };
    const files = await Promise.all(sources.filter((source)=>includeDotfiles || !(0, _path).basename(source).startsWith(".")
    ).map((source)=>{
        return new Promise((resolve)=>{
            (0, _fs).stat(source, (err, stat)=>{
                if (err) {
                    resolve([]);
                    return;
                }
                if (!stat.isDirectory()) {
                    resolve([
                        source
                    ]);
                } else {
                    (0, _fastGlob).default((0, _slash).default((0, _path).join(source, "**")), globConfig).then((matches)=>resolve(matches)
                    ).catch(()=>resolve([])
                    );
                }
            });
        });
    }));
    return Array.from(new Set(files.flat()));
}
function isCompilableExtension(filename, allowedExtension) {
    const ext = (0, _path).extname(filename);
    return allowedExtension.includes(ext);
}
function slitCompilableAndCopyable(files, allowedExtension, copyFiles) {
    const compilable = [];
    const copyable = [];
    for (const file of files){
        const isCompilable = isCompilableExtension(file, allowedExtension);
        if (isCompilable) {
            compilable.push(file);
        } else if (copyFiles) {
            copyable.push(file);
        }
    }
    return [
        compilable,
        copyable
    ];
}
async function requireChokidar() {
    try {
        const { default: chokidar  } = await Promise.resolve().then(function() {
            return _interopRequireWildcard(require("chokidar"));
        });
        return chokidar;
    } catch (err) {
        console.error("The optional dependency chokidar is not installed and is required for " + "--watch. Chokidar is likely not supported on your platform.");
        throw err;
    }
}
async function watchSources(sources, includeDotfiles = false) {
    const chokidar = await requireChokidar();
    return chokidar.watch(sources, {
        ignored: includeDotfiles ? undefined : (filename)=>(0, _path).basename(filename).startsWith(".")
        ,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 50,
            pollInterval: 10
        }
    });
}
