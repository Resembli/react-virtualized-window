"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _safe = _interopRequireDefault(require("colors/safe"));

var _base = require("./base");

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
class LineReporter extends _base.BaseReporter {
  constructor(...args) {
    super(...args);
    this._current = 0;
    this._failures = 0;
    this._lastTest = void 0;
  }

  printsToStdio() {
    return true;
  }

  onBegin(config, suite) {
    super.onBegin(config, suite);
    console.log(this.generateStartingMessage());
    console.log();
  }

  onStdOut(chunk, test, result) {
    super.onStdOut(chunk, test, result);

    this._dumpToStdio(test, chunk, process.stdout);
  }

  onStdErr(chunk, test, result) {
    super.onStdErr(chunk, test, result);

    this._dumpToStdio(test, chunk, process.stderr);
  }

  _dumpToStdio(test, chunk, stream) {
    if (this.config.quiet) return;
    if (!process.env.PWTEST_SKIP_TEST_OUTPUT) stream.write(`\u001B[1A\u001B[2K`);

    if (test && this._lastTest !== test) {
      // Write new header for the output.
      const title = _safe.default.gray((0, _base.formatTestTitle)(this.config, test));

      stream.write((0, _base.fitToScreen)(title, this.ttyWidth()) + `\n`);
      this._lastTest = test;
    }

    stream.write(chunk);
    console.log();
  }

  onTestEnd(test, result) {
    super.onTestEnd(test, result);
    if (!test.title.startsWith('beforeAll') && !test.title.startsWith('afterAll')) ++this._current;
    const retriesSuffix = this.totalTestCount < this._current ? ` (retries)` : ``;
    const title = `[${this._current}/${this.totalTestCount}]${retriesSuffix} ${(0, _base.formatTestTitle)(this.config, test)}`;
    const suffix = result.retry ? ` (retry #${result.retry})` : '';
    if (process.env.PWTEST_SKIP_TEST_OUTPUT) process.stdout.write(`${title + suffix}\n`);else process.stdout.write(`\u001B[1A\u001B[2K${(0, _base.fitToScreen)(title, this.ttyWidth(), suffix) + _safe.default.yellow(suffix)}\n`);

    if (!this.willRetry(test) && (test.outcome() === 'flaky' || test.outcome() === 'unexpected')) {
      if (!process.env.PWTEST_SKIP_TEST_OUTPUT) process.stdout.write(`\u001B[1A\u001B[2K`);
      console.log((0, _base.formatFailure)(this.config, test, {
        index: ++this._failures
      }).message);
      console.log();
    }
  }

  async onEnd(result) {
    if (!process.env.PWTEST_SKIP_TEST_OUTPUT) process.stdout.write(`\u001B[1A\u001B[2K`);
    await super.onEnd(result);
    this.epilogue(false);
  }

}

var _default = LineReporter;
exports.default = _default;