import PropTypes from "prop-types";

const UserProp = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
        country: PropTypes.string.isRequired,
        prefix: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })
]);

const enrichUsers = async (items, filter, pick, collect, enrich) => {
    if (items.length === 0) {
        return items;
    }

    const users = items
        .filter(filter)
        .map(pick);

    const phones = await collect(users);

    items = items.map((item) => {
        if (!filter(item)) {
            return item;
        }

        const phone = phones.find((phone) => {
            return phone.user === pick(item);
        });

        return enrich(
            item,
            {
                id: phone.user,
                country: phone.country,
                prefix: phone.prefix,
                number: phone.number,
            }
        );
    })

    return items;
};

export default {
    UserProp,
    enrichUsers
}