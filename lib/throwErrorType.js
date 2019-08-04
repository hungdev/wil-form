"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var isDev = process.env.NODE_ENV === "development";

function throwErrorType(item, defineRenderFields) {
  var getDefineTypeKey = Object.keys(defineRenderFields);

  if (isDev) {
    var error = new Error(!item.type ? "You need to pass the type property: ".concat(JSON.stringify(item)) : "You need to use the defineRenderFields prop to define the render type of a \"type\".\nEg: <WilForm defineRenderFields={{ ".concat(item.type, ": \"render").concat(item.type, "\" }} render").concat(item.type, "={...} ... />.\nOr use the previously defined type ").concat(JSON.stringify(getDefineTypeKey)));
    throw error.message;
  }
}

var _default = throwErrorType;
exports.default = _default;