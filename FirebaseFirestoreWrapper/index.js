"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FirebaseFirestore;
exports.localBatchReturn = exports.typedPaginatedListener = exports.typedListener = exports.typedCollectFromChild = exports.typedCollectFromTree = exports.typedFetchFromTree = exports.typedFetchFromChild = exports.typedRefPathFromChild = exports.typedTablePathFromChild = exports.typedIdFromChild = exports.typedRefPathFromTree = exports.typedTablePathFromTree = exports.treeFromChild = exports.typedCreate = exports.typedWriteByChild = exports.typedWriteByTree = exports.typedWrite = exports.recordId = exports.recordType = exports.fetchOwner = exports.ownerRefPath = exports.ownerId = exports.ownerType = exports.listenQuerySlice = exports.querySlice = exports.fetchSlice = exports.listenSlice = exports.ownerFilter = exports.PaginatedListener = exports.PaginateGroupFetch = exports.PaginateFetch = exports.PAGINATE_CHOICES = exports.PAGINATE_DEFAULT = exports.PAGINATE_UPDATED = exports.PAGINATE_PENDING = exports.PAGINATE_INIT = exports.ListenRecord = exports.ListenCollectionGroupQuery = exports.ListenCollectionGroupRecords = exports.ListenQuery = exports.ListenRecords = exports.writeArrayValue = exports.updateRecordByRefPath = exports.updateRecordFields = exports.deleteRecordByRefPath = exports.deleteRecord = exports.fetchRecordInGroupByFilter = exports.fetchRecordByFilter = exports.fetchRecordByRefPath = exports.fetchRecord = exports.collectRecordsInGroupByFilter = exports.collectRecordsInGroup = exports.collectRecordsByFilter = exports.collectRecords = exports.writeBack = exports.writeRecordByRefPath = exports.writeRecord = exports.createUniqueReference = exports.closeWriteBatch = exports.openWriteBatch = exports.runTransaction = exports.RecordsFromSnapshot = exports.RecordFromSnapshot = exports.arrayUnionFieldValue = exports.arrayRemoveFieldValue = exports.incrementFieldValue = exports.serverTimestampFieldValue = exports.deleteFieldValue = exports.MAX_CONCURRENCY = exports.documentId = exports.timestamp = void 0;

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
 * @private
 * @function penultimate
 * @param {object} [array]
 * @returns {object}
 * @description second-to-last entry in the array
 */


function penultimate(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1 - 1] : undefined;
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
  process.env.FIREBASE_CONFIG || firebase.firestore().enablePersistence({
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
 * class for a Firestore timestamp processor
 * @class
 */

var timestamp;
/**
 * a fieldPath value to represent the document Id - WARNING
 * Google Firestore has a bug, and this actually represents the FULL PATH
 * to the document
 * @constant
 * @type {Object}
 * @static
 * @category FieldPath
 */

exports.timestamp = timestamp;
var documentId;
/**
 * maximum concurrent writes
 * @constant {number} MAX_CONCURRENCY
 * @static
 */

exports.documentId = documentId;
var MAX_CONCURRENCY = 5; //convenient fieldValue constants

/**
 * a sentinel value used to delete a field during an
 * update operation
 * @constant
 * @static
 * @type {Object}
 * @category FieldValue
 */

exports.MAX_CONCURRENCY = MAX_CONCURRENCY;
var deleteFieldValue;
/**
 * a sentinel value to set a field to a
 * server-generated timestamp during set(0 or update())
 * @constant
 * @static
 * @type {Object}
 * @category FieldValue
 */

exports.deleteFieldValue = deleteFieldValue;
var serverTimestampFieldValue;
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

exports.serverTimestampFieldValue = serverTimestampFieldValue;

var incrementFieldValue = function incrementFieldValue(n) {
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


exports.incrementFieldValue = incrementFieldValue;

var arrayRemoveFieldValue = function arrayRemoveFieldValue(elements) {
  var _aFieldValue;

  return (_aFieldValue = aFieldValue).arrayRemove.apply(_aFieldValue, (0, _toConsumableArray2["default"])(elements));
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


exports.arrayRemoveFieldValue = arrayRemoveFieldValue;

var arrayUnionFieldValue = function arrayUnionFieldValue(elements) {
  var _aFieldValue2;

  return (_aFieldValue2 = aFieldValue).arrayUnion.apply(_aFieldValue2, (0, _toConsumableArray2["default"])(elements));
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


exports.arrayUnionFieldValue = arrayUnionFieldValue;

var RecordFromSnapshot = function RecordFromSnapshot(DocumentSnapshot) {
  return _objectSpread(_objectSpread({}, DocumentSnapshot.data()), {}, {
    Id: DocumentSnapshot.id,
    refPath: DocumentSnapshot.ref.path
  });
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


exports.RecordFromSnapshot = RecordFromSnapshot;

var RecordsFromSnapshot = function RecordsFromSnapshot(QuerySnapshot) {
  return QuerySnapshot.docs.map(function (docSnap) {
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


exports.RecordsFromSnapshot = RecordsFromSnapshot;

var DocumentFromRecord = function DocumentFromRecord(Record) {
  var cleanData = _objectSpread({}, Record);

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


var runTransaction = function runTransaction(updateFunction) {
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


exports.runTransaction = runTransaction;

var openWriteBatch = function openWriteBatch() {
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
 * Creates a DocumentReference document to the collection
 * referenced in parameter tablePath (relative to optional refPath).
 * This is can be useful for Transactions and Batches, which
 * can only get(), set() or update() existing documents. Tricksie!
 * @function
 * @static
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
    Id: docRef.id,
    refPath: docRef.path
  };
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


exports.createUniqueReference = createUniqueReference;

var dbReference = function dbReference(refPath) {
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


var writeRecord = function writeRecord(tablePath, data) {
  var refPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var mergeOption = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var db = dbReference(refPath);
  var cleanData = DocumentFromRecord(data);

  try {
    var docRef = data.Id ? // if existing document, re-create reference
    db.collection(tablePath).doc(data.Id) : // if new, create a new reference
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
 * @function
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
    return !querySnapshot.empty ? Promise.resolve(RecordsFromSnapshot(querySnapshot)) : Promise.reject("noDocuments:collectRecords:" + tablePath);
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


exports.collectRecords = collectRecords;

var collectRecordsByFilter = function collectRecordsByFilter(tablePath) {
  var refPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var filterArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var sortArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var db = dbReference(refPath); //assumes filterArray is in processing order

  return limitQuery(sortQuery(filterQuery(db.collection(tablePath), filterArray), sortArray), limit).get() //get the resulting filtered query results
  .then(function (querySnapshot) {
    // returns a promise
    return !querySnapshot.empty ? Promise.resolve(RecordsFromSnapshot(querySnapshot)) : Promise.reject("noDocuments:collectRecordsByFilter:" + tablePath);
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
    if (!querySnapshot.empty) return Promise.resolve(RecordsFromSnapshot(querySnapshot));else return Promise.reject("noDocuments:collectRecordsInGroup:" + tableName);
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

var collectRecordsInGroupByFilter = function collectRecordsInGroupByFilter(tableName) {
  var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var sortArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var db = fdb;
  return limitQuery(sortQuery(filterQuery(db.collectionGroup(tableName), filterArray), sortArray), limit).get() //get the resulting filtered query results
  .then(function (querySnapshot) {
    // returns a promise
    return !querySnapshot.empty ? Promise.resolve(RecordsFromSnapshot(querySnapshot)) : Promise.reject("noDocuments:collectRecordsInGroupByFilter:" + tableName);
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
 * @function
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


var limitQuery = function limitQuery(query) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return limit ? query.limit(limit) : query;
}; //Listener Support

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


exports.ListenQuery = ListenQuery;

var ListenCollectionGroupRecords = function ListenCollectionGroupRecords(tablePath, dataCallback, errCallback) {
  var db = fdb; //let reference = db.collection(tablePath);

  return ListenRecordsCommon(db.collectionGroup(tablePath), //get the resulting filtered query results
  dataCallback, errCallback);
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
      var dataArray = RecordsFromSnapshot(querySnapshot);
      dataCallback(dataArray);
    } else errCallback("noDocuments:ListenRecordsCommon");
  }, function (err) {
    errCallback("".concat(err, " ").concat(reference.path, " setup:ListenRecordsCommon"));
  });
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
 * @constant {number}
 * @static
 * @category Paginate Constants
 */


exports.ListenRecord = ListenRecord;
var PAGINATE_INIT = 0;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */

exports.PAGINATE_INIT = PAGINATE_INIT;
var PAGINATE_PENDING = -1;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */

exports.PAGINATE_PENDING = PAGINATE_PENDING;
var PAGINATE_UPDATED = 1;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */

exports.PAGINATE_UPDATED = PAGINATE_UPDATED;
var PAGINATE_DEFAULT = 10;
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
 * @type {number} [PAGINATE_CHOICES]
 * @static
 * @category Paginate Constants
 */

exports.PAGINATE_DEFAULT = PAGINATE_DEFAULT;
var PAGINATE_CHOICES = [10, 25, 50, 100, 250, 500];
exports.PAGINATE_CHOICES = PAGINATE_CHOICES;

var PaginateFetch = /*#__PURE__*/function () {
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
  function PaginateFetch(table) {
    var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var sortArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var refPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : PAGINATE_DEFAULT;
    (0, _classCallCheck2["default"])(this, PaginateFetch);
    var db = dbReference(refPath);
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

    this.Query = sortQuery(filterQuery(db.collection(table), filterArray), sortArray);
    /**
     * current status of pagination
     * @type {PagingStatus}
     * -1 pending; 0 uninitialized; 1 updated;
     */

    this.status = PAGINATE_INIT;
  }
  /**
   * executes the query again to fetch the next set of records
   * @async
   * @method
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

        return Promise.resolve(RecordsFromSnapshot(_this.snapshot));
      });
    }
    /**
     * executes the query again to fetch the previous set of records
     * @async
     * @method
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

        return Promise.resolve(RecordsFromSnapshot(_this2.snapshot));
      });
    }
  }]);
  return PaginateFetch;
}();

exports.PaginateFetch = PaginateFetch;

var PaginateGroupFetch = /*#__PURE__*/function () {
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
  function PaginateGroupFetch(group) {
    var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var sortArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PAGINATE_DEFAULT;
    (0, _classCallCheck2["default"])(this, PaginateGroupFetch);
    var db = fdb;
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

    this.Query = sortQuery(filterQuery(db.collectionGroup(group), filterArray), sortArray);
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

        return Promise.resolve(RecordsFromSnapshot(_this3.snapshot));
      });
    }
    /**
     * executes the query again to fetch the previous set of records
     * @async
     * @method
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

        return Promise.resolve(RecordsFromSnapshot(_this4.snapshot));
      });
    }
  }]);
  return PaginateGroupFetch;
}();

exports.PaginateGroupFetch = PaginateGroupFetch;

var PaginatedListener = /*#__PURE__*/function () {
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
  function PaginatedListener(table) {
    var filterArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var sortArray = arguments.length > 2 ? arguments[2] : undefined;
    var refPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : PAGINATE_DEFAULT;
    var dataCallback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var errCallback = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    (0, _classCallCheck2["default"])(this, PaginatedListener);

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


  (0, _createClass2["default"])(PaginatedListener, [{
    key: "_setQuery",
    value: function _setQuery() {
      var db = this.refPath ? this.refPath : fdb;
      /**
       * Query that forms basis for listener query
       * @private
       * @type {Query}
       */

      this.Query = sortQuery(filterQuery(db.collection(this.table), this.filterArray), this.sortArray);
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

        _this5.dataCallback(RecordsFromSnapshot(_this5.snapshot));
      }, function (err) {
        _this5.errCallback(err);
      });
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

        _this6.dataCallback(RecordsFromSnapshot(_this6.snapshot));
      }, function (err) {
        _this6.errCallback(err);
      });
      return this.unsubscriber;
    }
    /**
     * sets page size limit to new value, and restarts the paged listener
     * @async
     * @method
     * @param {number} newLimit
     * @returns {unsubscribe} returns the unsubscriber function (for lifecycle events)
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

        _this7.dataCallback(RecordsFromSnapshot(_this7.snapshot));
      }, function (err) {
        _this7.errCallback(err);
      });
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

        _this8.dataCallback(RecordsFromSnapshot(_this8.snapshot));
      }, function (err) {
        _this8.errCallback(err);
      });
      return this.unsubscriber;
    }
    /**
     * IF unsubscribe function is set, run it.
     * @async
     * @method
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
}(); //////////////////////////////////////////////////////////////////////
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


exports.PaginatedListener = PaginatedListener;

var ownerFilter = function ownerFilter(owner) {
  var queryFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var ownerPath = owner.refPath;
  var nextPath = ownerPath.slice();
  var nextLength = nextPath.length;
  var lastChar = nextPath.charCodeAt(nextLength - 1);
  nextPath = nextPath.slice(0, nextLength - 1).concat(String.fromCharCode(lastChar + 1));
  var ownerParts = [{
    fieldRef: "__name__",
    opStr: ">",
    value: ownerPath
  }, {
    fieldRef: "__name__",
    opStr: "<",
    value: nextPath
  }];
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


exports.ownerFilter = ownerFilter;

var listenSlice = function listenSlice(owner, collectionName, dataCallBack, errCallBack) {
  try {
    return ListenCollectionGroupQuery(collectionName, ownerFilter(owner), null, //no sort query conditions
    dataCallBack, errCallBack);
  } catch (err) {
    console.log("failed:listenSlice setup ".concat(collectionName, " err: ").concat(err));
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


exports.listenSlice = listenSlice;

var fetchSlice = function fetchSlice(owner, collectionName) {
  try {
    return collectRecordsInGroupByFilter(collectionName, ownerFilter(owner));
  } catch (err) {
    console.log("failed:fetchSlice setup ".concat(collectionName, " err: ").concat(err));
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


exports.fetchSlice = fetchSlice;

var querySlice = function querySlice(owner, collectionName, filterArray) {
  try {
    return collectRecordsInGroupByFilter(collectionName, ownerFilter(owner, filterArray));
  } catch (err) {
    console.log("failed:querySlice ".concat(collectionName, " err: ").concat(err));
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


exports.querySlice = querySlice;

var listenQuerySlice = function listenQuerySlice(owner, collectionName, filterArray, dataCallBack, errCallBack) {
  try {
    return ListenCollectionGroupQuery(collectionName, ownerFilter(owner, filterArray), null, dataCallBack, errCallBack);
  } catch (err) {
    console.log("failed:listenQuerySlice setup ".concat(collectionName, " err: ").concat(err));
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


exports.listenQuerySlice = listenQuerySlice;

var ownerType = function ownerType(record) {
  return record === null || record === void 0 ? void 0 : record.refPath.split("/")[0];
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


exports.ownerType = ownerType;

var ownerId = function ownerId(record) {
  return record === null || record === void 0 ? void 0 : record.refPath.split("/")[1];
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


exports.ownerId = ownerId;

var ownerRefPath = function ownerRefPath(record) {
  return record !== null && record !== void 0 && record.refPath ? "".concat(ownerType(record), "/").concat(ownerId(record)) : undefined;
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


exports.ownerRefPath = ownerRefPath;

var fetchOwner = function fetchOwner(record) {
  return fetchRecord(ownerType(record), //type/collection
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


exports.fetchOwner = fetchOwner;

var recordType = function recordType(record) {
  return record !== null && record !== void 0 && record.refPath ? penultimate(record.refPath.split("/")) : undefined;
};
/**
 * Returns the Id (documentId) of the passed record derived from the refPath
 * @function
 * @static
 * @category Typed
 * @returns {string} the Id
 */


exports.recordType = recordType;

var recordId = function recordId(record) {
  return record !== null && record !== void 0 && record.refPath ? last(record.refPath.split("/")) : undefined;
};
/**
 * optionally batched record update - abstracts batch process from specific types
 * @async
 * @function
 * @static
 * @category Typed
 * @param {Record} data - the data object/record to update.  This will create a new one if it doesn't exist
 * @param {?string} data.Id
 * @param {?string} data.refPath
 * @param {?Record} parent - parent object (if any) this belongs to
 * @param {!string} parent.refPath - full path to parent document
 * @param {!string} type - name of type of object - i.e. the sub-collection name
 * @param {?WriteBatch|Transaction} batch - batching object.  Transaction will be added to the batch
 * @return {Promise} WriteBatch, Transaction or Void
 */


exports.recordId = recordId;

var typedWrite = function typedWrite(data, parent, type) {
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return writeRecord(type, //type of sub-collection...
  data, parent === null || parent === void 0 ? void 0 : parent.refPath, //... under tour reference
  batch);
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


exports.typedWrite = typedWrite;

var typedWriteByTree = function typedWriteByTree(data, tree, type) {
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  //existing perks will be over-written, new ones created
  return writeRecord(typedTablePathFromTree(tree, type), //type of sub-collection...
  data,
  /*no parent */
  null, batch);
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


exports.typedWriteByTree = typedWriteByTree;

var typedWriteByChild = function typedWriteByChild(data, child, type) {
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var mergeOption = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  //existing perks will be over-written, new ones created
  return writeBack(_objectSpread(_objectSpread({}, data), {}, {
    //base data
    Id: typedIdFromChild(child, type),
    //Id from child path
    refPath: typedRefPathFromChild(child, type) //refPath from child Path

  }), batch, mergeOption);
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


exports.typedWriteByChild = typedWriteByChild;

var typedCreate = function typedCreate(data, parent, type) {
  var batch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  //merge the supplied data into the new data object
  var newData = _objectSpread(_objectSpread({}, data), data.Id ? data : createUniqueReference(type, parent.refPath)); //parent data already in created reference


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


exports.typedCreate = typedCreate;

var treeFromChild = function treeFromChild(child) {
  var deconstruction = new Map();
  var refPath = child.refPath.slice();
  var parts = refPath.split("/");

  while (parts && parts.length) {
    //parse the parts of the path
    var type = parts.shift();
    var Id = parts.shift();
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


exports.treeFromChild = treeFromChild;

var typedTablePathFromTree = function typedTablePathFromTree(tree, type, branchType) {
  var pathString = "";
  var lastId = "";

  var _iterator = _createForOfIteratorHelper(tree),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
          collection = _step$value[0],
          docId = _step$value[1];

      pathString = "".concat(pathString).concat(lastId).concat(collection, "/");

      if (collection === type) {
        //reached requested depth
        break;
      }

      if (collection === branchType) {
        pathString = "".concat(pathString).concat(docId, "/").concat(type, "/"); // reached branch point

        break;
      } //add on the current tree level docId for next collection level


      lastId = "".concat(docId, "/");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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


exports.typedTablePathFromTree = typedTablePathFromTree;

var typedRefPathFromTree = function typedRefPathFromTree(tree, type) {
  var pathString = "";

  var _iterator2 = _createForOfIteratorHelper(tree),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
          collection = _step2$value[0],
          docId = _step2$value[1];

      pathString = "".concat(pathString).concat(collection, "/").concat(docId);

      if (collection === type) {
        //reached requested depth
        break;
      } //add on the current tree level docId for next collection level


      pathString = "".concat(pathString, "/");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
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


exports.typedRefPathFromTree = typedRefPathFromTree;

var typedIdFromChild = function typedIdFromChild(child, type) {
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


exports.typedIdFromChild = typedIdFromChild;

var typedTablePathFromChild = function typedTablePathFromChild(child, type) {
  var branchType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
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


exports.typedTablePathFromChild = typedTablePathFromChild;

var typedRefPathFromChild = function typedRefPathFromChild(child, type) {
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


exports.typedRefPathFromChild = typedRefPathFromChild;

var typedFetchFromChild = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(child, type) {
    var branchType,
        batch,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            branchType = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
            batch = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : null;
            return _context3.abrupt("return", fetchRecord(typedTablePathFromChild(child, type, branchType), //Full Path to collection
            typedIdFromChild(child, type), //Id
            null, //No parent needed
            batch //optional Batch object
            ));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function typedFetchFromChild(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
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


exports.typedFetchFromChild = typedFetchFromChild;

var typedFetchFromTree = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(tree, type) {
    var batch,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            batch = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;
            return _context4.abrupt("return", fetchRecord(typedTablePathFromTree(tree, type), //Full Path to collection
            tree.get(type), //Id of specific document
            null, //No parent needed
            batch //optional Batch object
            ));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function typedFetchFromTree(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
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


exports.typedFetchFromTree = typedFetchFromTree;

var typedCollectFromTree = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(tree, type) {
    var branchType,
        batch,
        _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            branchType = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : null;
            batch = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : null;
            return _context5.abrupt("return", collectRecords(typedTablePathFromTree(tree, type, branchType)));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function typedCollectFromTree(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
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


exports.typedCollectFromTree = typedCollectFromTree;

var typedCollectFromChild = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(child, type) {
    var branchType,
        _args6 = arguments;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            branchType = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : null;
            return _context6.abrupt("return", collectRecords(typedTablePathFromChild(child, type, branchType)));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function typedCollectFromChild(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
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


exports.typedCollectFromChild = typedCollectFromChild;

var typedListener = function typedListener(type, parent, dataCallBack, errCallBack) {
  try {
    return ListenRecords(type, parent === null || parent === void 0 ? void 0 : parent.refPath, dataCallBack, errCallBack);
  } catch (err) {
    console.log("failed:typedListener setup ".concat(type, " err: ").concat(err));
  }
};
/**
 * @class
 * @extends PaginatedListener
 */


exports.typedListener = typedListener;

var typedPaginatedListener = /*#__PURE__*/function (_PaginatedListener) {
  (0, _inherits2["default"])(typedPaginatedListener, _PaginatedListener);

  var _super = _createSuper(typedPaginatedListener);

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
  function typedPaginatedListener(type, parent, dataCallback, errCallback) {
    var pageSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : PAGINATE_DEFAULT;
    (0, _classCallCheck2["default"])(this, typedPaginatedListener);
    return _super.call(this, type, null, //filter
    [{
      fieldRef: "name",
      dirStr: "asc"
    }], //sort, required
    parent === null || parent === void 0 ? void 0 : parent.refPath, //refPath
    pageSize, dataCallback, errCallback);
  }

  return typedPaginatedListener;
}(PaginatedListener);
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


exports.typedPaginatedListener = typedPaginatedListener;

var localBatchReturn = function localBatchReturn(incomingBatch, internalBatch) {
  //if incoming batch, just pass along, else asynchronously commit local batch
  return incomingBatch ? internalBatch : closeWriteBatch(internalBatch);
};

exports.localBatchReturn = localBatchReturn;