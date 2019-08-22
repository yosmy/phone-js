"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonePlaceholderProps = exports.PhonePlaceholder = exports.PhoneProps = exports.Phone = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _phoneBuild = require("@yosmy/phone-build");

var _ui = require("@yosmy/ui");

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PhoneLayout = function PhoneLayout(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["children"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ui.Container, _objectSpread(_objectSpread({
    flow: "row",
    align: {
      main: "flex-start",
      cross: "center"
    }
  }, props), {}, {
    children: children
  }));
};

var Phone = function Phone(_ref2) {
  var country = _ref2.country,
      prefix = _ref2.prefix,
      number = _ref2.number,
      humanized = _ref2.humanized,
      props = (0, _objectWithoutProperties2["default"])(_ref2, ["country", "prefix", "number", "humanized"]);
  var prefixAndNumber;

  if (humanized) {
    var phone = (0, _phoneBuild.build)(number, country, true);
    prefixAndNumber = "+".concat(phone.prefix, " ").concat(phone.number);
  } else {
    prefixAndNumber = "+".concat(prefix, "-").concat(number);
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(PhoneLayout, _objectSpread(_objectSpread({}, props), {}, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ui.Flag, {
      country: country,
      size: "sm"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ui.Text, {
      margin: {
        left: 1
      },
      children: prefixAndNumber
    })]
  }));
};

exports.Phone = Phone;
var PhoneProps = {
  country: _propTypes["default"].string.isRequired,
  prefix: _propTypes["default"].string.isRequired,
  number: _propTypes["default"].string.isRequired,
  humanized: _propTypes["default"].bool
};
exports.PhoneProps = PhoneProps;
Phone.propTypes = PhoneProps;

var PhonePlaceholder = function PhonePlaceholder(_ref3) {
  var props = (0, _extends2["default"])({}, _ref3);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(PhoneLayout, _objectSpread(_objectSpread({}, props), {}, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ui.LinePlaceholder, {
      width: 14
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ui.LinePlaceholder, {
      margin: {
        left: 1
      },
      width: 100
    })]
  }));
};

exports.PhonePlaceholder = PhonePlaceholder;
var PhonePlaceholderProps = {};
exports.PhonePlaceholderProps = PhonePlaceholderProps;