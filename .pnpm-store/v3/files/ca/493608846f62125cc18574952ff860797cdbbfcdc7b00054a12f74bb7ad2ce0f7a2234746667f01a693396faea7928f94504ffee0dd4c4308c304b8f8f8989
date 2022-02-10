"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = void 0;

var _transform = require("./transform");

var _util = require("./util");

var _globals = require("./globals");

var _test = require("./test");

var path = _interopRequireWildcard(require("path"));

var url = _interopRequireWildcard(require("url"));

var fs = _interopRequireWildcard(require("fs"));

var _project = require("./project");

var _runner = require("./runner");

var _utils = require("playwright-core/lib/utils/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
// To allow multiple loaders in the same process without clearing require cache,
// we make these maps global.
const cachedFileSuites = new Map();

class Loader {
  constructor(defaultConfig, configOverrides) {
    this._defaultConfig = void 0;
    this._configOverrides = void 0;
    this._fullConfig = void 0;
    this._config = {};
    this._configFile = void 0;
    this._projects = [];
    this._lastModuleInfo = null;
    this._defaultConfig = defaultConfig;
    this._configOverrides = configOverrides;
    this._fullConfig = { ...baseFullConfig
    };
  }

  static async deserialize(data) {
    const loader = new Loader(data.defaultConfig, data.overrides);
    if ('file' in data.configFile) await loader.loadConfigFile(data.configFile.file);else loader.loadEmptyConfig(data.configFile.rootDir);
    return loader;
  }

  async loadConfigFile(file) {
    if (this._configFile) throw new Error('Cannot load two config files');
    let config = await this._requireOrImport(file);
    if (config && typeof config === 'object' && 'default' in config) config = config['default'];
    this._config = config;
    this._configFile = file;
    const rawConfig = { ...config
    };

    this._processConfigObject(path.dirname(file));

    return rawConfig;
  }

  loadEmptyConfig(rootDir) {
    this._config = {};

    this._processConfigObject(rootDir);

    return {};
  }

  _processConfigObject(rootDir) {
    validateConfig(this._configFile || '<default config>', this._config); // Resolve script hooks relative to the root dir.

    if (this._config.globalSetup) this._config.globalSetup = resolveScript(this._config.globalSetup, rootDir);
    if (this._config.globalTeardown) this._config.globalTeardown = resolveScript(this._config.globalTeardown, rootDir);
    const configUse = (0, _util.mergeObjects)(this._defaultConfig.use, this._config.use);
    this._config = (0, _util.mergeObjects)((0, _util.mergeObjects)(this._defaultConfig, this._config), {
      use: configUse
    });
    if (this._config.testDir !== undefined) this._config.testDir = path.resolve(rootDir, this._config.testDir);
    const projects = 'projects' in this._config && this._config.projects !== undefined ? this._config.projects : [this._config];
    this._fullConfig.rootDir = this._config.testDir || rootDir;
    this._fullConfig.forbidOnly = takeFirst(this._configOverrides.forbidOnly, this._config.forbidOnly, baseFullConfig.forbidOnly);
    this._fullConfig.globalSetup = takeFirst(this._configOverrides.globalSetup, this._config.globalSetup, baseFullConfig.globalSetup);
    this._fullConfig.globalTeardown = takeFirst(this._configOverrides.globalTeardown, this._config.globalTeardown, baseFullConfig.globalTeardown);
    this._fullConfig.globalTimeout = takeFirst(this._configOverrides.globalTimeout, this._configOverrides.globalTimeout, this._config.globalTimeout, baseFullConfig.globalTimeout);
    this._fullConfig.grep = takeFirst(this._configOverrides.grep, this._config.grep, baseFullConfig.grep);
    this._fullConfig.grepInvert = takeFirst(this._configOverrides.grepInvert, this._config.grepInvert, baseFullConfig.grepInvert);
    this._fullConfig.maxFailures = takeFirst(this._configOverrides.maxFailures, this._config.maxFailures, baseFullConfig.maxFailures);
    this._fullConfig.preserveOutput = takeFirst(this._configOverrides.preserveOutput, this._config.preserveOutput, baseFullConfig.preserveOutput);
    this._fullConfig.reporter = takeFirst(toReporters(this._configOverrides.reporter), resolveReporters(this._config.reporter, rootDir), baseFullConfig.reporter);
    this._fullConfig.reportSlowTests = takeFirst(this._configOverrides.reportSlowTests, this._config.reportSlowTests, baseFullConfig.reportSlowTests);
    this._fullConfig.quiet = takeFirst(this._configOverrides.quiet, this._config.quiet, baseFullConfig.quiet);
    this._fullConfig.shard = takeFirst(this._configOverrides.shard, this._config.shard, baseFullConfig.shard);
    this._fullConfig.updateSnapshots = takeFirst(this._configOverrides.updateSnapshots, this._config.updateSnapshots, baseFullConfig.updateSnapshots);
    this._fullConfig.workers = takeFirst(this._configOverrides.workers, this._config.workers, baseFullConfig.workers);
    this._fullConfig.webServer = takeFirst(this._configOverrides.webServer, this._config.webServer, baseFullConfig.webServer);

    for (const project of projects) this._addProject(project, this._fullConfig.rootDir, rootDir);

    this._fullConfig.projects = this._projects.map(p => p.config);
  }

  async loadTestFile(file) {
    if (cachedFileSuites.has(file)) return cachedFileSuites.get(file);

    try {
      const suite = new _test.Suite(path.relative(this._fullConfig.rootDir, file) || path.basename(file));
      suite._requireFile = file;
      suite.location = {
        file,
        line: 0,
        column: 0
      };
      (0, _globals.setCurrentlyLoadingFileSuite)(suite);
      await this._requireOrImport(file);
      cachedFileSuites.set(file, suite);
      return suite;
    } finally {
      (0, _globals.setCurrentlyLoadingFileSuite)(undefined);
    }
  }

  async loadGlobalHook(file, name) {
    let hook = await this._requireOrImport(file);
    if (hook && typeof hook === 'object' && 'default' in hook) hook = hook['default'];
    if (typeof hook !== 'function') throw (0, _util.errorWithFile)(file, `${name} file must export a single function.`);
    return hook;
  }

  async loadReporter(file) {
    let func = await this._requireOrImport(path.resolve(this._fullConfig.rootDir, file));
    if (func && typeof func === 'object' && 'default' in func) func = func['default'];
    if (typeof func !== 'function') throw (0, _util.errorWithFile)(file, `reporter file must export a single class.`);
    return func;
  }

  fullConfig() {
    return this._fullConfig;
  }

  projects() {
    return this._projects;
  }

  serialize() {
    return {
      defaultConfig: this._defaultConfig,
      configFile: this._configFile ? {
        file: this._configFile
      } : {
        rootDir: this._fullConfig.rootDir
      },
      overrides: this._configOverrides
    };
  }

  _addProject(projectConfig, rootDir, configDir) {
    let testDir = takeFirst(projectConfig.testDir, rootDir);
    if (!path.isAbsolute(testDir)) testDir = path.resolve(configDir, testDir);
    let outputDir = takeFirst(this._configOverrides.outputDir, projectConfig.outputDir, this._config.outputDir, path.resolve(process.cwd(), 'test-results'));
    if (!path.isAbsolute(outputDir)) outputDir = path.resolve(configDir, outputDir);
    let snapshotDir = takeFirst(this._configOverrides.snapshotDir, projectConfig.snapshotDir, this._config.snapshotDir, testDir);
    if (!path.isAbsolute(snapshotDir)) snapshotDir = path.resolve(configDir, snapshotDir);
    const fullProject = {
      expect: takeFirst(this._configOverrides.expect, projectConfig.expect, this._config.expect, undefined),
      outputDir,
      repeatEach: takeFirst(this._configOverrides.repeatEach, projectConfig.repeatEach, this._config.repeatEach, 1),
      retries: takeFirst(this._configOverrides.retries, projectConfig.retries, this._config.retries, 0),
      metadata: takeFirst(this._configOverrides.metadata, projectConfig.metadata, this._config.metadata, undefined),
      name: takeFirst(this._configOverrides.name, projectConfig.name, this._config.name, ''),
      testDir,
      snapshotDir,
      testIgnore: takeFirst(this._configOverrides.testIgnore, projectConfig.testIgnore, this._config.testIgnore, []),
      testMatch: takeFirst(this._configOverrides.testMatch, projectConfig.testMatch, this._config.testMatch, '**/?(*.)@(spec|test).*'),
      timeout: takeFirst(this._configOverrides.timeout, projectConfig.timeout, this._config.timeout, 10000),
      use: (0, _util.mergeObjects)((0, _util.mergeObjects)(this._config.use, projectConfig.use), this._configOverrides.use)
    };

    this._projects.push(new _project.ProjectImpl(fullProject, this._projects.length));
  }

  async _requireOrImport(file) {
    const revertBabelRequire = (0, _transform.installTransform)(); // Figure out if we are importing or requiring.

    let isModule;

    if (file.endsWith('.mjs')) {
      isModule = true;
    } else {
      var _this$_lastModuleInfo;

      if (!this._lastModuleInfo || !file.startsWith(this._lastModuleInfo.rootFolder)) {
        this._lastModuleInfo = null;

        try {
          const pathSegments = file.split(path.sep);

          for (let i = pathSegments.length - 1; i >= 0; --i) {
            const rootFolder = pathSegments.slice(0, i).join(path.sep);
            const packageJson = path.join(rootFolder, 'package.json');

            if (fs.existsSync(packageJson)) {
              isModule = require(packageJson).type === 'module';
              this._lastModuleInfo = {
                rootFolder,
                isModule
              };
              break;
            }
          }
        } catch {// Silent catch.
        }
      }

      isModule = ((_this$_lastModuleInfo = this._lastModuleInfo) === null || _this$_lastModuleInfo === void 0 ? void 0 : _this$_lastModuleInfo.isModule) || false;
    }

    try {
      const esmImport = () => eval(`import(${JSON.stringify(url.pathToFileURL(file))})`);

      if (isModule) return await esmImport();
      return require(file);
    } catch (error) {
      if (error.code === 'ERR_MODULE_NOT_FOUND' && error.message.includes('Did you mean to import')) {
        var _$exec;

        const didYouMean = (_$exec = /Did you mean to import (.*)\?/.exec(error.message)) === null || _$exec === void 0 ? void 0 : _$exec[1];
        if (didYouMean !== null && didYouMean !== void 0 && didYouMean.endsWith('.ts')) throw (0, _util.errorWithFile)(file, 'Cannot import a typescript file from an esmodule.');
      }

      if (error.code === 'ERR_UNKNOWN_FILE_EXTENSION' && error.message.includes('.ts')) throw (0, _util.errorWithFile)(file, 'Cannot import a typescript file from an esmodule.');
      if (error instanceof SyntaxError && error.message.includes('Cannot use import statement outside a module')) throw (0, _util.errorWithFile)(file, 'JavaScript files must end with .mjs to use import.');
      throw error;
    } finally {
      revertBabelRequire();
    }
  }

}

exports.Loader = Loader;

function takeFirst(...args) {
  for (const arg of args) {
    if (arg !== undefined) return arg;
  }

  return undefined;
}

function toReporters(reporters) {
  if (!reporters) return;
  if (typeof reporters === 'string') return [[reporters]];
  return reporters;
}

function validateConfig(file, config) {
  if (typeof config !== 'object' || !config) throw (0, _util.errorWithFile)(file, `Configuration file must export a single object`);
  validateProject(file, config, 'config');

  if ('forbidOnly' in config && config.forbidOnly !== undefined) {
    if (typeof config.forbidOnly !== 'boolean') throw (0, _util.errorWithFile)(file, `config.forbidOnly must be a boolean`);
  }

  if ('globalSetup' in config && config.globalSetup !== undefined) {
    if (typeof config.globalSetup !== 'string') throw (0, _util.errorWithFile)(file, `config.globalSetup must be a string`);
  }

  if ('globalTeardown' in config && config.globalTeardown !== undefined) {
    if (typeof config.globalTeardown !== 'string') throw (0, _util.errorWithFile)(file, `config.globalTeardown must be a string`);
  }

  if ('globalTimeout' in config && config.globalTimeout !== undefined) {
    if (typeof config.globalTimeout !== 'number' || config.globalTimeout < 0) throw (0, _util.errorWithFile)(file, `config.globalTimeout must be a non-negative number`);
  }

  if ('grep' in config && config.grep !== undefined) {
    if (Array.isArray(config.grep)) {
      config.grep.forEach((item, index) => {
        if (!(0, _utils.isRegExp)(item)) throw (0, _util.errorWithFile)(file, `config.grep[${index}] must be a RegExp`);
      });
    } else if (!(0, _utils.isRegExp)(config.grep)) {
      throw (0, _util.errorWithFile)(file, `config.grep must be a RegExp`);
    }
  }

  if ('grepInvert' in config && config.grepInvert !== undefined) {
    if (Array.isArray(config.grepInvert)) {
      config.grepInvert.forEach((item, index) => {
        if (!(0, _utils.isRegExp)(item)) throw (0, _util.errorWithFile)(file, `config.grepInvert[${index}] must be a RegExp`);
      });
    } else if (!(0, _utils.isRegExp)(config.grepInvert)) {
      throw (0, _util.errorWithFile)(file, `config.grep must be a RegExp`);
    }
  }

  if ('maxFailures' in config && config.maxFailures !== undefined) {
    if (typeof config.maxFailures !== 'number' || config.maxFailures < 0) throw (0, _util.errorWithFile)(file, `config.maxFailures must be a non-negative number`);
  }

  if ('preserveOutput' in config && config.preserveOutput !== undefined) {
    if (typeof config.preserveOutput !== 'string' || !['always', 'never', 'failures-only'].includes(config.preserveOutput)) throw (0, _util.errorWithFile)(file, `config.preserveOutput must be one of "always", "never" or "failures-only"`);
  }

  if ('projects' in config && config.projects !== undefined) {
    if (!Array.isArray(config.projects)) throw (0, _util.errorWithFile)(file, `config.projects must be an array`);
    config.projects.forEach((project, index) => {
      validateProject(file, project, `config.projects[${index}]`);
    });
  }

  if ('quiet' in config && config.quiet !== undefined) {
    if (typeof config.quiet !== 'boolean') throw (0, _util.errorWithFile)(file, `config.quiet must be a boolean`);
  }

  if ('reporter' in config && config.reporter !== undefined) {
    if (Array.isArray(config.reporter)) {
      config.reporter.forEach((item, index) => {
        if (!Array.isArray(item) || item.length <= 0 || item.length > 2 || typeof item[0] !== 'string') throw (0, _util.errorWithFile)(file, `config.reporter[${index}] must be a tuple [name, optionalArgument]`);
      });
    } else if (typeof config.reporter !== 'string') {
      throw (0, _util.errorWithFile)(file, `config.reporter must be a string`);
    }
  }

  if ('reportSlowTests' in config && config.reportSlowTests !== undefined && config.reportSlowTests !== null) {
    if (!config.reportSlowTests || typeof config.reportSlowTests !== 'object') throw (0, _util.errorWithFile)(file, `config.reportSlowTests must be an object`);
    if (!('max' in config.reportSlowTests) || typeof config.reportSlowTests.max !== 'number' || config.reportSlowTests.max < 0) throw (0, _util.errorWithFile)(file, `config.reportSlowTests.max must be a non-negative number`);
    if (!('threshold' in config.reportSlowTests) || typeof config.reportSlowTests.threshold !== 'number' || config.reportSlowTests.threshold < 0) throw (0, _util.errorWithFile)(file, `config.reportSlowTests.threshold must be a non-negative number`);
  }

  if ('shard' in config && config.shard !== undefined && config.shard !== null) {
    if (!config.shard || typeof config.shard !== 'object') throw (0, _util.errorWithFile)(file, `config.shard must be an object`);
    if (!('total' in config.shard) || typeof config.shard.total !== 'number' || config.shard.total < 1) throw (0, _util.errorWithFile)(file, `config.shard.total must be a positive number`);
    if (!('current' in config.shard) || typeof config.shard.current !== 'number' || config.shard.current < 1 || config.shard.current > config.shard.total) throw (0, _util.errorWithFile)(file, `config.shard.current must be a positive number, not greater than config.shard.total`);
  }

  if ('updateSnapshots' in config && config.updateSnapshots !== undefined) {
    if (typeof config.updateSnapshots !== 'string' || !['all', 'none', 'missing'].includes(config.updateSnapshots)) throw (0, _util.errorWithFile)(file, `config.updateSnapshots must be one of "all", "none" or "missing"`);
  }

  if ('workers' in config && config.workers !== undefined) {
    if (typeof config.workers !== 'number' || config.workers <= 0) throw (0, _util.errorWithFile)(file, `config.workers must be a positive number`);
  }
}

function validateProject(file, project, title) {
  if (typeof project !== 'object' || !project) throw (0, _util.errorWithFile)(file, `${title} must be an object`);

  if ('name' in project && project.name !== undefined) {
    if (typeof project.name !== 'string') throw (0, _util.errorWithFile)(file, `${title}.name must be a string`);
  }

  if ('outputDir' in project && project.outputDir !== undefined) {
    if (typeof project.outputDir !== 'string') throw (0, _util.errorWithFile)(file, `${title}.outputDir must be a string`);
  }

  if ('repeatEach' in project && project.repeatEach !== undefined) {
    if (typeof project.repeatEach !== 'number' || project.repeatEach < 0) throw (0, _util.errorWithFile)(file, `${title}.repeatEach must be a non-negative number`);
  }

  if ('retries' in project && project.retries !== undefined) {
    if (typeof project.retries !== 'number' || project.retries < 0) throw (0, _util.errorWithFile)(file, `${title}.retries must be a non-negative number`);
  }

  if ('testDir' in project && project.testDir !== undefined) {
    if (typeof project.testDir !== 'string') throw (0, _util.errorWithFile)(file, `${title}.testDir must be a string`);
  }

  for (const prop of ['testIgnore', 'testMatch']) {
    if (prop in project && project[prop] !== undefined) {
      const value = project[prop];

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item !== 'string' && !(0, _utils.isRegExp)(item)) throw (0, _util.errorWithFile)(file, `${title}.${prop}[${index}] must be a string or a RegExp`);
        });
      } else if (typeof value !== 'string' && !(0, _utils.isRegExp)(value)) {
        throw (0, _util.errorWithFile)(file, `${title}.${prop} must be a string or a RegExp`);
      }
    }
  }

  if ('timeout' in project && project.timeout !== undefined) {
    if (typeof project.timeout !== 'number' || project.timeout < 0) throw (0, _util.errorWithFile)(file, `${title}.timeout must be a non-negative number`);
  }

  if ('use' in project && project.use !== undefined) {
    if (!project.use || typeof project.use !== 'object') throw (0, _util.errorWithFile)(file, `${title}.use must be an object`);
  }
}

const baseFullConfig = {
  forbidOnly: false,
  globalSetup: null,
  globalTeardown: null,
  globalTimeout: 0,
  grep: /.*/,
  grepInvert: null,
  maxFailures: 0,
  preserveOutput: 'always',
  projects: [],
  reporter: [['list']],
  reportSlowTests: null,
  rootDir: path.resolve(process.cwd()),
  quiet: false,
  shard: null,
  updateSnapshots: 'missing',
  version: require('../package.json').version,
  workers: 1,
  webServer: null
};

function resolveReporters(reporters, rootDir) {
  var _toReporters;

  return (_toReporters = toReporters(reporters)) === null || _toReporters === void 0 ? void 0 : _toReporters.map(([id, arg]) => {
    if (_runner.builtInReporters.includes(id)) return [id, arg];
    return [require.resolve(id, {
      paths: [rootDir]
    }), arg];
  });
}

function resolveScript(id, rootDir) {
  const localPath = path.resolve(rootDir, id);
  if (fs.existsSync(localPath)) return localPath;
  return require.resolve(id, {
    paths: [rootDir]
  });
}