"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeChecked = toBeChecked;
exports.toBeDisabled = toBeDisabled;
exports.toBeEditable = toBeEditable;
exports.toBeEmpty = toBeEmpty;
exports.toBeEnabled = toBeEnabled;
exports.toBeFocused = toBeFocused;
exports.toBeHidden = toBeHidden;
exports.toBeVisible = toBeVisible;
exports.toContainText = toContainText;
exports.toHaveAttribute = toHaveAttribute;
exports.toHaveClass = toHaveClass;
exports.toHaveCount = toHaveCount;
exports.toHaveCSS = toHaveCSS;
exports.toHaveId = toHaveId;
exports.toHaveJSProperty = toHaveJSProperty;
exports.toHaveText = toHaveText;
exports.toHaveValue = toHaveValue;
exports.toHaveTitle = toHaveTitle;
exports.toHaveURL = toHaveURL;
exports.toBeOK = toBeOK;

var _utils = require("playwright-core/lib/utils/utils");

var _util = require("../util");

var _toBeTruthy = require("./toBeTruthy");

var _toEqual = require("./toEqual");

var _toMatchText = require("./toMatchText");

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
function toBeChecked(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeChecked', locator, 'Locator', async (isNot, timeout) => {
    const checked = !options || options.checked === undefined || options.checked === true;
    return await locator._expect(checked ? 'to.be.checked' : 'to.be.unchecked', {
      isNot,
      timeout
    });
  }, options);
}

function toBeDisabled(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeDisabled', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.be.disabled', {
      isNot,
      timeout
    });
  }, options);
}

function toBeEditable(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeEditable', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.be.editable', {
      isNot,
      timeout
    });
  }, options);
}

function toBeEmpty(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeEmpty', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.be.empty', {
      isNot,
      timeout
    });
  }, options);
}

function toBeEnabled(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeEnabled', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.be.enabled', {
      isNot,
      timeout
    });
  }, options);
}

function toBeFocused(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeFocused', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.be.focused', {
      isNot,
      timeout
    });
  }, options);
}

function toBeHidden(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeHidden', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.be.hidden', {
      isNot,
      timeout
    });
  }, options);
}

function toBeVisible(locator, options) {
  return _toBeTruthy.toBeTruthy.call(this, 'toBeVisible', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.be.visible', {
      isNot,
      timeout
    });
  }, options);
}

function toContainText(locator, expected, options) {
  if (Array.isArray(expected)) {
    return _toEqual.toEqual.call(this, 'toContainText', locator, 'Locator', async (isNot, timeout) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)(expected, {
        matchSubstring: true,
        normalizeWhiteSpace: true
      });
      return await locator._expect('to.contain.text.array', {
        expectedText,
        isNot,
        useInnerText: options === null || options === void 0 ? void 0 : options.useInnerText,
        timeout
      });
    }, expected, { ...options,
      contains: true
    });
  } else {
    return _toMatchText.toMatchText.call(this, 'toContainText', locator, 'Locator', async (isNot, timeout) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)([expected], {
        matchSubstring: true,
        normalizeWhiteSpace: true
      });
      return await locator._expect('to.have.text', {
        expectedText,
        isNot,
        useInnerText: options === null || options === void 0 ? void 0 : options.useInnerText,
        timeout
      });
    }, expected, options);
  }
}

function toHaveAttribute(locator, name, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveAttribute', locator, 'Locator', async (isNot, timeout) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect('to.have.attribute', {
      expressionArg: name,
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}

function toHaveClass(locator, expected, options) {
  if (Array.isArray(expected)) {
    return _toEqual.toEqual.call(this, 'toHaveClass', locator, 'Locator', async (isNot, timeout) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)(expected);
      return await locator._expect('to.have.class.array', {
        expectedText,
        isNot,
        timeout
      });
    }, expected, options);
  } else {
    return _toMatchText.toMatchText.call(this, 'toHaveClass', locator, 'Locator', async (isNot, timeout) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
      return await locator._expect('to.have.class', {
        expectedText,
        isNot,
        timeout
      });
    }, expected, options);
  }
}

function toHaveCount(locator, expected, options) {
  return _toEqual.toEqual.call(this, 'toHaveCount', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.have.count', {
      expectedNumber: expected,
      isNot,
      timeout
    });
  }, expected, options);
}

function toHaveCSS(locator, name, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveCSS', locator, 'Locator', async (isNot, timeout) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect('to.have.css', {
      expressionArg: name,
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}

function toHaveId(locator, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveId', locator, 'Locator', async (isNot, timeout) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect('to.have.id', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}

function toHaveJSProperty(locator, name, expected, options) {
  return _toEqual.toEqual.call(this, 'toHaveJSProperty', locator, 'Locator', async (isNot, timeout) => {
    return await locator._expect('to.have.property', {
      expressionArg: name,
      expectedValue: expected,
      isNot,
      timeout
    });
  }, expected, options);
}

function toHaveText(locator, expected, options = {}) {
  if (Array.isArray(expected)) {
    return _toEqual.toEqual.call(this, 'toHaveText', locator, 'Locator', async (isNot, timeout) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)(expected, {
        normalizeWhiteSpace: true
      });
      return await locator._expect('to.have.text.array', {
        expectedText,
        isNot,
        useInnerText: options === null || options === void 0 ? void 0 : options.useInnerText,
        timeout
      });
    }, expected, options);
  } else {
    return _toMatchText.toMatchText.call(this, 'toHaveText', locator, 'Locator', async (isNot, timeout) => {
      const expectedText = (0, _toMatchText.toExpectedTextValues)([expected], {
        normalizeWhiteSpace: true
      });
      return await locator._expect('to.have.text', {
        expectedText,
        isNot,
        useInnerText: options === null || options === void 0 ? void 0 : options.useInnerText,
        timeout
      });
    }, expected, options);
  }
}

function toHaveValue(locator, expected, options) {
  return _toMatchText.toMatchText.call(this, 'toHaveValue', locator, 'Locator', async (isNot, timeout) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect('to.have.value', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}

function toHaveTitle(page, expected, options = {}) {
  const locator = page.locator(':root');
  return _toMatchText.toMatchText.call(this, 'toHaveTitle', locator, 'Locator', async (isNot, timeout) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected], {
      normalizeWhiteSpace: true
    });
    return await locator._expect('to.have.title', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}

function toHaveURL(page, expected, options) {
  const baseURL = page.context()._options.baseURL;

  expected = typeof expected === 'string' ? (0, _utils.constructURLBasedOnBaseURL)(baseURL, expected) : expected;
  const locator = page.locator(':root');
  return _toMatchText.toMatchText.call(this, 'toHaveURL', locator, 'Locator', async (isNot, timeout) => {
    const expectedText = (0, _toMatchText.toExpectedTextValues)([expected]);
    return await locator._expect('to.have.url', {
      expectedText,
      isNot,
      timeout
    });
  }, expected, options);
}

async function toBeOK(response) {
  const matcherName = 'toBeOK';
  (0, _util.expectType)(response, 'APIResponse', matcherName);
  const log = this.isNot === response.ok() ? await response._fetchLog() : [];

  const message = () => this.utils.matcherHint(matcherName, undefined, '', {
    isNot: this.isNot
  }) + (0, _toMatchText.callLogText)(log);

  const pass = response.ok();
  return {
    message,
    pass
  };
}