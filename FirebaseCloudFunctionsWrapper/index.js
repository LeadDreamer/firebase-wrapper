import "firebase/functions";

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
 * import * as firebase from "firebase/app";
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
export default async function FirebaseCloudFunctions(firebase, config) {
  if (config?.appId) functions = firebase.functions();
  return Promise.resolve(null);
}

/**
 * Calls the cloud function named in the passed argument, and
 * asynchronously returns the result
 * @returns {Promise}
 * @fulfil result as returns from call
 * @reject err as returned from call
 * @example
 * ```
 * result = await CloudFunctions("MyGloriousFunction")(argumentToFunction);
 * ```
 */
export async function CloudFunctions(name) {
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
