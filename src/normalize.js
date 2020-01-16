import {parsePhoneNumberFromString} from 'libphonenumber-js/mobile'

const normalize = (number, context) => {
    number = number.replace(/ /g,'');
    number = number.replace(/\(/g,'');
    number = number.replace(/\)/g,'');
    number = number.replace(/-/g,'');

    let result;

    // With prefix?
    if (
        number.startsWith('+')
    ) {
        result = parsePhoneNumberFromString(number);

        if (!result.isValid()) {
            throw new Error(`Not a valid mobile number ${number}`);
        }
    }
    // With no prefix
    else {
        const cubanNumber = normalizeCuban(number);

        if (number !== cubanNumber) {
            return normalize(cubanNumber, 'CU');
        }

        result = parsePhoneNumberFromString(number, context);

        if (!result.isValid()) {
            throw new Error(`Not a valid mobile number ${number} in context ${context}`);
        }
    }

    return {
        country: result.country,
        prefix: result.countryCallingCode,
        number: result.nationalNumber.toString()
    };
};

const normalizeCuban = (number) => {
    // Cuba national mobile number
    if (
        number.length === 8
        && number.startsWith('5')
    ) {
        number = `+53${number}`;
    }
    // Making reverse call charge?
    // Will be made with prefix *99
    else if (
        number.length === 11
        && number.startsWith('*99')
    ) {
        number = number.substr(3, 8);

        number = `+53${number}`;
    }
    // Receiving reverse call charge?
    // Will be received as 99xxxxxxxx99
    else if (
        number.length === 12
        && number.startsWith('99')
        && number.endsWith('99')
    ) {
        number = number.substr(2, 8);

        number = `+53${number}`;
    }

    return number
};

export default normalize;