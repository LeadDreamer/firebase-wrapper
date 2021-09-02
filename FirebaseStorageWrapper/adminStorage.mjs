import {getPrivateURL} from "./index";

const { v4: uuidv4 } = require('uuid');

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
 * @static
 * @param {firebase} firebase
 */
export default function FirebaseStorageAdminEmulator(firebase) {
  FirebaseBucket = firebase.storage().bucket();

  let firebaseStorage = {};

  firebaseStorage.ref = (path) => {
    return new adminRef(FirebaseBucket, path);
  };

  return firebaseStorage;
}

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
     * @static
     * @type {string}
     */
    this.fullPath = this.fileRef.name;
    let split= this.fileRef.name.split("/");
    /**
     * filename portion only
     * @static
     * @type {string}
     */
    this.name = split[split.length-1];
    /**
     * name of containing bucket
     * @static
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
      firebaseStorageDownloadTokens: token
      }
    };
  };

  /**
   * @method
   * creates and returns a new adminRef object from existin path
   * @param {string} path
   * a relative path *from* the existing storageRef to create child
   * @returns {StorageRefEmulation}
   */
  child(path) {
    return new adminRef(this.fullPath + "/" + path);
  };

  /**
   * @async
   * @method
   * Deletes the referenced storage item
   * @returns {Promise}
   */

  async delete() {
    return this.fileRef.delete();
  };

  /**
   * @async
   * @method
   * Generates a long-lived (essentially permanent until revoked)
   * Public-Access URL for a storage item in FIREBASE (not Cloud Storage)
   * format
   * @returns {string}
   */
  async getDownloadURL() {
    let url = getPrivateURL(this);
    const token = await this.getToken();

    url = url + `&token=${token}`;
    return url;
  };

  /**
   * @async
   * @method
   * Fetches (or creates as needed) a unique token for a storage object
   * @returns {Promise<string>}
   */
  async getToken() {
    let token = await this.fileRef.getMetadata().metadata?.firebaseStorageDownloadTokens;
    if (!token) {
      //if there isn't a token yet, set one
      token = uuidv4();
      await this.fileRef.setMetadata({
        metadata: {
          firebaseStorageDownloadTokens: token
        }
      })
    };
    return token;
  }

  /**
   * @async
   * @method
   * Fetches the FileMetadata for the storage object. Custom/Client metadata
   * is located in FileMetadata.metadata
   * @returns {FileMetadata}
   */
  async getMetadata() {
    return this.fileRef.getMetadata();
  };

  /**
   * @async
   * @method
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
      metadata: localmetadata
    });
  };

  /**
   * @async
   * @method
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
      metadata: localmetadata
    });
  };

  toString() {
    return null;
  };

  async updateMetadata(metadata = null) {
    return metadata && this.fileRef.setMetadata(metadata);
  };
}
