/**
 * @module FirebaseAuthWrapper/authAdmin
 * @description A set of helpers around Firebase admin SDK auth.
 * Specific to use in Cloud Functions
 */

/**
 * Initializes the administrative Auth service of the provided
 * firebase app.  Also instantiates various constants and helper functions
 * @param {firebase} firebase
 */
export default async function FirebaseAuthAdminWrapper(firebase) {
  FirebaseAuth = firebase.auth();
}

/** @private */
let FirebaseAuth;

/**
 * asynchronously fetches user data from Firestore Authentication
 * @param {string} userID
 * @return {Promise.userData}
 */
export async function getUser(userID) {
  return FirebaseAuth.getUser(userID);
}

/**
 * deletes a single user from the authentication system, identified by user ID
 * @param {!string} userID
 * @return {Promise.void}
 */
export async function DeleteUser(userID) {
  return FirebaseAuth.deleteUser(userID);
}

/**
 * sets custom claims on user object - overwrites other needed settings
 * @param {string} uid user ID
 * @param {Object} customClaim claims object, less than 1000 Bytes. null clears
 * @returns {Promise.object}
 */
export async function setCustomClaims(uid, customClaim) {
  const result = await FirebaseAuth.setCustomUserClaims(uid, customClaim);
  return result;
}

/**
 * adds/merges to new claims to user customClaims
 * @param {string} uid user ID
 * @param {Object} customClaim claims object to be merged with existing claims
 * @returns {Promise.object}
 */
export async function addCustomClaims(uid, customClaims) {
  const ClaimRequest = JSON.parse(JSON.stringify(customClaims));
  const user = await FirebaseAuth.getUser(uid);
  const existingClaims = user.customClaims;
  const finalResult = {
    ...existingClaims,
    ...ClaimRequest,
  };
  await FirebaseAuth.setCustomUserClaims(uid, finalResult);
}

/**
 * removes all current customClaims on user (sets to null)
 * @param {string} uid user ID
 * @returns {Promise.void}
 */
export async function clearCustomClaims(uid) {
  return FirebaseAuth.setCustomUserClaims(uid, null);
}

/**
 * pages through the full list of users. Woefully inefficient.
 * @param {number} pageSize default 1000
 * @param {object} pageToken default null
 * @returns {Promise.Array.object}
 */
export async function PageUsers(pageSize = 1000, pageToken = null) {
  return FirebaseAuth.listUsers(pageSize, pageToken);
}
