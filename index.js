"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(
  require("@babel/runtime/regenerator")
);

var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime/helpers/asyncToGenerator")
);

var _app = _interopRequireDefault(require("@firebase/app"));

require("@firebase/firestore");

require("@firebase/storage");

require("@firebase/auth");

require("@firebase/functions");

require("firebaseui");

var _StyledFirebaseAuth = _interopRequireDefault(
  require("react-firebaseui/StyledFirebaseAuth")
);

var _FirebaseFirestoreWrapper = _interopRequireDefault(
  require("./FirebaseFirestoreWrapper")
);

Object.keys(_FirebaseFirestoreWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FirebaseFirestoreWrapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FirebaseFirestoreWrapper[key];
    }
  });
});

var _FirebaseStorageWrapper = _interopRequireDefault(
  require("./FirebaseStorageWrapper")
);

Object.keys(_FirebaseStorageWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FirebaseStorageWrapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FirebaseStorageWrapper[key];
    }
  });
});

var _FirebaseAuthWrapper = _interopRequireDefault(
  require("./FirebaseAuthWrapper")
);

Object.keys(_FirebaseAuthWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FirebaseAuthWrapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FirebaseAuthWrapper[key];
    }
  });
});

var _FirebaseCloudFunctionsWrapper = _interopRequireDefault(
  require("./FirebaseCloudFunctionsWrapper")
);

Object.keys(_FirebaseCloudFunctionsWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FirebaseCloudFunctionsWrapper[key])
    return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FirebaseCloudFunctionsWrapper[key];
    }
  });
});

/**
 * @module FirebaseWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth.
 * all-in-one wrapper for a solid subset of CLIENT-SIDE Firebase
 * functions, with a consistent interface.  There is a parallel set for
 * ADMIN-SIDE functions as well.
 * Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 * NOTE:
 * Most helpers return PROMISE.REJECT if no documents are returned.
 * it is assumed projects using this library *might* want to have an
 * explicitly error trap for such events.
 */

/**
 * @typedef {Object} FirebaseConfigObject
 * @property {!string} apiKey required api Key from Firebase Console,
 * @property {!string} appId required app ID from Firebase Console
 * @property {!string} projectId required Firebase projectID from Firebase
 * console
 * @property {?string} authDomain (optional) auth domain from Firebase Console
 * @property {?string} databaseURL (optional) Firestore database URL from Firebase
 * console
 * @property {?string} storageBucket: (optional) URL of Firestore Storage Bucket
 * @property {?string} messagingSenderId: (optional) ID for Messaing service from
 * Firebase Console
 * @property {?string} measurementId: (optional) Analytics/Measurement ID from Firebase
 * Console
 * @property {?string} mapsAPIKey (optional) App ID for Google Maps API, from Google
 */

/**
 * @function FirebaseWrapper
 * @static
 * all-in-one wrapper for a solid subset of CLIENT-SIDE Firebase
 * functions, with a consistent interface.  There is a parallel set for
 * ADMIN-SIDE functions as well.
 * Call/initialize with Firebase Configuration settings in an object as
 * described below
 * @param {FirebaseConfigObject} config Firebase Admin object
 * @return none
 * @example
 * ```
 * //this specifically loads ALL the subsections, specifically for
 * //the Browser.  See later (tbd) notes for NodeJS
 *
 * import FirebaseWrapper from "@leaddreamer/firebase-wrapper";
 * FirebaseWrapper(config); //see below
 * export * from "@leaddreamer/firebase-wrapper";
 * ```
 */
var FirebaseWrapper = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/ _regenerator["default"].mark(function _callee(config) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              try {
                _app["default"].app();
              } catch (err) {
                _app["default"].initializeApp(config);
              }

              (0, _FirebaseFirestoreWrapper["default"])(_app["default"]);
              (0, _FirebaseStorageWrapper["default"])(_app["default"]);
              (0, _FirebaseAuthWrapper["default"])(
                _app["default"],
                _StyledFirebaseAuth["default"]
              );
              (0, _FirebaseCloudFunctionsWrapper["default"])(_app["default"]);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );

  return function FirebaseWrapper(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _default = FirebaseWrapper;
exports["default"] = _default;
