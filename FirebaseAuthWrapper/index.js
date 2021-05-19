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
 * @var {object} FirebaseAuth
 * @static
 * FirebaseAuth instance for various Login/Logout calls
 */
export let FirebaseAuth;

/** @private */
let FirebaseAuthPersistence;

/**
 * @var {string} [FirebaseAuthSignInOptions]
 * @static
 * ID codes for 3rd party Auth providers
 */
export let FirebaseAuthSignInOptions;

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
export const fetchToken = async (user) => {
  //uses short circuit
  const thisUser = user || FirebaseAuth.currentUser;
  const token = await thisUser.getIdTokenResult(true);
  return token;
};

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
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doCreateUserWithEmailAndPassword = (email, password) =>
  FirebaseAuth.createUserWithEmailAndPassword(email, password);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignInWithEmailAndPassword = (email, password) =>
  FirebaseAuth.signInWithEmailAndPassword(email, password);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignInWithGoogle = () =>
  FirebaseAuth.signInWithPopup(this.googleProvider);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignInWithFacebook = () =>
  FirebaseAuth.signInWithPopup(this.facebookProvider);

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const doSignInWithTwitter = () =>
  FirebaseAuth.signInWithPopup(this.twitterProvider);

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
 * ----------------------------------------------------------------------
 **********************************************************************/
export const createAnonymousUser = () => {
  return FirebaseAuth.signInAnonymously();
};

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const attachAuthUserListener = (next, fallback) => {
  return FirebaseAuth.onIdTokenChanged(next, fallback);
};

/**
 * ----------------------------------------------------------------------
 **********************************************************************/
export const setPersistence = () => {
  FirebaseAuth.setPersistence(FirebaseAuthPersistence);
};
