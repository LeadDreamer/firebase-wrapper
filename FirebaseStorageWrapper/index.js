import { v4 as uuidv4 } from "uuid";

import {
  PAGINATE_DEFAULT,
  PAGINATE_END,
  PAGINATE_INIT,
  PAGINATE_PENDING,
  PAGINATE_UPDATED,
} from "../FirebaseFirestoreWrapper/Common.js";

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
 * @description Initializes the Auth service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase
 * @example
 * ```
 * import * as firebase from "firebase/compat/app";
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
let bucket_name;

export default async function FirebaseStorageWrapper(
  firebase,
  config,
  thisLogger
) {
  if (config && config.appId) {
    thisLogger("Storage client");
    FirebaseStorage = firebase.storage();
  } else {
    thisLogger("Storage admin");
    FirebaseStorage = FirebaseStorageAdminEmulator(firebase);
  }

  config = config.projectId ? config : JSON.parse(config);
  bucket_name = config.storageBucket;
  return;
}

let FirebaseStorage;
const bucket_domain = "https://firebasestorage.googleapis.com/v0/b/";
const bucket_head = "/o/";

//URL = `${bucket_domain}${bucket_name}${bucket_head}${fullPath}?alt=${filetype_parameter}`;

export const getPrivateURL = (ref) => {
  return makePrivateURLFromPath(ref.fullPath);
};

function getPrivateURLHack() {
  return makePrivateURLFromPath(this.fullPath);
}

//////////////////////////////////////////////////////////////////////
// *** Storage API ***
/**
 *These functions are part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 */

/**
 * This function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * The function takes a document record, and combines it with optional key and
 * filename to construct a '/' separated path to a stored item, , and returns a
 * Storage reference to that item.
 * Note this simply makes the Storage Ref - it does not carry out *any* operations
 * @param {string} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {string} key An optional string identifying the specific field stored
 * item is associated with
 * @param {string} filename an optional name to be associated with the stored item.
 * @returns {StorageReference} a Firestore Storage Reference
 */
export function makeStorageRefFromRecord(record, key = null, filename = null) {
  let ref = record.refPath
    ? FirebaseStorage.ref(
        `${record.refPath}${key ? "/" + key : ""}${
          filename ? "/" + filename : ""
        }`
      )
    : null;

  if (ref) {
    ref.getPrivateURL = getPrivateURLHack;
  }
  return ref;
}

/**
 * @typedef {object} ListOptions
 * @property {?number} maxResults If set, limits the total number of
 * prefixes and items to return. The default and maximum maxResults is 1000.
 * @property {?string} pageToken The nextPageToken from a previous call to list().
 * If provided, listing is resumed from the previous position.
 */

/**
 * @typedef {object} ListResult
 * @property {Array.StorageReference} items
 * @property {Array.StorageReference} prefixes
 * @property {string} nextPageToken
 */

/**
 * @param {StorageReference} storageReference a storage reference to a
 * "directory", not a file. More accurate to state that it is *treated*
 * as a directory, since such niceties are a Firestore convention, not
 * a physical reality
 * @param {ListOptions} optionsObject
 * @returns {Promise<ListResult>}
 */
export async function listReference(storageReference, optionsObject) {
  return storageReference.list(optionsObject);
}

/**
 * @typedef {object} PaginateList
 * @property {StorageReference} storageReference
 * @property {number} status
 * @property {number} limit
 * @property {ListOptions} listOptions
 */
/**
 * A class to manage paging through a listing of storage references
 */
export class paginateListing {
  /**
   * constructs an object to paginate through large Firestore Tables
   * @param {StorageReference} storageReference
   * @param {number} limit
   * @returns {PaginateList}
   */
  constructor(storageReference, limit = PAGINATE_DEFAULT) {
    this.storageReference = storageReference;
    this.status = PAGINATE_INIT;
    this.limit = limit;
    this.listOptions = {
      maxResults: limit,
      pageToken: null,
    };
  }

  /**
   * executes the query again to fetch the next set of records
   * @returns {Promise<Array.StorageReference>} returns an array of records - the next page
   */
  async PageForward() {
    if (this.status === PAGINATE_END) return [];
    this.status = PAGINATE_PENDING;
    const result = await listReference(this.storageReference, this.listOptions);
    this.status = PAGINATE_UPDATED;
    if (!result.nextPageToken) {
      // if no more results
      this.status = PAGINATE_END;
    }

    this.listOptions = {
      ...this.listOptions,
      pageToken: result.nextPageToken,
    };
    return result.items;
  }
}

/**
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
 * @returns {Promise<string>}
 * @fulfil {string}  a "long-lived" URL to access the file.
 * @reject {string}
 */
export function makeFileURLFromRecord(record, key = null, filename = null) {
  return makeStorageRefFromRecord(record, key, filename).getDownloadURL();
}

/**
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
export function makePrivateURLFromRecord(record, key = null) {
  //build the full path from the record structure, key name and key value
  let fullPath = `${record.refPath}${key ? "/" + key : ""}${
    record[key] ? "/" + record[key] : ""
  }`;
  //turn that path into a privateURL
  return makePrivateURLFromPath(fullPath);
}

/**
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
export function makePrivateURLFromReference(reference) {
  //build the full path from the record structure, key name and key value
  let fullPath = reference.fullPath;
  //turn that path into a privateURL
  return makePrivateURLFromPath(fullPath);
}

/**
 * This function is part of a storage scheme that uses parallel structures
 * between Firestore collection/documents and Storage paths.  The concept
 * here is all Storage items are part of/belong to Firestore documents.
 * This function takes a full path to a Storage object and turns it into
 * URL.  If "type"is not included, the URL will return the metadata, not
 * the contents.
 * Note this simply makes the URL - it does not carry out *any* operations
 * @param {!string} fullPath required path to the stored item.
 * @returns {string} constructed Security-Rule-compliant URL
 */
export function makePrivateURLFromPath(fullPath) {
  // note?alt-media paramter is just top return the FILE, no
  // the meta-data object
  let newPath = fullPath.replace(/\//g, "%2F");
  const privateURL = `${bucket_domain}${bucket_name}${bucket_head}${newPath}?alt=media`;
  return privateURL;
}

/**
 * Firestore's document sizes can be limited - 1MB - so our system stores
 * larger digital "blobs" in a parallel Firestore Storage.
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
 * Firestore's document sizes can be limited - 1MB - so our system stores
 * larger digital "blobs" in a parallel Firestore Storage.
 * @async
 * @function storeDataURLByRecord
 * @param {dataURL} dataURL A data blob in DataURI format to store in Storage
 * @param {RecordObject} record A firestore document Record - the '/' separated collection/
 * document path is used as the path to the stored item.
 * @param {?string} key An optional string identifying the specific field an stored
 * item is associated with
 * @param {!string} filename an optional name to be associated with the stored item.
 * @returns {UploadTask} Firestore Storage UploadTask Object
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
 * @function
 * @param {!string} key name/key of default image file
 * @returns {string}
 */
export async function getDefaultImageURL(key) {
  let filename = key + ".jpg";
  return Promise.resolve(
    FirebaseStorage.ref("/defaultImages").child(filename).getDownloadURL()
  );
}

/**
 * @function
 * @param {!string} filePath
 * @returns {string}
 */
export const getURLFromFilePath = (filePath) => {
  return FirebaseStorage.ref(filePath).getDownloadURL();
};

/**
 * @param {object} dataURL
 * @returns {Object} {ext: extension, base64: data}
 */
export function dataURLToBlob(dataURL) {
  var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  var match = dataURL.match(reg);
  var baseType = {
    jpeg: "jpg",
  };

  baseType["svg+xml"] = "svg";

  if (!match) {
    throw new Error("image base64 data error");
  }

  var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: "." + extname,
    base64: match[2],
  };
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Admin Support

/**
 * @typedef {object} File
 * @property {!FileMetadata} metadata
 * @property {!object} acl
 * @property {!string} name
 * //various methods
 */

/**
 * @typedef {object} FileMetadata
 * @property {string:"storage#object"} kind
 * @property {string} id
 * @property {string} selfLink
 * @property {string} name
 * @property {string} bucket
 * @property {long} generation
 * @property {long} metageneration
 * @property {string} contentType
 * @property {datetime} timeCreated
 * @property {datetime} updated
 * @property {datetime} customTime
 * @property {datetime} timeDeleted
 * @property {boolean} temporaryHold
 * @property {boolean} eventBasedHold
 * @property {datetime} retentionExpirationTime
 * @property {string} storageClass
 * @property {datetime} timeStorageClassUpdated
 * @property {ulong} size
 * @property {string} md5Hash
 * @property {string} mediaLink
 * @property {string} contentEncoding
 * @property {string} contentDisposition
 * @property {string} contentLanguage
 * @property {string} cacheControl
 * @property {object} metadata Custom metadata key:value pairs
 * @property {string} metadata.firebaseStorageDownloadTokens
 * @property {string} metadata.key
 * @property {objectAccessControls} [acl]
 * @property {object} owner
 * @property {string} owner.entity
 * @property {string} owner.entityId
 * @property {string} crc32c
 * @property {integer} componentCount
 * @property {string} etag
 * @property {object} customerEncryption
 * @property {string} customerEncryption.encryptionAlgorithm
 * @property {string} customerEncryption.keySha256
 * @property {string} kmsKeyName
 */

/**
 * A set of helper-wrapper functions around firebase storage
 * Intent is to treat Firestore as a hierarchical
 * record-oriented database and Storage as a parallel structure
 * originally conceived to port from one database to another.
 * @module FirebaseStorageAdminEmulator
 */

/**
 * Initializes the Storage service of the provided firebase app.  Also
 * instantiates various constants and helper functions.
 * This is a WRAPPER around CLOUD STORAGE (admin) functions
 * to emulate FIREBASE functionality, keeping a similar API
 * between client & cloud code.
 * NOTE: admin "references" ARE NOT the same as client references, and are NOT
 * interchangeable.  Do not mix client & admin code (not actually possible
 * in this wrapper)
 * @function FirebaseStorageAdminEmulator
 * @param {firebase} firebase
 */
const FirebaseStorageAdminEmulator = (firebase) => {
  FirebaseBucket = firebase.storage().bucket();

  let firebaseStorage = {};

  firebaseStorage.ref = (path) => {
    return new adminRef(FirebaseBucket, path);
  };

  return firebaseStorage;
};

let FirebaseBucket;

class adminRef {
  /**
   * Create a class that emulates a Firebase Storage storageRef
   * using Firebase Admin Cloud Storage Functions.  This is not
   * an exact replica, but one with similar static members and
   * methods.  Intended for use with a higher-level Wrapper library
   * This returns an object that has many of the same members and
   * methods as a Firebase storageRef, but only in conjunction with
   * the methods here, and likely only with the "wrapper" it is defined
   * for.
   * @param {StorageBucket} bucket
   * A bucket instance
   * @param {string} path
   * a string representing the "path" to the intended target document
   * @returns {StorageRefEmulation}
   */
  constructor(bucket, path) {
    /**
     * used to affect file operations to emulate Firebase Storage functions
     * @type {storageRef}
     */
    this.fileRef = bucket.file(path);
    /**
     * Full path, including file name
     * @type {string}
     */
    this.fullPath = this.fileRef.name;
    let split = this.fileRef.name.split("/");
    /**
     * filename portion only
     * @type {string}
     */
    this.name = split[split.length - 1];
    /**
     * name of containing bucket
     * @type {string}
     */
    this.bucket = this.fileRef.bucket;
    /**
     * Cloud Storage object don't really have a parent or root
     * @type {storageRef}
     */
    this.parent = null;
    this.root = null;
    /**
     * app instance
     * @type {storageApp}
     */
    this.storage = bucket;

    //generate a uuid token to emulate creation by Firebase
    //Storage code.  It doesn't *have* to be used.
    const token = uuidv4();
    /**
     * access token
     * @type {string}
     */
    this.metadata = {
      ...this.fileRef?.metadata,
      metadata: {
        ...this.fileRef?.metadata?.metadata,
        firebaseStorageDownloadTokens: token,
      },
    };
  }

  /**
   * creates and returns a new adminRef object from existin path
   * @param {string} path
   * a relative path *from* the existing storageRef to create child
   * @returns {Promise<StorageRefEmulation>}
   */
  child(path) {
    return new adminRef(this.fullPath + "/" + path);
  }

  /**
   * Deletes the referenced storage item
   * @returns {Promise<void>}
   */

  async delete() {
    return this.fileRef.delete();
  }

  /**
   * Generates a long-lived (essentially permanent until revoked)
   * Public-Access URL for a storage item in FIREBASE (not Cloud Storage)
   * format
   * @returns {Promise<string>}
   */
  async getDownloadURL() {
    let url = getPrivateURL(this);
    const token = await this.getToken();

    url = url + `&token=${token}`;
    return url;
  }

  /**
   * Fetches (or creates as needed) a unique token for a storage object
   * @returns {Promise<string>}
   */
  async getToken() {
    let token = await this.fileRef.getMetadata().metadata
      ?.firebaseStorageDownloadTokens;
    if (!token) {
      //if there isn't a token yet, set one
      token = uuidv4();
      await this.fileRef.setMetadata({
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      });
    }
    return token;
  }

  /**
   * Fetches the FileMetadata for the storage object. Custom/Client metadata
   * is located in FileMetadata.metadata
   * @returns {Promise<FileMetadata>}
   */
  async getMetadata() {
    return this.fileRef.getMetadata();
  }

  /**
   * puts a block of data (and optional metadata) into storage at
   * location specified by adminRef
   * @param {blob} data
   * @param {?object} metadata
   * @returns {Promise<object>}
   */
  async put(data, metadata = null) {
    var buf = new Buffer(data, "base64");
    metadata && this.fileRef.setMetadata(metadata);
    await this.fileRef.save(buf, { resumable: false });
    const response = await this.fileRef.getMetadata();
    const localmetadata = response[0];
    //the response below emulates Firestore Storage UploadTaskSnapshot
    return Promise.resolve({
      ref: this,
      metadata: localmetadata,
    });
  }

  /**
   * puts a string (possibly encoded data) into a storage file
   * described by the provided reference.
   * @param {string} dataString
   * @param {string} stringFormat
   * @param {FileMetadata} metadata
   * @returns {Promise<object>}
   */
  async putString(dataString, stringFormat = null, metadata = null) {
    var buf = new Buffer(dataString, stringFormat);
    metadata && this.fileRef.setMetadata(metadata);
    await this.fileRef.save(buf, { resumable: false });
    const response = await this.fileRef.getMetadata();
    const localmetadata = response[0];
    let url = getPrivateURL(this);
    //the response below emulates Firestore Storage UploadTaskSnapshot
    return Promise.resolve({
      ref: this,
      downloadURL: url,
      metadata: localmetadata,
    });
  }

  toString() {
    return null;
  }

  async updateMetadata(metadata = null) {
    return metadata && this.fileRef.setMetadata(metadata);
  }
}
