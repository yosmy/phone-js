import normalize from '../src/normalize';

test('Number with prefix, inside US', () => {
    expect(
        normalize('+17025171234', 'US')
    ).toStrictEqual({
        "country": "US",
        "number": "7025171234",
        "prefix": "1"
    });
});

test('Number without prefix, inside US', () => {
    expect(
        normalize('7025173737', 'US')
    ).toStrictEqual({
        "country": "US",
        "number": "7025173737",
        "prefix": "1"
    });
});

test('Cuban number without prefix, inside US', () => {
    expect(
        normalize('58123456', 'US')
    ).toStrictEqual({
        "country": "CU",
        "number": "58123456",
        "prefix": "53"
    });
});

test('Cuban number with for reverse call charge, inside US', () => {
    expect(
        normalize('*9958123456', 'US')
    ).toStrictEqual({
        "country": "CU",
        "number": "58123456",
        "prefix": "53"
    });
});

test('Cuban number without prefix, inside CU', () => {
    expect(
        normalize('58123456', 'CU')
    ).toStrictEqual({
        "country": "CU",
        "number": "58123456",
        "prefix": "53"
    });
});

test('Cuban number with for reverse call charge, inside CU', () => {
    expect(
        normalize('*9958123456', 'CU')
    ).toStrictEqual({
        "country": "CU",
        "number": "58123456",
        "prefix": "53"
    });
});

test('Cuban fixed number, inside CU', () => {
    expect(() => {
        normalize('76902590', 'CU')
    }).toThrow();
});