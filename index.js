import FirebaseFirestore from "./FirebaseFirestoreWrapper/index.js";
import FirebaseStorage from "./FirebaseStorageWrapper/index.js";
import FirebaseAuthWrapper from "./FirebaseAuthWrapper/index.js";
import FirebaseCloudFunctions from "./FirebaseCloudFunctionsWrapper/index.js";

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
 * only authDomain, databaseURL and storageBucket are present when
 * called from a cloud environment
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
 * all-in-one wrapper for a solid subset of CLIENT-SIDE Firebase
 * functions, with a consistent interface.  There is a parallel set for
 * ADMIN-SIDE functions as well.
 * Call/initialize with Firebase Configuration settings in an object as
 * described below
 * @param {Firebase} firebase Local (client or server) version of firebase app
 * @param {FirebaseConfigObject} config Firebase Admin object
 * @param {callback} thislogger Local (client or server) version of a (console) logger
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
export default async function FirebaseWrapper(firebase, config, thisLogger) {
  const localLogger = thisLogger || (() => {});
  try {
    await firebase.app();
  } catch (err) {
    try {
      await (config?.appId
        ? firebase.initializeApp(config)
        : firebase.initializeApp());

      const happ = await firebase.app();

      localLogger("after init", !!happ);

      await FirebaseAuthWrapper(firebase, config, localLogger);
      localLogger("After Auth");
      await FirebaseFirestore(firebase, config, localLogger);
      localLogger("After Firestore");
      await FirebaseStorage(firebase, config, localLogger);
      localLogger("After Storage");
      return FirebaseCloudFunctions(firebase, config, localLogger);
    } catch (err) {
      console.log("firebase initialize failed");
    }
  }
  return;
}

export * from "./FirebaseFirestoreWrapper/index.js";
export * from "./FirebaseStorageWrapper/index.js";
export * from "./FirebaseAuthWrapper/index.js";
export * from "./FirebaseCloudFunctionsWrapper/index.js";
//export default FirebaseWrapper;
