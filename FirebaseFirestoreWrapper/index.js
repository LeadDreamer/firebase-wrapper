import {
  PAGINATE_CHOICES,
  PAGINATE_DEFAULT,
  PAGINATE_INIT,
  PAGINATE_PENDING,
  PAGINATE_UPDATED,
} from "./Common.js";

/**
 * @module FirebaseFirestoreWrapper
 * @description A set of helper-wrapper functions around firebase firestore, storage
 * and auth. Intent is to treat Firestore as a hierarchical
 * record-oriented database; originally conceived to port from one
 * database to another.
 */

// utilities
/**
 * @private
 * @param {Array.object}
 * @returns {object}
 * @description last entry in the array
 */
function last(array) {
  let length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

/**
 * @private
 * @param {Array.object}
 * @returns {object}
 * @description second-to-last entry in the array
 */
function penultimate(array) {
  let length = array == null ? 0 : array.length;
  return length ? array[length - 1 - 1] : undefined;
}

/**
 * Initializes the Firestore service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
 * @param {firebase} firebase provided firebase app (allows use between client & server)
 * @param {object} config - configuration object to detect client/server use
 * @param {?string} config.appId - missing parameter indicates server
 * @param {callback} thisLogger - passed logging function  (allows use between client & server)
 * @returns {Promise<object|void>}
 * @example
 * ```
 * import * as firebase from "firebase/app";
 * import "firebase/firestore";
 * import FirebaseFirestore from "@leaddreamer/firebase-wrapper/FirebaseFirestoreWrapper";
 * import {config} from "whereever-you-put-it";
 *
 * ((myconfig) {
 * try {
 *   firebase.app();
 * } catch (err) {
 *   firebase.initializeApp(myconfig);
 * }
 * FirebaseFirestore(firebase);
 * })(config)
 * ```
 */
export default async function FirebaseFirestore(firebase, config, thisLogger) {
  thisLogger("Starting FirebaseFirestore");
  fdb = firebase.firestore();
  thisLogger("fdb? ", !!fdb);
  fdb.settings({ ignoreUndefinedProperties: true, merge: true });
  //doesnt run firestore persistence in Admin/Node environment
  thisLogger("fdb settings", config);
  config = config.projectId ? config : JSON.parse(config);
  if (!config?.appId) {
    await firebase.firestore().enablePersistence({ synchorizeTabs: true });
  }
  thisLogger("persistence");
  aFieldValue = firebase.firestore.FieldValue;
  aFieldPath = firebase.firestore.FieldPath;

  timestamp = firebase.firestore.Timestamp;
  documentId = aFieldPath.documentId();
  deleteFieldValue = aFieldValue.delete();
  serverTimestampFieldValue = aFieldValue.serverTimestamp();
  thisLogger("Firestore");
}

/** @private */
let fdb, aFieldValue, aFieldPath;

/**
 * class for a Firestore timestamp processor
 */
export let timestamp;

//export { timestamp };

/**
 * a fieldPath value to represent the document Id - WARNING
 * Google Firestore has a bug, and this actually represents the FULL PATH
 * to the document
 * @constant
 * @type {Object}
 * @category FieldPath
 */
export let documentId;
//export { documentId };

/**
 * maximum concurrent writes
 */
export const MAX_CONCURRENCY = 5;
//export { MAX_CONCURRENCY };

//convenient fieldValue constants
/**
 * a sentinel value used to delete a field during an
 * update operation
 * @constant
 * @type {Object}
 * @category FieldValue
 */
export let deleteFieldValue;
//export { deleteFieldValue };

/**
 * a sentinel value to set a field to a
 * server-generated timestamp during set(0 or update())
 * @constant
 * @type {Object}
 * @category FieldValue
 */
export let serverTimestampFieldValue;
//export { serverTimestampFieldValue };

/**
 * return a sentinel to incrment/decrement a field
 * @category FieldValue
 * @param {number} n If either the operand or the current field value uses
 *    floating point precision, all arithmetic follows IEEE 754
 *    semantics. If both values are integers, values outside of
 *    JavaScript's safe number range (Number.MIN_SAFE_INTEGER to
 *    Number.MAX_SAFE_INTEGER) are also subject to precision loss.
 *    Furthermore, once processed by the Firestore backend, all integer
 *    operations are capped between -2^63 and 2^63-1.
 *     If the current field value is not of type number, or if the field
 *     does not yet exist, the transformation sets the field to the given value.
 * @returns {sentinelValue} a sentinel value
 */
export function incrementFieldValue(n) {
  return aFieldValue.increment(n);
}

/**
 * ----------------------------------------------------------------------
 * return a sentinel to decrment/decrement a field
 * NOT REALLY A FIREBASE FUNCTION
 * Fire base has only increment; we implement this for legibility
 * @category FieldValue
 * @param n If either the operand or the current field value uses
 *    floating point precision, all arithmetic follows IEEE 754
 *    semantics. If both values are integers, values outside of
 *    JavaScript's safe number range (Number.MIN_SAFE_INTEGER to
 *    Number.MAX_SAFE_INTEGER) are also subject to precision loss.
 *    Furthermore, once processed by the Firestore backend, all integer
 *    operations are capped between -2^63 and 2^63-1.
 *     If the current field value is not of type number, or if the field
 *     does not yet exist, the transformation sets the field to the given value.
 * @returns a sentinel value
 **********************************************************************/
export function decrementFieldValue(n) {
  return aFieldValue.increment(-n);
}

/**
 * returns a sentinel to remove elements from array field
 * @category FieldValue
 * @param {any} arrayElements REST expanded list of elements to remove
 * @returns {sentinelValue} a sentinel value
 */
export function arrayRemoveFieldValue(arrayElements) {
  return aFieldValue.arrayRemove(...arrayElements);
}

/**
 * return a sentinel to add/join elements to array field
 * @category FieldValue
 * @param {any} arrayElements REST expanded list of elements to add
 * @returns {sentinelValue} a sentinel value
 */
export function arrayUnionFieldValue(arrayElements) {
  return aFieldValue.arrayUnion(...arrayElements);
}

/* Firebase APIs */

/**
 * @typedef {object} Record
 * common properties of our database records
 * @property {?string} Id - Id of the document as stored in Firestore May
 * be null for new objects
 * @property {?string} refPath - string representing the full path to the
 * Firestore document.  May be blank for new documents to be saved.
 */

/**
 * returns an internal record structure from a firestore
 * Document snapshot
 * @param {DocumentSnapshot} documentSnapshot
 * @returns {Record}
 */
export function RecordFromSnapshot(documentSnapshot) {
  return {
    ...documentSnapshot.data(),
    Id: documentSnapshot.id,
    refPath: documentSnapshot.ref.path,
  };
}

/**
 * returns an array of internal record structures from a
 * firestore Query snapshot
 * @param {QuerySnapshot} querySnapshot
 * @returns {Array.Record}
 */
export function RecordsFromSnapshot(querySnapshot) {
  return querySnapshot.empty
    ? []
    : querySnapshot.docs.map((docSnap) => {
        return RecordFromSnapshot(docSnap);
      });
}

/**
 * returns a Firestore document structure from an internal Record
 * @private
 * @param {Record} record - cleans up internal document representation
 * @returns {Record}
 */
function DocumentFromRecord(record) {
  const cleanData = { ...record };
  delete cleanData.refPath; //we leave the redundant Id for query optimization
  return cleanData;
}

/**
 * creates and runs a series of record operations
 * (executed in the param function) as an atomic operation.
 * A transation object is passed to the callback parameter
 * @category Batch
 * @param {callback} updateFunction callback function that expects a Transaction
 * token as it's sole argument.  either all the included/chained
 * record operations will succeed, or none
 * @returns {Promise.object} a promise with the result of updateFunction
 */
export async function runTransaction(updateFunction) {
  return fdb.runTransaction(updateFunction);
}

/**
 * Creates a WriteBatch object to collect actions for Batch writing to backend
 * @category Batch
 * @returns {Promise.WriteBatch} object that operations are added to for a bulk
 * operation
 */
export async function openWriteBatch() {
  return fdb.batch();
}

/**
 * Dispatches an asynchronous Closure to submit Batch
 * @category Batch
 * @param {WriteBatch} batch - WriteBatch to close
 * @returns {Promise<void>}
 */
export async function closeWriteBatch(
  /**
   */
  batch = null
) {
  return (async (innerBatch) => {
    return innerBatch.commit();
  })(batch);
}

/**
 * Creates a bulkWriter object to collect actions for Bulk writing to backend
 * offers parallel operations, writes only, does NOT check for contentions,
 * admin/Node-side only.
 * @category Batch
 * @returns {BulkWriter} object that operations are added to for a bulk
 * operation
 */
export function openBulkWriter() {
  if (typeof fdb.bulkWriter !== "function") {
    return null;
  }
  return fdb.bulkWriter();
}

/**
 * Dispatches an asynchronous Closure to complete BulkWriter
 * @async
 * @function
 * @static
 * @category Batch
 * @param {BulkWriter} bulkWriter - bulkWriter to close
 * @returns {Promise<void>}
 */
export async function closeBulkWriter(
  /**
   */
  bulkWriter = null
) {
  if (!bulkWriter || typeof fdb.bulkWriter !== "function") return null;

  return bulkWriter.close();
}

/**
 * Creates a DocumentReference document to the collection
 * referenced in parameter tablePath (relative to optional refPath).
 * This is can be useful for Transactions and Batches, which
 * can only get(), set() or update() existing documents. Tricksie!
 * @param {!string} tablePath string representing a valid path to a collection to
 * create the new document in, relative to a document reference
 * passed in
 * @param {?string} refPath an optional valid document reference to start the table path
 * @returns {DocumentReference} Firestore Document Reference
 */
export function createUniqueReference(tablePath, refPath = null) {
  const db = dbReference(refPath);
  const docRef = db.collection(tablePath).doc(); // just
  return { Id: docRef.id, refPath: docRef.path };
}

/**
 * generates a document reference from a path
 * if passed; else returns the db base reference
 * @param {string} refPath Path to base actions from. May be null
 * @returns {DocumentReference}
 */
function dbReference(refPath) {
  return refPath ? fdb.doc(refPath) : fdb;
}

/**
 * Writes a Firestore record to collection indicated by tablePath
 * relative to option DocumentReference refPath
 * @param {!string} tablePath - string representing a valid path to a collection to
 * create or update the document in, relative to a document reference
 * passed in
 * @param {!Record} data - Data/Record object to write to database
 * @param {?string} refPath - an optional valid document reference to start the table path
 * @param {?WriteBatch|Transaction} batch - optional chain token to include this
 * operation as part of an Atomic Transaction
 * @param {?boolean} mergeOption - whether to merge into existing data; default TRUE
 * @returns {Promise.Record}
 * @fulfil document record
 * @reject error message
 */
export async function writeRecord(
  tablePath,
  data,
  refPath = null,
  batch = null,
  mergeOption = true
) {
  const db = dbReference(refPath);
  const cleanData = DocumentFromRecord(data);

  try {
    let docRef = data.Id
      ? // if existing document, re-create reference
        db.collection(tablePath).doc(data.Id)
      : // if new, create a new reference
        db.collection(tablePath).doc();
    //all a transaction/WriteBatch can return is a chained transaction/WriteBatch
    cleanData.Id = docRef.id; //copy the newly generated ID into the record/document
    if (batch) {
      //if passed a transaction object, use it
      await batch.set(docRef, cleanData, { merge: mergeOption });
    } else {
      //not a transaction
      await docRef.set(cleanData, { merge: mergeOption });
    }
    return {
      ...data,
      Id: docRef.Id,
      refPath: data.refPath || docRef.path, //short circuit
    };
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Writes given data object (or map) to the given documentReference
 * @param {!Record} data Object/Map to be written back to the Firestore
 * @param {!string} refPath DocumentReference to write document to
 * @param {?WriteBatch|Transaction} Transaction Optional Transaction to enclose this action in
 * @param {?boolean} mergeOption - whether to merge into existin data; default TRUE
 * @returns {Promise<Record>} data record as written
 */
export async function writeRecordByRefPath(
  data,
  refPath,
  batch = null,
  mergeOption = true
) {
  return writeBack({ ...data, refPath: refPath }, batch, mergeOption);
}

/**
 * Writes a local-schema document back to the Firestore.  Assume
 * object/map came from the firestore
 * @param {!Record} data Object/Map to be written back to the Firestore
 * @param {!string} data.refPath required to be present
 * @param {?WriteBatch|Transaction} Transaction Optional Transaction to enclose this action in
 * @param {?boolean} mergeOption - whether to merge into existin data; default TRUE
 * @returns {Promise.Record} record as written.
 */
export async function writeBack(data, batch = null, mergeOption = true) {
  const cleanData = DocumentFromRecord(data);

  if (batch) {
    //if passed a transaction object, use it
    return batch.set(createRefFromPath(data.refPath), cleanData, {
      merge: mergeOption,
    });
  } else {
    return createRefFromPath(data.refPath)
      .set(cleanData, { merge: mergeOption })
      .then(() => {
        return Promise.resolve(data);
      });
  }
}

/**
 * query for a SET of records
 * @param {!string} tablePath string representing path ro requested
 * collection
 * @param {?string} refPath string representing a path to the relative PARENT
 * of the requested collection
 * @returns {Promise<Array<Record>>}
 */
export async function collectRecords(tablePath, refPath = null) {
  const db = dbReference(refPath);

  return db
    .collection(tablePath) //Dangerously assumes collection exists
    .get()
    .then((querySnapshot) => {
      // returns a promise
      return !querySnapshot.empty
        ? RecordsFromSnapshot(querySnapshot)
        : Promise.reject("noDocuments:collectRecords:" + tablePath);
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecords:" + tablePath);
    });
}

/**
 * returns an array of documents from Firestore
 * @param {!string} tablePath a properly formatted string representing the requested collection
 * - always an ODD number of elements
 * @param {?string} refPath (optional) allows "table" parameter to reference a sub-collection
 * of an existing document reference (I use a LOT of structured collections)
 * @param {?Array.filterObject} filterArray an array of filterObjects
 * The array is assumed to be sorted in the correct order -
 * i.e. filterArray[0] is added first; filterArray[length-1] last
 * returns data as an array of objects (not dissimilar to Redux State objects)
 * with both the documentID and documentReference added as fields.
 * @param {Arrayt.sortObject} sortArray a 2xn array of sort (i.e. "orderBy") conditions
 * @param {?number} limit limit result to this number (if at all)
 * @returns {Promise<Array<Record>>}
 */
export async function collectRecordsByFilter(
  tablePath,
  refPath = null,
  filterArray = null,
  sortArray = null,
  limit = null
) {
  const db = dbReference(refPath);

  //assumes filterArray is in processing order
  return limitQuery(
    sortQuery(filterQuery(db.collection(tablePath), filterArray), sortArray),
    limit
  )
    .get() //get the resulting filtered query results
    .then((querySnapshot) => {
      // returns a promise
      return !querySnapshot.empty
        ? RecordsFromSnapshot(querySnapshot)
        : Promise.reject("noDocuments:collectRecordsByFilter:" + tablePath);
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecordsByFilter");
    });
}

/**
 * query for a SET of records from a COLLECTIONGROUP - all
 * collections of a similar name, regardless of parents.  It is up to the
 * User to ensure these are at a similar level/structure - Firestore just
 * matches the name
 * @param {!string} tableName string describing the NAME of the collection
 * group desired
 * @returns {Promise<Array<Record>>}
 */
export async function collectRecordsInGroup(tableName) {
  const db = fdb;

  return db
    .collectionGroup(tableName) //Dangerously assumes collection exists
    .get()
    .then((querySnapshot) => {
      // returns a promise
      if (!querySnapshot.empty) return RecordsFromSnapshot(querySnapshot);
      else
        return Promise.reject("noDocuments:collectRecordsInGroup:" + tableName);
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecordsInGroup:" + tableName);
    });
}

/**
 * queries for Records from a CollectionGroup, filtered by
 * the passed array of filterObjects
 * @param {!string} tableName string describing the Name of the collectiongroup
 * @param {Array.filterObject} filterArray array of objects describing filter
 * operations
 * @returns {Promise<Array<Record>>}
 **/
export async function collectRecordsInGroupByFilter(
  tableName,
  filterArray = null,
  sortArray = null,
  limit = null
) {
  const db = fdb;

  return limitQuery(
    sortQuery(
      filterQuery(db.collectionGroup(tableName), filterArray),
      sortArray
    ),
    limit
  )
    .get() //get the resulting filtered query results
    .then((querySnapshot) => {
      // returns a promise
      return !querySnapshot.empty
        ? RecordsFromSnapshot(querySnapshot)
        : Promise.reject(
            "noDocuments:collectRecordsInGroupByFilter:" + tableName
          );
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecordsInGroupByFilter");
    });
}

/**
 * retrieve a record from the Firestore.  If a Batch object is passed,
 * returns a chained Btahc object
 * @param {string} tablePath - path to the enclosing collection
 * @param {string} Id - Id of the specific document requested
 * @param {?string} refPath - optional document reference to base tablePath from
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 *
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export async function fetchRecord(tablePath, Id, refPath = null, batch = null) {
  const db = dbReference(refPath);

  const docRef = db.collection(tablePath).doc(Id);

  const thePromise = batch
    ? batch.get(docRef) // returned chained Batch object
    : docRef.get();

  return thePromise.then((docSnapshot) => {
    if (docSnapshot.exists) {
      return RecordFromSnapshot(docSnapshot);
    } else {
      return Promise.reject("no document");
    }
  });
}

/**
 * fetches a single record from the database, using just a
 * refPath to identify the document
 * @param {!string} docRefPath string identifying the full path to the
 * requested document
 * @param {?WriteBatch|Transaction} batch object for collecting batched
 * operations
 * @returns {Promise<Record>}
 */
export async function fetchRecordByRefPath(docRefPath, batch = null) {
  //Dangerously assumes refPath  exists

  const thisRef = createRefFromPath(docRefPath);

  const thePromise = batch ? batch.get(thisRef) : thisRef.get();

  return thePromise.then((docSnapshot) => {
    if (docSnapshot.exists) {
      return RecordFromSnapshot(docSnapshot);
    } else {
      return Promise.reject("no document");
    }
  });
}

/**
 * fetches a SINGLE record from the database, using just a
 * filter to identify the document. DANGEROUSLY assumes the filter
 * identifies a SINGLE document, even if the query always returns an array
 * @param {!string} table a properly formatted string representing the requested collection
 * - always an ODD number of elements
 * @param {?filterObject} [filterArray] array of objects describing filter
 * operations
 * @param {?string} refPath - optional document reference to base tablePath from
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 *
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export async function fetchRecordByFilter(
  table,
  filterArray,
  refPath = null,
  batch = null
) {
  return collectRecordsByFilter(table, filterArray, refPath, batch).then(
    (records) => {
      return Promise.resolve(records[0]);
    }
  );
}

/**
 * fetches a SINGLE record from the database, using just a
 * filter to identify the document. DANGEROUSLY assumes the filter
 * identifies a SINGLE document, even if the query always returns an array
 * @param {!string} table a properly formatted string representing the requested collection
 * - always an ODD number of elements
 * @param {?filterObject} [filterArray] array of objects describing filter
 * operations
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 *
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export async function fetchRecordInGroupByFilter(
  table,
  filterArray,
  batch = null
) {
  return collectRecordsInGroupByFilter(table, filterArray, batch).then(
    (records) => {
      return Promise.resolve(records && records?.length ? records[0] : null);
    }
  );
}

/**
 * deletes a single record from the database
 * @param {!string} table string naming the parent collection of the document
 * @param {Record} record
 * @param {?string} refPath - optional document reference to base tablePath from
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export async function deleteRecord(
  table,
  record,
  refPath = null,
  batch = null
) {
  const db = dbReference(refPath);
  const docRef = db.collection(table).doc(record.Id);
  //Dangerously assumes collection exists

  return batch ? batch.delete(docRef) : docRef.delete();
}

/**
 * deletes a single record from the database
 * @param {!string} docRefPath string identifying the full path to the
 * requested document
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export async function deleteRecordByRefPath(docRefPath, batch = null) {
  const thisRef = createRefFromPath(docRefPath);

  return batch ? batch.delete(thisRef) : thisRef.delete();
}

/**
 * @param {Record} recordUpdate object of field:value entries to update.
 * @param {!string} recordUpdate.refPath - full path to document/record
 * @description  update record by fields - Allows use of FieldPath options
 * such as .delete(). Only specifically referenced fields will be
 * affected. Assumes the originating docRef is passed as refPath: field
 * @returns {Promise<Record>}
 */
export async function updateRecordFields(recordUpdate) {
  const cleanData = DocumentFromRecord(recordUpdate);

  try {
    return createRefFromPath(recordUpdate.refPath).update(cleanData);
  } catch (err) {
    return Promise.reject(err + ":updateRecordFields");
  }
}

/**
 * @param {!string} docRefPath - full path to document to update
 * @param {!Record} data - Record of values to update
 * @param {?string} data.Id - document Id of record
 * @param {?WriteBatch|Transaction} batch - batching object
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export async function updateRecordByRefPath(docRefPath, data, batch = null) {
  const cleanData = DocumentFromRecord(data);
  const thisRef = createRefFromPath(docRefPath);

  return batch
    ? batch.set(thisRef, cleanData, {
        merge: true,
      })
    : thisRef
        .set(cleanData, { merge: true }) //update merges record
        .then(() => {
          return data;
        });
}

/**
 * adds a new value to a firestore record array entry
 * @param {!string} fieldName  the string name of the array to be updated
 * @param {any} fieldValue the value to add to the array
 * @param {!string} docRefPath the reference path for the document to be updated
 * @param {WriteBatch|Transaction} batch optional - used to chain transactions
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export async function writeArrayValue(
  fieldName,
  fieldValue,
  docRefPath,
  batch = null
) {
  const thisRef = createRefFromPath(docRefPath);

  if (batch)
    return batch.set(
      thisRef,
      {
        [fieldName]: aFieldValue.arrayUnion(fieldValue),
      },
      { merge: true }
    );
  else
    return thisRef.set(
      {
        [fieldName]: aFieldValue.arrayUnion(fieldValue),
      },
      { merge: true }
    );
}

/**
 * Creates a DocumentReference from *relative* docPath
 * and an (optional) absolute refPath
 * @param {!string} docPath
 * @param {?refPath} refPath
 * @returns {DocumentReference}
 */
function createRefFromPath(docPath, refPath = null) {
  const db = dbReference(refPath);

  return db.doc(docPath);
}

/**
 * @typedef {Object} filterObject
 * @property {!string} fieldRef
 * @property {!string} opStr
 * @property {any} value
 */

/**
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query collectionReference or Query to build filter upong
 * @param {?Array.filterObject} filterArray an (optional) 3xn array of filter(i.e. "where") conditions
 * @returns {Query} Firestore Query object
 */
function filterQuery(query, filterArray = null) {
  return filterArray
    ? filterArray.reduce((accQuery, filter) => {
        return accQuery.where(filter.fieldRef, filter.opStr, filter.value);
      }, query)
    : query;
}

/**
 * @private
 * @typedef {Object} sortObject
 * @property {!String} fieldRef
 * @property {!String} dirStr
 */

/**
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query collectionReference or Query to build filter upong
 * @param {?Array.sortObject} sortArray an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @returns Firestore Query object
 */
function sortQuery(query, sortArray = null) {
  return sortArray
    ? sortArray.reduce((accQuery, sortEntry) => {
        return accQuery.orderBy(sortEntry.fieldRef, sortEntry.dirStr || "asc");
        //note "||" - if dirStr is not present(i.e. falsy) default to "asc"
      }, query)
    : query;
}

/**
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query - collectionReference or Query to build filter upong
 * @param {?number} limit - an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @returns {Query} Firestore Query object
 */
function limitQuery(query, limit = null) {
  return limit ? query.limit(limit) : query;
}

//Listener Support
/**
 * @callback RecordListener
 * @param {DocumentSnapshot} documentSnapshot
 */

/**
 *@typedef {function} Unsubscribe
 */

/**
 * @callback CollectionListener
 * @param {QuerySnapshot} querySnapshot
 */

/**
 * sets up a listener for changes to a single record
 * @category Listeners
 * @param {!string} tablePath string describing relative path to document
 * @param {?string} refPath string describing path to parent document
 * @param {CollectionListener}  dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {Unsubscribe} function to be called to release subscription
 */
export function ListenRecords(
  tablePath,
  refPath = null,
  dataCallback,
  errCallback
) {
  const db = dbReference(refPath);
  return ListenRecordsCommon(
    db.collection(tablePath), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
}

/**
 * Sets up a listener to a query
 * @category Listeners
 * @param {!string} tablePath Name (or pathname) of table to query too - may be sub-collection of
 * optional reference
 * @param {?string} refPath An optional Firestore DocumentReference. If present, the
 * "table" parameter above is relative to this reference
 * @param {CollectionListener} dataCallback callback function with query results
 * @param {callback} errCallback callback function with error results
 * @param {?Array.filterObject} filterArray a 3xn array of filter(i.e. "where") conditions
 * @param {?Array.sortObject} sortArray an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @returns {Unsubscribe} function to be called to release subscription
 */
export function ListenQuery(
  tablePath,
  refPath = null,
  dataCallback,
  errCallback,
  filterArray = null,
  sortArray = null
) {
  const db = dbReference(refPath);

  return ListenRecordsCommon(
    sortQuery(filterQuery(db.collection(tablePath), filterArray), sortArray), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
}

/**
 * sets up a listener for changes to a collectionGroup
 * @category Listeners
 * @param {!string} tablePath string describing relative path to document
 * @param {?string} refPath string describing path to parent document
 * @param {CollectionListener} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {Unsubscribe} function to be called to release subscription
 */
export function ListenCollectionGroupRecords(
  tablePath,
  dataCallback,
  errCallback
) {
  const db = fdb;
  //let reference = db.collection(tablePath);

  return ListenRecordsCommon(
    db.collectionGroup(tablePath), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
}

/**
 * sets up a listener for changes to a collectionGroup by query
 * @category Listeners
 * @param {!string} table string describing the name of a collectionGroup
 * @param {CollectionListener} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @param {?Array.filterObject} filterArray a 3xn array of filter(i.e. "where") conditions
 * @param {?Array.sortObject} sortArray an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @returns {Unsubscribe} function to be called to release subscription
 */
export function ListenCollectionGroupQuery(
  table,
  dataCallback,
  errCallback,
  filterArray,
  sortArray
) {
  const db = fdb;

  return ListenRecordsCommon(
    sortQuery(filterQuery(db.collectionGroup(table), filterArray), sortArray), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
}

/**
 * @param {DocumentReference} reference
 * @param {RecordListener} dataCallback
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {function} function to be called to release subscription
 */
function ListenRecordsCommon(reference, dataCallback, errCallback) {
  //returns an unsubscribe function
  return reference.onSnapshot(
    (querySnapshot) => {
      if (!querySnapshot.empty) {
        let dataArray = RecordsFromSnapshot(querySnapshot);
        dataCallback(dataArray);
      } else errCallback("noDocuments:ListenRecordsCommon");
    },
    (err) => {
      errCallback(`${err} ${reference.path} setup:ListenRecordsCommon`);
    }
  );
}

/**
 * Listen to changes to a single record
 * @category Listeners
 * @param {!string} tablePath string describing relative path to requested
 * record
 * @param {!string} Id string of Id of requested document
 * @param {?string} refPath string od full path to parent document
 * @param {RecordListener} dataCallback callback to handle changes to
 * requested document
 * @param {callback} errCallback callback to handle error reporting and
 * operations
 * @returns {Unsubscribe} function to be called to release subscription
 */
export function ListenRecord(
  tablePath,
  Id,
  refPath = null,
  dataCallback,
  errCallback
) {
  const db = dbReference(refPath);

  const docRef = db.collection(tablePath).doc(Id);

  //returns an unsubscribe function
  return docRef.onSnapshot(
    (docSnapshot) => {
      if (docSnapshot.exists) dataCallback(RecordFromSnapshot(docSnapshot));
      else errCallback("No Document Exists to Listen");
    },
    (err) => {
      errCallback(err + " No Document Exists to Listen");
    }
  );
}

export class PaginateFetch {
  /**
   * @classdesc constructs an object to paginate through large Firestore Tables
   * @param {string} table a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {array} filterArray an (optional) 3xn array of filter(i.e. "where") conditions
   * The array is assumed to be sorted in the correct order -
   * i.e. filterArray[0] is added first; filterArray[length-1] last
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   * @param {array} sortArray a 2xn array of sort (i.e. "orderBy") conditions
   * @param {?string} refPath (optional) allows "table" parameter to reference a sub-collection
   * of an existing document reference (I use a LOT of structured collections)
   * @param {number} limit page size
   * @category Paginator
   */
  constructor(
    table,
    filterArray = null,
    sortArray = null,
    refPath = null,
    limit = PAGINATE_DEFAULT
  ) {
    const db = dbReference(refPath);

    /**
     * current limit of query results
     * @type {number}
     */
    this.limit = limit;
    /**
     * underlying query for fetch
     * @type {Query}
     */
    this.Query = sortQuery(
      filterQuery(db.collection(table), filterArray),
      sortArray
    );
    /**
     * current status of pagination
     * -1 pending; 0 uninitialized; 1 updated;
     * @type {PagingStatus}
     */
    this.status = PAGINATE_INIT;
  }

  /**
   * executes the query again to fetch the next set of records
   * @returns {Promise<Array.Record>} returns an array of records - the next page
   */
  async PageForward() {
    const runQuery = this.snapshot
      ? this.Query.startAfter(last(this.snapshot.docs))
      : this.Query;

    this.status = PAGINATE_PENDING;

    return runQuery
      .limit(this.limit)
      .get()
      .then((QuerySnapshot) => {
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone beyond start)
        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          //return Promise.resolve(QuerySnapshot);
          this.snapshot = QuerySnapshot;
        }
        return this.snapshot
          ? Promise.resolve(RecordsFromSnapshot(this.snapshot))
          : Promise.resolve(null);
      });
  }

  /**
   * executes the query again to fetch the previous set of records
   * @returns {Promise<Array.Record>} returns an array of records - the next page
   */
  async PageBack() {
    const runQuery = this.snapshot
      ? this.Query.endBefore(this.snapshot.docs[0])
      : this.Query;

    this.status = PAGINATE_PENDING;

    return runQuery
      .limitToLast(this.limit)
      .get()
      .then((QuerySnapshot) => {
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone back ebfore start)
        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          this.snapshot = QuerySnapshot;
        }
        return RecordsFromSnapshot(this.snapshot);
      });
  }
}

export class PaginateGroupFetch {
  /**
   * @classdesc constructs an object to paginate through large Firestore Tables
   * @param {!string} group a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {?filterObject} [filterArray] an (optional) 3xn array of filter(i.e. "where") conditions
   * The array is assumed to be sorted in the correct order -
   * i.e. filterArray[0] is added first; filterArray[length-1] last
   * @param {!sortObject} [sortArray] a 2xn array of sort (i.e. "orderBy") conditions
   * @param {?number} limit (optional) page size
   * @category Paginator
   */
  constructor(
    group,
    filterArray = null,
    sortArray = null,
    limit = PAGINATE_DEFAULT
  ) {
    const db = fdb;

    /**
     * current limit basis for listener query
     * @type {number}
     */
    this.limit = limit;
    /**
     * Query that forms basis for listener query
     * @private
     * @type {Query}
     */
    this.Query = sortQuery(
      filterQuery(db.collectionGroup(group), filterArray),
      sortArray
    );
    /**
     * current status of listener
     *  -1 pending; 0 uninitialized; 1 updated;
     * @type {PagingStatus}
     */
    this.status = PAGINATE_INIT;
  }

  /**
   * executes the query again to fetch the next set of records
   * @returns {Promise<Array.Record>}
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   */
  async PageForward() {
    const runQuery = this.snapshot
      ? this.Query.startAfter(last(this.snapshot.docs))
      : this.Query;

    this.status = PAGINATE_PENDING;

    return runQuery
      .limit(this.limit)
      .get()
      .then((QuerySnapshot) => {
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone beyond start)
        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          //return Promise.resolve(QuerySnapshot);
          this.snapshot = QuerySnapshot;
        }
        return RecordsFromSnapshot(this.snapshot);
      });
  }

  /**
   * executes the query again to fetch the previous set of records
   * @returns {Promise<Array.Record>}
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   */
  async PageBack() {
    const runQuery = this.snapshot
      ? this.Query.endBefore(this.snapshot.docs[0])
      : this.Query;

    this.status = PAGINATE_PENDING;

    return runQuery
      .limitToLast(this.limit)
      .get()
      .then((QuerySnapshot) => {
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone back before start)
        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          this.snapshot = QuerySnapshot;
        }
        return RecordsFromSnapshot(this.snapshot);
      });
  }
}

export class PaginatedListener {
  /**
   * @classdesc Creates an object to allow for paginating a listener for table
   * read from Firestore. REQUIRES a sorting choice; masks some
   * subscribe/unsubscribe action for paging forward/backward
   * @param {!string} tablePath a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {?refPath} refPath (optional) allows "table" parameter to reference a sub-collection
   * of an existing document reference (I use a LOT of structured collections)
   * @param {!RecordListener} dataCallback
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   * @param {!RecordListener} errCallback
   * @param {?number} limit (optional) pagesize
   * @param {?Array.filterObject} filterArray an (optional) 3xn array of filter(i.e. "where") conditions
   * The array is assumed to be sorted in the correct order -
   * i.e. filterArray[0] is added first; filterArray[length-1] last
   * @param {!Array.sortObject} sortArray a 2xn array of sort (i.e. "orderBy") conditions
   * @category Paginator
   */
  constructor(
    tablePath,
    refPath = null,
    dataCallback = null,
    errCallback = null,
    limit = PAGINATE_DEFAULT,
    filterArray = null,
    sortArray = [{ fieldRef: "name", dirStr: "asc" }]
  ) {
    /**
     * table path at base of listener query, relative to original refPath
     * @type {string}
     */
    this.tablePath = tablePath;
    /**
     * array of filter objects for listener query
     * @type {filterObject}
     */
    this.filterArray = filterArray;
    /**
     * array of sort objects for listener query
     * @type {sortObject}
     */
    this.sortArray = sortArray;
    /**
     * refPath as basis for listener query
     * @type {string}
     */
    this.refPath = refPath;
    /**
     * current limit basis for listener query
     * @type {number}
     */
    this.limit = limit;
    this._setQuery();
    /**
     * current dataCallback of listener query
     * @type {RecordListener}
     */
    this.dataCallback = dataCallback;
    /**
     * current errCallback of listener query
     * @type {callback}
     */
    this.errCallback = errCallback;
    /**
     * current status of listener
     * @type {number}
     */
    this.status = PAGINATE_INIT;
  }

  /**
   * reconstructs the basis query
   * @returns {Query}
   */
  _setQuery() {
    const db = this.refPath ? dbReference(this.refPath) : fdb;
    /**
     * Query that forms basis for listener query
     * @private
     * @type {Query}
     */
    this.Query = sortQuery(
      filterQuery(db.collection(this.tablePath), this.filterArray),
      this.sortArray
    );
    /**
     * last QuerySnapshot returned for listener query
     * @private
     * @type {QuerySnapshot}
     */
    this.snapshot = null;
    this.unsubscriber = null;
    return this.Query;
  }

  /**
   * resets the listener query to the next page of results.
   * Unsubscribes from the current listener, constructs a new query, and sets it
   * as the new listener
   * @returns {Unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  async PageForward() {
    const runQuery =
      this.unsubscriber && !this.snapshot.empty
        ? this.Query.startAfter(last(this.snapshot.docs))
        : this.Query;

    //IF unsubscribe function is set, run it.
    this.unsubscriber && this.unsubscriber();

    this.status = PAGINATE_PENDING;

    this.unsubscriber = runQuery.limit(Number(this.limit)).onSnapshot(
      (QuerySnapshot) => {
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone back ebfore start)
        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          this.snapshot = QuerySnapshot;
        }
        this.dataCallback(RecordsFromSnapshot(this.snapshot));
      },
      (err) => {
        this.errCallback(err);
      }
    );
    return this.unsubscriber;
  }

  /**
   * resets the listener query to the next page of results.
   * Unsubscribes from the current listener, constructs a new query, and sets it\
   * as the new listener
   * @returns {Unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  async PageBack() {
    const runQuery =
      this.unsubscriber && !this.snapshot.empty
        ? this.Query.endBefore(this.snapshot.docs[0])
        : this.Query;

    //IF unsubscribe function is set, run it.
    this.unsubscriber && this.unsubscriber();

    this.status = PAGINATE_PENDING;

    this.unsubscriber = runQuery.limitToLast(Number(this.limit)).onSnapshot(
      (QuerySnapshot) => {
        //acknowledge complete
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone back ebfore start)
        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          this.snapshot = QuerySnapshot;
        }
        this.dataCallback(RecordsFromSnapshot(this.snapshot));
      },
      (err) => {
        this.errCallback(err);
      }
    );
    return this.unsubscriber;
  }

  /**
   * sets page size limit to new value, and restarts the paged listener
   * @param {number} newLimit
   * @returns {Unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  async ChangeLimit(newLimit) {
    const runQuery = this.Query;

    //IF unsubscribe function is set, run it.
    this.unsubscriber && this.unsubscriber();

    this.limit = newLimit;

    this.status = PAGINATE_PENDING;

    this.unsubscriber = runQuery.limit(Number(this.limit)).onSnapshot(
      (QuerySnapshot) => {
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone back ebfore start)
        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          this.snapshot = QuerySnapshot;
        }
        this.dataCallback(RecordsFromSnapshot(this.snapshot));
      },
      (err) => {
        this.errCallback(err);
      }
    );
    return this.unsubscriber;
  }

  /**
   * changes the filter on the subscription
   * This has to unsubscribe the current listener,
   * create a new query, then apply it as the listener
   * @param {filterObject} [filterArray] an array of filter descriptors
   * @returns {Unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  async ChangeFilter(filterArray) {
    //IF unsubscribe function is set, run it (and clear it)
    this.unsubscriber && this.unsubscriber();

    this.filterArray = filterArray; // save the new filter array
    const runQuery = this._setQuery(); // re-build the query
    this.status = PAGINATE_PENDING;

    //fetch the first page of the new filtered query
    this.unsubscriber = runQuery.limit(Number(this.limit)).onSnapshot(
      (QuerySnapshot) => {
        this.status = PAGINATE_UPDATED;
        //*IF* documents (i.e. haven't gone back ebfore start)
        this.snapshot = QuerySnapshot;
        this.dataCallback(RecordsFromSnapshot(this.snapshot));
      },
      (err) => {
        this.errCallback(err);
      }
    );
    return this.unsubscriber;
  }

  /**
   * IF unsubscribe function is set, run it.
   */
  async unsubscribe() {
    //IF unsubscribe function is set, run it.
    this.unsubscriber && this.unsubscriber();
    this.unsubscriber = null;
  }
}

//////////////////////////////////////////////////////////////////////
// convenience functions
/**
 * Contructs a filter that selects only the "owner" section of a
 * collectionGroup query - in other words, descendents of a particular
 * top=level document.  This takes advantage of Firestore's indexing,
 * which "names"/indexes all documents using the FULL PATH to the
 * document, starting from the top-most, i.e.:
 * TOP_COLLECTION/{dociId}/NEXT_COLLECTION/{docId}/NEXT_NEXT_COLLECTION/{etc}
 * This functions knowns NOTHING about the actual schema; it simply uses
 * the path of the indicated "owner" as starting portion of ALL the
 * "child" documents of the owner. It also takes advantage of the
 * strictly alpha-numeric nature of the path string.
 * As such, ALL children paths strings MUST be "greater than" the owner
 * bare path, and MUST be LESS THAN the alpha-numerically "next" value:
 * e.g. if the "owner" path is TOP_COLLECTION/abcdefg, then
 *
 * /TOP_COLLECTION/abcdefh > __name__ > //TOP_COLLECTION/abcdefg
 * (assuming LEXICAL SORT)
 * IMPORTANT NOTE:
 * Because this filter uses an INEQUALITY, .sortBy() conditions
 * are not supported
 * @category Tree Slice
 * @param {!Record} owner
 * @param {?filterObject} queryFilter additional filter parameters
 *
 * @returns {filterObject}
 */
export function ownerFilter(owner, queryFilter = null) {
  const ownerPath = owner.refPath;
  let nextPath = ownerPath.slice();
  const nextLength = nextPath.length;
  let lastChar = nextPath.charCodeAt(nextLength - 1);
  nextPath = nextPath
    .slice(0, nextLength - 1)
    .concat(String.fromCharCode(lastChar + 1));

  const ownerParts = [
    {
      fieldRef: "__name__",
      opStr: ">",
      value: ownerPath,
    },
    {
      fieldRef: "__name__",
      opStr: "<",
      value: nextPath,
    },
  ];
  return queryFilter ? ownerParts.concat(queryFilter) : ownerParts;
}

/**
 * Uses the ownerFilter (above) to establish a listener to "just" the
 * parts of a collectionGroup that are descendants of the passed "owner"
 * record.
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @param {RecordListener}  dataCallback function to be called with changes to record
 * @param {RecordListener} errCallback function to be called when an error
 * occurs in listener
 * @returns {Unsubscribe} function to be called to release subscription
 * @category Tree Slice
 *
 */
export function listenSlice(owner, collectionName, dataCallBack, errCallBack) {
  try {
    return ListenCollectionGroupQuery(
      collectionName,
      ownerFilter(owner),
      null, //no sort query conditions
      dataCallBack,
      errCallBack
    );
  } catch (err) {
    console.log(`failed:listenSlice setup ${collectionName} err: ${err}`);
  }
}

/**
 * Wrapper around database fetch, using ownerFilter above to
 * select/fetch just an "owner" parent document's descendants from a
 * collectionGroup
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @returns {Promise.Array.Record} response
 * @category Tree Slice
 */
export async function fetchSlice(owner, collectionName) {
  try {
    return collectRecordsInGroupByFilter(collectionName, ownerFilter(owner));
  } catch (err) {
    console.log(`failed:fetchSlice setup ${collectionName} err: ${err}`);
  }
}

/**
 * Wrapper around database fetch, using ownerFilter above to
 * select/fetch just an "owner" parent document's descendants from a
 * collectionGroup
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @param {Array.filterObject} filterArray filter parameters
 * @returns {Promise.Array.Record} response
 * @category Tree Slice
 */
export async function querySlice(owner, collectionName, filterArray) {
  try {
    return collectRecordsInGroupByFilter(
      collectionName,
      ownerFilter(owner, filterArray)
    );
  } catch (err) {
    console.log(`failed:querySlice ${collectionName} err: ${err}`);
  }
}

/**
 * Uses the ownerFilter (above) to establish a listener to "just" the
 * parts of a collectionGroup that are descendants of the passed "owner"
 * record.
 * @category Tree Slice
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @param {Array.filterObject} filterArray filter parameters
 * @param {RecordListener}  dataCallback function to be called with changes to record
 * @param {!callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {callback} function to be called to release subscription
 *
 */
export function listenQuerySlice(
  owner,
  collectionName,
  filterArray,
  dataCallBack,
  errCallBack
) {
  try {
    return ListenCollectionGroupQuery(
      collectionName,
      ownerFilter(owner, filterArray),
      null,
      dataCallBack,
      errCallBack
    );
  } catch (err) {
    console.log(`failed:listenQuerySlice setup ${collectionName} err: ${err}`);
  }
}

/**
 * Returns the "type" (collection name) of the top-most parent of a
 * record, derived from the refPath
 * @category Tree Slice
 * @param {Record} record
 * @returns {string} the collection name
 */
export function ownerType(record) {
  return record?.refPath.split(`/`)[0];
}

/**
 * Returns the Id (documentId) of the top-most parent of a
 * record, derived from the refPath
 * @category Tree Slice
 * @param {Record} record
 * @returns {string} the Id
 */
export function ownerId(record) {
  return record?.refPath.split(`/`)[1];
}

/**
 * Returns the Id (documentId) of the top-most parent of a
 * record, derived from the refPath
 * @function
 * @static
 * @category Tree Slice
 * @param {Record} record
 * @returns {string} the Id
 */
export const ownerRefPath = (record) => {
  return record?.refPath
    ? `${ownerType(record)}/${ownerId(record)}`
    : undefined;
};

/**
 * Returns the bare owner record reference to the parent (root) of a
 * provided child
 * @category Tree Slice
 * @param {Record} record child record
 * @returns {Record} reference to the parent (root) record
 */
export function ownerByChild(record) {
  return record?.refPath
    ? {
        Id: `${ownerId(record)}`,
        refPath: `${ownerType(record)}/${ownerId(record)}`,
      }
    : undefined;
}

/**
 * returns the minimal reference record from an Id and "type"
 * @category Tree Slice
 * @param {!string} ownerId
 * @param {!string} ownerType
 * @returns {Record} reference to the parent (root) record
 */
export function ownerByOwnerType(ownerId, ownerType) {
  return {
    Id: ownerId,
    refPath: `${ownerType}/${ownerId}`,
  };
}

/**
 * returns the record for the top-most parent of a record,
 * derived from the refPath
 * @category Tree Slice
 * @param {Record} record
 * @returns {Document}
 */
export async function fetchOwner(record) {
  return fetchRecord(
    ownerType(record), //type/collection
    ownerId(record), //Id of record desired
    null, //no refPath (top-level)
    null //no batch
  );
}

/**
 * Returns the "type" (collection name) the passed record is
 * stored in, derived from the refPath
 * @category Typed
 * @param {Record} record
 * @returns {string} the collection name
 */
export function recordType(record) {
  return record?.refPath ? penultimate(record.refPath.split(`/`)) : undefined;
}

/**
 * Returns the Id (documentId) of the passed record derived from the refPath
 * @category Typed
 * @param {Record} record
 * @returns {string} the Id
 */
export function recordId(record) {
  return record?.refPath ? last(record.refPath.split(`/`)) : undefined;
}

/**
 * optionally batched record update - abstracts batch process from specific types
 * @category Typed
 * @param {Record} data - the data object/record to update.  This will create a new one if it doesn't exist
 * @param {!string} data.refPath - only part used
 * @param {?Record} parent - parent object (if any) this belongs to
 * @param {!string} parent.refPath - full path to parent document
 * @param {!string} type - name of type of object - i.e. the sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @return {Promise.ChainType} WriteBatch, Transaction or Void
 */
export async function typedWrite(data, parent, type, batch = null) {
  return writeRecord(
    type, //type of sub-collection...
    data,
    parent?.refPath, //... under parent path reference
    batch
  );
}

/**
 * optionally batched record update - abstracts batch process from specific types
 * @category Typed
 * @param {Record} data - the data object/record to update.  This will create a new one if it doesn't exist
 * @param {ArtistTree} tree - Object with properties of refPath segments
 * @param {string} type - name of type of object - i.e. the sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @return {Promise.ChainType} WriteBatch, Transaction or Void
 */
export async function typedWriteByTree(data, tree, type, batch = null) {
  //existing perks will be over-written, new ones created
  return writeRecord(
    typedTablePathFromTree(tree, type), //type of sub-collection...
    data,
    /*no parent */ null,
    batch
  );
}

/**
 * optionally batched record update - abstracts batch process from specific types
 * @category Typed
 * @param {Record} data - the data object/record to update.  This will create a new one if it doesn't exist
 * @param {ArtistTree} tree - Object with properties of refPath segments
 * @param {string} type - name of type of object - i.e. the sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @return {Promise.ChainType} WriteBatch, Transaction or Void
 */
export async function typedWriteByChild(
  data,
  child,
  type,
  batch = null,
  mergeOption = null
) {
  //existing perks will be over-written, new ones created
  return writeBack(
    {
      ...data, //base data
      Id: typedIdFromChild(child, type), //Id from child path
      refPath: typedRefPathFromChild(child, type), //refPath from child Path
    },
    batch,
    mergeOption
  );
}

/**
 * Creates a new document reference of the indicated type, and writes
 * it to the backend. Specific intent is when the Id needs to be
 * pre-specified, or shared outside this function. Normal writing
 * action will silently create a new document, which has to then be
 * found by query
 * @category Typed
 * @param {Record} data - the data object/record to create.  This
 * will create a new one if it doesn't exist
 * @param {?Record} parent - parent object (if any) this
 * belongs to
 * @param {string} parent.refPath - full path to parent document
 * @param {string} type - name of type of object - i.e. the
 * sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.
 * Transaction will be added to the batch
 * @return {Promise.ChainType} WriteBatch, Transaction or Void
 *
 */
export async function typedCreate(data, parent, type, batch = null) {
  //merge the supplied data into the new data object
  let newData = {
    ...data,
    ...(data.Id ? data : createUniqueReference(type, parent.refPath)),
  };
  //parent data already in created reference
  return typedWrite(newData, parent, type, batch);
}

/**
 * @private
 * @typedef {Map} RecordTree
 * @category Typed
 */

/**
 * Extracts a tree of document ID's from a child document (assumes is a child)
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @returns {RecordTree}
 */
export function treeFromChild(child) {
  let deconstruction = new Map();
  const refPath = child.refPath.slice();
  let parts = refPath.split(`/`);
  while (parts && parts.length) {
    //parse the parts of the path
    let type = parts.shift();
    let Id = parts.shift();
    deconstruction.set(type, Id);
  }
  return deconstruction;
}

/**
 * Builds a refPath *down* to a desired collection/type from an existing
 * RecordTree Map.
 * @category Typed
 * @param {RecordTree} tree
 * @param {!string} type
 * @param {?string} branchType a collection name to start branching from.
 * This is in case tree was built from a sister collection/document
 * @return {string} constructed TablePath (collection)
 */
export function typedTablePathFromTree(tree, type, branchType) {
  let pathString = "";
  let lastId = "";
  for (let [collection, docId] of tree) {
    pathString = `${pathString}${lastId}${collection}/`;
    if (collection === type) {
      //reached requested depth
      break;
    }
    if (collection === branchType) {
      pathString = `${pathString}${docId}/${type}/`;
      // reached branch point
      break;
    }
    //add on the current tree level docId for next collection level
    lastId = `${docId}/`;
  }
  return pathString;
}

/**
 * Builds a refPath *down* to a desired collection/type from an existing
 * RecordTree Map.
 * @category Typed
 * @param {RecordTree} tree
 * @param {!string} type
 * @return {string} constructed refPath (document)
 */
export function typedRefPathFromTree(tree, type) {
  let pathString = "";
  for (let [collection, docId] of tree) {
    pathString = `${pathString}${collection}/${docId}`;
    if (collection === type) {
      //reached requested depth
      break;
    }
    //add on the current tree level docId for next collection level
    pathString = `${pathString}/`;
  }
  return pathString;
}

/**
 * Looks up a "tree" to find the Id of the document at the requested
 * collection level ("type")
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @param {!string} type name of desired type/collection level in tree
 */
export function typedIdFromChild(child, type) {
  //previous/tree/levels/then/type/Id/whatever/else
  //(previous/tree/levels/then/type) (Id/whatever/else)
  //(Id) (whatever/else)
  return treeFromChild(child).get(type);
}

/**
 * Builds a refPath *up* to a desired collection/type from an existing
 * child in a tree
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @param {!string} type
 * @return {string} constructed refPath (collection)
 */
export function typedTablePathFromChild(child, type, branchType = null) {
  return typedTablePathFromTree(treeFromChild(child), type, branchType);
}

/**
 * Builds a refPath *up* to a desired collection/type from an existing
 * child in a tree
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @param {!string} type
 * @return {string} constructed refPath (document)
 */
export function typedRefPathFromChild(child, type) {
  return typedRefPathFromTree(treeFromChild(child), type);
}

/**
 * function to fetch a document from "up" the collection/document tree of a child document
 * @category Typed
 * @param {Record} child - assumed to be an object in a collection/document Tree
 * @param {!string} refPath
 * @param {string} type - type/collection to fetch parent document from
 * @param {ChainType} batch - optional batch object to chain
 * @returns {Promise<RecordObject>}
 */
export async function typedFetchFromChild(
  child,
  type,
  branchType = null,
  batch = null
) {
  return fetchRecord(
    typedTablePathFromChild(child, type, branchType), //Full Path to collection
    typedIdFromChild(child, type), //Id
    null, //No parent needed
    batch //optional Batch object
  );
}

/**
 * function to fetch a document from "up" the collection/document tree of a child document
 * @category Typed
 * @param {RecordTree} tree - assumed to be an object in a collection/document Tree
 * @param {!string} refPath
 * @param {string} type - type/collection to fetch parent document from
 * @param {?WriteBatch|Transaction} batch - optional batch object to chain
 * @returns {Promise<RecordObject>}
 */
export async function typedFetchFromTree(tree, type, batch = null) {
  return fetchRecord(
    typedTablePathFromTree(tree, type), //Full Path to collection
    tree.get(type), //Id of specific document
    null, //No parent needed
    batch //optional Batch object
  );
}

/**
 * function to collect documents from "up" the collection/document tree of a child document
 * @category Typed
 * @param {RecordTree} tree - assumed to be an object in a collection/document Tree
 * @param {string} type - type/collection to fetch parent document from
 * @param {?WriteBatch|Transaction} batch - optional batch object to chain
 * @returns {Promise<Array.Record>}
 */
export async function typedCollectFromTree(
  tree,
  type,
  branchType = null,
  batch = null
) {
  return collectRecords(typedTablePathFromTree(tree, type, branchType));
}

/**
 * function to collect documents from "up" the collection/document tree of a child document
 * @category Typed
 * @param {Record} child - assumed to be an object in a collection/document Tree
 * @param {string} type - type/collection to fetch parent document from
 * @param {?WriteBatch|Transaction} batch - optional batch object to chain
 */
export async function typedCollectFromChild(child, type, branchType = null) {
  return collectRecords(typedTablePathFromChild(child, type, branchType));
}

/**
 * Uses the ownerFilter (above) to establish a listener to "just" the
 * parts of a collectionGroup that are descendants of the passed "owner"
 * record.
 * @function
 * @static
 * @category Typed
 * @param {!string} type - name of type of object - i.e. the sub-collection name
 * @param {?Record} parent - parent object (if any) this belongs to
 * @param {!string} parent.refPath - full path to parent document
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @param {!string} type name of the desired collectionGroup
 * @param {CollectionListener} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {callback} function to be called to release subscription
 *
 */
export async function typedListener(type, parent, dataCallBack, errCallBack) {
  try {
    return ListenRecords(type, parent?.refPath, dataCallBack, errCallBack);
  } catch (err) {
    thisLogger(`failed:typedListener setup ${type} err: ${err}`);
  }
}

/**
 * @class
 * @extends PaginatedListener
 */
export class typedPaginatedListener extends PaginatedListener {
  /**
   * Implements a PaginatedListener using type syntax
   * @category Typed
   * @param {!string} type - the "type" (CollectionName) for this record
   * @param {?RecordObject} parent - the (optional) parent for this
   * record (i.e. a sub-type)
   * @param {!string} parent.refPath - the only required part of a
   * parent record
   * @param {number} pageSize - the page size requested
   * @param {CollectionListener} dataCallback - the callback where data is returned
   * @param {callback} errCallback - callback for errors
   */
  constructor(
    type,
    parent,
    dataCallback,
    errCallback,
    pageSize = PAGINATE_DEFAULT
  ) {
    super(
      type,
      null, //filter
      [{ fieldRef: "name", dirStr: "asc" }], //sort, required
      parent?.refPath, //refPath
      pageSize,
      dataCallback,
      errCallback
    );
  }
}

/**
 * @function localBatchReturn
 * @static
 * Some operations need their internal steps batched.  This routine
 * is a helper to decide if to close the batch now, or defer to the
 * our batch
 * @param {?WriteBatch|Transaction} incomingBatch - a batching object
 * passed into the subroutine Internal Transaction will be added to
 * the incoming batch
 * @param {?WriteBatch|Transaction} internalBatch - a batching object
 * as built *in* the routine, built on the incomingBatch if it exists
 * @return {?WriteBatch|Transaction} WriteBatch, Transaction or Void
 * @example
 * ```
 * export const suboperation = (data, batch = null) => {
 *  let myBatch = batch || openWriteBatch(); //note short circuit
 *  //stuff that happens in the routine
 *  writeRecord(table, data, parent, myBatch);
 *  writeRecord(otherTable, otherData, otherParent, myBatch);
 *  return localBatchReturn(batch, myBatch);
 * }
 * ```
 */
export function localBatchReturn(incomingBatch, internalBatch) {
  //if incoming batch, just pass along, else asynchronously commit local batch
  return incomingBatch ? Promise.resolve(null) : closeWriteBatch(internalBatch);
}

export * from "./Common.js";
