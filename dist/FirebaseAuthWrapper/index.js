"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FirebaseAuthWrapper;
exports.setPersistence = exports.attachAuthUserListener = exports.createAnonymousUser = exports.doPasswordUpdate = exports.doSendEmailVerification = exports.doPasswordReset = exports.doSignOut = exports.doSignInWithTwitter = exports.doSignInWithFacebook = exports.doSignInWithGoogle = exports.doSignInWithEmailAndPassword = exports.doCreateUserWithEmailAndPassword = exports.refreshAuthUser = exports.fetchToken = exports.FirebaseAuthSignInOptions = exports.FirebaseAuth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _this = void 0;

/**
 * @module FirebaseAuthWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 */

/**
 * @function FirebaseAuthWrapper
 * @static
 * @description Initializes the Auth service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase
 * @example
 * ```
 * import * as firebase from "firebase/app";
 * import "firebase/auth";
 * import FirebaseAuth from "@leaddreamer/firebase-wrapper/FirebaseAuthWrapper";
 * import {config} from "wherever-you-put-it";
 *
 * ((myconfig) {
 * try {
 *   firebase.app();
 * } catch (err) {
 *   firebase.initializeApp(myconfig);
 * }
 * FirebaseAuth(firebase);
 * })(config)
 * ```
 */
function FirebaseAuthWrapper(firebase) {
  exports.FirebaseAuth = FirebaseAuth = firebase.auth();
  exports.FirebaseAuthSignInOptions = FirebaseAuthSignInOptions = [firebase.auth.GoogleAuthProvider.PROVIDER_ID, //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID //firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ];
  FirebaseAuthPersistence = firebase.auth.Auth.Persistence.LOCAL;
}
/**
 * @var {object} FirebaseAuth
 * @static
 * FirebaseAuth instance for various Login/Logout calls
 */


var FirebaseAuth;
/** @private */

exports.FirebaseAuth = FirebaseAuth;
var FirebaseAuthPersistence;
/**
 * @var {string} [FirebaseAuthSignInOptions]
 * @static
 * ID codes for 3rd party Auth providers
 */

var FirebaseAuthSignInOptions;
/**
 * ----------------------------------------------------------------------
 * @async
 * @function fetchClaims
 * @static
 * fetches our specific custom claim values from firebase auth
 * @param {FirebaseAuthUser} user
 * @return {external:promise}
 * @fulfil Returns a user token object
 * @reject returns err
 */

exports.FirebaseAuthSignInOptions = FirebaseAuthSignInOptions;

var fetchToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var thisUser, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //uses short circuit
            thisUser = user || FirebaseAuth.currentUser;
            _context.next = 3;
            return thisUser.getIdTokenResult(true);

          case 3:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchToken(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @async
 * @function refreshAuthUser
 * @static
 * triggers an update of the Firebase Uth user object.  A listener
 * can be set to monitor these changes
 * @returns {Promise<void>}
 */


exports.fetchToken = fetchToken;

var refreshAuthUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            FirebaseAuth.updateCurrentUser(FirebaseAuth.currentUser);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function refreshAuthUser() {
    return _ref2.apply(this, arguments);
  };
}(); //////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// *** native UI Auth support ***

/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.refreshAuthUser = refreshAuthUser;

var doCreateUserWithEmailAndPassword = function doCreateUserWithEmailAndPassword(email, password) {
  return FirebaseAuth.createUserWithEmailAndPassword(email, password);
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doCreateUserWithEmailAndPassword = doCreateUserWithEmailAndPassword;

var doSignInWithEmailAndPassword = function doSignInWithEmailAndPassword(email, password) {
  return FirebaseAuth.signInWithEmailAndPassword(email, password);
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doSignInWithEmailAndPassword = doSignInWithEmailAndPassword;

var doSignInWithGoogle = function doSignInWithGoogle() {
  return FirebaseAuth.signInWithPopup(_this.googleProvider);
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doSignInWithGoogle = doSignInWithGoogle;

var doSignInWithFacebook = function doSignInWithFacebook() {
  return FirebaseAuth.signInWithPopup(_this.facebookProvider);
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doSignInWithFacebook = doSignInWithFacebook;

var doSignInWithTwitter = function doSignInWithTwitter() {
  return FirebaseAuth.signInWithPopup(_this.twitterProvider);
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doSignInWithTwitter = doSignInWithTwitter;

var doSignOut = function doSignOut() {
  return FirebaseAuth.signOut();
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doSignOut = doSignOut;

var doPasswordReset = function doPasswordReset(email) {
  return FirebaseAuth.sendPasswordResetEmail(email);
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doPasswordReset = doPasswordReset;

var doSendEmailVerification = function doSendEmailVerification() {
  return FirebaseAuth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
  });
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doSendEmailVerification = doSendEmailVerification;

var doPasswordUpdate = function doPasswordUpdate(password) {
  return FirebaseAuth.currentUser.updatePassword(password);
}; // *** Merge Auth and DB User API *** //

/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.doPasswordUpdate = doPasswordUpdate;

var createAnonymousUser = function createAnonymousUser() {
  return FirebaseAuth.signInAnonymously();
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.createAnonymousUser = createAnonymousUser;

var attachAuthUserListener = function attachAuthUserListener(next, fallback) {
  return FirebaseAuth.onIdTokenChanged(next, fallback);
};
/**
 * ----------------------------------------------------------------------
 **********************************************************************/


exports.attachAuthUserListener = attachAuthUserListener;

var setPersistence = function setPersistence() {
  FirebaseAuth.setPersistence(FirebaseAuthPersistence);
};

exports.setPersistence = setPersistence;