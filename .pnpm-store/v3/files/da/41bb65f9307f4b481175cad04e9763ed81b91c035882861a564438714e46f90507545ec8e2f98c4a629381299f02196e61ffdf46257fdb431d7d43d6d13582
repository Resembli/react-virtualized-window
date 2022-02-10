"use strict";
var _core = require("@swc/core");
var _compile = require("../compile");
jest.mock("@swc/core");
describe('compile', ()=>{
    it("compile with sync transform", async ()=>{
        const options = {
        };
        await (0, _compile).compile('test.ts', options, true, undefined);
        expect(_core.transformFileSync).toHaveBeenCalledWith('test.ts', options);
    });
    it("compile with async transform", async ()=>{
        const options = {
        };
        await (0, _compile).compile('test.ts', options, false, undefined);
        expect(_core.transformFile).toHaveBeenCalledWith('test.ts', options);
    });
});
