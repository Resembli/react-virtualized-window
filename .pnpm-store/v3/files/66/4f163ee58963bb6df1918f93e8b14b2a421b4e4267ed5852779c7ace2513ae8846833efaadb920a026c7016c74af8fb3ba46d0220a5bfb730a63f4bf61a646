"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateThemeConfig = exports.Schema = exports.DEFAULT_CONFIG = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
const DEFAULT_CONFIG = {
    playgroundPosition: 'bottom',
};
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
const Schema = utils_validation_1.Joi.object({
    liveCodeBlock: utils_validation_1.Joi.object({
        playgroundPosition: utils_validation_1.Joi.string()
            .equal('top', 'bottom')
            .default(DEFAULT_CONFIG.playgroundPosition),
    })
        .label('themeConfig.liveCodeBlock')
        .default(DEFAULT_CONFIG),
});
exports.Schema = Schema;
function validateThemeConfig({ validate, themeConfig, }) {
    return validate(Schema, themeConfig);
}
exports.validateThemeConfig = validateThemeConfig;
