import "@firebase/app";
import "@firebase/firestore";

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
 * @function last
 * @param {object} [array]
 * @returns {object}
 * @description last entry in the array
 */

function last(array) {
  let length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

/**
 * @private
 * @function penultimate
 * @param {object} [array]
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
 * @static
 * @function FirebaseFirestore
 * @param {firebase} firebase
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
export default async function FirebaseFirestore(firebase, config) {
  fdb = firebase.firestore();
  //doesnt run firestore persistence in Admin/Node environment
  !config?.appId ||
    await firebase.firestore().enablePersistence({ synchorizeTabs: true });
  //fdb.settings({ignoreUndefinedProperties: true, merge: true});
  aFieldValue = firebase.firestore.FieldValue;
  aFieldPath = firebase.firestore.FieldPath;

  timestamp = firebase.firestore.Timestamp;
  documentId = aFieldPath.documentId();
  deleteFieldValue = aFieldValue.delete();
  serverTimestampFieldValue = aFieldValue.serverTimestamp();
}

/** @private */
let fdb, aFieldValue, aFieldPath;

/**
 * class for a Firestore timestamp processor
 * @class
 */
let timestamp;

export {timestamp};

/**
 * a fieldPath value to represent the document Id - WARNING
 * Google Firestore has a bug, and this actually represents the FULL PATH
 * to the document
 * @constant
 * @type {Object}
 * @static
 * @category FieldPath
 */
let documentId;
export {documentId};

/**
 * maximum concurrent writes
 * @constant {number} MAX_CONCURRENCY
 * @static
 */
const MAX_CONCURRENCY = 5;
export {MAX_CONCURRENCY};

//convenient fieldValue constants
/**
 * a sentinel value used to delete a field during an
 * update operation
 * @constant
 * @static
 * @type {Object}
 * @category FieldValue
 */
let deleteFieldValue;
export {deleteFieldValue};

/**
 * a sentinel value to set a field to a
 * server-generated timestamp during set(0 or update())
 * @constant
 * @static
 * @type {Object}
 * @category FieldValue
 */
let serverTimestampFieldValue;
export {serverTimestampFieldValue};

/**
 * ----------------------------------------------------------------------
 * return a sentinel to incrment/decrement a field
 * @function
 * @static
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
export const incrementFieldValue = (n) => {
  return aFieldValue.increment(n);
};

/**
 * ----------------------------------------------------------------------
 * returns a sentinel to remove elements from array field
 * @function
 * @static
 * @category FieldValue
 * @param elements REST expanded list of elements to remove
 * @returns {sentinelValue} a sentinel value
 **********************************************************************/
export const arrayRemoveFieldValue = (elements) => {
  return aFieldValue.arrayRemove(...elements);
};

/**
 * ----------------------------------------------------------------------
 * return a sentinel to add/join elements to array field
 * @function arrayUnionFieldValue
 * @static
 * @category FieldValue
 * @param elements REST expanded list of elements to add
 * @returns a sentinel value
 **********************************************************************/
export const arrayUnionFieldValue = (elements) => {
  return aFieldValue.arrayUnion(...elements);
};

/* Firebase APIs */

/**
 * @private
 * @typedef {object} Record
 * common properties of our database records
 * @property {?string} Id - Id of the document as stored in Firestore May
 * be null for new objects
 * @property {?string} refPath - string representing the full path to the
 * Firestore document.  May be blank for new documents to be saved.
 */

/**
 * @private
 * @typedef {Record} [RecordArray]
 * an array of database records
 */

/**
 * ----------------------------------------------------------------------
 * returns an internal record structure from a firestore
 * Document snapshot
 * @private
 * @function
 * @static
 * @param {DocumentSnapshot} DocumentSnapshot
 * @returns {Record}
 */
export const RecordFromSnapshot = (DocumentSnapshot) => {
  return {
    ...DocumentSnapshot.data(),
    Id: DocumentSnapshot.id,
    refPath: DocumentSnapshot.ref.path
  };
};

/**
 * ----------------------------------------------------------------------
 * returns an array of internal record structures from a
 * firestore Query snapshot
 * @private
 * @function
 * @static
 * @param {QuerySnapshot} QuerySnapshot
 * @returns {RecordArray}
 */
export const RecordsFromSnapshot = (QuerySnapshot) => {
  return QuerySnapshot.docs.map((docSnap) => {
    return RecordFromSnapshot(docSnap);
  });
};

/**
 * ----------------------------------------------------------------------
 * returns a Firestore document structure from an internal Record
 * @private
 * @function
 * @static
 * @param {object} Record - cleans up internal document representation
 * @returns {object}
 */
const DocumentFromRecord = (Record) => {
  const cleanData = { ...Record };
  delete cleanData.refPath; //we leave the redundant Id for query optimization
  return cleanData;
};

/**
 * ----------------------------------------------------------------------
 * creates and runs a series of record operations
 * (executed in the param function) as an atomic operation.
 * A transation object is passed to the callback parameter
 * @async
 * @function
 * @static
 * @category Batch
 * @param {callback} updateFunction callback function that expects a Transaction
 * token as it's sole argument.  either all the included/chained
 * record operations will succeed, or none
 * @returns {Promise<object>} a promise with the result of updateFunction
 */
export const runTransaction = (updateFunction) => {
  return fdb.runTransaction(updateFunction);
};

/**
 * ----------------------------------------------------------------------
 * Creates a WriteBatch object tocollect actions for Batch writing to backend
 * @function
 * @static
 * @category Batch
 * @returns {WriteBatch} object that operations are added to for a bulk
 * operation
 */
export const openWriteBatch = () => {
  return fdb.batch();
};

/**
 * ----------------------------------------------------------------------
 * Dispatches an asynchronous Closure to submit Batch
 * @async
 * @function
 * @static
 * @category Batch
 * @param {WriteBatch} batch - WriteBatch to close
 * @returns {Promise<void>}
 */
export const closeWriteBatch = (
  /**
   */
  batch = null
) => {
  return (async (innerBatch) => {
    return innerBatch.commit();
  })(batch);
};

/**
 * ----------------------------------------------------------------------
 * Creates a DocumentReference document to the collection
 * referenced in parameter tablePath (relative to optional refPath).
 * This is can be useful for Transactions and Batches, which
 * can only get(), set() or update() existing documents. Tricksie!
 * @function
 * @static
 * @param {!string} tablePath string representing a valid path to a collection to
 * create the new document in, relative to a document reference
 * passed in
 * @param {?string} refPath an optional valid document reference to start the table path
 * @returns {DocumentReference} Firestore Document Reference
 */
export const createUniqueReference = (tablePath, refPath = null) => {
  const db = dbReference(refPath);
  const docRef = db.collection(tablePath).doc(); // just
  return { Id: docRef.id, refPath: docRef.path };
};

/**
 * ----------------------------------------------------------------------
 * generates a document reference from a path
 * if passed; else returns the db base reference
 * @private
 * @function
 * @static
 * @param {string} refPath Path to base actions from. May be null
 */
const dbReference = (refPath) => {
  return refPath ? fdb.doc(refPath) : fdb;
};

/**
 * ----------------------------------------------------------------------
 * Writes a Firestore record to collection indicated by tablePath
 * relative to option DocumentReference refPath
 * @async
 * @function
 * @static
 * @param {!string} tablePath - string representing a valid path to a collection to
 * create or update the document in, relative to a document reference
 * passed in
 * @param {!Record} data - Data/Record object to write to database
 * @param {?string} refPath - an optional valid document reference to start the table path
 * @param {?WriteBatch|Transaction} batch - optional chain token to include this
 * operation as part of an Atomic Transaction
 * @param {?boolean} mergeOption - whether to merge into existing data; default TRUE
 * @returns {Promise<Record>}
 */
export const writeRecord = (
  tablePath,
  data,
  refPath = null,
  batch = null,
  mergeOption = true
) => {
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
      return batch.set(docRef, cleanData, { merge: mergeOption });
    } else {
      //not a transaction
      return docRef.set(cleanData, { merge: mergeOption }).then(() => {
        return Promise.resolve({
          ...data,
          refPath: data.refPath || docRef.path
        });
      });
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * ----------------------------------------------------------------------
 * @description Writes given data object (or map) to the given documentReference
 * @async
 * @function
 * @static
 * @param {!Record} data Object/Map to be written back to the Firestore
 * @param {!string} refPath DocumentReference to write document to
 * @param {?WriteBatch|Transaction} Transaction Optional Transaction to enclose this action in
 * @param {?boolean} mergeOption - whether to merge into existin data; default TRUE
 * @returns {Promise<Record>} data record as written
 */
export const writeRecordByRefPath = (
  data,
  refPath,
  batch = null,
  mergeOption = true
) => {
  return writeBack({ ...data, refPath: refPath }, batch, mergeOption);
};

/**
 * ----------------------------------------------------------------------
 * Writes a local-schema document back to the Firestore.  Assume
 * object/map came from the firestore
 * @async
 * @function
 * @static
 * @param {!Record} data Object/Map to be written back to the Firestore
 * @param {?WriteBatch|Transaction} Transaction Optional Transaction to enclose this action in
 * @param {?boolean} mergeOption - whether to merge into existin data; default TRUE
 * @returns {Promise<Record>} record as written.
 */
export const writeBack = (data, batch = null, mergeOption = true) => {
  const cleanData = DocumentFromRecord(data);

  if (batch) {
    //if passed a transaction object, use it
    return batch.set(createRefFromPath(data.refPath), cleanData, {
      merge: mergeOption
    });
  } else {
    return createRefFromPath(data.refPath)
      .set(cleanData, { merge: mergeOption })
      .then(() => {
        return Promise.resolve(data);
      });
  }
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function
 * @static
 * @description query for a SET of records
 * @param {!string} tablePath string representing path ro requested
 * collection
 * @param {?string} refPath string representing a path to the relative PARENT
 * of the requested collection
 * @returns {Promise<Array<Record>>}
 */
export const collectRecords = (tablePath, refPath = null) => {
  const db = dbReference(refPath);

  return db
    .collection(tablePath) //Dangerously assumes collection exists
    .get()
    .then((querySnapshot) => {
      // returns a promise
      return !querySnapshot.empty
        ? Promise.resolve(RecordsFromSnapshot(querySnapshot))
        : Promise.reject("noDocuments:collectRecords:" + tablePath);
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecords:" + tablePath);
    });
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function collectRecordsByFilter
 * @static
 * @descriptions returns an array of documents from Firestore
 * @param {!string} tablePath a properly formatted string representing the requested collection
 * - always an ODD number of elements
 * @param {filterObject} [filterArray] an array of filterObjects
 * The array is assumed to be sorted in the correct order -
 * i.e. filterArray[0] is added first; filterArray[length-1] last
 * returns data as an array of objects (not dissimilar to Redux State objects)
 * with both the documentID and documentReference added as fields.
 * @param {?string} refPath (optional) allows "table" parameter to reference a sub-collection
 * of an existing document reference (I use a LOT of structured collections)
 * @returns {Promise<Array<Record>>}
 */
export const collectRecordsByFilter = (
  tablePath,
  refPath = null,
  filterArray = null,
  sortArray = null,
  limit = null
) => {
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
        ? Promise.resolve(RecordsFromSnapshot(querySnapshot))
        : Promise.reject("noDocuments:collectRecordsByFilter:" + tablePath);
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecordsByFilter");
    });
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function collectRecordsInGroup
 * @static
 * @description query for a SET of records from a COLLECTIONGROUP - all
 * collections of a similar name, regardless of parents.  It is up to the
 * User to ensure these are at a similar level/structure - Firestore just
 * matches the name
 * @param {!string} tableName string describing the NAME of the collection
 * group desired
 * @returns {Promise<Array<Record>>}
 */
export const collectRecordsInGroup = (tableName) => {
  const db = fdb;

  return db
    .collectionGroup(tableName) //Dangerously assumes collection exists
    .get()
    .then((querySnapshot) => {
      // returns a promise
      if (!querySnapshot.empty)
        return Promise.resolve(RecordsFromSnapshot(querySnapshot));
      else
        return Promise.reject("noDocuments:collectRecordsInGroup:" + tableName);
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecordsInGroup:" + tableName);
    });
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function collectRecordsInGroupByFilter
 * @static
 * @description queries for Records from a CollectionGroup, filtered by
 * the passed array of filterObjects
 * @param {!string} tableName string describing the Name of the collectiongroup
 * @param {?filterObject} [filterArray] array of objects describing filter
 * operations
 * @returns {Promise<Array<Record>>}
 **/
export const collectRecordsInGroupByFilter = (
  tableName,
  filterArray = null,
  sortArray = null,
  limit = null
) => {
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
        ? Promise.resolve(RecordsFromSnapshot(querySnapshot))
        : Promise.reject(
            "noDocuments:collectRecordsInGroupByFilter:" + tableName
          );
    })
    .catch((err) => {
      return Promise.reject(err + ":collectRecordsInGroupByFilter");
    });
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function
 * @static
 * @description retrieve a record from the Firestore.  If a Batch object is passed,
 * returns a chained Btahc object
 * @param {string} tablePath - path to the enclosing collection
 * @param {string} Id - Id of the specific document requested
 * @param {?string} refPath - optional document reference to base tablePath from
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 *
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export const fetchRecord = (tablePath, Id, refPath = null, batch = null) => {
  const db = dbReference(refPath);

  const docRef = db.collection(tablePath).doc(Id);

  return batch
    ? batch.get(docRef) // returned chained Batch object
    : docRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          return RecordFromSnapshot(docSnapshot);
        } else {
          return Promise.reject("no document");
        }
      });
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function fetchRecordByRefPath
 * @static
 * @description fetches a single record from the database, using just a
 * refPath to identify the document
 * @param {!string} docRefPath string identifying the full path to the
 * requested document
 * @param {?WriteBatch|Transaction} batch object for collecting batched
 * operations
 * @returns {Promise<Record>}
 */
export const fetchRecordByRefPath = (docRefPath, batch = null) => {
  //Dangerously assumes refPath  exists
  if (batch) return batch.get(createRefFromPath(docRefPath));
  else
    return createRefFromPath(docRefPath)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          return RecordFromSnapshot(docSnapshot);
        } else {
          return Promise.reject(null);
        }
      });
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function fetchRecordByFilter
 * @static
 * @description fetches a SINGLE record from the database, using just a
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
export const fetchRecordByFilter = (
  table,
  filterArray,
  refPath = null,
  batch = null
) => {
  return collectRecordsByFilter(table, filterArray, refPath, batch).then(
    (records) => {
      return Promise.resolve(records[0]);
    }
  );
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function fetchRecordInGroupByFilter
 * @static
 * @description fetches a SINGLE record from the database, using just a
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
export const fetchRecordInGroupByFilter = (
  table,
  filterArray,
  batch = null
) => {
  return collectRecordsInGroupByFilter(table, filterArray, batch).then(
    (records) => {
      return Promise.resolve(records && records?.length ? records[0] : null);
    }
  );
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function deleteRecord
 * @static
 * @description deletes a single record from the database
 * @param {!string} table string naming the parent collection of the document
 * @param {Record} record
 * @param {?string} refPath - optional document reference to base tablePath from
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export const deleteRecord = (table, record, refPath = null, batch = null) => {
  const db = dbReference(refPath);
  const docRef = db.collection(table).doc(record.Id); //Dangerously assumes collection exists

  return batch ? batch.delete(docRef) : docRef.delete();
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function deleteRecordByRefPath
 * @static
 * @description deletes a single record from the database
 * @param {!string} docRefPath string identifying the full path to the
 * requested document
 * @param {?WriteBatch|Transaction} batch - optional batch reference
 * @returns {Promise<Record|WriteBatch|Transaction>}
 **********************************************************************/
export const deleteRecordByRefPath = (docRefPath, batch = null) => {
  return batch
    ? batch.delete(createRefFromPath(docRefPath))
    : createRefFromPath(docRefPath).delete();
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function updateRecordFields
 * @static
 * @param {Record} recordUpdate object of field:value entries to update.
 * @param {!string} recordUpdate.refPath - full path to document/record
 * @description  update record by fields - Allows use of FieldPath options
 * such as .delete(). Only specifically referenced fields will be
 * affected. Assumes the originating docRef is passed as refPath: field
 * @returns {Promise<Record>}
 */
export const updateRecordFields = async (recordUpdate) => {
  const cleanData = DocumentFromRecord(recordUpdate);

  try {
    return createRefFromPath(recordUpdate.refPath).update(cleanData);
  } catch (err) {
    return Promise.reject(err + ":updateRecordFields");
  }
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function updateRecordByRefPath
 * @static
 * @param {!string} docRefPath - full path to document to update
 * @param {!Record} data - Record of values to update
 * @param {?string} data.Id - document Id of record
 * @param {?WriteBatch|Transaction} batch - batching object
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export const updateRecordByRefPath = (docRefPath, data, batch = null) => {
  const cleanData = DocumentFromRecord(data);
  //  delete cleanData.Id;
  return batch
    ? batch.set(createRefFromPath(docRefPath), cleanData, {
        merge: true
      })
    : createRefFromPath(docRefPath)
        .set(cleanData, { merge: true }) //update merges record
        .then(() => {
          return data;
        });
};

/**
 * ----------------------------------------------------------------------
 * @async
 * @function writeArrayValue
 * @static
 * @description adds a new value to a firestore record array entry
 * @param {!string} fieldName  the string name of the array to be updated
 * @param {any} fieldValue the value to add to the array
 * @param {!string} docRefPath the reference path for the document to be updated
 * @param {WriteBatch|Transaction} batch optional - used to chain transactions
 * @returns {Promise<Record|WriteBatch|Transaction>}
 */
export const writeArrayValue = (
  fieldName,
  fieldValue,
  docRefPath,
  batch = null
) => {
  if (batch)
    return batch.set(
      createRefFromPath(docRefPath),
      {
        [fieldName]: aFieldValue.arrayUnion(fieldValue)
      },
      { merge: true }
    );
  else
    return createRefFromPath(docRefPath).set(
      {
        [fieldName]: aFieldValue.arrayUnion(fieldValue)
      },
      { merge: true }
    );
};
/** @private */
const createRefFromPath = (docPath, refPath = null) => {
  const db = dbReference(refPath);

  return db.doc(docPath);
};

/**
 * @private
 * @typedef {Object} filterObject
 * @property {!String} fieldRef
 * @property {!String} opStr
 * @property {any} value
 */

/**
 * ----------------------------------------------------------------------
 * @private
 * @function
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query collectionReference or Query to build filter upong
 * @param {?filterObject} [filterArray] an (optional) 3xn array of filter(i.e. "where") conditions
 * @returns {Query} Firestore Query object
 */
const filterQuery = (query, filterArray = null) => {
  return filterArray
    ? filterArray.reduce((accQuery, filter) => {
        return accQuery.where(filter.fieldRef, filter.opStr, filter.value);
      }, query)
    : query;
};

/**
 * @private
 * @typedef {Object} sortObject
 * @property {!String} fieldRef
 * @property {!String} dirStr
 */

/**
 * ----------------------------------------------------------------------
 * @private
 * @function
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query collectionReference or Query to build filter upong
 * @param {?sortObject} [sortArray] an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @returns Firestore Query object
 */
const sortQuery = (query, sortArray = null) => {
  return sortArray
    ? sortArray.reduce((accQuery, sortEntry) => {
        return accQuery.orderBy(sortEntry.fieldRef, sortEntry.dirStr || "asc");
        //note "||" - if dirStr is not present(i.e. falsy) default to "asc"
      }, query)
    : query;
};

/**
 * ----------------------------------------------------------------------
 * @private
 * @function
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query - collectionReference or Query to build filter upong
 * @param {?number} limit - an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @returns Firestore Query object
 */
const limitQuery = (query, limit = null) => {
  return limit ? query.limit(limit) : query;
};

//Listener Support
/**
 * @private
 * @callback RecordListener
 * @static
 * @param {DocumentSnapshot} documentSnapshot
 */

/**
 * @private
 * @callback CollectionListener
 * @static
 * @param {QuerySnapshot} querySnapshot
 */

/**
 * ----------------------------------------------------------------------
 * sets up a listener for changes to a single record
 * @function
 * @static
 * @category Listeners
 * @param {!string} tablePath string describing relative path to document
 * @param {?string} refPath string describing path to parent document
 * @param {CollectionListener}  dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {unsubscribe} function to be called to release subscription
 */
export const ListenRecords = (
  tablePath,
  refPath = null,
  dataCallback,
  errCallback
) => {
  const db = dbReference(refPath);
  return ListenRecordsCommon(
    db.collection(tablePath), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
};

/**
 * ----------------------------------------------------------------------
 * Sets up a listener to a query
 * @function
 * @static
 * @category Listeners
 * @param {!string} table Name of table to query too - may be sub-collection of
 * optional reference
 * @param {?filterObject} [filterArray] a 3xn array of filter(i.e. "where") conditions
 * @param {?sortObject} [sortArray] an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @param {?string} refPath An optional Firestore DocumentReference. If present, the
 * "table" parameter above is relative to this reference
 * @param {CollectionListener} dataCallback callback function with query results
 * @param {callback} errCallback callback function with error results
 * @returns {unsubscribe} function to be called to release subscription
 */
export const ListenQuery = (
  table,
  filterArray,
  sortArray,
  refPath = null,
  dataCallback,
  errCallback
) => {
  const db = dbReference(refPath);

  return ListenRecordsCommon(
    sortQuery(filterQuery(db.collection(table), filterArray), sortArray), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
};

/**
 * ----------------------------------------------------------------------
 * sets up a listener for changes to a collectionGroup
 * @function
 * @static
 * @category Listeners
 * @param {!string} tablePath string describing relative path to document
 * @param {?string} refPath string describing path to parent document
 * @param {CollectionListener} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {callback} function to be called to release subscription
 */
export const ListenCollectionGroupRecords = (
  tablePath,
  dataCallback,
  errCallback
) => {
  const db = fdb;
  //let reference = db.collection(tablePath);

  return ListenRecordsCommon(
    db.collectionGroup(tablePath), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
};

/**
 * ----------------------------------------------------------------------
 * sets up a listener for changes to a collectionGroup by query
 * @function
 * @static
 * @category Listeners
 * @param {!string} table string describing the name of a collectionGroup
 * @param {?filterObject} [filterArray] a 3xn array of filter(i.e. "where") conditions
 * @param {?sortObject} [sortArray] an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @param {CollectionListener} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {unsubscribe} function to be called to release subscription
 */
export const ListenCollectionGroupQuery = (
  table,
  filterArray,
  sortArray,
  dataCallback,
  errCallback
) => {
  const db = fdb;

  return ListenRecordsCommon(
    sortQuery(filterQuery(db.collectionGroup(table), filterArray), sortArray), //get the resulting filtered query results
    dataCallback,
    errCallback
  );
};

/**
 * ----------------------------------------------------------------------
 * @private
 * @function ListenRecordsCommon
 */
const ListenRecordsCommon = (reference, dataCallback, errCallback) => {
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
};

/**
 * Listen to changes to a single record
 * @function
 * @static
 * @category Listeners
 * @param {!string} tablePath string describing relative path to requested
 * record
 * @param {!string} Id string of Id of requested document
 * @param {?string} refPath string od full path to parent document
 * @param {RecordListener} dataCallback callback to handle changes to
 * requested document
 * @param {callback} errCallback callback to handle error reporting and
 * operations
 * @returns {unsubscribe} function to be called to release subscription
 */
export const ListenRecord = (
  tablePath,
  Id,
  refPath = null,
  dataCallback,
  errCallback
) => {
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
};

//  Paginate API
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_INIT = 0;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_PENDING = -1;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_UPDATED = 1;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_DEFAULT = 10;
/**
 * @private
 * @typedef {
 * PAGINATE_INIT
 * |PAGINATE_PENDING
 * |PAGINATE_UPDATED
 * |PAGINATE_DEFAULT} PagingStatus
 * @category Paginate Constants
 */
/**
 * @type {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_CHOICES = [10, 25, 50, 100, 250, 500];

export class PaginateFetch {
  /**
   * constructs an object to paginate through large Firestore Tables
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
     * @private
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
   * @async
   * @method
   * @returns {Promise<RecordArray>} returns an array of record - the next page
   */
  PageForward() {
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
        return Promise.resolve(RecordsFromSnapshot(this.snapshot));
      });
  }

  /**
   * executes the query again to fetch the previous set of records
   * @async
   * @method
   * @returns {Promise<RecordArray>} returns an array of record - the next page
   */
  PageBack() {
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
        return Promise.resolve(RecordsFromSnapshot(this.snapshot));
      });
  }
}

export class PaginateGroupFetch {
  /**
   * constructs an object to paginate through large
   * Firestore Tables
   * @param {!string} group a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {?filterObject} [filterArray] an (optional) 3xn array of filter(i.e. "where") conditions
   * @param {!sortObject} [sortArray] a 2xn array of sort (i.e. "orderBy") conditions
   *
   * The array(s) are assumed to be sorted in the correct order -
   * i.e. filterArray[0] is added first; filterArray[length-1] last
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   * @param {?number} limit (optional)
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
   * @async
   * @method
   * @returns {Promise<RecordArray>} returns an array of record - the next page
   */
  PageForward() {
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
        return Promise.resolve(RecordsFromSnapshot(this.snapshot));
      });
  }

  /**
   * executes the query again to fetch the previous set of records
   * @async
   * @method
   * @returns {Promise<RecordArray>} returns an array of record - the next page
   */
  PageBack() {
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
        return Promise.resolve(RecordsFromSnapshot(this.snapshot));
      });
  }
}

export class PaginatedListener {
  /**
   * Creates an object to allow for paginating a listener for table
   * read from Firestore. REQUIRES a sorting choice; masks some
   * subscribe/unsubscribe action for paging forward/backward
   * @param {!string} table a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {filterObject} [filterArray] an (optional) 3xn array of filter(i.e. "where") conditions
   * @param {!sortObject} [sortArray] a 2xn array of sort (i.e. "orderBy") conditions
   * @param {?refPath} refPath (optional) allows "table" parameter to reference a sub-collection
   * of an existing document reference (I use a LOT of structered collections)
   *
   * The array is assumed to be sorted in the correct order -
   * i.e. filterArray[0] is added first; filterArray[length-1] last
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   * @param {?number} limit (optional)
   * @param {!callback} dataCallback
   * @param {!callback} errCallback
   * @category Paginator
   */
  constructor(
    table,
    filterArray = null,
    sortArray,
    refPath = null,
    limit = PAGINATE_DEFAULT,
    dataCallback = null,
    errCallback = null
  ) {
    /**
     * table path at base of listener query, relative to original refPath
     * @private
     * @type {string}
     */
    this.table = table;
    /**
     * array of filter objects for listener query
     * @private
     * @type {filterObject}
     */
    this.filterArray = filterArray;
    /**
     * array of sort objects for listener query
     * @private
     * @type {sortObject}
     */
    this.sortArray = sortArray;
    /**
     * refPath as basis for listener query
     * @private
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
     * @private
     * @type {RecordListener}
     */
    this.dataCallback = dataCallback;
    /**
     * current errCallback of listener query
     * @private
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
   * @private
   * @method _setQuery
   * @returns {Query}
   */
  _setQuery() {
    const db = this.refPath ? this.refPath : fdb;
    /**
     * Query that forms basis for listener query
     * @private
     * @type {Query}
     */
    this.Query = sortQuery(
      filterQuery(db.collection(this.table), this.filterArray),
      this.sortArray
    );
    /**
     * last QuerySnapshot returned for listener query
     * @private
     * @type {QuerySnapshot}
     */
    this.Snapshot = null;
    return this.Query;
  }

  /**
   * resets the listener query to the next page of results.
   * Unsubscribes from the current listener, constructs a new query, and sets it\
   * as the new listener
   * @async
   * @method
   * @returns {unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  PageForward() {
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
   * @async
   * @method
   * @returns {unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  PageBack() {
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
   * @async
   * @method
   * @param {number} newLimit
   * @returns {unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  ChangeLimit(newLimit) {
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
   * @async
   * @method
   * @param {filterObject} [filterArray] an array of filter descriptors
   * @returns {unsubscribe} returns the unsubscriber function (for lifecycle events)
   */
  ChangeFilter(filterArray) {
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
   * @async
   * @method
   */
  unsubscribe() {
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
 * @function
 * @static
 * @category Tree Slice
 * @param {!Record} owner
 * @param {?filterObject} queryFilter additional filter parameters
 *
 * @returns {filterObject}
 */
export const ownerFilter = (owner, queryFilter = null) => {
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
      value: ownerPath
    },
    {
      fieldRef: "__name__",
      opStr: "<",
      value: nextPath
    }
  ];
  return queryFilter ? ownerParts.concat(queryFilter) : ownerParts;
};

/**
 * Uses the ownerFilter (above) to establish a listener to "just" the
 * parts of a collectionGroup that are descendants of the passed "owner"
 * record.
 * @function
 * @static
 * @category Tree Slice
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @param {callback}  dataCallback function to be called with changes to record
 * @param {QuerySnapshot} response
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @param {string}  response
 * @returns {callback} function to be called to release subscription
 *
 */
export const listenSlice = (
  owner,
  collectionName,
  dataCallBack,
  errCallBack
) => {
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
};

/**
 * Wrapper around database fetch, using ownerFilter above to
 * select/fetch just an "owner" parent document's descendants from a
 * collectionGroup
 * @async
 * @function
 * @static
 * @category Tree Slice
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @returns {QuerySnapshot} response
 */
export const fetchSlice = (owner, collectionName) => {
  try {
    return collectRecordsInGroupByFilter(collectionName, ownerFilter(owner));
  } catch (err) {
    console.log(`failed:fetchSlice setup ${collectionName} err: ${err}`);
  }
};

/**
 * Wrapper around database fetch, using ownerFilter above to
 * select/fetch just an "owner" parent document's descendants from a
 * collectionGroup
 * @async
 * @function
 * @static
 * @category Tree Slice
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @param {?filterObject} queryFilter filter parameters
 * @returns {QuerySnapshot} response
 */
export const querySlice = (owner, collectionName, filterArray) => {
  try {
    return collectRecordsInGroupByFilter(
      collectionName,
      ownerFilter(owner, filterArray)
    );
  } catch (err) {
    console.log(`failed:querySlice ${collectionName} err: ${err}`);
  }
};

/**
 * Uses the ownerFilter (above) to establish a listener to "just" the
 * parts of a collectionGroup that are descendants of the passed "owner"
 * record.
 * @function
 * @static
 * @category Tree Slice
 * @param {!Record} owner
 * @param {!string} owner.refPath - string representing the full path to the
 * Firestore document.
 * @param {!string} collectionName name of the desired collectionGroup
 * @param {?filterObject} filterArray filter parameters
 * @param {!callback}  dataCallback function to be called with changes to record
 * @param {QuerySnapshot} response
 * @param {!callback} errCallback function to be called when an error
 * occurs in listener
 * @param {string}  response
 * @returns {callback} function to be called to release subscription
 *
 */
export const listenQuerySlice = (
  owner,
  collectionName,
  filterArray,
  dataCallBack,
  errCallBack
) => {
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
};

/**
 * Returns the "type" (collection name) of the top-most parent of a
 * record, derived from the refPath
 * @function
 * @static
 * @category Tree Slice
 * @param {Record} record
 * @returns {string} the collection name
 */
export const ownerType = (record) => {
  return record?.refPath.split(`/`)[0];
};

/**
 * Returns the Id (documentId) of the top-most parent of a
 * record, derived from the refPath
 * @function
 * @static
 * @category Tree Slice
 * @param {Record} record
 * @returns {string} the Id
 */
export const ownerId = (record) => {
  return record?.refPath.split(`/`)[1];
};

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
 * returns the record for the top-most parent of a record,
 * derived from the refPath
 * @async
 * @function
 * @static
 * @category Tree Slice
 * @param {Record} record
 * @returns {Document}
 */
export const fetchOwner = (record) => {
  return fetchRecord(
    ownerType(record), //type/collection
    ownerId(record), //Id of record desired
    null, //no refPath (top-level)
    null //no batch
  );
};

/**
 * Returns the "type" (collection name) the passed record is
 * stored in, derived from the refPath
 * @function recordType
 * @static
 * @category Typed
 * @param {Record} record
 * @returns {string} the collection name
 */
export const recordType = (record) => {
  return record?.refPath ? penultimate(record.refPath.split(`/`)) : undefined;
};

/**
 * Returns the Id (documentId) of the passed record derived from the refPath
 * @function
 * @static
 * @category Typed
 * @returns {string} the Id
 */
export const recordId = (record) => {
  return record?.refPath ? last(record.refPath.split(`/`)) : undefined;
};

/**
 * optionally batched record update - abstracts batch process from specific types
 * @async
 * @function
 * @static
 * @category Typed
 * @param {Record} data - the data object/record to update.  This will create a new one if it doesn't exist
 * @param {!string} data.refPath - only part used
 * @param {?Record} parent - parent object (if any) this belongs to
 * @param {!string} parent.refPath - full path to parent document
 * @param {!string} type - name of type of object - i.e. the sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @return {Promise} WriteBatch, Transaction or Void
 */
export const typedWrite = (data, parent, type, batch = null) => {
  return writeRecord(
    type, //type of sub-collection...
    data,
    parent?.refPath, //... under tour reference
    batch
  );
};

/**
 * optionally batched record update - abstracts batch process from specific types
 * @async
 * @function
 * @static
 * @category Typed
 * @param {Record} data - the data object/record to update.  This will create a new one if it doesn't exist
 * @param {ArtistTree} tree - Object with properties of refPath segments
 * @param {string} type - name of type of object - i.e. the sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @return {Promise} WriteBatch, Transaction or Void
 */
export const typedWriteByTree = (data, tree, type, batch = null) => {
  //existing perks will be over-written, new ones created
  return writeRecord(
    typedTablePathFromTree(tree, type), //type of sub-collection...
    data,
    /*no parent */ null,
    batch
  );
};

/**
 * optionally batched record update - abstracts batch process from specific types
 * @async
 * @function
 * @static
 * @category Typed
 * @param {Record} data - the data object/record to update.  This will create a new one if it doesn't exist
 * @param {ArtistTree} tree - Object with properties of refPath segments
 * @param {string} type - name of type of object - i.e. the sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @return {Promise} WriteBatch, Transaction or Void
 */
export const typedWriteByChild = (
  data,
  child,
  type,
  batch = null,
  mergeOption = null
) => {
  //existing perks will be over-written, new ones created
  return writeBack(
    {
      ...data, //base data
      Id: typedIdFromChild(child, type), //Id from child path
      refPath: typedRefPathFromChild(child, type) //refPath from child Path
    },
    batch,
    mergeOption
  );
};

/**
 * Creates a new document reference of the indicated type, and writes
 * it to the backend. Specific intent is when the Id needs to be
 * pre-specified, or shared outside this function. Normal writing
 * action will silently create a new document, which has to then be
 * found by query
 * @async
 * @function
 * @static
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
 * @return {Promise} WriteBatch, Transaction or Void
 *
 */
export const typedCreate = (data, parent, type, batch = null) => {
  //merge the supplied data into the new data object
  let newData = {
    ...data,
    ...(data.Id ? data : createUniqueReference(type, parent.refPath))
  };
  //parent data already in created reference
  return typedWrite(newData, parent, type, batch);
};

/**
 * @private
 * @typedef {Map} RecordTree
 * @category Typed
 */

/**
 * Extracts a tree of document ID's from a child document (assumes is a child)
 * @function
 * @static
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @returns {RecordTree}
 */
export const treeFromChild = (child) => {
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
};

/**
 * Builds a refPath *down* to a desired collection/type from an existing
 * RecordTree Map.
 * @function
 * @static
 * @category Typed
 * @param {RecordTree} tree
 * @param {!string} type
 * @param {?string} branchType a collection name to start branching from.
 * This is in case tree was built from a sister collection/document
 * @return {string} constructed TablePath (collection)
 */
export const typedTablePathFromTree = (tree, type, branchType) => {
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
};

/**
 * Builds a refPath *down* to a desired collection/type from an existing
 * RecordTree Map.
 * @function
 * @static
 * @category Typed
 * @param {RecordTree} tree
 * @param {!string} type
 * @return {string} constructed refPath (document)
 */
export const typedRefPathFromTree = (tree, type) => {
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
};

/**
 * Looks up a "tree" to find the Id of the document at the requested
 * collection level ("type")
 * @function
 * @static
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @param {!string} type name of desired type/collection level in tree
 */
export const typedIdFromChild = (child, type) => {
  //previous/tree/levels/then/type/Id/whatever/else
  //(previous/tree/levels/then/type) (Id/whatever/else)
  //(Id) (whatever/else)
  return treeFromChild(child).get(type);
};

/**
 * Builds a refPath *up* to a desired collection/type from an existing
 * child in a tree
 * @function
 * @static
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @param {!string} type
 * @return {string} constructed refPath (collection)
 */
export const typedTablePathFromChild = (child, type, branchType = null) => {
  return typedTablePathFromTree(treeFromChild(child), type, branchType);
};

/**
 * Builds a refPath *up* to a desired collection/type from an existing
 * child in a tree
 * @function
 * @static
 * @category Typed
 * @param {Record} child document (regardless of depth)
 *  of a tree
 * @param {!string} child.refPath
 * @param {!string} type
 * @return {string} constructed refPath (document)
 */
export const typedRefPathFromChild = (child, type) => {
  return typedRefPathFromTree(treeFromChild(child), type);
};

/**
 * function to fetch a document from "up" the collection/document tree of a child document
 * @async
 * @function
 * @static
 * @category Typed
 * @param {Record} child - assumed to be an object in a collection/document Tree
 * @param {!string} refPath
 * @param {string} type - type/collection to fetch parent document from
 * @param {?WriteBatch|Transaction} batch - optional batch object to chain
 * @returns {Promise<RecordObject>}
 */
export const typedFetchFromChild = async (
  child,
  type,
  branchType = null,
  batch = null
) => {
  return fetchRecord(
    typedTablePathFromChild(child, type, branchType), //Full Path to collection
    typedIdFromChild(child, type), //Id
    null, //No parent needed
    batch //optional Batch object
  );
};

/**
 * function to fetch a document from "up" the collection/document tree of a child document
 * @async
 * @function
 * @static
 * @category Typed
 * @param {RecordTree} tree - assumed to be an object in a collection/document Tree
 * @param {!string} refPath
 * @param {string} type - type/collection to fetch parent document from
 * @param {?WriteBatch|Transaction} batch - optional batch object to chain
 * @returns {Promise<RecordObject>}
 */
export const typedFetchFromTree = async (tree, type, batch = null) => {
  return fetchRecord(
    typedTablePathFromTree(tree, type), //Full Path to collection
    tree.get(type), //Id of specific document
    null, //No parent needed
    batch //optional Batch object
  );
};

/**
 * function to collect documents from "up" the collection/document tree of a child document
 * @async
 * @function
 * @static
 * @category Typed
 * @param {RecordTree} tree - assumed to be an object in a collection/document Tree
 * @param {string} type - type/collection to fetch parent document from
 * @param {?WriteBatch|Transaction} batch - optional batch object to chain
 * @returns {Promise<RecordArray>}
 */
export const typedCollectFromTree = async (
  tree,
  type,
  branchType = null,
  batch = null
) => {
  return collectRecords(typedTablePathFromTree(tree, type, branchType));
};

/**
 * function to collect documents from "up" the collection/document tree of a child document
 * @async
 * @function
 * @static
 * @category Typed
 * @param {Record} child - assumed to be an object in a collection/document Tree
 * @param {string} type - type/collection to fetch parent document from
 * @param {?WriteBatch|Transaction} batch - optional batch object to chain
 */
export const typedCollectFromChild = async (child, type, branchType = null) => {
  return collectRecords(typedTablePathFromChild(child, type, branchType));
};

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
export const typedListener = (type, parent, dataCallBack, errCallBack) => {
  try {
    return ListenRecords(type, parent?.refPath, dataCallBack, errCallBack);
  } catch (err) {
    console.log(`failed:typedListener setup ${type} err: ${err}`);
  }
};

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
export const localBatchReturn = (incomingBatch, internalBatch) => {
  //if incoming batch, just pass along, else asynchronously commit local batch
  return incomingBatch ? internalBatch : closeWriteBatch(internalBatch);
};
