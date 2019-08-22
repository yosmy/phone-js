import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ThemeProvider} from "@yosmy/style";
import theme from '../theme';
import {Phone} from "../src";

storiesOf('Phone', module)
    .add('default', () => (
        <ThemeProvider theme={theme}>
            <Phone
                country="CU"
                prefix="53"
                number="12341234"
            />
        </ThemeProvider>
    ))
    .add('loading', () => (
        <ThemeProvider theme={theme}>
            <Phone
                country={null}
                prefix={null}
                number={null}
            />
            <Phone
                country="CU"
                prefix="53"
                number="12341234"
            />
        </ThemeProvider>
    ))
;