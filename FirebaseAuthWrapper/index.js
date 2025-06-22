/**
* @module FirebaseAuthWrapper/authAdmin
*/
import FirebaseAuthAdminWrapper from "./authAdmin.js";
import FirebaseAuthClientWrapper from "./authClient.js";

/**
 * Initializes the Auth service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase provided firebase app (allows use between client & server)
 * @param {object} config - configuration object to detect client/server use
 * @param {?string} config.appId - missing parameter indicates server
 * @param {callback} thisLogger - passed logging function  (allows use between client & server)
 */
export default async function FirebaseAuthWrapper(
  firebase,
  config,
  thisLogger
) {
  if (!config?.appId) {
    thisLogger("Auth Admin");
    return FirebaseAuthAdminWrapper(firebase, thisLogger);
  } else {
    thisLogger("Auth Client");
    return FirebaseAuthClientWrapper(firebase, thisLogger);
  }
}

export * from "./authClient.js";
export * from "./authAdmin.js";
