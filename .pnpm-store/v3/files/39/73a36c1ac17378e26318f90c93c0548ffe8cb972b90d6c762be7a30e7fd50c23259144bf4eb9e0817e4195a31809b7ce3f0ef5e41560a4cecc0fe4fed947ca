"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatFailure = formatFailure;
exports.formatResultFailure = formatResultFailure;
exports.formatTestTitle = formatTestTitle;
exports.formatError = formatError;
exports.prepareErrorStack = prepareErrorStack;
exports.stripAnsiEscapes = stripAnsiEscapes;
exports.fitToScreen = fitToScreen;
exports.BaseReporter = exports.kOutputSymbol = void 0;

var _codeFrame = require("@babel/code-frame");

var _safe = _interopRequireDefault(require("colors/safe"));

var _fs = _interopRequireDefault(require("fs"));

var _ms = _interopRequireDefault(require("ms"));

var _path = _interopRequireDefault(require("path"));

var _stackUtils = _interopRequireDefault(require("stack-utils"));

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
const stackUtils = new _stackUtils.default();
const kOutputSymbol = Symbol('output');
exports.kOutputSymbol = kOutputSymbol;

class BaseReporter {
  constructor(options = {}) {
    this.duration = 0;
    this.config = void 0;
    this.suite = void 0;
    this.totalTestCount = 0;
    this.result = void 0;
    this.fileDurations = new Map();
    this.monotonicStartTime = 0;
    this._omitFailures = void 0;
    this._ttyWidthForTest = void 0;
    this._omitFailures = options.omitFailures || false;
    this._ttyWidthForTest = parseInt(process.env.PWTEST_TTY_WIDTH || '', 10);
  }

  onBegin(config, suite) {
    this.monotonicStartTime = monotonicTime();
    this.config = config;
    this.suite = suite;
    this.totalTestCount = suite.allTests().length;
  }

  onStdOut(chunk, test, result) {
    this._appendOutput({
      chunk,
      type: 'stdout'
    }, result);
  }

  onStdErr(chunk, test, result) {
    this._appendOutput({
      chunk,
      type: 'stderr'
    }, result);
  }

  _appendOutput(output, result) {
    if (!result) return;
    result[kOutputSymbol] = result[kOutputSymbol] || [];
    result[kOutputSymbol].push(output);
  }

  onTestEnd(test, result) {
    const projectName = test.titlePath()[1];
    const relativePath = relativeTestPath(this.config, test);
    const fileAndProject = (projectName ? `[${projectName}] › ` : '') + relativePath;
    const duration = this.fileDurations.get(fileAndProject) || 0;
    this.fileDurations.set(fileAndProject, duration + result.duration);
  }

  onError(error) {
    console.log(formatError(this.config, error, _safe.default.enabled).message);
  }

  async onEnd(result) {
    this.duration = monotonicTime() - this.monotonicStartTime;
    this.result = result;
  }

  ttyWidth() {
    return this._ttyWidthForTest || (process.env.PWTEST_SKIP_TEST_OUTPUT ? 80 : process.stdout.columns || 0);
  }

  generateStartingMessage() {
    const jobs = Math.min(this.config.workers, this.config.__testGroupsCount);
    const shardDetails = this.config.shard ? `, shard ${this.config.shard.current} of ${this.config.shard.total}` : '';
    return `\nRunning ${this.totalTestCount} test${this.totalTestCount > 1 ? 's' : ''} using ${jobs} worker${jobs > 1 ? 's' : ''}${shardDetails}`;
  }

  getSlowTests() {
    if (!this.config.reportSlowTests) return [];
    const fileDurations = [...this.fileDurations.entries()];
    fileDurations.sort((a, b) => b[1] - a[1]);
    const count = Math.min(fileDurations.length, this.config.reportSlowTests.max || Number.POSITIVE_INFINITY);
    const threshold = this.config.reportSlowTests.threshold;
    return fileDurations.filter(([, duration]) => duration > threshold).slice(0, count);
  }

  generateSummaryMessage({
    skipped,
    expected,
    unexpected,
    flaky
  }) {
    const tokens = [];

    if (unexpected.length) {
      tokens.push(_safe.default.red(`  ${unexpected.length} failed`));

      for (const test of unexpected) tokens.push(_safe.default.red(formatTestHeader(this.config, test, '    ')));
    }

    if (flaky.length) {
      tokens.push(_safe.default.yellow(`  ${flaky.length} flaky`));

      for (const test of flaky) tokens.push(_safe.default.yellow(formatTestHeader(this.config, test, '    ')));
    }

    if (skipped) tokens.push(_safe.default.yellow(`  ${skipped} skipped`));
    if (expected) tokens.push(_safe.default.green(`  ${expected} passed`) + _safe.default.dim(` (${(0, _ms.default)(this.duration)})`));
    if (this.result.status === 'timedout') tokens.push(_safe.default.red(`  Timed out waiting ${this.config.globalTimeout / 1000}s for the entire test run`));
    return tokens.join('\n');
  }

  generateSummary() {
    let skipped = 0;
    let expected = 0;
    const skippedWithError = [];
    const unexpected = [];
    const flaky = [];
    this.suite.allTests().forEach(test => {
      switch (test.outcome()) {
        case 'skipped':
          {
            ++skipped;
            if (test.results.some(result => !!result.error)) skippedWithError.push(test);
            break;
          }

        case 'expected':
          ++expected;
          break;

        case 'unexpected':
          unexpected.push(test);
          break;

        case 'flaky':
          flaky.push(test);
          break;
      }
    });
    const failuresToPrint = [...unexpected, ...flaky, ...skippedWithError];
    return {
      skipped,
      expected,
      skippedWithError,
      unexpected,
      flaky,
      failuresToPrint
    };
  }

  epilogue(full) {
    const summary = this.generateSummary();
    const summaryMessage = this.generateSummaryMessage(summary);
    if (full && summary.failuresToPrint.length && !this._omitFailures) this._printFailures(summary.failuresToPrint);

    this._printSlowTests();

    this._printSummary(summaryMessage);
  }

  _printFailures(failures) {
    console.log('');
    failures.forEach((test, index) => {
      console.log(formatFailure(this.config, test, {
        index: index + 1
      }).message);
    });
  }

  _printSlowTests() {
    const slowTests = this.getSlowTests();
    slowTests.forEach(([file, duration]) => {
      console.log(_safe.default.yellow('  Slow test file: ') + file + _safe.default.yellow(` (${(0, _ms.default)(duration)})`));
    });
    if (slowTests.length) console.log(_safe.default.yellow('  Consider splitting slow test files to speed up parallel execution'));
  }

  _printSummary(summary) {
    if (summary.trim()) {
      console.log('');
      console.log(summary);
    }
  }

  willRetry(test) {
    return test.outcome() === 'unexpected' && test.results.length <= test.retries;
  }

}

exports.BaseReporter = BaseReporter;

function formatFailure(config, test, options = {}) {
  const {
    index,
    includeStdio,
    includeAttachments = true
  } = options;
  const lines = [];
  const title = formatTestTitle(config, test);
  const annotations = [];
  const header = formatTestHeader(config, test, '  ', index);
  lines.push(_safe.default.red(header));

  for (const result of test.results) {
    const resultLines = [];
    const {
      tokens: resultTokens,
      location
    } = formatResultFailure(config, test, result, '    ', _safe.default.enabled);
    if (!resultTokens.length) continue;

    if (result.retry) {
      resultLines.push('');
      resultLines.push(_safe.default.gray(pad(`    Retry #${result.retry}`, '-')));
    }

    resultLines.push(...resultTokens);

    if (includeAttachments) {
      for (let i = 0; i < result.attachments.length; ++i) {
        const attachment = result.attachments[i];
        resultLines.push('');
        resultLines.push(_safe.default.cyan(pad(`    attachment #${i + 1}: ${attachment.name} (${attachment.contentType})`, '-')));

        if (attachment.path) {
          const relativePath = _path.default.relative(process.cwd(), attachment.path);

          resultLines.push(_safe.default.cyan(`    ${relativePath}`)); // Make this extensible

          if (attachment.name === 'trace') {
            resultLines.push(_safe.default.cyan(`    Usage:`));
            resultLines.push('');
            resultLines.push(_safe.default.cyan(`        npx playwright show-trace ${relativePath}`));
            resultLines.push('');
          }
        } else {
          if (attachment.contentType.startsWith('text/')) {
            let text = attachment.body.toString();
            if (text.length > 300) text = text.slice(0, 300) + '...';
            resultLines.push(_safe.default.cyan(`    ${text}`));
          }
        }

        resultLines.push(_safe.default.cyan(pad('   ', '-')));
      }
    }

    const output = result[kOutputSymbol] || [];

    if (includeStdio && output.length) {
      const outputText = output.map(({
        chunk,
        type
      }) => {
        const text = chunk.toString('utf8');
        if (type === 'stderr') return _safe.default.red(stripAnsiEscapes(text));
        return text;
      }).join('');
      resultLines.push('');
      resultLines.push(_safe.default.gray(pad('--- Test output', '-')) + '\n\n' + outputText + '\n' + pad('', '-'));
    }

    annotations.push({
      location,
      title,
      message: [header, ...resultLines].join('\n')
    });
    lines.push(...resultLines);
  }

  lines.push('');
  return {
    message: lines.join('\n'),
    annotations
  };
}

function formatResultFailure(config, test, result, initialIndent, highlightCode) {
  var _error;

  const resultTokens = [];

  if (result.status === 'timedOut') {
    resultTokens.push('');
    resultTokens.push(indent(_safe.default.red(`Timeout of ${test.timeout}ms exceeded.`), initialIndent));
  }

  if (result.status === 'passed' && test.expectedStatus === 'failed') {
    resultTokens.push('');
    resultTokens.push(indent(_safe.default.red(`Expected to fail, but passed.`), initialIndent));
  }

  let error = undefined;

  if (result.error !== undefined) {
    error = formatError(config, result.error, highlightCode, test.location.file);
    resultTokens.push(indent(error.message, initialIndent));
  }

  return {
    tokens: resultTokens,
    location: (_error = error) === null || _error === void 0 ? void 0 : _error.location
  };
}

function relativeFilePath(config, file) {
  return _path.default.relative(config.rootDir, file) || _path.default.basename(file);
}

function relativeTestPath(config, test) {
  return relativeFilePath(config, test.location.file);
}

function stepSuffix(step) {
  const stepTitles = step ? step.titlePath() : [];
  return stepTitles.map(t => ' › ' + t).join('');
}

function formatTestTitle(config, test, step) {
  // root, project, file, ...describes, test
  const [, projectName,, ...titles] = test.titlePath();
  const location = `${relativeTestPath(config, test)}:${test.location.line}:${test.location.column}`;
  const projectTitle = projectName ? `[${projectName}] › ` : '';
  return `${projectTitle}${location} › ${titles.join(' › ')}${stepSuffix(step)}`;
}

function formatTestHeader(config, test, indent, index) {
  const title = formatTestTitle(config, test);
  const header = `${indent}${index ? index + ') ' : ''}${title}`;
  return pad(header, '=');
}

function formatError(config, error, highlightCode, file) {
  const stack = error.stack;
  const tokens = [''];
  let location;

  if (stack) {
    const parsed = prepareErrorStack(stack, file);
    tokens.push(parsed.message);
    location = parsed.location;

    if (location) {
      try {
        const source = _fs.default.readFileSync(location.file, 'utf8');

        const codeFrame = (0, _codeFrame.codeFrameColumns)(source, {
          start: location
        }, {
          highlightCode
        }); // Convert /var/folders to /private/var/folders on Mac.

        if (!file || _fs.default.realpathSync(file) !== location.file) {
          tokens.push('');
          tokens.push(_safe.default.gray(`   at `) + `${relativeFilePath(config, location.file)}:${location.line}`);
        }

        tokens.push('');
        tokens.push(codeFrame);
      } catch (e) {// Failed to read the source file - that's ok.
      }
    }

    tokens.push('');
    tokens.push(_safe.default.dim(parsed.stackLines.join('\n')));
  } else if (error.message) {
    tokens.push(error.message);
  } else if (error.value) {
    tokens.push(error.value);
  }

  return {
    location,
    message: tokens.join('\n')
  };
}

function pad(line, char) {
  if (line) line += ' ';
  return line + _safe.default.gray(char.repeat(Math.max(0, 100 - line.length)));
}

function indent(lines, tab) {
  return lines.replace(/^(?=.+$)/gm, tab);
}

function prepareErrorStack(stack, file) {
  if (file) {
    // Stack will have /private/var/folders instead of /var/folders on Mac.
    file = _fs.default.realpathSync(file);
  }

  const lines = stack.split('\n');
  let firstStackLine = lines.findIndex(line => line.startsWith('    at '));
  if (firstStackLine === -1) firstStackLine = lines.length;
  const message = lines.slice(0, firstStackLine).join('\n');
  const stackLines = lines.slice(firstStackLine);
  let location;

  for (const line of stackLines) {
    const parsed = stackUtils.parseLine(line);
    if (!parsed || !parsed.file) continue;

    const resolvedFile = _path.default.join(process.cwd(), parsed.file);

    if (!file || resolvedFile === file) {
      location = {
        file: resolvedFile,
        column: parsed.column || 0,
        line: parsed.line || 0
      };
      break;
    }
  }

  return {
    message,
    stackLines,
    location
  };
}

function monotonicTime() {
  const [seconds, nanoseconds] = process.hrtime();
  return seconds * 1000 + (nanoseconds / 1000000 | 0);
}

const asciiRegex = new RegExp('[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))', 'g');

function stripAnsiEscapes(str) {
  return str.replace(asciiRegex, '');
} // Leaves enough space for the "suffix" to also fit.


function fitToScreen(line, width, suffix) {
  const suffixLength = suffix ? stripAnsiEscapes(suffix).length : 0;
  width -= suffixLength;
  if (line.length <= width) return line;
  let m;
  let ansiLen = 0;
  asciiRegex.lastIndex = 0;

  while ((m = asciiRegex.exec(line)) !== null) {
    const visibleLen = m.index - ansiLen;
    if (visibleLen >= width) break;
    ansiLen += m[0].length;
  } // Truncate and reset all colors.


  return line.substr(0, width + ansiLen) + '\u001b[0m';
}