"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectImpl = void 0;

var _test = require("./test");

var _fixtures = require("./fixtures");

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
class ProjectImpl {
  constructor(project, index) {
    this.config = void 0;
    this.index = void 0;
    this.testTypePools = new Map();
    this.testPools = new Map();
    this.config = project;
    this.index = index;
  }

  buildTestTypePool(testType) {
    if (!this.testTypePools.has(testType)) {
      const fixtures = this.resolveFixtures(testType, this.config.use);
      const pool = new _fixtures.FixturePool(fixtures);
      this.testTypePools.set(testType, pool);
    }

    return this.testTypePools.get(testType);
  } // TODO: we can optimize this function by building the pool inline in cloneSuite


  buildPool(test) {
    if (!this.testPools.has(test)) {
      let pool = this.buildTestTypePool(test._testType);
      const parents = [];

      for (let parent = test.parent; parent; parent = parent.parent) parents.push(parent);

      parents.reverse();

      for (const parent of parents) {
        if (parent._use.length) pool = new _fixtures.FixturePool(parent._use, pool, parent._isDescribe);

        for (const hook of parent._eachHooks) pool.validateFunction(hook.fn, hook.type + ' hook', hook.location);

        for (const hook of parent.hooks) pool.validateFunction(hook.fn, hook._type + ' hook', hook.location);

        for (const modifier of parent._modifiers) pool.validateFunction(modifier.fn, modifier.type + ' modifier', modifier.location);
      }

      pool.validateFunction(test.fn, 'Test', test.location);
      this.testPools.set(test, pool);
    }

    return this.testPools.get(test);
  }

  _cloneEntries(from, to, repeatEachIndex, filter) {
    for (const entry of from._entries) {
      if (entry instanceof _test.Suite) {
        const suite = entry._clone();

        to._addSuite(suite);

        if (!this._cloneEntries(entry, suite, repeatEachIndex, filter)) {
          to._entries.pop();

          to.suites.pop();
        }
      } else {
        const test = entry._clone();

        test.retries = this.config.retries;
        test._id = `${entry._ordinalInFile}@${entry._requireFile}#run${this.index}-repeat${repeatEachIndex}`;
        test.repeatEachIndex = repeatEachIndex;
        test._projectIndex = this.index;

        to._addTest(test);

        if (!filter(test)) {
          to._entries.pop();

          to.tests.pop();
        } else {
          const pool = this.buildPool(entry);
          test._workerHash = `run${this.index}-${pool.digest}-repeat${repeatEachIndex}`;
          test._pool = pool;
        }
      }
    }

    if (!to._entries.length) return false;

    for (const hook of from.hooks) {
      const clone = hook._clone();

      clone.retries = 1;
      clone._pool = this.buildPool(hook);
      clone._projectIndex = this.index;
      clone._id = `${hook._ordinalInFile}@${hook._requireFile}#run${this.index}-repeat${repeatEachIndex}`;
      clone.repeatEachIndex = repeatEachIndex;

      to._addAllHook(clone);
    }

    return true;
  }

  cloneFileSuite(suite, repeatEachIndex, filter) {
    const result = suite._clone();

    return this._cloneEntries(suite, result, repeatEachIndex, filter) ? result : undefined;
  }

  resolveFixtures(testType, configUse) {
    return testType.fixtures.map(f => {
      const configKeys = new Set(Object.keys(configUse || {}));
      const resolved = { ...f.fixtures
      };

      for (const [key, value] of Object.entries(resolved)) {
        if (!(0, _fixtures.isFixtureOption)(value) || !configKeys.has(key)) continue; // Apply override from config file.

        const override = configUse[key];
        resolved[key] = [override, value[1]];
      }

      return {
        fixtures: resolved,
        location: f.location
      };
    });
  }

}

exports.ProjectImpl = ProjectImpl;