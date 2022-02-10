"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toMatchText = toMatchText;
exports.toExpectedTextValues = toExpectedTextValues;
exports.callLogText = callLogText;
exports.currentExpectTimeout = currentExpectTimeout;

var _safe = _interopRequireDefault(require("colors/safe"));

var _utils = require("playwright-core/lib/utils/utils");

var _globals = require("../globals");

var _util = require("../util");

var _expect = require("../expect");

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
async function toMatchText(matcherName, receiver, receiverType, query, expected, options = {}) {
  (0, _util.expectType)(receiver, receiverType, matcherName);
  const matcherOptions = {
    isNot: this.isNot,
    promise: this.promise
  };

  if (!(typeof expected === 'string') && !(expected && typeof expected.test === 'function')) {
    throw new Error(this.utils.matcherErrorMessage(this.utils.matcherHint(matcherName, undefined, undefined, matcherOptions), `${this.utils.EXPECTED_COLOR('expected')} value must be a string or regular expression`, this.utils.printWithType('Expected', expected, this.utils.printExpected)));
  }

  const timeout = currentExpectTimeout(options);
  const {
    matches: pass,
    received,
    log
  } = await query(this.isNot, timeout);
  const stringSubstring = options.matchSubstring ? 'substring' : 'string';
  const receivedString = received || '';
  const message = pass ? () => typeof expected === 'string' ? this.utils.matcherHint(matcherName, undefined, undefined, matcherOptions) + '\n\n' + `Expected ${stringSubstring}: not ${this.utils.printExpected(expected)}\n` + `Received string: ${(0, _expect.printReceivedStringContainExpectedSubstring)(receivedString, receivedString.indexOf(expected), expected.length)}` + callLogText(log) : this.utils.matcherHint(matcherName, undefined, undefined, matcherOptions) + '\n\n' + `Expected pattern: not ${this.utils.printExpected(expected)}\n` + `Received string: ${(0, _expect.printReceivedStringContainExpectedResult)(receivedString, typeof expected.exec === 'function' ? expected.exec(receivedString) : null)}` + callLogText(log) : () => {
    const labelExpected = `Expected ${typeof expected === 'string' ? stringSubstring : 'pattern'}`;
    const labelReceived = 'Received string';
    return this.utils.matcherHint(matcherName, undefined, undefined, matcherOptions) + '\n\n' + this.utils.printDiffOrStringify(expected, receivedString, labelExpected, labelReceived, this.expand !== false) + callLogText(log);
  };
  return {
    message,
    pass
  };
}

function toExpectedTextValues(items, options = {}) {
  return items.map(i => ({
    string: (0, _utils.isString)(i) ? i : undefined,
    regexSource: (0, _utils.isRegExp)(i) ? i.source : undefined,
    regexFlags: (0, _utils.isRegExp)(i) ? i.flags : undefined,
    matchSubstring: options.matchSubstring,
    normalizeWhiteSpace: options.normalizeWhiteSpace
  }));
}

function callLogText(log) {
  if (!log) return '';
  return `
Call log:
  ${_safe.default.dim('- ' + (log || []).join('\n  - '))}
`;
}

function currentExpectTimeout(options) {
  var _testInfo$project$exp;

  const testInfo = (0, _globals.currentTestInfo)();
  if (testInfo && !testInfo.timeout) return 0;
  if (options.timeout !== undefined) return options.timeout;
  let defaultExpectTimeout = testInfo === null || testInfo === void 0 ? void 0 : (_testInfo$project$exp = testInfo.project.expect) === null || _testInfo$project$exp === void 0 ? void 0 : _testInfo$project$exp.timeout;
  if (typeof defaultExpectTimeout === 'undefined') defaultExpectTimeout = 5000;
  return defaultExpectTimeout;
}