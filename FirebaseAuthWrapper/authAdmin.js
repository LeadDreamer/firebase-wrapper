"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FirebaseAuthAdminWrapper;
exports.PageUsers = exports.clearCustomClaims = exports.addCustomClaims = exports.setCustomClaims = exports.DeleteUser = exports.getUser = void 0;

var _defineProperty2 = _interopRequireDefault(
  require("@babel/runtime/helpers/defineProperty")
);

var _regenerator = _interopRequireDefault(
  require("@babel/runtime/regenerator")
);

var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime/helpers/asyncToGenerator")
);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2["default"])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

/**
 * @function FirebaseAuthAdminWrapper
 * @static
 * @description Initializes the administrative Auth service of the provided
 * firebase app.  Also instantiates various constants and helper functions
 * @param {firebase} firebase
 */
function FirebaseAuthAdminWrapper(firebase) {
  FirebaseAuth = firebase.auth();
}
/** @private */

var FirebaseAuth;
/**
 * ----------------------------------------------------------------------
 * @async @function getUser
 * asynchronously fetches user data from Firestore Authentication
 * @param {string} userID
 * @return {Promise<userData>}
 * ----------------------------------------------------------------------
 */

var getUser = function getUser(userID) {
  return FirebaseAuth.getUser(userID);
};
/**
 * ----------------------------------------------------------------------
 * @async @function DeleteUser
 * deletes a single user from the authentication system, identified by user ID
 * @param {!string} userID
 * @return {Promise}
 * ----------------------------------------------------------------------
 */

exports.getUser = getUser;

var DeleteUser = function DeleteUser(userID) {
  return FirebaseAuth.deleteUser(userID);
};
/**
 * ----------------------------------------------------------------------
 * @async @function setCustomClaims
 * sets custom claims on user object
 * BAD IDEA DON'T USE
 * overwrites other needed settings
 * @param {string} uid user ID
 * @param {Object} customClaim claims object, less than 1000 Bytes. null clears
 *
 * ----------------------------------------------------------------------
 */

exports.DeleteUser = DeleteUser;

var setCustomClaims = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/ _regenerator["default"].mark(function _callee(
      uid,
      customClaim
    ) {
      var result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return FirebaseAuth.setCustomUserClaims(uid, customClaim);

            case 2:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );

  return function setCustomClaims(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
/**
 * ----------------------------------------------------------------------
 * @async @function addCustomClaim
 * adds/merges to new claims to user customClaims
 * @param {string} uid user ID
 * @param {Object} customClaim claims object to be merged with existing claims
 * ----------------------------------------------------------------------
 */

exports.setCustomClaims = setCustomClaims;

var addCustomClaims = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/ _regenerator["default"].mark(function _callee2(
      uid,
      customClaims
    ) {
      var ClaimRequest, user, existingClaims, finalResult;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              ClaimRequest = JSON.parse(JSON.stringify(customClaims));
              _context2.next = 3;
              return FirebaseAuth.getUser(uid);

            case 3:
              user = _context2.sent;
              existingClaims = user.customClaims;
              finalResult = _objectSpread(
                _objectSpread({}, existingClaims),
                ClaimRequest
              );
              _context2.next = 8;
              return FirebaseAuth.setCustomUserClaims(uid, finalResult);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );

  return function addCustomClaims(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();
/**
 * ----------------------------------------------------------------------
 * @async @function clearCustomClaims
 * BAD IDEA DON'T USE - it's here for completeness, but there are other settings
 * in the claims we do NOT want to delete
 * removes all current customClaims on user (sets to null)
 * @param {string} uid user ID
 * ----------------------------------------------------------------------
 */

exports.addCustomClaims = addCustomClaims;

var clearCustomClaims = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/ _regenerator["default"].mark(function _callee3(uid) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              return _context3.abrupt(
                "return",
                FirebaseAuth.setCustomUserClaims(uid, null)
              );

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })
  );

  return function clearCustomClaims(_x5) {
    return _ref3.apply(this, arguments);
  };
})();
/**
 * ----------------------------------------------------------------------
 * @async @function PageUsers
 * pages through the full list of users. Woefully inefficient.
 * @param {number} pageSize default 1000
 * @param {object} pageToken default null
 * @returns {
 *   users: [],
 *   token: pageToken
 * }
 * ----------------------------------------------------------------------
 */

exports.clearCustomClaims = clearCustomClaims;

var PageUsers = function PageUsers() {
  var pageSize =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  var pageToken = arguments.length > 1 ? arguments[1] : undefined;
  return FirebaseAuth.listUsers(pageSize, pageToken);
};

exports.PageUsers = PageUsers;
