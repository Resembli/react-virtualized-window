"use strict";
var _dir = _interopRequireDefault(require("./dir"));
var _file = _interopRequireDefault(require("./file"));
var _options = _interopRequireWildcard(require("./options"));
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
(0, _options).initProgram();
const opts = (0, _options).default(process.argv);
const fn = opts.cliOptions.outDir ? _dir.default : _file.default;
process.on("uncaughtException", function(err) {
    console.error(err);
    process.exit(1);
});
fn(opts).catch((err)=>{
    console.error(err);
    process.exit(1);
});
