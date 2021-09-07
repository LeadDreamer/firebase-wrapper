import firebase from "@firebase/app";
import "@firebase/app";


import FirebaseFirestore from "./FirebaseFirestoreWrapper";
import FirebaseStorage from "./FirebaseStorageWrapper";
import FirebaseAuthWrapper from "./FirebaseAuthWrapper";
import FirebaseCloudFunctions from "./FirebaseCloudFunctionsWrapper";

/**
 * @module FirebaseWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth.
 * all-in-one wrapper for a solid subset of CLIENT-SIDE Firebase
 * functions, with a consistent interface.  There is a parallel set for
 * ADMIN-SIDE functions as well.
 * Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 * NOTE:
 * Most helpers return PROMISE.REJECT if no documents are returned.
 * it is assumed projects using this library *might* want to have an
 * explicitly error trap for such events.
 */

/**
 * @typedef {Object} FirebaseConfigObject
 * @property {!string} apiKey required api Key from Firebase Console,
 * @property {!string} appId required app ID from Firebase Console
 * @property {!string} projectId required Firebase projectID from Firebase
 * console
 * @property {?string} authDomain (optional) auth domain from Firebase Console
 * @property {?string} databaseURL (optional) Firestore database URL from Firebase
 * console
 * @property {?string} storageBucket: (optional) URL of Firestore Storage Bucket
 * @property {?string} messagingSenderId: (optional) ID for Messaing service from
 * Firebase Console
 * @property {?string} measurementId: (optional) Analytics/Measurement ID from Firebase
 * Console
 * @property {?string} mapsAPIKey (optional) App ID for Google Maps API, from Google
 */

/**
 * @function FirebaseWrapper
 * @static
 * all-in-one wrapper for a solid subset of CLIENT-SIDE Firebase
 * functions, with a consistent interface.  There is a parallel set for
 * ADMIN-SIDE functions as well.
 * Call/initialize with Firebase Configuration settings in an object as
 * described below
 * @param {FirebaseConfigObject} config Firebase Admin object
 * @return none
 * @example
 * ```
 * //this specifically loads ALL the subsections, specifically for
 * //the Browser.  See later (tbd) notes for NodeJS
 *
 * import FirebaseWrapper from "@leaddreamer/firebase-wrapper";
 * FirebaseWrapper(config); //see below
 * export * from "@leaddreamer/firebase-wrapper";
 * ```
 */
const FirebaseWrapper = async (config) => {
  try {
    firebase.app();
  } catch (err) {
    try {
    firebase.initializeApp(config?.appId ? config : null);
    } catch (err) {
      console.log("firebase initialize failed")
    }
  }
  await Promise.all([
    FirebaseAuthWrapper(firebase, config),
    FirebaseFirestore(firebase, config),
    FirebaseStorage(firebase, config),
    FirebaseCloudFunctions(firebase, config)
  ])
  return;
};

export * from "./FirebaseFirestoreWrapper";
export * from "./FirebaseStorageWrapper";
export * from "./FirebaseAuthWrapper";
export * from "./FirebaseCloudFunctionsWrapper";
export default FirebaseWrapper;
