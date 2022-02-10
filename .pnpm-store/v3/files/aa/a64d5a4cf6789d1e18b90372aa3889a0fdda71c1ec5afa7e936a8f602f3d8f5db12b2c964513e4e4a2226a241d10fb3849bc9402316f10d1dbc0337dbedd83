"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPluginOptions = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
const utils_1 = require("@docusaurus/utils");
exports.DefaultPluginOptions = {
    id: utils_1.DEFAULT_PLUGIN_ID,
    fromExtensions: [],
    toExtensions: [],
    redirects: [],
};
const RedirectPluginOptionValidation = utils_validation_1.Joi.object({
    to: utils_validation_1.PathnameSchema.required(),
    from: utils_validation_1.Joi.alternatives().try(utils_validation_1.PathnameSchema.required(), utils_validation_1.Joi.array().items(utils_validation_1.PathnameSchema.required())),
});
const isString = utils_validation_1.Joi.string().required().not(null);
const UserOptionsSchema = utils_validation_1.Joi.object({
    id: utils_validation_1.Joi.string().optional(),
    fromExtensions: utils_validation_1.Joi.array().items(isString),
    toExtensions: utils_validation_1.Joi.array().items(isString),
    redirects: utils_validation_1.Joi.array().items(RedirectPluginOptionValidation),
    createRedirects: utils_validation_1.Joi.function().arity(1),
});
function validateUserOptions(userOptions) {
    const { error } = UserOptionsSchema.validate(userOptions, {
        abortEarly: true,
        allowUnknown: false,
    });
    if (error) {
        throw new Error(`Invalid @docusaurus/plugin-client-redirects options: ${error.message}
  ${JSON.stringify(userOptions, null, 2)}`);
    }
}
function normalizePluginOptions(userPluginOptions = {}) {
    validateUserOptions(userPluginOptions);
    return { ...exports.DefaultPluginOptions, ...userPluginOptions };
}
exports.default = normalizePluginOptions;
