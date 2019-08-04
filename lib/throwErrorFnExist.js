"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function throwErrorFnExist(fn, type) {
  if (!fn) {
    throw new Error("You need to initialize renderProps of the type \"".concat(type, "\" defined in defineRenderFields prop.\n Eg: <WilForm render").concat(type, "={({ name, label, ...}) => { return <FieldComponent /> }} ... />")).message;
  }
}

var _default = throwErrorFnExist;
exports.default = _default;