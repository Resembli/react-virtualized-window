"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const extensionRedirects_1 = require("./extensionRedirects");
const redirectValidation_1 = require("./redirectValidation");
const utils_common_1 = require("@docusaurus/utils-common");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
function collectRedirects(pluginContext, trailingSlash) {
    let redirects = doCollectRedirects(pluginContext);
    redirects = applyRedirectsTrailingSlash(redirects, {
        trailingSlash,
        baseUrl: pluginContext.baseUrl,
    });
    validateCollectedRedirects(redirects, pluginContext);
    return filterUnwantedRedirects(redirects, pluginContext);
}
exports.default = collectRedirects;
// If users wants to redirect to=/abc and they enable trailingSlash=true then
// => we don't want to reject the to=/abc (as only /abc/ is an existing/valid path now)
// => we want to redirect to=/abc/ without the user having to change all its redirect plugin options
// It should be easy to toggle siteConfig.trailingSlash option without having to change other configs
function applyRedirectsTrailingSlash(redirects, params) {
    return redirects.map((redirect) => ({
        ...redirect,
        to: (0, utils_common_1.applyTrailingSlash)(redirect.to, params),
    }));
}
function validateCollectedRedirects(redirects, pluginContext) {
    const redirectValidationErrors = redirects
        .map((redirect) => {
        try {
            (0, redirectValidation_1.validateRedirect)(redirect);
            return undefined;
        }
        catch (e) {
            return e.message;
        }
    })
        .filter(Boolean);
    if (redirectValidationErrors.length > 0) {
        throw new Error(`Some created redirects are invalid:
- ${redirectValidationErrors.join('\n- ')}
`);
    }
    const allowedToPaths = pluginContext.relativeRoutesPaths;
    const toPaths = redirects.map((redirect) => redirect.to);
    const illegalToPaths = (0, lodash_1.difference)(toPaths, allowedToPaths);
    if (illegalToPaths.length > 0) {
        throw new Error(`You are trying to create client-side redirections to paths that do not exist:
- ${illegalToPaths.join('\n- ')}

Valid paths you can redirect to:
- ${allowedToPaths.join('\n- ')}
`);
    }
}
function filterUnwantedRedirects(redirects, pluginContext) {
    // we don't want to create twice the same redirect
    // that would lead to writing twice the same html redirection file
    Object.entries((0, lodash_1.groupBy)(redirects, (redirect) => redirect.from)).forEach(([from, groupedFromRedirects]) => {
        if (groupedFromRedirects.length > 1) {
            logger_1.default.error `name=${'@docusaurus/plugin-client-redirects'}: multiple redirects are created with the same "from" pathname: path=${from}
It is not possible to redirect the same pathname to multiple destinations: ${groupedFromRedirects.map((r) => JSON.stringify(r))}`;
        }
    });
    const collectedRedirects = (0, lodash_1.uniqBy)(redirects, (redirect) => redirect.from);
    // We don't want to override an already existing route with a redirect file!
    const redirectsOverridingExistingPath = collectedRedirects.filter((redirect) => pluginContext.relativeRoutesPaths.includes(redirect.from));
    if (redirectsOverridingExistingPath.length > 0) {
        logger_1.default.error `name=${'@docusaurus/plugin-client-redirects'}: some redirects would override existing paths, and will be ignored: ${redirectsOverridingExistingPath.map((r) => JSON.stringify(r))}`;
    }
    return collectedRedirects.filter((redirect) => !pluginContext.relativeRoutesPaths.includes(redirect.from));
}
// For each plugin config option, create the appropriate redirects
function doCollectRedirects(pluginContext) {
    return [
        ...(0, extensionRedirects_1.createFromExtensionsRedirects)(pluginContext.relativeRoutesPaths, pluginContext.options.fromExtensions),
        ...(0, extensionRedirects_1.createToExtensionsRedirects)(pluginContext.relativeRoutesPaths, pluginContext.options.toExtensions),
        ...createRedirectsOptionRedirects(pluginContext.options.redirects),
        ...createCreateRedirectsOptionRedirects(pluginContext.relativeRoutesPaths, pluginContext.options.createRedirects),
    ];
}
function createRedirectsOptionRedirects(redirectsOption) {
    // For conveniency, user can use a string or a string[]
    function optionToRedirects(option) {
        if (typeof option.from === 'string') {
            return [{ from: option.from, to: option.to }];
        }
        return option.from.map((from) => ({
            from,
            to: option.to,
        }));
    }
    return redirectsOption.flatMap(optionToRedirects);
}
// Create redirects from the "createRedirects" fn provided by the user
function createCreateRedirectsOptionRedirects(paths, createRedirects) {
    function createPathRedirects(path) {
        const fromsMixed = createRedirects
            ? createRedirects(path) || []
            : [];
        const froms = typeof fromsMixed === 'string' ? [fromsMixed] : fromsMixed;
        return froms.map((from) => ({
            from,
            to: path,
        }));
    }
    return paths.flatMap(createPathRedirects);
}
