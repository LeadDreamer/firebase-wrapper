/**
 * @module FirebaseFirestoreWrapperAdmin
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 */
import {getFirestore} from "firebase-admin/firestore";

/**
 * Initializes the Firestore service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase provided firebase app (allows use between client & server)
 * @param {object} config - configuration object to detect client/server use
 * @param {?string} config.appId - missing parameter indicates server
 * @param {callback} thisLogger - passed logging function  (allows use between client & server)
 * @returns {Promise<object|void>}
 * @example
 * ```
 * import * as firebase from "firebase/compat/app";
 * import "firebase/firestore";
 * import FirebaseFirestore from "@leaddreamer/firebase-wrapper/FirebaseFirestoreWrapper";
 * import {config} from "whereever-you-put-it";
 *
 * ((myconfig) {
 * try {
 *   firebase.app();
 * } catch (err) {
 *   firebase.initializeApp(myconfig);
 * }
 * FirebaseFirestore(firebase);
 * })(config)
 * ```
 */
export default function adminFirestore(thisLogger) {
  thisLogger(`Starting adminFirebaseFirestore`);
  const adminFDB = getFirestore();
  thisLogger("fdb? ", !!adminFDB);
  return adminFDB;
}
