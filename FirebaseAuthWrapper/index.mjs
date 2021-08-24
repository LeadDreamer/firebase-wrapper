import "@firebase/app";
import "@firebase/auth";
import "firebaseui";
/**
 * @module FirebaseAuthWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 */

/**
 * @var {object} FirebaseAuth
 * @static
 * FirebaseAuth instance for various Login/Logout calls
 */
let FirebaseAuth;

/** @private */
let FirebaseAuthPersistence;

/**
 * @var {string} [FirebaseAuthSignInOptions]
 * @static
 * ID codes for 3rd party Auth providers
 */
let FirebaseAuthSignInOptions;

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
 * //the next is optional - if you want the React component
 * import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
 * import {config} from "wherever-you-put-it";
 *
 * ((myconfig) {
 * try {
 *   firebase.app();
 * } catch (err) {
 *   firebase.initializeApp(myconfig);
 * }
 * FirebaseAuth(firebase, StyledFirebaseAuth);
 * })(config)
 * ```
 */
export default function FirebaseAuthWrapper(firebase) {
  FirebaseAuth = firebase.auth();
  FirebaseAuthSignInOptions = [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ];
  FirebaseAuthPersistence = firebase.auth.Auth.Persistence.LOCAL;
}

/**
 * ----------------------------------------------------------------------
 * @async
 * @function fetchToken
 * @static
 * fetches our specific custom claim values from firebase auth
 * @param {FirebaseAuthUser} user
 * @return {external:promise}
 * @fulfil Returns a user token object
 * @reject returns err
 */
export const fetchToken = async (user) => {
  //uses short circuit
  const thisUser = user || FirebaseAuth.currentUser;
  //the "true" below forces a reset
  const token = await thisUser.getIdTokenResult(true);
  return token;
};

/**
 * @async
 * @static
 * Fetch a JWT token for authenticated signed requests
 * @param {FirebaseAuthUser} user
 * @returns {Promise<JWT>}
 * @fulfil Returnsa JWT token
 * @reject returns an err
 */

 export const fetchJWT = async (user) => {
  const thisUser = user || FirebaseAuth.currentUser;
  //the "true" below forces a reset
  const JWT = await thisUser.getIdToken(true);
  return JWT;

 }

/**
 * @async
 * @function refreshAuthUser
 * @static
 * triggers an update of the Firebase Uth user object.  A listener
 * can be set to monitor these changes
 * @returns {Promise<void>}
 */
export const refreshAuthUser = async () => {
  FirebaseAuth.updateCurrentUser(FirebaseAuth.currentUser);
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// *** native UI Auth support ***

/**
 * @typedef {object} AdditionalUserInfo
 * @property {!boolean} isNewUser
 * @property {?object} profile
 * @property {!string} providerId
 * @property {?string} username
 */

/**
 * @typedef {object} AuthCredential
 * @property {string} providerId
 * @property {string} signInMethod
 * @method toJSON
 * @method fromJSON
 */

/**
 * @typedef {object} User
 * See https://firebase.google.com/docs/reference/js/firebase.User
 */

/**
 * @typedef {object} UserCredential
 * @property {?AdditionalUserInfo} additionalUserInfo
 * @property {AuthCredential} credential
 * @property {?"signin"|"link"|"reauthenticate"} operationType
 * @property {?"User"} user
 */

/**
 * @async
 * @function doCreateUserWithEmailAndPassword
 * @static
 * Creates AND SIGNS IN an authenticated user with the provided email and password
 * Creates a new user account associated with the specified email
 * address and password.
 * On successful creation of the user account, this user will also be
 * signed in to your application.
 * User account creation can fail if the account already exists or the
 * password is invalid.
 * Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const doCreateUserWithEmailAndPassword = (email, password) =>
  FirebaseAuth.createUserWithEmailAndPassword(email, password);

/**
 * @async
 * @function doSignInWithEmailAndPassword
 * @static
 * SIGNS IN an existing authenticated user with the provided email and password
 * Creates a new user account associated with the specified email
 * address and password.
 * On successful creation of the user account, this user will also be
 * signed in to your application.
 * User account creation can fail if the account already exists or the
 * password is invalid.
 * Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const doSignInWithEmailAndPassword = (email, password) =>
  FirebaseAuth.signInWithEmailAndPassword(email, password);

/**
 *
 */

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignInWithGoogle = (googleProvider) =>
  FirebaseAuth.signInWithPopup(googleProvider);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignInWithFacebook = (facebookProvider) =>
  FirebaseAuth.signInWithPopup(facebookProvider);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignInWithTwitter = (twitterProvider) =>
  FirebaseAuth.signInWithPopup(twitterProvider);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignOut = () => {
  return FirebaseAuth.signOut();
};

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doPasswordReset = (email) =>
  FirebaseAuth.sendPasswordResetEmail(email);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSendEmailVerification = () =>
  FirebaseAuth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
  });

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doPasswordUpdate = (password) =>
  FirebaseAuth.currentUser.updatePassword(password);

// *** Merge Auth and DB User API *** //
/**
 * @async
 * @function
 * @returns {Promise<UserCredential>}
 **/
export const createAnonymousUser = () => {
  return FirebaseAuth.signInAnonymously();
};

/**
 * @callback AuthChangeProcess
 * @param {User} user
 */

/**
 * @function attachAuthUserListener
 * @static
 * @property {AuthChangeProcess} next
 * @return {callback} unsubscribe function
 *
 **********************************************************************/
export const attachAuthUserListener = (next) => {
  return FirebaseAuth.onIdTokenChanged(next);
};

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const setPersistence = () => {
  FirebaseAuth.setPersistence(FirebaseAuthPersistence);
};

export {FirebaseAuth, FirebaseAuthSignInOptions};
