"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FirebaseStorageWrapper;
exports.httpsOnCallSlipDates = exports.httpsOnCallCheckIn = exports.httpsOnCallCreatePledgeTicket = exports.httpsOnCallCredentials = exports.httpsOnCallRoles = exports.initialize_functions = exports.getDefaultImageURL = exports.startBlobInRecord = exports.makeFileURLFromRecord = exports.makeStorageRefFromRecord = void 0;

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
function FirebaseStorageWrapper(firebase) {
  FirebaseStorage = firebase.storage();
}
/** @private */


var FirebaseStorage;
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

var makeStorageRefFromRecord = function makeStorageRefFromRecord(record) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var filename = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return record.refPath ? FirebaseStorage.ref(record.refPath + (key ? "/" + key : "") + (filename ? "/" + filename : "")) : null;
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


exports.makeStorageRefFromRecord = makeStorageRefFromRecord;

var makeFileURLFromRecord = function makeFileURLFromRecord(record) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var filename = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
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


exports.makeFileURLFromRecord = makeFileURLFromRecord;

var startBlobInRecord = function startBlobInRecord(blob, record, key, filename) {
  var localStorageRef = makeStorageRefFromRecord(record, key, filename);
  return localStorageRef.put(blob);
};
/**
 * ----------------------------------------------------------------------
 * @function getDefaultImageURL
 * @static
 * @param {!string} key name/key of default image file
 */


exports.startBlobInRecord = startBlobInRecord;

var getDefaultImageURL = function getDefaultImageURL(key) {
  var filename = key + ".jpg";
  return Promise.resolve(FirebaseStorage.ref("/defaultImages").child(filename).getDownloadURL());
}; //////////////////////////////////////////////////////////////////////
// Cloud Fetch

/**
 * @function initialize_functions
 * @static
 * @description Initializes the Cloud Function interfaces service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase
 */


exports.getDefaultImageURL = getDefaultImageURL;

var initialize_functions = function initialize_functions(firebase) {
  functions = firebase.functions();
};

exports.initialize_functions = initialize_functions;
var functions;
var httpsOnCallRoles = functions.httpsCallable("https-onCall-roles");
exports.httpsOnCallRoles = httpsOnCallRoles;
var httpsOnCallCredentials = functions.httpsCallable("https-onCall-credentials");
exports.httpsOnCallCredentials = httpsOnCallCredentials;
var httpsOnCallCreatePledgeTicket = functions.httpsCallable("https-onCall-createPledgeTicket");
exports.httpsOnCallCreatePledgeTicket = httpsOnCallCreatePledgeTicket;
var httpsOnCallCheckIn = functions.httpsCallable("https-onCall-checkIn");
exports.httpsOnCallCheckIn = httpsOnCallCheckIn;
var httpsOnCallSlipDates = functions.httpsCallable("https-onCall-slipDates");
exports.httpsOnCallSlipDates = httpsOnCallSlipDates;