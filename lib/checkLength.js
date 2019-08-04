"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function checkLength(_ref) {
  var length = _ref.length,
      presence = _ref.presence,
      special = _ref.special,
      value = _ref.value,
      required = _ref.required;
  return !!length && (!presence && (value.length <= length.minimum || value.length >= length.maximum) || value.length > 0 && (value.length <= length.minimum || value.length >= length.maximum) || !!special && !required && value.length > 0 && (value.length <= length.minimum || value.length >= length.maximum) || required && value.length > 0 && (value.length <= length.minimum || value.length >= length.maximum));
}

var _default = checkLength;
exports.default = _default;