"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expect = exports.printReceivedStringContainExpectedResult = exports.printReceivedStringContainExpectedSubstring = void 0;

var _expect = _interopRequireDefault(require("expect"));

var _path = _interopRequireDefault(require("path"));

var _jestMatcherUtils = require("jest-matcher-utils");

var _matchers = require("./matchers/matchers");

var _toMatchSnapshot = require("./matchers/toMatchSnapshot");

var _matchers2 = _interopRequireDefault(require("expect/build/matchers"));

var _globals = require("./globals");

var _util = require("./util");

var _stackUtils = _interopRequireDefault(require("stack-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright Microsoft Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const stackUtils = new _stackUtils.default(); // #region
// Mirrored from https://github.com/facebook/jest/blob/f13abff8df9a0e1148baf3584bcde6d1b479edc7/packages/expect/src/print.ts

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found here
 * https://github.com/facebook/jest/blob/1547740bbc26400d69f4576bf35645163e942829/LICENSE
 */
// Format substring but do not enclose in double quote marks.
// The replacement is compatible with pretty-format package.

const printSubstring = val => val.replace(/"|\\/g, '\\$&');

const printReceivedStringContainExpectedSubstring = (received, start, length // not end
) => (0, _jestMatcherUtils.RECEIVED_COLOR)('"' + printSubstring(received.slice(0, start)) + (0, _jestMatcherUtils.INVERTED_COLOR)(printSubstring(received.slice(start, start + length))) + printSubstring(received.slice(start + length)) + '"');

exports.printReceivedStringContainExpectedSubstring = printReceivedStringContainExpectedSubstring;

const printReceivedStringContainExpectedResult = (received, result) => result === null ? (0, _jestMatcherUtils.printReceived)(received) : printReceivedStringContainExpectedSubstring(received, result.index, result[0].length); // #endregion


exports.printReceivedStringContainExpectedResult = printReceivedStringContainExpectedResult;
const expect = _expect.default;
exports.expect = expect;

_expect.default.setState({
  expand: false
});

const customMatchers = {
  toBeChecked: _matchers.toBeChecked,
  toBeDisabled: _matchers.toBeDisabled,
  toBeEditable: _matchers.toBeEditable,
  toBeEmpty: _matchers.toBeEmpty,
  toBeEnabled: _matchers.toBeEnabled,
  toBeFocused: _matchers.toBeFocused,
  toBeHidden: _matchers.toBeHidden,
  toBeOK: _matchers.toBeOK,
  toBeVisible: _matchers.toBeVisible,
  toContainText: _matchers.toContainText,
  toHaveAttribute: _matchers.toHaveAttribute,
  toHaveClass: _matchers.toHaveClass,
  toHaveCount: _matchers.toHaveCount,
  toHaveCSS: _matchers.toHaveCSS,
  toHaveId: _matchers.toHaveId,
  toHaveJSProperty: _matchers.toHaveJSProperty,
  toHaveText: _matchers.toHaveText,
  toHaveTitle: _matchers.toHaveTitle,
  toHaveURL: _matchers.toHaveURL,
  toHaveValue: _matchers.toHaveValue,
  toMatchSnapshot: _toMatchSnapshot.toMatchSnapshot
};

function wrap(matcherName, matcher) {
  const result = function (...args) {
    const testInfo = (0, _globals.currentTestInfo)();
    if (!testInfo) return matcher.call(this, ...args);
    const INTERNAL_STACK_LENGTH = 3; // at Object.__PWTRAP__[expect.toHaveText] (...)
    // at __EXTERNAL_MATCHER_TRAP__ (...)
    // at Object.throwingMatcher [as toHaveText] (...)
    // at <test function> (...)

    const stackLines = new Error().stack.split('\n').slice(INTERNAL_STACK_LENGTH + 1);
    const frame = stackLines[0] ? stackUtils.parseLine(stackLines[0]) : undefined;

    const step = testInfo._addStep({
      location: frame && frame.file ? {
        file: _path.default.resolve(process.cwd(), frame.file),
        line: frame.line || 0,
        column: frame.column || 0
      } : undefined,
      category: 'expect',
      title: `expect${this.isNot ? '.not' : ''}.${matcherName}`,
      canHaveChildren: true,
      forceNoParent: false
    });

    const reportStepEnd = result => {
      const success = result.pass !== this.isNot;
      let error;

      if (!success) {
        const message = result.message();
        error = {
          message,
          stack: message + '\n' + stackLines.join('\n')
        };
      }

      step.complete(error);
      return result;
    };

    const reportStepError = error => {
      step.complete((0, _util.serializeError)(error));
      throw error;
    };

    try {
      const result = matcher.call(this, ...args);
      if (result instanceof Promise) return result.then(reportStepEnd).catch(reportStepError);
      return reportStepEnd(result);
    } catch (e) {
      reportStepError(e);
    }
  };

  Object.defineProperty(result, 'name', {
    value: '__PWTRAP__[expect.' + matcherName + ']'
  });
  return result;
}

const wrappedMatchers = {};

for (const matcherName in _matchers2.default) wrappedMatchers[matcherName] = wrap(matcherName, _matchers2.default[matcherName]);

for (const matcherName in customMatchers) wrappedMatchers[matcherName] = wrap(matcherName, customMatchers[matcherName]);

_expect.default.extend(wrappedMatchers);