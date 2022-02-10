"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stat = stat;
exports.default = void 0;
const fsMock = jest.createMockFromModule('fs');
let mockStats = {
};
function setMockStats(stats) {
    Object.entries(stats).forEach(([path, stats1])=>{
        mockStats[path] = stats1;
    });
}
function resetMockStats() {
    mockStats = {
    };
}
function stat(path, cb) {
    const result = mockStats[path];
    if (result instanceof Error) {
        cb(result, undefined);
    } else {
        cb(undefined, result);
    }
}
fsMock.setMockStats = setMockStats;
fsMock.resetMockStats = resetMockStats;
fsMock.stat = stat;
var _default = fsMock;
exports.default = _default;
