"use strict";
var _sources = require("../sources");
var _fs = _interopRequireDefault(require("fs"));
var _fastGlob = _interopRequireDefault(require("fast-glob"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
jest.mock("fs");
jest.mock("fast-glob");
describe("globSources", ()=>{
    beforeEach(()=>{
        _fs.default.resetMockStats();
    });
    it("exclude dotfiles sources when includeDotfiles=false", async ()=>{
        const files = await (0, _sources).globSources([
            ".dotfile"
        ], false);
        expect([
            ...files
        ]).toEqual([]);
    });
    it("include dotfiles sources when includeDotfiles=true", async ()=>{
        _fs.default.setMockStats({
            ".dotfile": {
                isDirectory: ()=>false
            }
        });
        const files = await (0, _sources).globSources([
            ".dotfile"
        ], true);
        expect([
            ...files
        ]).toEqual([
            ".dotfile"
        ]);
    });
    it("include multiple file sources", async ()=>{
        _fs.default.setMockStats({
            ".dotfile": {
                isDirectory: ()=>false
            }
        });
        _fs.default.setMockStats({
            file: {
                isDirectory: ()=>false
            }
        });
        const files = await (0, _sources).globSources([
            ".dotfile",
            "file"
        ], true);
        expect([
            ...files
        ]).toEqual([
            ".dotfile",
            "file"
        ]);
    });
    it("exclude files that errors on stats", async ()=>{
        _fs.default.setMockStats({
            ".dotfile": {
                isDirectory: ()=>false
            }
        });
        _fs.default.setMockStats({
            file: new Error("Failed stat")
        });
        const files = await (0, _sources).globSources([
            ".dotfile",
            "file"
        ], true);
        expect([
            ...files
        ]).toEqual([
            ".dotfile"
        ]);
    });
    it("includes all files from directory", async ()=>{
        _fs.default.setMockStats({
            directory: {
                isDirectory: ()=>true
            }
        });
        _fs.default.setMockStats({
            file: {
                isDirectory: ()=>false
            }
        });
        _fastGlob.default.mockResolvedValue([
            "fileDir1",
            "fileDir2"
        ]);
        const files = await (0, _sources).globSources([
            "file",
            "directory"
        ], true);
        expect([
            ...files
        ]).toEqual([
            "file",
            "fileDir1",
            "fileDir2"
        ]);
    });
    it("exclude files from directory that fail to glob", async ()=>{
        _fs.default.setMockStats({
            directory: {
                isDirectory: ()=>true
            }
        });
        _fs.default.setMockStats({
            file: {
                isDirectory: ()=>false
            }
        });
        _fastGlob.default.mockRejectedValue(new Error("Failed"));
        const files = await (0, _sources).globSources([
            "file",
            "directory"
        ], true);
        expect([
            ...files
        ]).toEqual([
            "file"
        ]);
    });
});
describe("slitCompilableAndCopyable", ()=>{
    const extensions = [
        ".ts"
    ];
    it("separate compilable and copyable when copyFiles=true", ()=>{
        const files = [
            "test.ts",
            "test.txt"
        ];
        const [compilable, copyable] = (0, _sources).slitCompilableAndCopyable(files, extensions, true);
        expect(compilable).toEqual([
            "test.ts"
        ]);
        expect(copyable).toEqual([
            "test.txt"
        ]);
    });
    it("separate compilable and copyable when copyFiles=false", ()=>{
        const files = [
            "test.ts",
            "test.txt"
        ];
        const [compilable, copyable] = (0, _sources).slitCompilableAndCopyable(files, extensions, false);
        expect(compilable).toEqual([
            "test.ts"
        ]);
        expect(copyable).toEqual([]);
    });
});
