"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function checkPresence(_ref) {
  var presence = _ref.presence,
      required = _ref.required,
      value = _ref.value;
  return !!presence && required && value.length <= 0;
}

var _default = checkPresence;
exports.default = _default;