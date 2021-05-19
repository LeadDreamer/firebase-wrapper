/**
 * @module FirebaseStorageWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 */

/**
 * @function FirebaseStorageWrapper
 * @static
 * @description Initializes the Auth service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase
 * @example
 * ```
 * import * as firebase from "firebase/app";
 * import "firebase/storage";
 * import FirebaseStorage from "@leaddreamer/firebase-wrapper/FirebaseStorageWrapper";
 * import {config} from "whereever-you-put-it";
 *
 * ((myconfig) {
 * try {
 *   firebase.app();
 * } catch (err) {
 *   firebase.initializeApp(myconfig);
 * }
 * FirebaseStorage(firebase);
 * })(config);
 * ```
 */
export default function FirebaseStorageWrapper(firebase) {
  FirebaseStorage = firebase.storage();
}

/** @private */
let FirebaseStorage;

/**
 * ----------------------------------------------------------------------
 * @function makeStorageRefFromRecord
 * @static
 * THis function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * The function takes a document record, and combines it with optional key and
 * filename to construct a '/' separated path to a stored item, , and returns a
 * Storage reference to that item.
 * Note this simply makes the Storage Ref - it does not carry out *any* operations
 * @param {string} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {string} key An optional string identifying the specific field an stored
 * item is associated with
 * @param {string} filename an optional name to be associated with the stored item.
 * @returns {StorageReference} a Firestore Storage Reference
 */
export const makeStorageRefFromRecord = (
  record,
  key = null,
  filename = null
) => {
  return record.refPath
    ? FirebaseStorage.ref(
        record.refPath +
          (key ? "/" + key : "") +
          (filename ? "/" + filename : "")
      )
    : null;
};

/**
 * ----------------------------------------------------------------------
 * @function makeFileURLFromRecord
 * @static
 * This function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * This function takes a document record, and combines it with optional key and
 * filename to construct a '/' separated path to a stored item, , and returns a
 * URL that can be used to access that item.
 * Note this simply makes the URL - it does not carry out *any* operations
 * @param {object} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {string} key An optional string identifying the specific field an stored
 * item is associated with
 * @param {string} filename an optional name to be associated with the stored item.
 * @returns {external:promise}
 * @fulfil {string}  a "long-lived" URL to access the file.
 * @reject {string}
 */
export const makeFileURLFromRecord = (record, key = null, filename = null) => {
  return makeStorageRefFromRecord(record).getDownloadURL();
};

/**
 * ----------------------------------------------------------------------
 * @function startBlobInRecord
 * @static
 * Firestore's document sizes can be limited - 1MB - so our system stores
 * larger digital "blobs" in a parallel Firestore Storage.
 * @param {blob} blob A data blob in DataURI format to store in Storage
 * @param {Object} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {?string} key An optional string identifying the specific field an stored
 * item is associated with
 * @param {?string} filename an optional name to be associated with the stored item.
 * @returns {UploadTask} Firestore Storage UploadTask Object
 */
export const startBlobInRecord = (blob, record, key, filename) => {
  const localStorageRef = makeStorageRefFromRecord(record, key, filename);
  return localStorageRef.put(blob);
};

/**
 * ----------------------------------------------------------------------
 * @function getDefaultImageURL
 * @static
 * @param {!string} key name/key of default image file
 */
export const getDefaultImageURL = (key) => {
  let filename = key + ".jpg";
  return Promise.resolve(
    FirebaseStorage.ref("/defaultImages").child(filename).getDownloadURL()
  );
};
