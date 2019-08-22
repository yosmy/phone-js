import React from "react";
import PropTypes from "prop-types";
import {build} from "@yosmy/phone-build";
import {Container, Flag, LinePlaceholder, Text} from "@yosmy/ui";

const PhoneLayout = ({
    children, ...props
}) => {
    return <Container
        flow="row"
        align={{
            main: "flex-start",
            cross: "center"
        }}
        {...props} // key
    >
        {children}
    </Container>
};

const Phone = ({
    country, prefix, number, humanized,
    ...props
}) => {
    let prefixAndNumber;

    if (humanized) {
        const phone = build(number, country, true);

        prefixAndNumber = `+${phone.prefix} ${phone.number}`;
    } else {
        prefixAndNumber = `+${prefix}-${number}`;
    }

    return <PhoneLayout
        {...props}
    >
        <Flag
            country={country}
            size="sm"
        />
        <Text
            margin={{
                left: 1
            }}
        >
            {prefixAndNumber}
        </Text>
    </PhoneLayout>
};

const PhoneProps = {
    country: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    humanized: PropTypes.bool
};

Phone.propTypes = PhoneProps;

const PhonePlaceholder = ({
    ...props
}) => {
    return <PhoneLayout
        {...props}
    >
        <LinePlaceholder
            width={14}
        />
        <LinePlaceholder
            margin={{
                left: 1
            }}
            width={100}
        />
    </PhoneLayout>
};

const PhonePlaceholderProps = {};

export {
    Phone, PhoneProps,
    PhonePlaceholder, PhonePlaceholderProps
};