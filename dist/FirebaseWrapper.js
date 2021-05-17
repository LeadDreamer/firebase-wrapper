"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = FirebaseWrapper;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/firestore");

require("firebase/storage");

require("firebase/auth");

require("firebase/functions");

var _FirebaseFirestoreWrapper = _interopRequireWildcard(
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

var _FirebaseStorageWrapper = _interopRequireWildcard(
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

var _FirebaseAuthWrapper = _interopRequireWildcard(
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

var _FirebaseCloudFunctionsWrapper = _interopRequireWildcard(
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

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

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
function FirebaseWrapper(config) {
  try {
    _app["default"].app();
  } catch (err) {
    _app["default"].initializeApp(config);
  }

  (0, _FirebaseFirestoreWrapper["default"])(_app["default"]);
  (0, _FirebaseStorageWrapper["default"])(_app["default"]);
  (0, _FirebaseAuthWrapper["default"])(_app["default"]);
  (0, _FirebaseCloudFunctionsWrapper["default"])(_app["default"]);
}
