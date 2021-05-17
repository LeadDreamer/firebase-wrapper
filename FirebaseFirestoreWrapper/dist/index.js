"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FirebaseFirestore;
exports.PaginatedListener = exports.PaginateGroupFetch = exports.PaginateFetch = exports.PAGINATE_CHOICES = exports.PAGINATE_DEFAULT = exports.PAGINATE_UPDATED = exports.PAGINATE_PENDING = exports.PAGINATE_INIT = exports.ListenRecord = exports.ListenCollectionGroupQuery = exports.ListenCollectionGroupRecords = exports.ListenQuery = exports.ListenRecords = exports.writeArrayValue = exports.updateRecordByRefPath = exports.updateRecordFields = exports.deleteRecordByRefPath = exports.deleteRecord = exports.fetchRecordInGroupByFilter = exports.fetchRecordByFilter = exports.fetchRecordByRefPath = exports.fetchRecord = exports.collectRecordsInGroupByFilter = exports.collectRecordsInGroup = exports.collectRecordsByFilter = exports.collectRecords = exports.writeBack = exports.writeRecordByRefPath = exports.writeRecord = exports.dbReference = exports.createUniqueReference = exports.closeWriteBatch = exports.openWriteBatch = exports.runTransaction = exports.DocumentFromRecord = exports.RecordFromSnapshot = exports.arrayUnionFieldValue = exports.arrayRemoveFieldValue = exports.incrementFieldValue = exports.MAX_CONCURRENCY = exports.serverTimestampFieldValue = exports.deleteFieldValue = exports.documentId = exports.timestamp = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
/**
 * @function initialize_firestore
 * @static
 * @description Initializes the Firestore service of the provided
 * firebase app.  Also instantiates various constants and
 * helper functions
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


function FirebaseFirestore(firebase) {
  //doesnt run firestore persistence in Admin/Node environment
  process.env.PATH || firebase.firestore().enablePersistence({
    synchorizeTabs: true
  });
  fdb = firebase.firestore();
  aFieldValue = firebase.firestore.FieldValue;
  aFieldPath = firebase.firestore.FieldPath;
  exports.timestamp = timestamp = firebase.firestore.Timestamp;
  exports.documentId = documentId = aFieldPath.documentId();
  exports.deleteFieldValue = deleteFieldValue = aFieldValue["delete"]();
  exports.serverTimestampFieldValue = serverTimestampFieldValue = aFieldValue.serverTimestamp();
}
/** @private */


var fdb, aFieldValue, aFieldPath;
/**
 * @function timestamp
 * @static
 * @description - Firestore timestamp processor
 */

var timestamp;
/**
 * @constant
 * @static
 * @description - a fieldPath value to represent the document Id - WARNING
 * Google Firestore has a bug, and this actually represents the FULL PATH
 * to the document
 */

exports.timestamp = timestamp;
var documentId;
/**
 * @constant
 * @static
 * @description  a sentinel value used to delete a field during an
 * update operation
 */

exports.documentId = documentId;
var deleteFieldValue;
/**
 * @constant
 * @static
 * @description a sentinel value to set a field to a
 * server-generated timestamp during set(0 or update())
 */

exports.deleteFieldValue = deleteFieldValue;
var serverTimestampFieldValue;
/**
 * @static
 * @constant {number} MAX_CONCURRENCY
 * @description maximum concurrent writes
 */

exports.serverTimestampFieldValue = serverTimestampFieldValue;
var MAX_CONCURRENCY = 5; //convenient fieldValue constants

/**
 * ----------------------------------------------------------------------
 * @function incrementFieldValue
 * @static
 * return a sentinel to incrment/decrement
 *    a field
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

exports.MAX_CONCURRENCY = MAX_CONCURRENCY;

var incrementFieldValue = function incrementFieldValue(n) {
  return aFieldValue.increment(n);
};
/**
 * ----------------------------------------------------------------------
 * @function arrayRemoveFieldValue
 * @static
 * @description returns a sentinel to remove elements from array field
 * @param elements REST expanded list of elements to remove
 * @returns {sentinelValue} a sentinel value
 **********************************************************************/


exports.incrementFieldValue = incrementFieldValue;

var arrayRemoveFieldValue = function arrayRemoveFieldValue(elements) {
  var _aFieldValue;

  return (_aFieldValue = aFieldValue).arrayRemove.apply(_aFieldValue, (0, _toConsumableArray2["default"])(elements));
};
/**
 * ----------------------------------------------------------------------
 * @function arrayUnionFieldValue
 * @description return a sentinel to add/join elements to array field
 * @static
 * @param elements REST expanded list of elements to add
 * @returns a sentinel value
 **********************************************************************/


exports.arrayRemoveFieldValue = arrayRemoveFieldValue;

var arrayUnionFieldValue = function arrayUnionFieldValue(elements) {
  var _aFieldValue2;

  return (_aFieldValue2 = aFieldValue).arrayUnion.apply(_aFieldValue2, (0, _toConsumableArray2["default"])(elements));
};
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
 * @typedef {Record} [RecordArray]
 * an array of database records
 */

/**
 * ----------------------------------------------------------------------
 * @function RecordFromSnapshot
 * @static
 * @description returns an internal record structure from a firestore snapshot
 * @param {Snapshot} Snap
 * @returns {Record}
 */


exports.arrayUnionFieldValue = arrayUnionFieldValue;

var RecordFromSnapshot = function RecordFromSnapshot(Snapshot) {
  return _objectSpread(_objectSpread({}, Snapshot.data()), {}, {
    Id: Snapshot.id,
    refPath: Snapshot.ref.path
  });
};
/**
 * ----------------------------------------------------------------------
 * @function DocumentFromRecord
 * @static
 * @description returns a Firestore document structure from an internal Record
 * @param {object} Record - cleans up internal document representation
 * @returns {object}
 */


exports.RecordFromSnapshot = RecordFromSnapshot;

var DocumentFromRecord = function DocumentFromRecord(Record) {
  var cleanData = _objectSpread({}, Record);

  delete cleanData.refPath; //we leave the redundant Id for query optimization

  return cleanData;
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function runTransaction
 * @static
 * @description creates and runs a series of record operations
 * (executed in the param function) as an atomic operation.
 * A transation object is passed to the callback parameter
 * @param {callback} updateFunction callback function that expects a Transaction
 * token as it's sole argument.  either all the included/chained
 * record operations will succeed, or none
 * @returns {Promise<object>} a promise with the result of updateFunction
 */


exports.DocumentFromRecord = DocumentFromRecord;

var runTransaction = function runTransaction(updateFunction) {
  return fdb.runTransaction(updateFunction);
};
/**
 * ----------------------------------------------------------------------
 * @sync
 * @function openWriteBatch
 * @static
 * @returns {WriteBatch} object that operations are added to for a bulk
 * operation
 */


exports.runTransaction = runTransaction;

var openWriteBatch = function openWriteBatch() {
  return fdb.batch();
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function closeWriteBatch
 * @static
 * @description dispatches an asynchronous Closure to submit Batch
 * @param {WriteBatch} batch - WriteBatch to close
 * @returns {Promise<void>}
 */


exports.openWriteBatch = openWriteBatch;

var closeWriteBatch = function closeWriteBatch() {
  var batch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(innerBatch) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", innerBatch.commit());

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()(batch);
};
/**
 * ----------------------------------------------------------------------
 * @sync
 * @function createUniqueReference
 * @static
 * @description adds a blank document to the collection
 * referenced in parameter tablePath (relative to optional refPath) and
 * returns it's reference.  This is useful for Transactions and Batches, which
 * can only get(), set() or update() existing documents. Tricksie!
 * @param tablePath string representing a valid path to a collection to
 * create the new document in, relative to a document reference
 * passed in
 * @param refPath an optional valid document reference to start the table path
 * @returns {DocumentReference} Firestore Document Reference
 */


exports.closeWriteBatch = closeWriteBatch;

var createUniqueReference = function createUniqueReference(tablePath) {
  var refPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var db = dbReference(refPath);
  var docRef = db.collection(tablePath).doc(); // just

  return {
    Id: docRef.Id,
    refPath: docRef.path
  };
};
/**
 * ----------------------------------------------------------------------
 * @sync
 * @function dbReference
 * @static
 * @description generates a document reference from a path
 * if passed; else returns the db base reference
 * @param {string} refPath Path to base actions from. May be null
 */


exports.createUniqueReference = createUniqueReference;

var dbReference = function dbReference(refPath) {
  return refPath ? fdb.doc(refPath) : fdb;
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function writeRecord
 * @static
 * @description writes a Firestore record to collection
 * indicated by tablePath relative to option DocumentReference refPath
 * @param {!string} tablePath string representing a valid path to a collection to
 * create or update the document in, relative to a document reference
 * passed in
 * @param {!Record} data Data/Record object to write to database
 * @param {?string} refPath an optional valid document reference to start the table path
 * @param {?WriteBatch|Transaction} batch optional chain token to include this
 * operation as part of an Atomic Transaction
 * @param {?boolean} mergeOption - whether to merge into existin data; default TRUE
 * @returns {Promise<Record>}
 */


exports.dbReference = dbReference;

var writeRecord = function writeRecord(tablePath, data) {
  var refPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var mergeOption = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var db = dbReference(refPath);
  var cleanData = DocumentFromRecord(data);

  try {
    var docRef = data.Id ? // if existing document, re-create reference
    db.collection(tablePath).doc("/" + data.Id) : // if new, create a new reference
    db.collection(tablePath).doc(); //all a transaction/WriteBatch can return is a chained transaction/WriteBatch

    cleanData.Id = docRef.id; //copy the newly generated ID into the record/document

    if (batch) {
      //if passed a transaction object, use it
      return batch.set(docRef, cleanData, {
        merge: mergeOption
      });
    } else {
      //not a transaction
      return docRef.set(cleanData, {
        merge: mergeOption
      }).then(function () {
        return Promise.resolve(_objectSpread(_objectSpread({}, data), {}, {
          refPath: data.refPath || docRef.path
        }));
      });
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function writeRecordByRefPath
 * @static
 * @description Writes given data object (or map) to the given documentReference
 * @param {!Record} data Object/Map to be written back to the Firestore
 * @param {!string} refPath DocumentReference to write document to
 * @param {?WriteBatch|Transaction} Transaction Optional Transaction to enclose this action in
 * @param {?boolean} mergeOption - whether to merge into existin data; default TRUE
 * @returns {Promise<Record>} data record as written
 */


exports.writeRecord = writeRecord;

var writeRecordByRefPath = function writeRecordByRefPath(data, refPath) {
  var batch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var mergeOption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return writeBack(_objectSpread(_objectSpread({}, data), {}, {
    refPath: refPath
  }), batch, mergeOption);
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function writeBack
 * @static
 * @description Writes a local-schema document back to the Firestore.  Assume
 * object/map came from the firestore
 * @param {!Record} data Object/Map to be written back to the Firestore
 * @param {?WriteBatch|Transaction} Transaction Optional Transaction to enclose this action in
 * @param {?boolean} mergeOption - whether to merge into existin data; default TRUE
 * @returns {Promise<Record>} record as written.
 */


exports.writeRecordByRefPath = writeRecordByRefPath;

var writeBack = function writeBack(data) {
  var batch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var mergeOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var cleanData = DocumentFromRecord(data);

  if (batch) {
    //if passed a transaction object, use it
    return batch.set(createRefFromPath(data.refPath), cleanData, {
      merge: mergeOption
    });
  } else {
    return createRefFromPath(data.refPath).set(cleanData, {
      merge: mergeOption
    }).then(function () {
      return Promise.resolve(data);
    });
  }
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function collectRecords
 * @static
 * @description query for a SET of records
 * @param {!string} tablePath string representing path ro requested
 * collection
 * @param {?string} refPath string representing a path to the relative PARENT
 * of the requested collection
 * @returns {Promise<Array<Record>>}
 */


exports.writeBack = writeBack;

var collectRecords = function collectRecords(tablePath) {
  var refPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var db = dbReference(refPath);
  return db.collection(tablePath) //Dangerously assumes collection exists
  .get().then(function (querySnapshot) {
    // returns a promise
    if (!querySnapshot.empty) return Promise.resolve(querySnapshot.docs.map(function (doc) {
      return RecordFromSnapshot(doc);
    }));else return Promise.reject("noDocuments:collectRecords:" + tablePath);
  })["catch"](function (err) {
    return Promise.reject(err + ":collectRecords:" + tablePath);
  });
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function collectRecordsByFilter
 * @static
 * @descriptions returns an array of documents from Firestore
 * @param {!string} table a properly formatted string representing the requested collection
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


exports.collectRecords = collectRecords;

var collectRecordsByFilter = function collectRecordsByFilter(table, filterArray) {
  var refPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var db = dbReference(refPath); //assumes filterArray is in processing order

  return filterQuery(db.collection(table), filterArray).get() //get the resulting filtered query results
  .then(function (querySnapshot) {
    return Promise.resolve(querySnapshot.docs.map(function (doc) {
      return RecordFromSnapshot(doc);
    }));
  })["catch"](function (err) {
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


exports.collectRecordsByFilter = collectRecordsByFilter;

var collectRecordsInGroup = function collectRecordsInGroup(tableName) {
  var db = fdb;
  return db.collectionGroup(tableName) //Dangerously assumes collection exists
  .get().then(function (querySnapshot) {
    // returns a promise
    if (!querySnapshot.empty) return Promise.resolve(querySnapshot.docs.map(function (doc) {
      return RecordFromSnapshot(doc);
    }));else return Promise.reject("noDocuments:collectRecordsInGroup:" + tableName);
  })["catch"](function (err) {
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


exports.collectRecordsInGroup = collectRecordsInGroup;

var collectRecordsInGroupByFilter = function collectRecordsInGroupByFilter(tableName, filterArray) {
  var db = fdb;
  return filterQuery(db.collectionGroup(tableName), filterArray).get() //get the resulting filtered query results
  .then(function (querySnapshot) {
    return querySnapshot.empty ? null : querySnapshot.docs.map(function (doc) {
      return RecordFromSnapshot(doc);
    }); //);
  })["catch"](function (err) {
    return Promise.reject(err + ":collectRecordsInGroupByFilter");
  });
};
/**
 * ----------------------------------------------------------------------
 * @async
 * @function fetchRecord
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


exports.collectRecordsInGroupByFilter = collectRecordsInGroupByFilter;

var fetchRecord = function fetchRecord(tablePath, Id) {
  var refPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var db = dbReference(refPath);
  var docRef = db.collection(tablePath).doc(Id);
  return batch ? batch.get(docRef) // returned chained Batch object
  : docRef.get().then(function (docSnapshot) {
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


exports.fetchRecord = fetchRecord;

var fetchRecordByRefPath = function fetchRecordByRefPath(docRefPath) {
  var batch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  //Dangerously assumes refPath  exists
  if (batch) return batch.get(createRefFromPath(docRefPath));else return createRefFromPath(docRefPath).get().then(function (docSnapshot) {
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


exports.fetchRecordByRefPath = fetchRecordByRefPath;

var fetchRecordByFilter = function fetchRecordByFilter(table, filterArray) {
  var refPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return collectRecordsByFilter(table, filterArray, refPath, batch).then(function (records) {
    return Promise.resolve(records[0]);
  });
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


exports.fetchRecordByFilter = fetchRecordByFilter;

var fetchRecordInGroupByFilter = function fetchRecordInGroupByFilter(table, filterArray) {
  var batch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return collectRecordsInGroupByFilter(table, filterArray, batch).then(function (records) {
    return Promise.resolve(records && records !== null && records !== void 0 && records.length ? records[0] : null);
  });
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


exports.fetchRecordInGroupByFilter = fetchRecordInGroupByFilter;

var deleteRecord = function deleteRecord(table, record) {
  var refPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var db = dbReference(refPath);
  var docRef = db.collection(table).doc(record.Id); //Dangerously assumes collection exists

  return batch ? batch["delete"](docRef) : docRef["delete"]();
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


exports.deleteRecord = deleteRecord;

var deleteRecordByRefPath = function deleteRecordByRefPath(docRefPath) {
  var batch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return batch ? batch["delete"](createRefFromPath(docRefPath)) : createRefFromPath(docRefPath)["delete"]();
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


exports.deleteRecordByRefPath = deleteRecordByRefPath;

var updateRecordFields = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(recordUpdate) {
    var cleanData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cleanData = DocumentFromRecord(recordUpdate);
            _context2.prev = 1;
            return _context2.abrupt("return", createRefFromPath(recordUpdate.refPath).update(cleanData));

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", Promise.reject(_context2.t0 + ":updateRecordFields"));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 5]]);
  }));

  return function updateRecordFields(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
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


exports.updateRecordFields = updateRecordFields;

var updateRecordByRefPath = function updateRecordByRefPath(docRefPath, data) {
  var batch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var cleanData = DocumentFromRecord(data); //  delete cleanData.Id;

  return batch ? batch.set(createRefFromPath(docRefPath), cleanData, {
    merge: true
  }) : createRefFromPath(docRefPath).set(cleanData, {
    merge: true
  }) //update merges record
  .then(function () {
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


exports.updateRecordByRefPath = updateRecordByRefPath;

var writeArrayValue = function writeArrayValue(fieldName, fieldValue, docRefPath) {
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (batch) return batch.set(createRefFromPath(docRefPath), (0, _defineProperty2["default"])({}, fieldName, aFieldValue.arrayUnion(fieldValue)), {
    merge: true
  });else return createRefFromPath(docRefPath).set((0, _defineProperty2["default"])({}, fieldName, aFieldValue.arrayUnion(fieldValue)), {
    merge: true
  });
};
/** @private */


exports.writeArrayValue = writeArrayValue;

var createRefFromPath = function createRefFromPath(docPath) {
  var refPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var db = dbReference(refPath);
  return db.doc(docPath);
};
/**
 * @private
 * @typedef {Object} filterObject
 * @property {!String} fieldRef
 * @property {!String} opStr
 * @property {any} value
 *
 */

/**
 * ----------------------------------------------------------------------
 * @private
 * @function filterQuery
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query collectionReference or Query to build filter upong
 * @param {?filterObject} [filterArray] an (optional) 3xn array of filter(i.e. "where") conditions
 * @returns {Query} Firestore Query object
 */


var filterQuery = function filterQuery(query) {
  var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return filterArray ? filterArray.reduce(function (accQuery, filter) {
    return accQuery.where(filter.fieldRef, filter.opStr, filter.value);
  }, query) : query;
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
 * @function sortQuery
 * builds and returns a query built from an array of filter (i.e. "where")
 * conditions
 * @param {Query} query collectionReference or Query to build filter upong
 * @param {?sortObject} [sortArray] an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @returns Firestore Query object
 */


var sortQuery = function sortQuery(query) {
  var sortArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return sortArray ? sortArray.reduce(function (accQuery, sortEntry) {
    return accQuery.orderBy(sortEntry.fieldRef, sortEntry.dirStr || "asc"); //note "||" - if dirStr is not present(i.e. falsy) default to "asc"
  }, query) : query;
}; //Listener Support

/**
 * @callback RecordListener
 * @static
 * @param {DocumentSnapshot} documentSnapshot
 */

/**
 * @callback CollectionListener
 * @static
 * @param {QuerySnapshot} querySnapshot
 */

/**
 * ----------------------------------------------------------------------
 * @sync
 * @function ListenRecords
 * @static
 * @description sets up a listener for changes to a single record
 * @param {!string} tablePath string describing relative path to document
 * @param {?string} refPath string describing path to parent document
 * @param {QuerySnapshot} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {callback} function to be called to release subscription
 */


var ListenRecords = function ListenRecords(tablePath) {
  var refPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dataCallback = arguments.length > 2 ? arguments[2] : undefined;
  var errCallback = arguments.length > 3 ? arguments[3] : undefined;
  var db = dbReference(refPath);
  return ListenRecordsCommon(db.collection(tablePath), //get the resulting filtered query results
  dataCallback, errCallback);
};
/**
 * ----------------------------------------------------------------------
 * @sync
 * @function ListenQuery
 * @static
 * @description Sets up a listener to a query
 * @param {!string} table Name of table to query too - may be sub-collection of
 * optional reference
 * @param {?filterObject} [filterArray] a 3xn array of filter(i.e. "where") conditions
 * @param {?sortObject} [sortArray] an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @param {?string} refPath An optional Firestore DocumentReference. If present, the
 * "table" parameter above is relative to this reference
 * @param {QuerySnapshot} dataCallback callback function with query results
 * @param {callback} errCallback callback function with error results
 * @returns {callback} function to be called to release subscription
 */


exports.ListenRecords = ListenRecords;

var ListenQuery = function ListenQuery(table, filterArray, sortArray) {
  var refPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var dataCallback = arguments.length > 4 ? arguments[4] : undefined;
  var errCallback = arguments.length > 5 ? arguments[5] : undefined;
  var db = dbReference(refPath);
  return ListenRecordsCommon(sortQuery(filterQuery(db.collection(table), filterArray), sortArray), //get the resulting filtered query results
  dataCallback, errCallback);
};
/**
 * ----------------------------------------------------------------------
 * @sync
 * @function ListenCollectionGroupRecords
 * @static
 * @description sets up a listener for changes to a collectionGroup
 * @param {!string} tablePath string describing relative path to document
 * @param {?string} refPath string describing path to parent document
 * @param {QuerySnapshot} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {callback} function to be called to release subscription
 */


exports.ListenQuery = ListenQuery;

var ListenCollectionGroupRecords = function ListenCollectionGroupRecords(tablePath, dataCallback, errCallback) {
  var db = fdb; //let reference = db.collection(tablePath);

  return ListenRecordsCommon(db.collectionGroup(tablePath), //get the resulting filtered query results
  dataCallback, errCallback);
};
/**
 * ----------------------------------------------------------------------
 * @sync
 * @function ListenCollectionGroupQuery
 * @static
 * @description sets up a listener for changes to a collectionGroup by query
 * @param {!string} table string describing the name of a collectionGroup
 * @param {?filterObject} [filterArray] a 3xn array of filter(i.e. "where") conditions
 * @param {?sortObject} [sortArray] an (optional) 2xn array of sort (i.e. "orderBy") conditions
 * @param {QuerySnapshot} dataCallback function to be called with changes to record
 * @param {callback} errCallback function to be called when an error
 * occurs in listener
 * @returns {callback} function to be called to release subscription
 */


exports.ListenCollectionGroupRecords = ListenCollectionGroupRecords;

var ListenCollectionGroupQuery = function ListenCollectionGroupQuery(table, filterArray, sortArray, dataCallback, errCallback) {
  var db = fdb;
  return ListenRecordsCommon(sortQuery(filterQuery(db.collectionGroup(table), filterArray), sortArray), //get the resulting filtered query results
  dataCallback, errCallback);
};
/**
 * ----------------------------------------------------------------------
 * @private
 * @function ListenRecordsCommon
 */


exports.ListenCollectionGroupQuery = ListenCollectionGroupQuery;

var ListenRecordsCommon = function ListenRecordsCommon(reference, dataCallback, errCallback) {
  //returns an unsubscribe function
  return reference.onSnapshot(function (querySnapshot) {
    // returns a promise
    if (!querySnapshot.empty) {
      var dataArray = querySnapshot.docs.map(function (doc) {
        return RecordFromSnapshot(doc);
      });
      dataCallback(dataArray);
    } else errCallback("noDocuments:ListenRecordsCommon");
  }, function (err) {
    errCallback("".concat(err, " ").concat(reference.path, " setup:ListenRecordsCommon"));
  });
};
/**
 * @sync
 * @function ListenRecord
 * @static
 * @description Listen to changes to a single record
 * @param {!string} tablePath string describing relative path to requested
 * record
 * @param {!string} Id string of Id of requested document
 * @param {?string} refPath string od full path to parent document
 * @param {RecordListener} dataCallback callback to handle changes to
 * requested document
 * @param {callback} errCallback callback to handle error reporting and
 * operations
 * @returns {callback} function to be called to release subscription
 */


var ListenRecord = function ListenRecord(tablePath, Id) {
  var refPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var dataCallback = arguments.length > 3 ? arguments[3] : undefined;
  var errCallback = arguments.length > 4 ? arguments[4] : undefined;
  var db = dbReference(refPath);
  var docRef = db.collection(tablePath).doc(Id); //returns an unsubscribe function

  return docRef.onSnapshot(function (docSnapshot) {
    if (docSnapshot.exists) dataCallback(RecordFromSnapshot(docSnapshot));else errCallback("No Document Exists to Listen");
  }, function (err) {
    errCallback(err + " No Document Exists to Listen");
  });
}; //  Paginate API

/**
 * @constant {number} PAGINATE_INIT
 * @static
 */


exports.ListenRecord = ListenRecord;
var PAGINATE_INIT = 0;
/**
 * @constant {number} PAGINATE_PENDING
 * @static
 */

exports.PAGINATE_INIT = PAGINATE_INIT;
var PAGINATE_PENDING = -1;
/**
 * @constant {number} PAGINATE_UPDATED
 * @static
 */

exports.PAGINATE_PENDING = PAGINATE_PENDING;
var PAGINATE_UPDATED = 1;
/**
 * @constant {number} PAGINATE_DEFAULT
 * @static
 */

exports.PAGINATE_UPDATED = PAGINATE_UPDATED;
var PAGINATE_DEFAULT = 10;
/**
 * @typedef {
 * PAGINATE_INIT
 * |PAGINATE_PENDING
 * |PAGINATE_UPDATED
 * |PAGINATE_DEFAULT} PagingStatus
 * @static
 */

/**
 * @enum {number} [PAGINATE_CHOICES]
 * @static
 */

exports.PAGINATE_DEFAULT = PAGINATE_DEFAULT;
var PAGINATE_CHOICES = [10, 25, 50, 100, 250, 500];
/**
 * @class
 * @static
 * @classdesc An object to allow for paginating a table read from Firestore. REQUIRES a sorting choice
 * @property {Query} Query that forms basis for the table read
 * @property {number} limit page size
 * @property {QuerySnapshot} snapshot last successful snapshot/page fetched
 * @property {PagingStatus} status status of pagination object
 *
 * @property {function} PageForward pages the fetch forward
 * @property {function} PageBack pages the fetch backward
 *
 */

exports.PAGINATE_CHOICES = PAGINATE_CHOICES;

var PaginateFetch = /*#__PURE__*/function () {
  /**
   * @member {Query} Query
   * @memberof PaginateFetch
   */
  //Query = null;

  /**
   * @member {number} limit
   * @memberof PaginateFetch
   */
  //limit = PAGINATE_DEFAULT;

  /**
   * @member {QuerySnapshot} snapshot
   * @memberof PaginateFetch
   */
  //snapshot = null;

  /**
   * @member {number} status
   * @memberof PaginateFetch
   */
  //status = null; // -1 pending; 0 uninitialized; 1 updated;

  /**
   * @constructs PaginateFetch constructs an object to paginate through large
   * Firestore Tables
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
   * @returns {PaginateFetchObject}
   */
  function PaginateFetch(table) {
    var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var sortArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var refPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : PAGINATE_DEFAULT;
    (0, _classCallCheck2["default"])(this, PaginateFetch);
    var db = dbReference(refPath);
    this.limit = limit;
    this.Query = sortQuery(filterQuery(db.collection(table), filterArray), sortArray);
    this.status = PAGINATE_INIT;
  }
  /**
   * @async
   * @method PageForward
   * @memberof PaginateFetch
   * @description executes the query again to fetch the next set of records
   * @returns {Promise<RecordArray>} returns an array of record - the next page
   */


  (0, _createClass2["default"])(PaginateFetch, [{
    key: "PageForward",
    value: function PageForward() {
      var _this = this;

      var runQuery = this.snapshot ? this.Query.startAfter(last(this.snapshot.docs)) : this.Query;
      this.status = PAGINATE_PENDING;
      return runQuery.limit(this.limit).get().then(function (QuerySnapshot) {
        _this.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone beyond start)

        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          //return Promise.resolve(QuerySnapshot);
          _this.snapshot = QuerySnapshot;
        }

        return _this.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        });
      });
    }
    /**
     * @async
     * @method PageBack
     * @memberof PaginateFetch
     * @description executes the query again to fetch the previous set of records
     * @returns {Promise<RecordArray>} returns an array of record - the next page
     */

  }, {
    key: "PageBack",
    value: function PageBack() {
      var _this2 = this;

      var runQuery = this.snapshot ? this.Query.endBefore(this.snapshot.docs[0]) : this.Query;
      this.status = PAGINATE_PENDING;
      return runQuery.limitToLast(this.limit).get().then(function (QuerySnapshot) {
        _this2.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone back ebfore start)

        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          _this2.snapshot = QuerySnapshot;
        }

        return _this2.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        });
      });
    }
  }]);
  return PaginateFetch;
}();
/**
 * @class
 * @static
 * @classdesc An object to allow for paginating a query for table read from Firestore.
 * @property {Query} Query that forms basis for the table read
 * @property {number} limit page size
 * @property {QuerySnapshot} snapshot last successful snapshot/page fetched
 * @property {PagingStatus} status status of pagination object
 *
 * @property {function} PageForward Changes the listener to the next page forward
 * @property {function} PageBack Changes the listener to the next page backward
 * @property {function} Unsubscribe returns the unsubscribe function
 */


exports.PaginateFetch = PaginateFetch;

var PaginateGroupFetch = /*#__PURE__*/function () {
  /**
   * @member {Query} Query
   * @memberof PaginateGroupFetch
   */
  //Query = null;

  /**
   * @member {number} limit
   * @memberof PaginateGroupFetch
   */
  //limit = PAGINATE_DEFAULT;

  /**
   * @member {QuerySnapshot} snapshot
   * @memberof PaginateGroupFetch
   */
  //snapshot = null;

  /**
   * @member {number} status
   * @memberof PaginateGroupFetch
   */
  //status = null; // -1 pending; 0 uninitialized; 1 updated;

  /**
   * @constructs PaginateGroupFetch constructs an object to paginate through large
   * Firestore Tables
   * @param {string} group a properly formatted string representing the requested collection
   * - always an ODD number of elements
   * @param {filterObject} [filterArray] an (optional) 3xn array of filter(i.e. "where") conditions
   * @param {sortObject} [sortArray] a 2xn array of sort (i.e. "orderBy") conditions
   *
   * The array(s) are assumed to be sorted in the correct order -
   * i.e. filterArray[0] is added first; filterArray[length-1] last
   * returns data as an array of objects (not dissimilar to Redux State objects)
   * with both the documentID and documentReference added as fields.
   * @param {number} limit (optional)
   * @returns {PaginateFetchObject}
   */
  function PaginateGroupFetch(group) {
    var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var sortArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PAGINATE_DEFAULT;
    (0, _classCallCheck2["default"])(this, PaginateGroupFetch);
    var db = fdb;
    this.limit = limit;
    this.Query = sortQuery(filterQuery(db.collectionGroup(group), filterArray), sortArray);
    this.status = PAGINATE_INIT;
  }
  /**
   * @async
   * @method PageForward
   * @memberof PaginateGroupFetch
   * @description executes the query again to fetch the next set of records
   * @returns {Promise<RecordArray>} returns an array of record - the next page
   */


  (0, _createClass2["default"])(PaginateGroupFetch, [{
    key: "PageForward",
    value: function PageForward() {
      var _this3 = this;

      var runQuery = this.snapshot ? this.Query.startAfter(last(this.snapshot.docs)) : this.Query;
      this.status = PAGINATE_PENDING;
      return runQuery.limit(this.limit).get().then(function (QuerySnapshot) {
        _this3.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone beyond start)

        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          //return Promise.resolve(QuerySnapshot);
          _this3.snapshot = QuerySnapshot;
        }

        return _this3.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        });
      });
    }
    /**
     * @async
     * @method PageBack
     * @memberof PaginateGroupFetch
     * @description executes the query again to fetch the previous set of records
     * @returns {Promise<RecordArray>} returns an array of record - the next page
     */

  }, {
    key: "PageBack",
    value: function PageBack() {
      var _this4 = this;

      var runQuery = this.snapshot ? this.Query.endBefore(this.snapshot.docs[0]) : this.Query;
      this.status = PAGINATE_PENDING;
      return runQuery.limitToLast(this.limit).get().then(function (QuerySnapshot) {
        _this4.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone back before start)

        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          _this4.snapshot = QuerySnapshot;
        }

        return _this4.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        });
      });
    }
  }]);
  return PaginateGroupFetch;
}();
/**
 * @class
 * @static
 * @classdesc An object to allow for paginating a listener for table read from Firestore.
 * REQUIRES a sorting choice
 * masks some subscribe/unsubscribe action for paging forward/backward
 * @property {Query} Query that forms basis for the table read
 * @property {number} limit page size
 * @property {QuerySnapshot} snapshot last successful snapshot/page fetched
 * @property {PagingStatus} status status of pagination object
 *
 * @property {function} PageForward Changes the listener to the next page forward
 * @property {function} PageBack Changes the listener to the next page backward
 */


exports.PaginateGroupFetch = PaginateGroupFetch;

var PaginatedListener = /*#__PURE__*/function () {
  /**
   * @member {string} table
   * @memberof PaginatedListener
   */
  //table = null;

  /**
   * @member {filterObject} [filterArray]
   * @memberof PaginatedListener
   */
  //filterArray = null;

  /**
   * @member {sortObject} [sortArray]
   * @memberof PaginatedListener
   */
  //sortArray = null;

  /**
   * @member {string} refPath
   * @memberof PaginatedListener
   */
  //refPath = null;

  /**
   * @member {Query} Query
   * @memberof PaginatedListener
   */
  //Query = null;

  /**
   * @member {number} limit
   * @memberof PaginatedListener
   */
  //limit = PAGINATE_DEFAULT;

  /**
   * @member {QuerySnapshot} snapshot
   * @memberof PaginatedListener
   */
  //snapshot = null;

  /**
   * @member {RecordListener} dataCallback
   * @memberof PaginatedListener
   */
  //dataCallback = null;

  /**
   * @member {callback} errCallback
   * @memberof PaginatedListener
   */

  /**
   * @member {number} status
   * @memberof PaginatedListener
   */
  //status = null; // -1 pending; 0 uninitialized; 1 updated;

  /**
   * @constructs PaginatedListener constructs an object to paginate through large
   * Firestore Tables
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
   */
  function PaginatedListener(table) {
    var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var sortArray = arguments.length > 2 ? arguments[2] : undefined;
    var refPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : PAGINATE_DEFAULT;
    var dataCallback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var errCallback = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    (0, _classCallCheck2["default"])(this, PaginatedListener);
    this.table = table;
    this.filterArray = filterArray;
    this.sortArray = sortArray;
    this.refPath = refPath;
    this.limit = limit;

    this._setQuery();

    this.dataCallback = dataCallback;
    this.errCallback = errCallback;
    this.status = PAGINATE_INIT;
  }
  /**
   * @private
   * @method _setQuery
   * @methodof PaginatedListener
   * @description reconstructs the underlying query
   * @returns {Query}
   */


  (0, _createClass2["default"])(PaginatedListener, [{
    key: "_setQuery",
    value: function _setQuery() {
      var db = this.refPath ? this.refPath : fdb;
      this.Query = sortQuery(filterQuery(db.collection(this.table), this.filterArray), this.sortArray);
      return this.Query;
    }
    /**
     * @method PageBack
     * @memberof PaginatedListener
     * @description resets the listener query to the previous page of results.
     * Unsubscribes from the current listener, constructs a new query, and sets it\
     * as the new listener
     * @returns {function} returns the unsubscriber function (for lifecycle events)
     */

  }, {
    key: "PageForward",
    value: function PageForward() {
      var _this5 = this;

      var runQuery = this.unsubscriber && !this.snapshot.empty ? this.Query.startAfter(last(this.snapshot.docs)) : this.Query; //IF unsubscribe function is set, run it.

      this.unsubscriber && this.unsubscriber();
      this.status = PAGINATE_PENDING;
      this.unsubscriber = runQuery.limit(Number(this.limit)).onSnapshot(function (QuerySnapshot) {
        _this5.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone back ebfore start)

        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          _this5.snapshot = QuerySnapshot;
        }

        _this5.dataCallback(_this5.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        }));
      }, function (err) {
        _this5.errCallback(err);
      });
      return this.unsubscriber;
    }
    /**
     * @method PageBack
     * @memberof PaginatedListener
     * @description resets the listener query to the next page of results.
     * Unsubscribes from the current listener, constructs a new query, and sets it\
     * as the new listener
     * @returns {function} returns the unsubscriber function (for lifecycle events)
     */

  }, {
    key: "PageBack",
    value: function PageBack() {
      var _this6 = this;

      var runQuery = this.unsubscriber && !this.snapshot.empty ? this.Query.endBefore(this.snapshot.docs[0]) : this.Query; //IF unsubscribe function is set, run it.

      this.unsubscriber && this.unsubscriber();
      this.status = PAGINATE_PENDING;
      this.unsubscriber = runQuery.limitToLast(Number(this.limit)).onSnapshot(function (QuerySnapshot) {
        //acknowledge complete
        _this6.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone back ebfore start)

        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          _this6.snapshot = QuerySnapshot;
        }

        _this6.dataCallback(_this6.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        }));
      }, function (err) {
        _this6.errCallback(err);
      });
      return this.unsubscriber;
    }
    /**
     * @method ChangeLimit
     * @memberof PaginatedListener
     * @description sets page size limit to new value, and restarts the paged listener
     * @param {number} newLimit
     * @returns {function} returns the unsubscriber function (for lifecycle events)
     */

  }, {
    key: "ChangeLimit",
    value: function ChangeLimit(newLimit) {
      var _this7 = this;

      var runQuery = this.Query; //IF unsubscribe function is set, run it.

      this.unsubscriber && this.unsubscriber();
      this.limit = newLimit;
      this.status = PAGINATE_PENDING;
      this.unsubscriber = runQuery.limit(Number(this.limit)).onSnapshot(function (QuerySnapshot) {
        _this7.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone back ebfore start)

        if (!QuerySnapshot.empty) {
          //then update document set, and execute callback
          _this7.snapshot = QuerySnapshot;
        }

        _this7.dataCallback(_this7.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        }));
      }, function (err) {
        _this7.errCallback(err);
      });
      return this.unsubscriber;
    }
    /**
     * @method ChangeFilter
     * @memberof PaginatedListener
     * @description changes the filter on the subscription
     * This has to unsubscribe the current listener,
     * create a new query, then apply it as the listener
     * @param {filterObject} [filterArray] an array of filter descriptors
     * @returns {function} returns the unsubscriber function (for lifecycle events)
     */

  }, {
    key: "ChangeFilter",
    value: function ChangeFilter(filterArray) {
      var _this8 = this;

      //IF unsubscribe function is set, run it (and clear it)
      this.unsubscriber && this.unsubscriber();
      this.filterArray = filterArray; // save the new filter array

      var runQuery = this._setQuery(); // re-build the query


      this.status = PAGINATE_PENDING; //fetch the first page of the new filtered query

      this.unsubscriber = runQuery.limit(Number(this.limit)).onSnapshot(function (QuerySnapshot) {
        _this8.status = PAGINATE_UPDATED; //*IF* documents (i.e. haven't gone back ebfore start)

        _this8.snapshot = QuerySnapshot;

        _this8.dataCallback(_this8.snapshot.empty ? null : _this8.snapshot.docs.map(function (doc) {
          return RecordFromSnapshot(doc);
        }));
      }, function (err) {
        _this8.errCallback(err);
      });
      return this.unsubscriber;
    }
    /**
     * @method unsubscribe
     * @memberof PaginatedListener
     * @description IF unsubscribe function is set, run it.
     */

  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      //IF unsubscribe function is set, run it.
      this.unsubscriber && this.unsubscriber();
      this.unsubscriber = null;
    }
  }]);
  return PaginatedListener;
}();

exports.PaginatedListener = PaginatedListener;