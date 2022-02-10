import React, { Fragment, useEffect, useState, createContext, Component, useContext } from 'react';
import 'prop-types';
import Editor from 'react-simple-code-editor';
import Highlight, { Prism } from 'prism-react-renderer';
import { transform } from 'buble';
import assign from 'core-js/features/object/assign';

var theme = {
  plain: {
    color: '#C5C8C6',
    backgroundColor: '#1D1F21'
  },
  styles: [{
    types: ['prolog', 'comment', 'doctype', 'cdata'],
    style: {
      color: 'hsl(30, 20%, 50%)'
    }
  }, {
    types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
    style: { color: 'hsl(350, 40%, 70%)' }
  }, {
    types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
    style: {
      color: 'hsl(75, 70%, 60%)'
    }
  }, {
    types: ['operator', 'entity', 'url', 'string', 'variable', 'language-css'],
    style: {
      color: 'hsl(40, 90%, 60%)'
    }
  }, {
    types: ['deleted'],
    style: {
      color: 'rgb(255, 85, 85)'
    }
  }, {
    types: ['italic'],
    style: {
      fontStyle: 'italic'
    }
  }, {
    types: ['important', 'bold'],
    style: {
      fontWeight: 'bold'
    }
  }, {
    types: ['regex', 'important'],
    style: {
      color: '#e90'
    }
  }, {
    types: ['atrule', 'attr-value', 'keyword'],
    style: {
      color: 'hsl(350, 40%, 70%)'
    }
  }, {
    types: ['punctuation', 'symbol'],
    style: {
      opacity: '0.7'
    }
  }]
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var CodeEditor = function CodeEditor(props) {
  var _useState = useState({
    code: props.code || ''
  }),
      state = _useState[0],
      setState = _useState[1];

  useEffect(function () {
    if (state.prevCodeProp && props.code !== state.prevCodeProp) {
      setState({ code: props.code, prevCodeProp: props.code });
    }
  }, [props.code]);

  var updateContent = function updateContent(code) {
    setState({ code: code });
  };

  useEffect(function () {
    if (props.onChange) {
      props.onChange(state.code);
    }
  }, [state.code]);

  var highlightCode = function highlightCode(code) {
    return React.createElement(
      Highlight,
      {
        Prism: Prism,
        code: code,
        theme: props.theme || theme,
        language: props.language
      },
      function (_ref) {
        var tokens = _ref.tokens,
            getLineProps = _ref.getLineProps,
            getTokenProps = _ref.getTokenProps;
        return React.createElement(
          Fragment,
          null,
          tokens.map(function (line, i) {
            return (
              // eslint-disable-next-line react/jsx-key
              React.createElement(
                'div',
                getLineProps({ line: line, key: i }),
                line.map(function (token, key) {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    React.createElement('span', getTokenProps({ token: token, key: key }))
                  );
                })
              )
            );
          })
        );
      }
    );
  };

  // eslint-disable-next-line no-unused-vars
  var style = props.style,
      theme$$1 = props.theme,
      onChange = props.onChange,
      rest = objectWithoutProperties(props, ['style', 'theme', 'onChange']);
  var code = state.code;


  var baseTheme = theme$$1 && _typeof(theme$$1.plain) === 'object' ? theme$$1.plain : {};

  return React.createElement(Editor, _extends({
    value: code,
    padding: 10,
    highlight: highlightCode,
    onValueChange: updateContent,
    style: _extends({
      whiteSpace: 'pre',
      fontFamily: 'monospace'
    }, baseTheme, style)
  }, rest));
};

var LiveContext = createContext({});

var _poly = { assign: assign };

var transform$1 = (function (code) {
  var transpileOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = _extends({}, transpileOptions, {
    objectAssign: '_poly.assign',
    transforms: _extends({
      dangerousForOf: true,
      dangerousTaggedTemplateString: true
    }, transpileOptions.transforms)
  });

  return transform(code, opts).code;
});

var errorBoundary = function errorBoundary(Element, errorCallback) {
  return function (_Component) {
    inherits(ErrorBoundary, _Component);

    function ErrorBoundary() {
      classCallCheck(this, ErrorBoundary);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ErrorBoundary.prototype.componentDidCatch = function componentDidCatch(error) {
      errorCallback(error);
    };

    ErrorBoundary.prototype.render = function render() {
      return typeof Element === 'function' ? React.createElement(Element, null) : Element;
    };

    return ErrorBoundary;
  }(Component);
};

var evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope);
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key];
  });
  // eslint-disable-next-line no-new-func
  var res = new (Function.prototype.bind.apply(Function, [null].concat(['_poly', 'React'], scopeKeys, [code])))();
  return res.apply(undefined, [_poly, React].concat(scopeValues));
};

var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? '' : _ref$code,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? {} : _ref$scope,
      transpileOptions = _ref.transpileOptions;

  // NOTE: Remove trailing semicolon to get an actual expression.
  var codeTrimmed = code.trim().replace(/;$/, '');

  // NOTE: Workaround for classes and arrow functions.
  var transformed = transform$1('return (' + codeTrimmed + ')', transpileOptions).trim();

  return errorBoundary(evalCode(transformed, scope), errorCallback);
};

var renderElementAsync = function renderElementAsync(_ref2, resultCallback, errorCallback
// eslint-disable-next-line consistent-return
) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === undefined ? '' : _ref2$code,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? {} : _ref2$scope,
      transpileOptions = _ref2.transpileOptions;

  var render = function render(element) {
    if (typeof element === 'undefined') {
      errorCallback(new SyntaxError('`render` must be called with valid JSX.'));
    } else {
      resultCallback(errorBoundary(element, errorCallback));
    }
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
  }

  evalCode(transform$1(code, transpileOptions), _extends({}, scope, { render: render }));
};

function LiveProvider(_ref) {
  var children = _ref.children,
      code = _ref.code,
      language = _ref.language,
      theme = _ref.theme,
      disabled = _ref.disabled,
      scope = _ref.scope,
      transformCode = _ref.transformCode,
      transpileOptions = _ref.transpileOptions,
      _ref$noInline = _ref.noInline,
      noInline = _ref$noInline === undefined ? false : _ref$noInline;

  var _useState = useState({
    error: undefined,
    element: undefined
  }),
      state = _useState[0],
      setState = _useState[1];

  function transpile(newCode) {
    // Transpilation arguments
    var input = {
      code: transformCode ? transformCode(newCode) : newCode,
      scope: scope,
      transpileOptions: transpileOptions
    };

    var errorCallback = function errorCallback(error) {
      return setState({ error: error.toString(), element: undefined });
    };

    var renderElement = function renderElement(element) {
      return setState({ error: undefined, element: element });
    };

    try {
      if (noInline) {
        setState({ error: undefined, element: null }); // Reset output for async (no inline) evaluation
        renderElementAsync(input, renderElement, errorCallback);
      } else {
        renderElement(generateElement(input, errorCallback));
      }
    } catch (error) {
      errorCallback(error);
    }
  }

  useEffect(function () {
    transpile(code);
  }, [code, scope, noInline, transformCode, transpileOptions]);

  var onChange = function onChange(newCode) {
    return transpile(newCode);
  };

  var onError = function onError(error) {
    return setState({ error: error.toString() });
  };

  return React.createElement(
    LiveContext.Provider,
    {
      value: _extends({}, state, {
        code: code,
        language: language,
        theme: theme,
        disabled: disabled,
        onError: onError,
        onChange: onChange
      })
    },
    children
  );
}

LiveProvider.defaultProps = {
  code: '',
  noInline: false,
  language: 'jsx',
  disabled: false
};

function LiveEditor(props) {
  var _useContext = useContext(LiveContext),
      code = _useContext.code,
      language = _useContext.language,
      theme = _useContext.theme,
      disabled = _useContext.disabled,
      onChange = _useContext.onChange;

  return React.createElement(CodeEditor, _extends({
    theme: theme,
    code: code,
    language: language,
    disabled: disabled,
    onChange: onChange
  }, props));
}

function LiveError(props) {
  var _useContext = useContext(LiveContext),
      error = _useContext.error;

  return error ? React.createElement(
    'pre',
    props,
    error
  ) : null;
}

function LivePreview(_ref) {
  var Component$$1 = _ref.Component,
      rest = objectWithoutProperties(_ref, ['Component']);

  var _useContext = useContext(LiveContext),
      Element = _useContext.element;

  return React.createElement(
    Component$$1,
    rest,
    Element ? React.createElement(Element, null) : null
  );
}

LivePreview.defaultProps = {
  Component: 'div'
};

function withLive(WrappedComponent) {
  var WithLive = function (_Component) {
    inherits(WithLive, _Component);

    function WithLive() {
      classCallCheck(this, WithLive);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WithLive.prototype.render = function render() {
      var _this2 = this;

      return React.createElement(
        LiveContext.Consumer,
        null,
        function (live) {
          return React.createElement(WrappedComponent, _extends({ live: live }, _this2.props));
        }
      );
    };

    return WithLive;
  }(Component);

  return WithLive;
}

export { CodeEditor as Editor, LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext, withLive, generateElement, renderElementAsync };
