'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.normalize = undefined;

var _libphonenumberJs = require('libphonenumber-js');

var normalize = function normalize(number) {
    var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    number = number.replace(/ /g, '');
    number = number.replace(/\(/g, '');
    number = number.replace(/\)/g, '');
    number = number.replace(/-/g, '');

    try {
        var result = (0, _libphonenumberJs.parsePhoneNumber)(number, country);

        return {
            country: result.country,
            prefix: result.countryCallingCode,
            number: result.nationalNumber.toString()
        };
    } catch (error) {
        if (!country) {
            return normalize(number, 'US');
        }

        if (error instanceof _libphonenumberJs.ParseError) {
            // Not a phone number, non-existent country, etc.
            throw error.message;
        } else {
            throw error;
        }
    }
};

exports.normalize = normalize;