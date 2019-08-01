"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ramda = require("ramda");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isDev = process.env.NODE_ENV === "development";

var WilForm =
/*#__PURE__*/
function (_Component) {
  _inherits(WilForm, _Component);

  function WilForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WilForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WilForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      fields: [],
      constraints: {},
      errors: {},
      result: {}
    });

    _defineProperty(_assertThisInitialized(_this), "_setState",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props, defaultResult, defaultErrors, fields, constraints;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, defaultResult = _this$props.defaultResult, defaultErrors = _this$props.defaultErrors, fields = _this$props.fields, constraints = _this$props.constraints;
              _context.next = 3;
              return _this.setState({
                fields: fields,
                result: _objectSpread({}, _this._getObjectFromArray(fields, ""), defaultResult),
                constraints: _objectSpread({}, _this._getObjectFromArray(fields, {}), constraints),
                errors: defaultErrors
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "_getDefineRenderFields", function () {
      var defineRenderFields = _this.props.defineRenderFields;
      return defineRenderFields;
    });

    _defineProperty(_assertThisInitialized(_this), "_getPatterns", function (type) {
      var constraints = _this.state.constraints;
      var pattern = constraints[type].special.pattern;
      return pattern;
    });

    _defineProperty(_assertThisInitialized(_this), "_validFieldSpecial", function (type, value) {
      var pattern = _this._getPatterns(type);

      return value.length > 0 && pattern.test(String(value));
    });

    _defineProperty(_assertThisInitialized(_this), "_getObjectFromArray", function (arr, value) {
      return arr.reduce(function (obj, item) {
        return _objectSpread({}, obj, _defineProperty({}, item.name, value));
      }, {});
    });

    _defineProperty(_assertThisInitialized(_this), "_getValid", function () {
      var errors = _this.state.errors;
      var messageErrors = Object.keys(errors).reduce(function (arr, name) {
        var message = errors[name].message;
        return [].concat(_toConsumableArray(arr), _toConsumableArray(!!message ? [message] : []));
      }, []);
      return (0, _ramda.isEmpty)(messageErrors);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleFormOnChange", function () {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          result = _this$state.result,
          errors = _this$state.errors;

      var valid = _this._getValid();

      onChange({
        result: result,
        valid: valid,
        errors: errors
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_checkFieldSpecial", function (name, value, special) {
      return !_this._validFieldSpecial(name, value) ? special.message : "";
    });

    _defineProperty(_assertThisInitialized(_this), "_hasValue", function (value) {
      return _typeof(value) === "object" ? !(0, _ramda.isEmpty)(value) : !!value;
    });

    _defineProperty(_assertThisInitialized(_this), "_getMessageErrorFocus", function (name, required, value) {
      var constraints = _this.state.constraints;
      var presence = constraints[name].presence;

      if (!!presence && required && !_this._hasValue(value)) {
        return presence.message;
      }

      return "";
    });

    _defineProperty(_assertThisInitialized(_this), "_getMessageErrorBeforeSubmit", function (name, required, value) {
      var constraints = _this.state.constraints;
      var _constraints$name = constraints[name],
          presence = _constraints$name.presence,
          length = _constraints$name.length,
          special = _constraints$name.special;

      if (!!presence && required && !_this._hasValue(value)) {
        return presence.message;
      }

      if (!!length && value.length > 0 && value.length <= length.minimum) {
        return length.message;
      }

      if (!!special && value.length > 0) {
        return _this._checkFieldSpecial(name, value, special);
      }

      return "";
    });

    _defineProperty(_assertThisInitialized(_this), "_setResult", function (name, value) {
      var result = _this.state.result;

      _this.setState({
        result: _objectSpread({}, result, _defineProperty({}, name, value))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_setErrors", function (name, error) {
      var errors = _this.state.errors;

      _this.setState({
        errors: _objectSpread({}, errors, _defineProperty({}, name, {
          status: !!error,
          message: !!error ? error : ""
        }))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleFieldFocus", function (name, required) {
      return function (value) {
        var result = _this.state.result;

        var error = _this._getMessageErrorFocus(name, required, value);

        if (!result[name]) {
          _this._setErrors(name, error);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_conditionLength", function (_ref2) {
      var length = _ref2.length,
          presence = _ref2.presence,
          special = _ref2.special,
          value = _ref2.value,
          required = _ref2.required;
      return !!length && (!presence && value.length <= length.minimum || value.length > 0 && value.length <= length.minimum || !!special && !required && value.length > 0 && value.length <= length.minimum || required && value.length > 0 && value.length <= length.minimum);
    });

    _defineProperty(_assertThisInitialized(_this), "_conditionSpecial", function (_ref3) {
      var length = _ref3.length,
          presence = _ref3.presence,
          special = _ref3.special,
          value = _ref3.value,
          required = _ref3.required;
      return !!special && (!length && value.length > 0 && required || !length && !presence && value.length >= 0 || !required && value.length > 0 || !!length && !presence && value.length > 0 || !!length && !!presence && required && value.length > 0);
    });

    _defineProperty(_assertThisInitialized(_this), "conditionPresence", function (_ref4) {
      var presence = _ref4.presence,
          required = _ref4.required,
          value = _ref4.value;
      return !!presence && required && value.length <= 0;
    });

    _defineProperty(_assertThisInitialized(_this), "_getMessageErrorFieldChange", function (_ref5) {
      var name = _ref5.name,
          value = _ref5.value,
          required = _ref5.required;
      var constraints = _this.state.constraints;
      var _constraints$name2 = constraints[name],
          length = _constraints$name2.length,
          presence = _constraints$name2.presence,
          special = _constraints$name2.special;

      if (_this._conditionLength({
        length: length,
        presence: presence,
        special: special,
        value: value,
        required: required
      })) {
        return length.message;
      }

      if (_this._conditionSpecial({
        length: length,
        presence: presence,
        special: special,
        value: value,
        required: required
      })) {
        return _this._checkFieldSpecial(name, value, special);
      }

      if (_this.conditionPresence({
        presence: presence,
        required: required,
        value: value
      })) {
        return presence.message;
      }

      return "";
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDefaultFieldChange", function (name, required) {
      return function (value) {
        var error = _this._getMessageErrorFieldChange({
          name: name,
          value: value,
          required: required
        });

        _this._setErrors(name, error);

        _this._setResult(name, value);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_throwErrorType", function (item) {
      var defineRenderFields = _this._getDefineRenderFields();

      var getDefineTypeKey = Object.keys(defineRenderFields);

      if (isDev) {
        var error = new Error(!item.type ? "You need to pass the type property: ".concat(JSON.stringify(item)) : "You need to use the defineRenderFields prop to define the render type of a \"type\".\nEg: <WilForm defineRenderFields={{ ".concat(item.type, ": \"render").concat(item.type, "\" }} renderaaa={...} ... />.\nOr use the previously defined type ").concat(JSON.stringify(getDefineTypeKey)));
        throw error.message;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleBeforeSubmit",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _this$state2, result, fields, errors, getObj;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$state2 = _this.state, result = _this$state2.result, fields = _this$state2.fields, errors = _this$state2.errors;

              getObj = function getObj(value) {
                return fields.reduce(function (obj, item) {
                  return _objectSpread({}, obj, _defineProperty({}, item.name, item[value]));
                }, {});
              };

              _context2.next = 4;
              return _this.setState({
                errors: _objectSpread({}, errors, Object.keys(result).reduce(function (obj, name) {
                  var value = result[name];
                  var required = getObj("required")[name];

                  var error = _this._getMessageErrorBeforeSubmit(name, required, value);

                  return _objectSpread({}, obj, _defineProperty({}, name, {
                    status: !!error,
                    message: !!error ? error : ""
                  }));
                }, {}))
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleSubmit",
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(event) {
        var onSubmit, result, errors, valid;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                onSubmit = _this.props.onSubmit;
                result = _this.state.result;
                event.preventDefault();
                _context3.next = 5;
                return _this._handleBeforeSubmit();

              case 5:
                errors = _this.state.errors;
                valid = _this._getValid();
                onSubmit({
                  result: result,
                  valid: valid,
                  errors: errors
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_handleErrorItemField", function (item) {
      if (_typeof(item) !== "object") {
        throw new Error("The element of the passed fields must be an object").message;
      }

      var arr = Object.keys(item);

      if (!arr.includes("name")) {
        throw new Error("The element of the fields passed must have a \"name\" property").message;
      }

      if (!arr.includes("type")) {
        throw new Error("The element of the fields passed must have a \"type\" property").message;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_renderItem", function (item) {
      var _this$state3 = _this.state,
          errors = _this$state3.errors,
          result = _this$state3.result;
      var type = item.type,
          name = item.name,
          required = item.required;
      var errorDefault = {
        status: false,
        message: ""
      };
      var error = errors[item.name] || errorDefault;

      var itemGeneral = _objectSpread({}, item, {
        error: error,
        defaultValue: result[name],
        onChange: _this._handleDefaultFieldChange(name, required),
        onFocus: _this._handleFieldFocus(name, required)
      });

      var defineRenderFields = _this._getDefineRenderFields();

      var defineFieldKeys = Object.keys(defineRenderFields);

      for (var i = 0; i < defineFieldKeys.length; i += 1) {
        var key = defineFieldKeys[i];

        if (type === key) {
          var fn = defineRenderFields[key];

          var _assertThisInitialize = _assertThisInitialized(_this),
              props = _assertThisInitialize.props;

          if (!props[fn]) {
            throw new Error("You need to initialize renderProps of the type \"".concat(type, "\" defined in defineRenderFields prop.\n Eg: <WilForm render").concat(type, "={({ name, label, ...}) => { return <FieldComponent /> }} ... />")).message;
          }

          return props[fn](itemGeneral);
        }
      }

      return _this._throwErrorType(itemGeneral);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleItem", function (item, index, fields) {
      var renderElementWithIndex = _this.props.renderElementWithIndex;
      var render = renderElementWithIndex.render,
          moveByIndex = renderElementWithIndex.moveByIndex;

      var _getIndex = moveByIndex(fields.length);

      var _index = _getIndex > fields.length - 1 ? fields.length - 1 : _getIndex;

      _this._handleErrorItemField(item);

      var elementWithIndex = _react.default.createElement(_react.Fragment, {
        key: "___elementWithIndex___"
      }, render(_this._handleSubmit));

      return [_getIndex < 0 && index === 0 && elementWithIndex, _react.default.createElement(_react.Fragment, {
        key: item.name
      }, _this._renderItem(item)), index === _index && elementWithIndex];
    });

    return _this;
  }

  _createClass(WilForm, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var customSubmit;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                customSubmit = this.props.customSubmit; // setState component ready

                _context4.next = 3;
                return this._setState();

              case 3:
                // xử lý prop onChange
                this._handleFormOnChange(); // customSubmit


                customSubmit(this._handleSubmit);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state4 = this.state,
          result = _this$state4.result,
          fields = _this$state4.fields;

      if (!(0, _ramda.equals)(fields, prevState.fields)) {
        this._setState();
      }

      if (!(0, _ramda.equals)(result, prevState.result)) {
        this._handleFormOnChange();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var fields = this.state.fields;
      return !(0, _ramda.isEmpty)(fields) && fields.map(this._handleItem);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (!(0, _ramda.isEmpty)(prevState.fields) && !(0, _ramda.equals)(nextProps.fields, prevState.fields)) {
        return {
          fields: nextProps.fields
        };
      }

      return null;
    }
  }]);

  return WilForm;
}(_react.Component);

exports.default = WilForm;

_defineProperty(WilForm, "defaultProps", {
  constraints: {},
  defaultResult: {},
  defaultErrors: {},
  onSubmit: function onSubmit(_ref8) {
    var result = _ref8.result,
        valid = _ref8.valid,
        errors = _ref8.errors;
  },
  onChange: function onChange(_ref9) {
    var result = _ref9.result,
        valid = _ref9.valid,
        errors = _ref9.errors;
  },
  customSubmit: function customSubmit(handleSubmit) {},
  renderElementWithIndex: {
    render: function render(handleSubmit) {
      return null;
    },
    moveByIndex: function moveByIndex(dataLength) {
      return dataLength - 1;
    }
  },
  defineRenderFields: {}
});