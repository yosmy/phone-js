import {enrich} from '../src';

test('Enrich users on empty list', () => {
    return enrich.enrichUsers(
        [],
        () => {},
        () => {},
        () => {},
        () => {}
    )
        .then((items) => {
            expect(
                items
            ).toStrictEqual([]);
        })
});

test('Enrich users on normal list', () => {
    return enrich.enrichUsers(
        [
            {
                type: "type-1",
                user: "user-1"
            },
            {
                type: "type-2",
                user: "user-2"
            }
        ],
        (item) => {
            return item.type === "type-2"
        },
        (item) => {
            return item.user;
        },
        async () => {
            return [
                {
                    user: "user-1",
                    country: "country-1",
                    prefix: "prefix-1",
                    number: "number-1",
                },
                {
                    user: "user-2",
                    country: "country-2",
                    prefix: "prefix-2",
                    number: "number-2",
                }
            ];
        },
        (item, user) => {
            return {
                ...item,
                user: user
            }
        }
    )
        .then((items) => {
            expect(
                items
            ).toStrictEqual([
                {
                    type: "type-1",
                    user: "user-1"
                },
                {
                    type: "type-2",
                    user: {
                        id: "user-2",
                        country: "country-2",
                        prefix: "prefix-2",
                        number: "number-2",
                    }
                }
            ]);
        })
});