"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = void 0;

var _mobile = require("libphonenumber-js/mobile");

var build = function build(number, context) {
  var humanized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  number = number.replace(/ /g, '');
  number = number.replace(/\(/g, '');
  number = number.replace(/\)/g, '');
  number = number.replace(/-/g, '');
  var phone; // With prefix?

  if (number.startsWith('+')) {
    phone = (0, _mobile.parsePhoneNumberFromString)(number);

    if (!phone.isValid()) {
      throw new Error("Not a valid mobile number ".concat(number));
    }
  } // With no prefix
  else {
      var cubanNumber = normalizeCubanNumber(number);

      if (number !== cubanNumber) {
        return build(cubanNumber, 'CU', humanized);
      }

      phone = (0, _mobile.parsePhoneNumberFromString)(number, context);

      if (!phone.isValid()) {
        throw new Error("Not a valid mobile number ".concat(number, " in context ").concat(context));
      }
    }

  number = phone.nationalNumber.toString();

  if (humanized) {
    number = humanizeNumber(number, phone.country);
  }

  return {
    country: phone.country,
    prefix: phone.countryCallingCode,
    number: number
  };
};

exports.build = build;

var normalizeCubanNumber = function normalizeCubanNumber(number) {
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

var humanizeNumber = function humanizeNumber(number, country) {
  if (country === 'CU') {
    return humanizeCubaNumber(number);
  }

  var phoneNumber = (0, _mobile.parsePhoneNumberFromString)(number, country);
  var international = phoneNumber.format("INTERNATIONAL");
  number = international.replace("+".concat(phoneNumber.countryCallingCode, " "), '');
  return number;
};

var humanizeCubaNumber = function humanizeCubaNumber(number) {
  number = "".concat(number.substr(0, 4), " ").concat(number.substr(4, 4));
  return number;
};