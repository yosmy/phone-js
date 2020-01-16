"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mobile = require("libphonenumber-js/mobile");

var normalize = function normalize(number, context) {
  number = number.replace(/ /g, '');
  number = number.replace(/\(/g, '');
  number = number.replace(/\)/g, '');
  number = number.replace(/-/g, '');
  var result; // With prefix?

  if (number.startsWith('+')) {
    result = (0, _mobile.parsePhoneNumberFromString)(number);

    if (!result.isValid()) {
      throw new Error("Not a valid mobile number ".concat(number));
    }
  } // With no prefix
  else {
      var cubanNumber = normalizeCuban(number);

      if (number !== cubanNumber) {
        return normalize(cubanNumber, 'CU');
      }

      result = (0, _mobile.parsePhoneNumberFromString)(number, context);

      if (!result.isValid()) {
        throw new Error("Not a valid mobile number ".concat(number, " in context ").concat(context));
      }
    }

  return {
    country: result.country,
    prefix: result.countryCallingCode,
    number: result.nationalNumber.toString()
  };
};

var normalizeCuban = function normalizeCuban(number) {
  // Cuba national mobile number
  if (number.length === 8 && number.startsWith('5')) {
    number = "+53".concat(number);
  } // Making reverse call charge?
  // Will be made with prefix *99
  else if (number.length === 11 && number.startsWith('*99')) {
      number = number.substr(3, 8);
      number = "+53".concat(number);
    } // Receiving reverse call charge?
    // Will be received as 99xxxxxxxx99
    else if (number.length === 12 && number.startsWith('99') && number.endsWith('99')) {
        number = number.substr(2, 8);
        number = "+53".concat(number);
      }

  return number;
};

var _default = normalize;
exports["default"] = _default;