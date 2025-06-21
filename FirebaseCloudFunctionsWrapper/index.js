/**
 * @module FirebaseCloudFunctionsWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 */

//////////////////////////////////////////////////////////////////////
// Cloud Fetch
/** @private */
let functions;

//////////////////////////////////////////////////////////////////////
// Cloud Functions

/**
 * Initializes the FirebaseCloud function support
 * @param {firebase} firebase
 * @example
 * ```
 * import * as firebase from "firebase/compat/app";
 * import "firebase/functions";
 * import FirebaseFunctions from "@leaddreamer/firebase-wrapper/FirebaseCloudFunctionsWrapper";
 * import {config} from "whereever-you-put-it";
 *
 * ((myconfig) {
 * try {
 *   firebase.app();
 * } catch (err) {
 *   firebase.initializeApp(myconfig);
 * }
 * FirebaseFunctions(firebase);
 * })(config)
 * ```
 */
/**
 * Initializes the Auth service of the provided
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
 * import "firebase/functions";
 * import FirebaseFunctions from "@leaddreamer/firebase-wrapper/FirebaseCloudFunctionsWrapper";
 * import {config} from "whereever-you-put-it";
 *
 * ((myconfig) {
 * try {
 *   firebase.app();
 * } catch (err) {
 *   firebase.initializeApp(myconfig);
 * }
 * FirebaseFunctions(firebase);
 * })(config)
 * ```
 */
export default async function FirebaseCloudFunctions(
  firebase,
  config,
  thisLogger
) {
  if (config?.appId) {
    thisLogger("Cloud Client");
    functions = await firebase.functions();
    return functions;
  }
}

/**
 * Creates the FUNCTION refered to by the passed name.  Said function can
 * *then* be called for the desired results. SYNCHRONOUS
 * @returns {Promise}
 * @fulfil result as returns from call
 * @reject err as returned from call
 * @example
 * ```
 * result = await CloudFunctions("MyGloriousFunction")(argumentToFunction);
 * ```
 */
export function CloudFunctions(name) {
  return functions && functions.httpsCallable(name);
}

/**
 * Cloud Function specific - processes a Params list from
 * a firestore function to create a reference/Id "tree"
 * @param {object} Params
 * @returns {Map}
 */
export function treeFromParams(Params) {
  let tree = new Map();
  Object.keys(Params).forEach((paramName) => {
    tree.set(paramName, Params[paramName]);
  });
  return tree;
}
