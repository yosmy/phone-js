"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var UserProp = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
  country: _propTypes["default"].string.isRequired,
  prefix: _propTypes["default"].string.isRequired,
  number: _propTypes["default"].string.isRequired
})]);

var enrichUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(items, filter, pick, collect, enrich) {
    var users, phones;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(items.length === 0)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", items);

          case 2:
            users = items.filter(filter).map(pick);
            _context.next = 5;
            return collect(users);

          case 5:
            phones = _context.sent;
            items = items.map(function (item) {
              if (!filter(item)) {
                return item;
              }

              var phone = phones.find(function (phone) {
                return phone.user === pick(item);
              });
              return enrich(item, {
                id: phone.user,
                country: phone.country,
                prefix: phone.prefix,
                number: phone.number
              });
            });
            return _context.abrupt("return", items);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function enrichUsers(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  UserProp: UserProp,
  enrichUsers: enrichUsers
};
exports["default"] = _default;