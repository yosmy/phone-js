import {parsePhoneNumber, ParseError} from 'libphonenumber-js'

const normalize = (number, country = null) => {
    number = number.replace(/ /g,'');
    number = number.replace(/\(/g,'');
    number = number.replace(/\)/g,'');
    number = number.replace(/-/g,'');

    try {
        const result = parsePhoneNumber(number, country);

        return {
            country: result.country,
            prefix: result.countryCallingCode,
            number: result.nationalNumber.toString()
        };
    } catch (error) {
        if (!country) {
            return normalize(number, 'US');
        }

        if (error instanceof ParseError) {
            // Not a phone number, non-existent country, etc.
            throw error.message;
        } else {
            throw error
        }
    }
};

export {
    normalize
}