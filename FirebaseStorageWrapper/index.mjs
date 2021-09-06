import "@firebase/storage";
import FirebaseStorageAdminEmulator from "./adminStorage.mjs";

/**
 * @module FirebaseStorageWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 */
//import FirebaseStorageAdminEmulator from "./adminStorage";

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
export default async function FirebaseStorageWrapper(firebase, config) {
  FirebaseStorage = firebase.storage();
  if (typeof firebase.storage().bucket === "function") {
    //FirebaseStorageAdminEmulator = await import("./adminStorage");
    FirebaseStorage = FirebaseStorageAdminEmulator(firebase);
  };

  bucket_name = config.storageBucket;
  return;
}

let FirebaseStorage;
const bucket_domain = "https://firebasestorage.googleapis.com/v0/b/";
const bucket_head = "/o/";
let bucket_name;

//URL = `${bucket_domain}${bucket_name}${bucket_head}${fullPath}?alt=${filetype_parameter}`;

export const getPrivateURL = (ref) => {
  return makePrivateURLFromPath(ref.fullPath)
}

function getPrivateURLHack(){
  return makePrivateURLFromPath(this.fullPath)
}

//////////////////////////////////////////////////////////////////////
// *** Storage API ***
/**
 *These functions are part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 */

/**
 * ----------------------------------------------------------------------
 * @function
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
  let ref = record.refPath
    ? FirebaseStorage.ref(`${record.refPath}${(key ? "/" + key : "")}${(filename ? "/" + filename : "")}`)
    : null;

  if (ref) {
      ref.getPrivateURL = getPrivateURLHack;
  }
  return ref;
};

/**
 * ----------------------------------------------------------------------
 * @function
 * @static
 * This function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * This function takes a document record, and combines it with optional key and
 * filename to construct a '/' separated path to a stored item, , and returns a
 * URL that can be used to access that item.
 * Note this simply makes the URL - it does not carry out *any* operations
 * @param {RecordObject} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {string} key An optional string identifying the specific field an stored
 * item is associated with
 * @param {string} filename an optional name to be associated with the stored item.
 * @returns {external:promise}
 * @fulfil {string}  a "long-lived" URL to access the file.
 * @reject {string}
 */
export const makeFileURLFromRecord = (record, key = null, filename = null) => {
  return makeStorageRefFromRecord(record, key, filename).getDownloadURL();
};

/**
 * ----------------------------------------------------------------------
 * @function
 * @static
 * This function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * This function takes a document record, and combines it with optional key,
 * to construct a '/' separated path to a stored item, , and returns a
 * URL that can be used to access that item.
 * Note this simply makes the URL - it does not carry out *any* operations
 * @param {RecordObject} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {?string} key An optional string identifying the specific field an stored
 * item is associated with
 * @returns {string} The resulting Security-Rule-compliant URL
 */
export const makePrivateURLFromRecord = (record, key = null) => {
  //build the full path from the record structure, key name and key value
  let fullPath = `${record.refPath}${(key ? "/" + key : "")}${(record[key] ? "/" + record[key] : "")}`;
  //turn that path into a privateURL
  return makePrivateURLFromPath(fullPath);
};

/**
 * ----------------------------------------------------------------------
 * @function
 * @static
 * This function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * This function takes a document record, and combines it with optional key,
 * to construct a '/' separated path to a stored item, , and returns a
 * URL that can be used to access that item.
 * Note this simply makes the URL - it does not carry out *any* operations
 * @param {StorageReference} reference A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {?string} key An optional string identifying the specific field an stored
 * item is associated with
 * @returns {string} The resulting Security-Rule-compliant URL
 */
export const makePrivateURLFromReference = (reference) => {
  //build the full path from the record structure, key name and key value
  let fullPath = reference.fullPath;
  //turn that path into a privateURL
  return makePrivateURLFromPath(fullPath);
};

/**
 * ----------------------------------------------------------------------
 * This function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * This function takes a full path to a Storage object and turns it into
 * URL.  If "type"is not included, the URL will return the metadata, not
 * the contents.
 * Note this simply makes the URL - it does not carry out *any* operations
 * @static
 * @function makePrivateURLFromPath
 * @param {!string} fullPath required path to the stored item.
 * @returns {string} constructed Security-Rule-compliant URL
 */
export const makePrivateURLFromPath = (fullPath) => {
  // note?alt-media paramter is just top return the FILE, no
  // the meta-data object
  let newPath = fullPath.replace(/\//g, "%2F");
  const privateURL = `${bucket_domain}${bucket_name}${bucket_head}${newPath}?alt=media`;
  return privateURL;
};

/**
 * ----------------------------------------------------------------------
 * Firestore's document sizes can be limited - 1MB - so our system stores
 * larger digital "blobs" in a parallel Firestore Storage.
 * @static
 * @function storeBlobByRecord
 * @param {blob} blob A data blob in DataURI format to store in Storage
 * @param {RecordObject} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {?string} key An optional string identifying the specific field an stored
 * item is associated with
 * @param {?string} filename an optional name to be associated with the stored item.
 * @returns {UploadTask} Firestore Storage UploadTask Object
 */
export const storeBlobByRecord = (blob, record, key, filename) => {
  const localStorageRef = makeStorageRefFromRecord(record, key, filename);
  return localStorageRef.put(blob).then((snapshot) => {
    snapshot.ref.getPrivateURL = getPrivateURLHack;
    return snapshot;
  });
};

/**
 * ----------------------------------------------------------------------
 * Firestore's document sizes can be limited - 1MB - so our system stores
 * larger digital "blobs" in a parallel Firestore Storage.
 * @static
 * @async
 * @function storeDataURLByRecord
 * @param {dataURL} dataURL A data blob in DataURI format to store in Storage
 * @param {RecordObject} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {?string} key An optional string identifying the specific field an stored
 * item is associated with
 * @param {!string} filename an optional name to be associated with the stored item.
 * @returns Firestore Storage UploadTask Object
 * ----------------------------------------------------------------------
 */
export const storeDataURLByRecord = (dataURL, record, key, filename) => {
  return storeBlobByRecord(
    dataURLToBlob(dataURL).base64,
    record,
    key,
    filename
  );
};

/**
 * ----------------------------------------------------------------------
 * @function
 * @static
 * @param {!string} key name/key of default image file
 * @returns {string}
 */
export const getDefaultImageURL = (key) => {
  let filename = key + ".jpg";
  return Promise.resolve(
    FirebaseStorage.ref("/defaultImages").child(filename).getDownloadURL()
  );
};

/**
 * ----------------------------------------------------------------------
 * @function
 * @static
 * @param {!string} filePath
 * @returns {string}
 */
export const getURLFromFilePath = (filePath) => {
  return FirebaseStorage.ref(filePath).getDownloadURL();
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function
 * @param {object} dataURL
 * @returns {Object} {ext: extension, base64: data}
 */
export const dataURLToBlob = (dataURL) => {
  var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  var match = dataURL.match(reg);
  var baseType = {
    jpeg: "jpg"
  };

  baseType["svg+xml"] = "svg";

  if (!match) {
    throw new Error("image base64 data error");
  }

  var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: "." + extname,
    base64: match[2]
  };
};
