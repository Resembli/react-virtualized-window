"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.features = void 0;
// fork of Buble which removes Buble's large dependency and weighs in
// at a smaller size of ~51kB
// https://github.com/FormidableLabs/react-live#what-bundle-size-can-i-expect
const buble_1 = require("@philpl/buble");
Object.defineProperty(exports, "features", { enumerable: true, get: function () { return buble_1.features; } });
function transform(source, options) {
    return (0, buble_1.transform)(source, {
        ...options,
        transforms: {
            asyncAwait: false,
            classes: false,
            getterSetter: false,
            ...options.transforms,
        },
    });
}
exports.transform = transform;
