"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeError = serializeError;
exports.monotonicTime = monotonicTime;
exports.createFileMatcher = createFileMatcher;
exports.createTitleMatcher = createTitleMatcher;
exports.mergeObjects = mergeObjects;
exports.wrapInPromise = wrapInPromise;
exports.forceRegExp = forceRegExp;
exports.relativeFilePath = relativeFilePath;
exports.formatLocation = formatLocation;
exports.errorWithFile = errorWithFile;
exports.errorWithLocation = errorWithLocation;
exports.expectType = expectType;
exports.sanitizeForFilePath = sanitizeForFilePath;
exports.trimLongString = trimLongString;
exports.addSuffixToFilePath = addSuffixToFilePath;
exports.getContainedPath = getContainedPath;
exports.prependToTestError = prependToTestError;
exports.debugTest = void 0;

var _util = _interopRequireDefault(require("util"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _debug = _interopRequireDefault(require("debug"));

var _utils = require("playwright-core/lib/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function serializeError(error) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack
    };
  }

  return {
    value: _util.default.inspect(error)
  };
}

function monotonicTime() {
  const [seconds, nanoseconds] = process.hrtime();
  return seconds * 1000 + (nanoseconds / 1000000 | 0);
}

function createFileMatcher(patterns) {
  const reList = [];
  const filePatterns = [];

  for (const pattern of Array.isArray(patterns) ? patterns : [patterns]) {
    if ((0, _utils.isRegExp)(pattern)) {
      reList.push(pattern);
    } else {
      if (!pattern.startsWith('**/') && !pattern.startsWith('**/')) filePatterns.push('**/' + pattern);else filePatterns.push(pattern);
    }
  }

  return filePath => {
    for (const re of reList) {
      re.lastIndex = 0;
      if (re.test(filePath)) return true;
    } // Windows might still recieve unix style paths from Cygwin or Git Bash.
    // Check against the file url as well.


    if (_path.default.sep === '\\') {
      const fileURL = _url.default.pathToFileURL(filePath).href;

      for (const re of reList) {
        re.lastIndex = 0;
        if (re.test(fileURL)) return true;
      }
    }

    for (const pattern of filePatterns) {
      if ((0, _minimatch.default)(filePath, pattern, {
        nocase: true,
        dot: true
      })) return true;
    }

    return false;
  };
}

function createTitleMatcher(patterns) {
  const reList = Array.isArray(patterns) ? patterns : [patterns];
  return value => {
    for (const re of reList) {
      re.lastIndex = 0;
      if (re.test(value)) return true;
    }

    return false;
  };
}

function mergeObjects(a, b) {
  const result = { ...a
  };

  if (!Object.is(b, undefined)) {
    for (const [name, value] of Object.entries(b)) {
      if (!Object.is(value, undefined)) result[name] = value;
    }
  }

  return result;
}

async function wrapInPromise(value) {
  return value;
}

function forceRegExp(pattern) {
  const match = pattern.match(/^\/(.*)\/([gi]*)$/);
  if (match) return new RegExp(match[1], match[2]);
  return new RegExp(pattern, 'g');
}

function relativeFilePath(file) {
  if (!_path.default.isAbsolute(file)) return file;
  return _path.default.relative(process.cwd(), file);
}

function formatLocation(location) {
  return relativeFilePath(location.file) + ':' + location.line + ':' + location.column;
}

function errorWithFile(file, message) {
  return new Error(`${relativeFilePath(file)}: ${message}`);
}

function errorWithLocation(location, message) {
  return new Error(`${formatLocation(location)}: ${message}`);
}

function expectType(receiver, type, matcherName) {
  if (typeof receiver !== 'object' || receiver.constructor.name !== type) throw new Error(`${matcherName} can be only used with ${type} object`);
}

function sanitizeForFilePath(s) {
  return s.replace(/[\x00-\x2C\x2E-\x2F\x3A-\x40\x5B-\x60\x7B-\x7F]+/g, '-');
}

function trimLongString(s, length = 100) {
  if (s.length <= length) return s;
  const hash = (0, _utils.calculateSha1)(s);
  const middle = `-${hash.substring(0, 5)}-`;
  const start = Math.floor((length - middle.length) / 2);
  const end = length - middle.length - start;
  return s.substring(0, start) + middle + s.slice(-end);
}

function addSuffixToFilePath(filePath, suffix, customExtension, sanitize = false) {
  const dirname = _path.default.dirname(filePath);

  const ext = _path.default.extname(filePath);

  const name = _path.default.basename(filePath, ext);

  const base = _path.default.join(dirname, name);

  return (sanitize ? sanitizeForFilePath(base) : base) + suffix + (customExtension || ext);
}
/**
 * Returns absolute path contained within parent directory.
 */


function getContainedPath(parentPath, subPath = '') {
  const resolvedPath = _path.default.resolve(parentPath, subPath);

  if (resolvedPath === parentPath || resolvedPath.startsWith(parentPath + _path.default.sep)) return resolvedPath;
  return null;
}

const debugTest = (0, _debug.default)('pw:test');
exports.debugTest = debugTest;

function prependToTestError(testError, message, location) {
  if (!message) return testError;

  if (!testError) {
    if (!location) return {
      value: message
    };
    let stack = `    at ${location.file}:${location.line}:${location.column}`;
    if (!message.endsWith('\n')) stack = '\n' + stack;
    return {
      message: message,
      stack: message + stack
    };
  }

  if (testError.message) {
    const stack = testError.stack ? message + testError.stack : testError.stack;
    message = message + testError.message;
    return {
      value: testError.value,
      message,
      stack
    };
  }

  return testError;
}