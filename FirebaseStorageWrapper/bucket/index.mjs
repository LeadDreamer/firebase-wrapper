/**
 * A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 * @module FirebaseStorageAdminEmulator
 */

/**
 * Initializes the Auth service of the provided firebase app.  Also
 * instantiates various constants and helper functions
 * @function FirebaseStorageAdminEmulator
 * @static
 * @param {firebase} firebase
 */
export default function FirebaseStorageAdminEmulator(firebase) {
  let FirebaseBucket = firebase.storage().bucket();

  let firebaseStorage = {};

  firebaseStorage.ref = (path) => {
    return new adminRef(FirebaseBucket, path);
  };

  firebaseStorage.refFromURL = (URL) => {};

  return firebaseStorage;
}

class adminRef {
  constructor(bucket, path) {
    this.fileRef = bucket.file(path);
    let metadata = this.fileRef.metadata;
    this.bucket = metadata.bucket;
    this.fullPath = path;
    this.name = metadata.name;
    this.parent = null;
    this.root = null;
    this.storage = null;
  }

  child = (path) => {
    return new adminRef(this.fullPath + "/" + path);
  };

  delete = () => {
    return this.fileRef.delete();
  };

  getDownloadURL = () => {
    return this.fileRef.publicUrl();
  };

  getMetadata = () => {
    return this.fileRef.getMetadata();
  };

  put = async (data, metadata = null) => {
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

  putString = async (dataString, stringFormat = null, metadata = null) => {
    var buf = new Buffer(dataString, stringFormat);
    metadata && this.fileRef.setMetadata(metadata);
    await this.fileRef.save(buf, { resumable: false });
    const response = await this.fileRef.getMetadata();
    const localmetadata = response[0];
    const URL =
      "https://storage.cloud.google.com/" +
      localmetadata.bucket +
      "/" +
      metadata.name;
    //the response below emulates Firestore Storage UploadTaskSnapshot
    return Promise.resolve({
      ref: this.fileRef,
      downloadURL: URL,
      metadata: localmetadata
    });
  };

  toString = () => {
    return null;
  };

  updateMetadata = (metadata = null) => {
    return metadata && this.fileRef.setMetadata(metadata);
  };
}
