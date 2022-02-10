import { Parser } from 'acorn';
import acornJsx from 'acorn-jsx';
import acornDynamicImport from 'acorn-dynamic-import';
import classFields from 'acorn-class-fields';
import Program from './program/Program.js';
import getSnippet from './utils/getSnippet.js';

const parser = Parser.extend(acornDynamicImport, acornJsx(), classFields);

export const features = [
	'getterSetter',
	'arrow',
	'classes',
	'computedProperty',
	'conciseMethodProperty',
	'defaultParameter',
	'destructuring',
	'forOf',
	'generator',
	'letConst',
	'moduleExport',
	'moduleImport',
	'numericLiteral',
	'parameterDestructuring',
	'spreadRest',
	'stickyRegExp',
	'templateString',

	// ES2016
	'exponentiation',

	// additional transforms, not from
	// https://featuretests.io
	'reservedProperties',

	'trailingFunctionCommas',
	'asyncAwait',
	'objectRestSpread'
];

const dangerousTransforms = ['dangerousTaggedTemplateString', 'dangerousForOf'];

export function transform(source, options = {}) {
	let ast;
	let jsx = null;

	try {
		ast = parser.parse(source, {
			ecmaVersion: 10,
			preserveParens: true,
			sourceType: 'module',
			allowAwaitOutsideFunction: true,
			allowReturnOutsideFunction: true,
			allowHashBang: true,
			onComment: (block, text) => {
				if (!jsx) {
					const match = /@jsx\s+([^\s]+)/.exec(text);
					if (match) jsx = match[1];
				}
			}
		});
		options.jsx = jsx || options.jsx;
	} catch (err) {
		err.snippet = getSnippet(source, err.loc);
		err.toString = () => `${err.name}: ${err.message}\n${err.snippet}`;
		throw err;
	}

	const transforms = Object.create(null);

	features.forEach(name => {
		transforms[name] = true
	});

	dangerousTransforms.forEach(name => {
		transforms[name] = true;
	});

	Object.keys(options.transforms || {}).forEach(name => {
		if (name === 'modules') {
			if (!('moduleImport' in options.transforms))
				transforms.moduleImport = options.transforms.modules;
			if (!('moduleExport' in options.transforms))
				transforms.moduleExport = options.transforms.modules;
			return;
		}

		if (!(name in transforms)) throw new Error(`Unknown transform '${name}'`);
		transforms[name] = options.transforms[name];
	});

  if (options.objectAssign === true) {
    options.objectAssign = 'Object.assign';
  }

	return new Program(source, ast, transforms, options).export(options);
}
