import {build} from '../src';

test('Number with prefix, inside US', () => {
    expect(
        build('+17865171234', 'US')
    ).toStrictEqual({
        country: 'US',
        prefix: '1',
        number: '7865171234',
    });
});

test('Number without prefix, inside US', () => {
    expect(
        build('7865678912', 'US')
    ).toStrictEqual({
        country: 'US',
        prefix: '1',
        number: '7865678912',
    });
});

test('Cuban number without prefix, inside US', () => {
    expect(
        build('58123456', 'US')
    ).toStrictEqual({
        country: 'CU',
        prefix: '53',
        number: '58123456',
    });
});

test('Cuban number with for reverse call charge, inside US', () => {
    expect(
        build('*9958123456', 'US')
    ).toStrictEqual({
        country: 'CU',
        prefix: '53',
        number: '58123456',
    });
});

test('Cuban number without prefix, inside CU', () => {
    expect(
        build('58123456', 'CU')
    ).toStrictEqual({
        country: 'CU',
        prefix: '53',
        number: '58123456',
    });
});

test('Cuban number with for reverse call charge, inside CU', () => {
    expect(
        build('*9958123456', 'CU')
    ).toStrictEqual({
        country: 'CU',
        prefix: '53',
        number: '58123456',
    });
});

test('Cuban fixed number, inside CU', () => {
    expect(() => {
        build('76902590', 'CU')
    }).toThrow();
});

test('Number, humanized', () => {
    expect(
        build('7865678912', 'US', true)
    ).toStrictEqual({
        country: 'US',
        prefix: '1',
        number: '786 567 8912'
    });
});

test('Cuban number, humanized', () => {
    expect(
        build('53377172', 'CU', true)
    ).toStrictEqual({
        country: 'CU',
        prefix: '53',
        number: '5337 7172'
    });
});