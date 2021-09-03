import firebase from "firebase-admin";
import { version } from "./package.json";

import FirebaseFirestore from "../FirebaseFirestoreWrapper";
import FirebaseStorage from "../FirebaseStorageWrapper";
import FirebaseAuthAdminWrapper from "../FirebaseAuthWrapper/authAdmin";

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
 * @property {!string} projectId required Firebase projectID from Firebase
 * console
 * @property {?string} authDomain (optional) auth domain from Firebase Console
 * @property {?string} databaseURL (optional) Firestore database URL from Firebase
 * console
 * @property {?string} storageBucket: (optional) URL of Firestore Storage Bucket
 * @property {?string} messagingSenderId: (optional) ID for Messaging service from
 * Firebase Console
 * @property {?string} measurementId: (optional) Analytics/Measurement ID from Firebase
 * Console
 */

/**
 * @function FirebaseWrapper
 * @static
 * all-in-one wrapper for a solid subset of CLIENT-SIDE Firebase
 * functions, with a consistent interface.  There is a parallel set for
 * ADMIN-SIDE functions as well.
 * Call/initialize with Firebase Configuration settings in an object as
 * described below
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
const FirebaseWrapper = async () => {
  try {
    firebase.app();
  } catch (err) {
    try {
    firebase.initializeApp();
    } catch (err) {
      console.log("firebase admin initialize failed")
    } finally {
      await Promise.all([
        FirebaseFirestore(firebase),
        FirebaseStorage(firebase, JSON.parse(process.env.FIREBASE_CONFIG)),
        FirebaseAuthAdminWrapper(firebase),
      ])

    }
  }
};

export * from "../FirebaseFirestoreWrapper";
export * from "../FirebaseStorageWrapper";
export * from "../FirebaseAuthWrapper/authAdmin";
export default FirebaseWrapper;
