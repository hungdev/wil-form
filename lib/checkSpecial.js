"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function checkSpecial(_ref) {
  var length = _ref.length,
      presence = _ref.presence,
      special = _ref.special,
      value = _ref.value,
      required = _ref.required;
  return !!special && (!length && value.length > 0 && required || !length && !presence && value.length >= 0 || !required && value.length > 0 || !!length && !presence && value.length > 0 || !!length && !!presence && required && value.length > 0);
}

var _default = checkSpecial;
exports.default = _default;