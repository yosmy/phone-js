import {parsePhoneNumberFromString} from 'libphonenumber-js/mobile'

const build = (number, context, humanized = false) => {
    number = number.replace(/ /g,'');
    number = number.replace(/\(/g,'');
    number = number.replace(/\)/g,'');
    number = number.replace(/-/g,'');

    let phone;

    // With prefix?
    if (
        number.startsWith('+')
    ) {
        phone = parsePhoneNumberFromString(number);

        if (!phone.isValid()) {
            throw new Error(`Not a valid mobile number ${number}`);
        }
    }
    // With no prefix
    else {
        const cubanNumber = normalizeCubanNumber(number);

        if (number !== cubanNumber) {
            return build(cubanNumber, 'CU', humanized);
        }

        phone = parsePhoneNumberFromString(number, context);

        if (!phone.isValid()) {
            throw new Error(`Not a valid mobile number ${number} in context ${context}`);
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

const normalizeCubanNumber = (number) => {
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

const humanizeNumber = (number, country) => {
    if (country === 'CU') {
        return humanizeCubaNumber(number);
    }

    const phoneNumber = parsePhoneNumberFromString(number, country);

    const international = phoneNumber.format("INTERNATIONAL");

    number = international.replace(`+${phoneNumber.countryCallingCode} `, '');

    return number;
};

const humanizeCubaNumber = (number) => {
    number = `${number.substr(0, 4)} ${number.substr(4, 4)}`;

    return number;
};

export {build};