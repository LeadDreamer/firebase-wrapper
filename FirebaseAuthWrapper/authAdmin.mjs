/**
 * @module FirebaseAuthWrapper/authAdmin
 * @description A set of helpers around Firebase admin SDK auth.
 * Specific to use in Cloud Functions
 */

/**
 * Initializes the administrative Auth service of the provided
 * firebase app.  Also instantiates various constants and helper functions
 * @static
 * @function FirebaseAuthAdminWrapper
 * @param {firebase} firebase
 */
export default function FirebaseAuthAdminWrapper(firebase) {
  FirebaseAuth = firebase.auth();
}

/** @private */
let FirebaseAuth;

/**
 * asynchronously fetches user data from Firestore Authentication
 * @async
 * @function getUser
 * @param {string} userID
 * @return {Promise<userData>}
 *
 */
export const getUser = (userID) => {
  return FirebaseAuth.getUser(userID);
};

/**
 * deletes a single user from the authentication system, identified by user ID
 * @async
 * @function DeleteUser
 * @param {!string} userID
 * @return {Promise}
 *
 */
export const DeleteUser = (userID) => {
  return FirebaseAuth.deleteUser(userID);
};

/**
 * sets custom claims on user object
 * overwrites other needed settings
 * @async
 * @function setCustomClaims
 * @param {string} uid user ID
 * @param {Object} customClaim claims object, less than 1000 Bytes. null clears
 */
export const setCustomClaims = async (uid, customClaim) => {
  const result = await FirebaseAuth.setCustomUserClaims(uid, customClaim);
  return result;
};

/**
 * adds/merges to new claims to user customClaims
 * @async
 * @function addCustomClaims
 * @param {string} uid user ID
 * @param {Object} customClaim claims object to be merged with existing claims
 *
 */

export const addCustomClaims = async (uid, customClaims) => {
  const ClaimRequest = JSON.parse(JSON.stringify(customClaims));
  const user = await FirebaseAuth.getUser(uid);
  const existingClaims = user.customClaims;
  const finalResult = {
    ...existingClaims,
    ...ClaimRequest
  };
  await FirebaseAuth.setCustomUserClaims(uid, finalResult);
};

/**
 * removes all current customClaims on user (sets to null)
 * @async
 * @function clearCustomClaims
 * @param {string} uid user ID
 */
export const clearCustomClaims = async (uid) => {
  return FirebaseAuth.setCustomUserClaims(uid, null);
};

/**
 * pages through the full list of users. Woefully inefficient.
 * @async
 * @function PageUsers
 * @param {number} pageSize default 1000
 * @param {object} pageToken default null
 */
export const PageUsers = (pageSize = 1000, pageToken) => {
  return FirebaseAuth.listUsers(pageSize, pageToken);
};
