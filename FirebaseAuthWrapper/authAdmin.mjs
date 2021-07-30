/**
 * @function FirebaseAuthAdminWrapper
 * @static
 * @description Initializes the administrative Auth service of the provided
 * firebase app.  Also instantiates various constants and helper functions
 * @param {firebase} firebase
 */
export default function FirebaseAuthAdminWrapper(firebase) {
  FirebaseAuth = firebase.auth();
}

/** @private */
let FirebaseAuth;

/**
 *
 * @async
 * @function
 * asynchronously fetches user data from Firestore Authentication
 * @param {string} userID
 * @return {Promise<userData>}
 *
 */

export const getUser = (userID) => {
  return FirebaseAuth.getUser(userID);
};

/**
 *
 * @async
 * @function
 * deletes a single user from the authentication system, identified by user ID
 * @param {!string} userID
 * @return {Promise}
 *
 */

export const DeleteUser = (userID) => {
  return FirebaseAuth.deleteUser(userID);
};

/**
 *
 * @async
 * @function
 * sets custom claims on user object
 * BAD IDEA DON'T USE
 * overwrites other needed settings
 * @param {string} uid user ID
 * @param {Object} customClaim claims object, less than 1000 Bytes. null clears
 *
 *
 */

export const setCustomClaims = async (uid, customClaim) => {
  const result = await FirebaseAuth.setCustomUserClaims(uid, customClaim);
  return result;
};

/**
 *
 * @async
 * @function
 * adds/merges to new claims to user customClaims
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
 *
 * @async
 * @function
 * BAD IDEA DON'T USE - it's here for completeness, but there are other settings
 * in the claims we do NOT want to delete
 * removes all current customClaims on user (sets to null)
 * @param {string} uid user ID
 *
 */

export const clearCustomClaims = async (uid) => {
  return FirebaseAuth.setCustomUserClaims(uid, null);
};

/**
 *
 * @async
 * @function
 * pages through the full list of users. Woefully inefficient.
 * @param {number} pageSize default 1000
 * @param {object} pageToken default null
 *
 */

export const PageUsers = (pageSize = 1000, pageToken) => {
  return FirebaseAuth.listUsers(pageSize, pageToken);
};
