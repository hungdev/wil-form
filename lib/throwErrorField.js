"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function throwErrorField(item) {
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
}

var _default = throwErrorField;
exports.default = _default;