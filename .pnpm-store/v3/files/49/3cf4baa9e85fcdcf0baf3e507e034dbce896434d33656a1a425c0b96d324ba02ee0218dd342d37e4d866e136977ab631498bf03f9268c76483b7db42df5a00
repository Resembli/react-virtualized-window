"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformHook = transformHook;
exports.installTransform = installTransform;
exports.wrapFunctionWithLocation = wrapFunctionWithLocation;

var crypto = _interopRequireWildcard(require("crypto"));

var os = _interopRequireWildcard(require("os"));

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var pirates = _interopRequireWildcard(require("pirates"));

var sourceMapSupport = _interopRequireWildcard(require("source-map-support"));

var url = _interopRequireWildcard(require("url"));

var _tsconfigLoader = require("./third_party/tsconfig-loader");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const version = 6;
const cacheDir = process.env.PWTEST_CACHE_DIR || path.join(os.tmpdir(), 'playwright-transform-cache');
const sourceMaps = new Map();
const cachedTSConfigs = new Map();
const kStackTraceLimit = 15;
Error.stackTraceLimit = kStackTraceLimit;
sourceMapSupport.install({
  environment: 'node',
  handleUncaughtExceptions: false,

  retrieveSourceMap(source) {
    if (!sourceMaps.has(source)) return null;
    const sourceMapPath = sourceMaps.get(source);
    if (!fs.existsSync(sourceMapPath)) return null;
    return {
      map: JSON.parse(fs.readFileSync(sourceMapPath, 'utf-8')),
      url: source
    };
  }

});

function calculateCachePath(tsconfigData, content, filePath) {
  const hash = crypto.createHash('sha1').update((tsconfigData === null || tsconfigData === void 0 ? void 0 : tsconfigData.hash) || '').update(process.env.PW_EXPERIMENTAL_TS_ESM ? 'esm' : 'no_esm').update(content).update(filePath).update(String(version)).digest('hex');
  const fileName = path.basename(filePath, path.extname(filePath)).replace(/\W/g, '') + '_' + hash;
  return path.join(cacheDir, hash[0] + hash[1], fileName);
}

function validateTsConfig(tsconfig) {
  if (!tsconfig.tsConfigPath || !tsconfig.paths || !tsconfig.baseUrl) return;
  const paths = tsconfig.paths; // Path that only contains "*", ".", "/" and "\" is too ambiguous.

  const ambiguousPath = Object.keys(paths).find(key => key.match(/^[*./\\]+$/));
  if (ambiguousPath) return;
  const multiplePath = Object.keys(paths).find(key => paths[key].length > 1);
  if (multiplePath) return; // Only leave a single path mapping.

  const singlePath = Object.fromEntries(Object.entries(paths).map(([key, values]) => [key, values[0]])); // Make 'baseUrl' absolute, because it is relative to the tsconfig.json, not to cwd.

  const absoluteBaseUrl = path.resolve(path.dirname(tsconfig.tsConfigPath), tsconfig.baseUrl);
  const hash = JSON.stringify({
    absoluteBaseUrl,
    singlePath
  });
  const alias = {};

  for (const [key, value] of Object.entries(singlePath)) {
    const regexKey = '^' + key.replace('*', '.*');

    alias[regexKey] = ([name]) => {
      let relative;
      if (key.endsWith('/*')) relative = value.substring(0, value.length - 1) + name.substring(key.length - 1);else relative = value;
      relative = relative.replace(/\//g, path.sep);
      return path.resolve(absoluteBaseUrl, relative);
    };
  }

  return {
    absoluteBaseUrl,
    singlePath,
    hash,
    alias
  };
}

function loadAndValidateTsconfigForFile(file) {
  const cwd = path.dirname(file);

  if (!cachedTSConfigs.has(cwd)) {
    const loaded = (0, _tsconfigLoader.tsConfigLoader)({
      getEnv: name => process.env[name],
      cwd
    });
    cachedTSConfigs.set(cwd, validateTsConfig(loaded));
  }

  return cachedTSConfigs.get(cwd);
}

function transformHook(code, filename, isModule = false) {
  if (isComponentImport(filename)) return componentStub();
  const tsconfigData = loadAndValidateTsconfigForFile(filename);
  const cachePath = calculateCachePath(tsconfigData, code, filename);
  const codePath = cachePath + '.js';
  const sourceMapPath = cachePath + '.map';
  sourceMaps.set(filename, sourceMapPath);
  if (!process.env.PW_IGNORE_COMPILE_CACHE && fs.existsSync(codePath)) return fs.readFileSync(codePath, 'utf8'); // We don't use any browserslist data, but babel checks it anyway.
  // Silence the annoying warning.

  process.env.BROWSERSLIST_IGNORE_OLD_DATA = 'true';

  const babel = require('@babel/core');

  const plugins = [[require.resolve('@babel/plugin-proposal-class-properties')], [require.resolve('@babel/plugin-proposal-numeric-separator')], [require.resolve('@babel/plugin-proposal-logical-assignment-operators')], [require.resolve('@babel/plugin-proposal-nullish-coalescing-operator')], [require.resolve('@babel/plugin-proposal-optional-chaining')], [require.resolve('@babel/plugin-syntax-json-strings')], [require.resolve('@babel/plugin-syntax-optional-catch-binding')], [require.resolve('@babel/plugin-syntax-async-generators')], [require.resolve('@babel/plugin-syntax-object-rest-spread')], [require.resolve('@babel/plugin-proposal-export-namespace-from')]];

  if (tsconfigData) {
    plugins.push([require.resolve('babel-plugin-module-resolver'), {
      root: ['./'],
      alias: tsconfigData.alias,
      // Silences warning 'Could not resovle ...' that we trigger because we resolve
      // into 'foo/bar', and not 'foo/bar.ts'.
      loglevel: 'silent'
    }]);
  }

  if (process.env.PW_COMPONENT_TESTING) plugins.unshift([require.resolve('@babel/plugin-transform-react-jsx')]);

  if (!isModule) {
    plugins.push([require.resolve('@babel/plugin-transform-modules-commonjs')]);
    plugins.push([require.resolve('@babel/plugin-proposal-dynamic-import')]);
  }

  const result = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    assumptions: {
      // Without this, babel defines a top level function that
      // breaks playwright evaluates.
      setPublicClassFields: true
    },
    presets: [[require.resolve('@babel/preset-typescript'), {
      onlyRemoveTypeImports: true
    }]],
    plugins,
    sourceMaps: 'both'
  });

  if (result.code) {
    fs.mkdirSync(path.dirname(cachePath), {
      recursive: true
    });
    if (result.map) fs.writeFileSync(sourceMapPath, JSON.stringify(result.map), 'utf8');
    fs.writeFileSync(codePath, result.code, 'utf8');
  }

  return result.code || '';
}

function installTransform() {
  return pirates.addHook((code, filename) => transformHook(code, filename), {
    exts: ['.ts', '.tsx']
  });
}

function wrapFunctionWithLocation(func) {
  return (...args) => {
    const oldPrepareStackTrace = Error.prepareStackTrace;

    Error.prepareStackTrace = (error, stackFrames) => {
      const frame = sourceMapSupport.wrapCallSite(stackFrames[1]);
      const fileName = frame.getFileName(); // Node error stacks for modules use file:// urls instead of paths.

      const file = fileName && fileName.startsWith('file://') ? url.fileURLToPath(fileName) : fileName;
      return {
        file,
        line: frame.getLineNumber(),
        column: frame.getColumnNumber()
      };
    };

    Error.stackTraceLimit = 2;
    const obj = {};
    Error.captureStackTrace(obj);
    const location = obj.stack;
    Error.stackTraceLimit = kStackTraceLimit;
    Error.prepareStackTrace = oldPrepareStackTrace;
    return func(location, ...args);
  };
} // Experimental components support for internal testing.


function isComponentImport(filename) {
  if (!process.env.PW_COMPONENT_TESTING) return false;
  if (filename.endsWith('.tsx') && !filename.endsWith('spec.tsx') && !filename.endsWith('test.tsx')) return true;
  if (filename.endsWith('.jsx') && !filename.endsWith('spec.jsx') && !filename.endsWith('test.jsx')) return true;
  return false;
}

function componentStub() {
  return `module.exports = new Proxy({}, {
    get: (obj, prop) => prop
  });`;
}