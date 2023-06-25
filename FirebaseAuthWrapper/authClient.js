import "firebase/auth";
/**
 * @module FirebaseAuthWrapper/authClient
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
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

/**
 * FirebaseAuth instance for various Login/Logout calls
 * @var {object}
 */
export let FirebaseAuth;

/** @private */
let FirebaseAuthPersistence;

/**
 * codes for 3rd party Auth providers
 * @var {Array.string}
 */
export let FirebaseAuthSignInOptions;

/**
 * Initializes the Auth service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase
 */
export default async function FirebaseAuthClient(firebase) {
  FirebaseAuth = firebase.auth();
  FirebaseAuthSignInOptions = [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ];
  FirebaseAuthPersistence = firebase.auth.Auth.Persistence.LOCAL;
}

/**
 * fetches our specific custom claim values from firebase auth
 * @param {FirebaseAuthUser} user
 * @return {Promise.Token}
 * @fulfil Returns a user token object
 * @reject returns err
 */
export async function fetchToken(user) {
  //uses short circuit
  const thisUser = user || FirebaseAuth.currentUser;
  //the "true" below forces a reset
  const token = await thisUser.getIdTokenResult(true);
  return token;
}

/**
 * Fetch a JWT token for authenticated signed requests
 * @param {FirebaseAuthUser} user
 * @returns {Promise<string>}
 * @fulfil Returnsa JWT token
 * @reject returns an err
 */

export async function fetchJWT(user) {
  const thisUser = user || FirebaseAuth.currentUser;
  //the "true" below forces a reset
  const JWT = await thisUser.getIdToken(true);
  return JWT;
}

/**
 * triggers an update of the Firebase Auth user object.  A listener
 * can be set to monitor these changes
 * @returns {Promise.void}
 */
export async function refreshAuthUser() {
  return FirebaseAuth.updateCurrentUser(FirebaseAuth.currentUser);
}

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
 * @typedef {class} AuthCredential
 * @property {string} providerId
 * @property {string} signInMethod
 * @property {method} toJSON
 * @property {method} fromJSON
 */

/**
 * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
 * Returns the current token if it has not expired. Otherwise, this will refresh the token and return a new one.
 * @typedef {method} GetIdToken
 * @param {boolean} forceRefresh
 * @returns {Promise<string>}
 */

/**
 * @typedef {method} Delete
 * @returns {Promise<void>}
 */

/**
 * See https://firebase.google.com/docs/reference/js/v8/firebase.User
 * @typedef {object} User
 * @property {string|null} displayName
 * @property {string|null} email
 * @property {boolean} emailVerified
 * @property {boolean} IsAnonymous
 * @property {UserMetadata} metadata
 * @property {MultiFactorUser} multiFactor
 * @property {string|null} phoneNumber
 * @property {string|null} photoURL
 * @property {UserInfo} providerData
 * @property {string} providerId
 * @property {string} refreshToken
 * @property {string|null} tenantId The current user's tenant ID. This is a
 * read-only property, which indicates the tenant ID used to sign in the
 * current user. This is null if the user is signed in from the parent project.
 * @property {string} uid The user's unique ID.
 * @property {Delete} delete
 * @property {GetIdToken} getIdToken
 */

/**
 * @typedef {object} UserCredential
 * @property {?AdditionalUserInfo} additionalUserInfo
 * @property {AuthCredential} credential
 * @property {?"signin"|"link"|"reauthenticate"} operationType
 * @property {?"User"} user
 */

/**
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
export async function doCreateUserWithEmailAndPassword(email, password) {
  return FirebaseAuth.createUserWithEmailAndPassword(email, password);
}

/**
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
export async function doSignInWithEmailAndPassword(email, password) {
  return FirebaseAuth.signInWithEmailAndPassword(email, password);
}

/**
 * @param {GoogleProvider} googleProvider
 * @returns {Promise<UserCredential>}
 */
export async function doSignInWithGoogle(googleProvider) {
  return FirebaseAuth.signInWithPopup(googleProvider);
}

/**
 * @param {FacebookProvider} facebookProvider
 * @returns {Promise<UserCredential>}
 */
export async function doSignInWithFacebook(facebookProvider) {
  return FirebaseAuth.signInWithPopup(facebookProvider);
}

/**
 * @param {TwitterProvider} twitterProvider
 * @returns {Promise<UserCredential>}
 */
export async function doSignInWithTwitter(twitterProvider) {
  return FirebaseAuth.signInWithPopup(twitterProvider);
}

/**
 * @returns {Promise.void}
 */
export async function doSignOut() {
  return FirebaseAuth.signOut();
}

/**
 * @returns {Promise.void}
 */
export async function doPasswordReset(email) {
  return FirebaseAuth.sendPasswordResetEmail(email);
}

/**
 * @returns {Promise.void}
 */
export async function doSendEmailVerification() {
  return FirebaseAuth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
  });
}

/**
 * @param {!string} password
 * @returns {Promise.void}
 */
export async function doPasswordUpdate(password) {
  return FirebaseAuth.currentUser.updatePassword(password);
}

// *** Merge Auth and DB User API *** //
/**
 * @returns {Promise<UserCredential>}
 **/
export async function createAnonymousUser() {
  return FirebaseAuth.signInAnonymously();
}

/**
 * @callback AuthChangeProcess
 * @param {User} user
 * @returns {Promise.void}
 */

/**
 * @param {AuthChangeProcess} next
 * @return {function} unsubscribe function
 *
 */
export async function attachAuthUserListener(next) {
  return FirebaseAuth.onIdTokenChanged(next);
}

/**
 * @returns {Promise.void}
 */
export async function setPersistence() {
  FirebaseAuth.setPersistence(FirebaseAuthPersistence);
}
