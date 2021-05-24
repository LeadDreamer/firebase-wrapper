[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseFirestoreWrapper"></a>

## FirebaseFirestoreWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseFirestoreWrapper](#module_FirebaseFirestoreWrapper)
    * _static_
        * [.PaginateFetch](#module_FirebaseFirestoreWrapper.PaginateFetch)
            * [new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)](#new_module_FirebaseFirestoreWrapper.PaginateFetch_new)
        * [.PaginateGroupFetch](#module_FirebaseFirestoreWrapper.PaginateGroupFetch)
            * [new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)](#new_module_FirebaseFirestoreWrapper.PaginateGroupFetch_new)
        * [.PaginatedListener](#module_FirebaseFirestoreWrapper.PaginatedListener)
            * [new exports.PaginatedListener(table, [filterArray], [sortArray], refPath, limit, dataCallback, errCallback)](#new_module_FirebaseFirestoreWrapper.PaginatedListener_new)
        * [.PAGINATE_CHOICES](#module_FirebaseFirestoreWrapper.PAGINATE_CHOICES) : <code>enum</code>
        * [.documentId](#module_FirebaseFirestoreWrapper.documentId)
        * [.deleteFieldValue](#module_FirebaseFirestoreWrapper.deleteFieldValue)
        * [.serverTimestampFieldValue](#module_FirebaseFirestoreWrapper.serverTimestampFieldValue)
        * [.MAX_CONCURRENCY](#module_FirebaseFirestoreWrapper.MAX_CONCURRENCY) : <code>number</code>
        * [.PAGINATE_INIT](#module_FirebaseFirestoreWrapper.PAGINATE_INIT) : <code>number</code>
        * [.PAGINATE_PENDING](#module_FirebaseFirestoreWrapper.PAGINATE_PENDING) : <code>number</code>
        * [.PAGINATE_UPDATED](#module_FirebaseFirestoreWrapper.PAGINATE_UPDATED) : <code>number</code>
        * [.PAGINATE_DEFAULT](#module_FirebaseFirestoreWrapper.PAGINATE_DEFAULT) : <code>number</code>
        * [.initialize_firestore(firebase)](#module_FirebaseFirestoreWrapper.initialize_firestore)
        * [.timestamp()](#module_FirebaseFirestoreWrapper.timestamp)
        * [.incrementFieldValue(n)](#module_FirebaseFirestoreWrapper.incrementFieldValue) ⇒
        * [.arrayRemoveFieldValue(elements)](#module_FirebaseFirestoreWrapper.arrayRemoveFieldValue) ⇒ <code>sentinelValue</code>
        * [.arrayUnionFieldValue(elements)](#module_FirebaseFirestoreWrapper.arrayUnionFieldValue) ⇒
        * [.RecordFromSnapshot(DocumentSnapshot)](#module_FirebaseFirestoreWrapper.RecordFromSnapshot) ⇒ <code>Record</code>
        * [.RecordsFromSnapshot(QuerySnapshot)](#module_FirebaseFirestoreWrapper.RecordsFromSnapshot) ⇒ <code>RecordArray</code>
        * [.DocumentFromRecord(Record)](#module_FirebaseFirestoreWrapper.DocumentFromRecord) ⇒ <code>object</code>
        * [.runTransaction(updateFunction)](#module_FirebaseFirestoreWrapper.runTransaction) ⇒ <code>Promise.&lt;object&gt;</code>
        * [.openWriteBatch()](#module_FirebaseFirestoreWrapper.openWriteBatch) ⇒ <code>WriteBatch</code>
        * [.closeWriteBatch(batch)](#module_FirebaseFirestoreWrapper.closeWriteBatch) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.createUniqueReference(tablePath, refPath)](#module_FirebaseFirestoreWrapper.createUniqueReference) ⇒ <code>DocumentReference</code>
        * [.dbReference(refPath)](#module_FirebaseFirestoreWrapper.dbReference)
        * [.writeRecord(tablePath, data, refPath, batch, mergeOption)](#module_FirebaseFirestoreWrapper.writeRecord) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.writeRecordByRefPath(data, refPath, Transaction, mergeOption)](#module_FirebaseFirestoreWrapper.writeRecordByRefPath) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.writeBack(data, Transaction, mergeOption)](#module_FirebaseFirestoreWrapper.writeBack) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.collectRecords(tablePath, refPath)](#module_FirebaseFirestoreWrapper.collectRecords) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.collectRecordsByFilter(tablePath, [filterArray], refPath)](#module_FirebaseFirestoreWrapper.collectRecordsByFilter) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.collectRecordsInGroup(tableName)](#module_FirebaseFirestoreWrapper.collectRecordsInGroup) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.collectRecordsInGroupByFilter(tableName, [filterArray])](#module_FirebaseFirestoreWrapper.collectRecordsInGroupByFilter) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.fetchRecord(tablePath, Id, refPath, batch)](#module_FirebaseFirestoreWrapper.fetchRecord) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.fetchRecordByRefPath(docRefPath, batch)](#module_FirebaseFirestoreWrapper.fetchRecordByRefPath) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.fetchRecordByFilter(table, [filterArray], refPath, batch)](#module_FirebaseFirestoreWrapper.fetchRecordByFilter) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.fetchRecordInGroupByFilter(table, [filterArray], batch)](#module_FirebaseFirestoreWrapper.fetchRecordInGroupByFilter) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.deleteRecord(table, record, refPath, batch)](#module_FirebaseFirestoreWrapper.deleteRecord) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.deleteRecordByRefPath(docRefPath, batch)](#module_FirebaseFirestoreWrapper.deleteRecordByRefPath) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.updateRecordFields(recordUpdate)](#module_FirebaseFirestoreWrapper.updateRecordFields) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.updateRecordByRefPath(docRefPath, data, batch)](#module_FirebaseFirestoreWrapper.updateRecordByRefPath) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.writeArrayValue(fieldName, fieldValue, docRefPath, batch)](#module_FirebaseFirestoreWrapper.writeArrayValue) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.ListenQuery(table, [filterArray], [sortArray], refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenQuery) ⇒ <code>callback</code>
        * [.ListenCollectionGroupRecords(tablePath, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenCollectionGroupRecords) ⇒ <code>callback</code>
        * [.ListenCollectionGroupQuery(table, [filterArray], [sortArray], dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenCollectionGroupQuery) ⇒ <code>callback</code>
        * [.ListenRecord(tablePath, Id, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenRecord) ⇒ <code>callback</code>
        * [.ownerFilter(owner, refPath, queryFilter)](#module_FirebaseFirestoreWrapper.ownerFilter) ⇒ <code>filterObject</code>
        * [.fetchSlice(owner, collectionName)](#module_FirebaseFirestoreWrapper.fetchSlice) ⇒ <code>QuerySnapshot</code>
        * [.querySlice(owner, collectionName, queryFilter)](#module_FirebaseFirestoreWrapper.querySlice) ⇒ <code>QuerySnapshot</code>
        * [.typedWrite(data, parent, type, batch)](#module_FirebaseFirestoreWrapper.typedWrite) ⇒ <code>Promise</code>
        * [.typedWriteByTree(data, tree, type, batch)](#module_FirebaseFirestoreWrapper.typedWriteByTree) ⇒ <code>Promise</code>
        * [.typedCreate(data, parent, type, batch)](#module_FirebaseFirestoreWrapper.typedCreate) ⇒ <code>Promise</code>
        * [.treeFromChild(child)](#module_FirebaseFirestoreWrapper.treeFromChild) ⇒ <code>RecordTree</code>
        * [.typedRefPathFromTree(tree, type, branchType)](#module_FirebaseFirestoreWrapper.typedRefPathFromTree) ⇒ <code>string</code>
        * [.typedIdFromChild(child, type)](#module_FirebaseFirestoreWrapper.typedIdFromChild)
        * [.typedRefPathFromChild(child, type)](#module_FirebaseFirestoreWrapper.typedRefPathFromChild) ⇒ <code>string</code>
        * [.typedFetchFromChild(child, refPath, type, batch)](#module_FirebaseFirestoreWrapper.typedFetchFromChild)
        * [.typedFetchFromTree(tree, refPath, type, batch)](#module_FirebaseFirestoreWrapper.typedFetchFromTree)
        * [.typedCollectFromTree(tree, type, batch)](#module_FirebaseFirestoreWrapper.typedCollectFromTree)
        * [.typedCollectFromChild(child, type, batch)](#module_FirebaseFirestoreWrapper.typedCollectFromChild)
        * [.localBatchReturn(incomingBatch, internalBatch)](#module_FirebaseFirestoreWrapper.localBatchReturn) ⇒ <code>WriteBatch</code> \| <code>Transaction</code>
        * [.RecordListener](#module_FirebaseFirestoreWrapper.RecordListener) : <code>function</code>
        * [.CollectionListener](#module_FirebaseFirestoreWrapper.CollectionListener) : <code>function</code>
        * [.errCallback](#module_FirebaseFirestoreWrapper.errCallback) ⇒ <code>callback</code>
        * [.PagingStatus](#module_FirebaseFirestoreWrapper.PagingStatus) : <code>PAGINATE\_INIT</code> \| <code>PAGINATE\_PENDING</code> \| <code>PAGINATE\_UPDATED</code> \| <code>PAGINATE\_DEFAULT</code>
        * [.errCallback](#module_FirebaseFirestoreWrapper.errCallback) ⇒ <code>callback</code>
        * [.errCallback](#module_FirebaseFirestoreWrapper.errCallback) ⇒ <code>callback</code>
    * _inner_
        * [~Record](#module_FirebaseFirestoreWrapper..Record) : <code>object</code>
        * [~RecordArray](#module_FirebaseFirestoreWrapper..RecordArray) : <code>Record</code>
        * [~RecordTree](#module_FirebaseFirestoreWrapper..RecordTree) : <code>Map</code>

<a name="module_FirebaseFirestoreWrapper.PaginateFetch"></a>

### FirebaseFirestoreWrapper.PaginateFetch
An object to allow for paginating a table read from Firestore. REQUIRES a sorting choice

**Kind**: static class of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Query | <code>Query</code> | that forms basis for the table read |
| limit | <code>number</code> | page size |
| snapshot | <code>QuerySnapshot</code> | last successful snapshot/page fetched |
| status | <code>PagingStatus</code> | status of pagination object |
| PageForward | <code>function</code> | pages the fetch forward |
| PageBack | <code>function</code> | pages the fetch backward |

<a name="new_module_FirebaseFirestoreWrapper.PaginateFetch_new"></a>

#### new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| table | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| filterArray | <code>array</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| sortArray | <code>array</code> | <code></code> | a 2xn array of sort (i.e. "orderBy") conditions |
| refPath | <code>string</code> | <code>null</code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |
| limit | <code>number</code> |  | page size |

<a name="module_FirebaseFirestoreWrapper.PaginateGroupFetch"></a>

### FirebaseFirestoreWrapper.PaginateGroupFetch
An object to allow for paginating a query for table read from Firestore.

**Kind**: static class of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Query | <code>Query</code> | that forms basis for the table read |
| limit | <code>number</code> | page size |
| snapshot | <code>QuerySnapshot</code> | last successful snapshot/page fetched |
| status | <code>PagingStatus</code> | status of pagination object |
| PageForward | <code>function</code> | Changes the listener to the next page forward |
| PageBack | <code>function</code> | Changes the listener to the next page backward |
| Unsubscribe | <code>function</code> | returns the unsubscribe function |

<a name="new_module_FirebaseFirestoreWrapper.PaginateGroupFetch_new"></a>

#### new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> | <code></code> | a 2xn array of sort (i.e. "orderBy") conditions The array(s) are assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| limit | <code>number</code> |  | (optional) |

<a name="module_FirebaseFirestoreWrapper.PaginatedListener"></a>

### FirebaseFirestoreWrapper.PaginatedListener
An object to allow for paginating a listener for table read from Firestore.REQUIRES a sorting choicemasks some subscribe/unsubscribe action for paging forward/backward

**Kind**: static class of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Query | <code>Query</code> | that forms basis for the table read |
| limit | <code>number</code> | page size |
| snapshot | <code>QuerySnapshot</code> | last successful snapshot/page fetched |
| status | <code>PagingStatus</code> | status of pagination object |
| PageForward | <code>function</code> | Changes the listener to the next page forward |
| PageBack | <code>function</code> | Changes the listener to the next page backward |

<a name="new_module_FirebaseFirestoreWrapper.PaginatedListener_new"></a>

#### new exports.PaginatedListener(table, [filterArray], [sortArray], refPath, limit, dataCallback, errCallback)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| table | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> |  | a 2xn array of sort (i.e. "orderBy") conditions |
| refPath | <code>refPath</code> | <code></code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structered collections) The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| limit | <code>number</code> |  | (optional) |
| dataCallback | <code>callback</code> | <code></code> |  |
| errCallback | <code>callback</code> | <code></code> |  |

<a name="module_FirebaseFirestoreWrapper.PAGINATE_CHOICES"></a>

### FirebaseFirestoreWrapper.PAGINATE\_CHOICES : <code>enum</code>
[PAGINATE_CHOICES]

**Kind**: static enum of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.documentId"></a>

### FirebaseFirestoreWrapper.documentId
- a fieldPath value to represent the document Id - WARNINGGoogle Firestore has a bug, and this actually represents the FULL PATHto the document

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.deleteFieldValue"></a>

### FirebaseFirestoreWrapper.deleteFieldValue
a sentinel value used to delete a field during anupdate operation

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.serverTimestampFieldValue"></a>

### FirebaseFirestoreWrapper.serverTimestampFieldValue
a sentinel value to set a field to aserver-generated timestamp during set(0 or update())

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.MAX_CONCURRENCY"></a>

### FirebaseFirestoreWrapper.MAX\_CONCURRENCY : <code>number</code>
maximum concurrent writes

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.PAGINATE_INIT"></a>

### FirebaseFirestoreWrapper.PAGINATE\_INIT : <code>number</code>
**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.PAGINATE_PENDING"></a>

### FirebaseFirestoreWrapper.PAGINATE\_PENDING : <code>number</code>
**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.PAGINATE_UPDATED"></a>

### FirebaseFirestoreWrapper.PAGINATE\_UPDATED : <code>number</code>
**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.PAGINATE_DEFAULT"></a>

### FirebaseFirestoreWrapper.PAGINATE\_DEFAULT : <code>number</code>
**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.initialize_firestore"></a>

### FirebaseFirestoreWrapper.initialize\_firestore(firebase)
Initializes the Firestore service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

**Example**  
```import * as firebase from "firebase/app";import "firebase/firestore";import FirebaseFirestore from "@leaddreamer/firebase-wrapper/FirebaseFirestoreWrapper";import {config} from "whereever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseFirestore(firebase);})(config)```
<a name="module_FirebaseFirestoreWrapper.timestamp"></a>

### FirebaseFirestoreWrapper.timestamp()
- Firestore timestamp processor

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.incrementFieldValue"></a>

### FirebaseFirestoreWrapper.incrementFieldValue(n) ⇒
----------------------------------------------------------------------

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: a sentinel value  

| Param | Description |
| --- | --- |
| n | If either the operand or the current field value uses    floating point precision, all arithmetic follows IEEE 754    semantics. If both values are integers, values outside of    JavaScript's safe number range (Number.MIN_SAFE_INTEGER to    Number.MAX_SAFE_INTEGER) are also subject to precision loss.    Furthermore, once processed by the Firestore backend, all integer    operations are capped between -2^63 and 2^63-1.     If the current field value is not of type number, or if the field     does not yet exist, the transformation sets the field to the given value. |

<a name="module_FirebaseFirestoreWrapper.arrayRemoveFieldValue"></a>

### FirebaseFirestoreWrapper.arrayRemoveFieldValue(elements) ⇒ <code>sentinelValue</code>
returns a sentinel to remove elements from array field

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>sentinelValue</code> - a sentinel value  

| Param | Description |
| --- | --- |
| elements | REST expanded list of elements to remove |

<a name="module_FirebaseFirestoreWrapper.arrayUnionFieldValue"></a>

### FirebaseFirestoreWrapper.arrayUnionFieldValue(elements) ⇒
return a sentinel to add/join elements to array field

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: a sentinel value  

| Param | Description |
| --- | --- |
| elements | REST expanded list of elements to add |

<a name="module_FirebaseFirestoreWrapper.RecordFromSnapshot"></a>

### FirebaseFirestoreWrapper.RecordFromSnapshot(DocumentSnapshot) ⇒ <code>Record</code>
returns an internal record structure from a firestoreDocument snapshot

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type |
| --- | --- |
| DocumentSnapshot | <code>DocumentSnapshot</code> | 

<a name="module_FirebaseFirestoreWrapper.RecordsFromSnapshot"></a>

### FirebaseFirestoreWrapper.RecordsFromSnapshot(QuerySnapshot) ⇒ <code>RecordArray</code>
returns an array of internal record structures from afirestore Query snapshot

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type |
| --- | --- |
| QuerySnapshot | <code>QuerySnapshot</code> | 

<a name="module_FirebaseFirestoreWrapper.DocumentFromRecord"></a>

### FirebaseFirestoreWrapper.DocumentFromRecord(Record) ⇒ <code>object</code>
returns a Firestore document structure from an internal Record

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| Record | <code>object</code> | cleans up internal document representation |

<a name="module_FirebaseFirestoreWrapper.runTransaction"></a>

### FirebaseFirestoreWrapper.runTransaction(updateFunction) ⇒ <code>Promise.&lt;object&gt;</code>
creates and runs a series of record operations(executed in the param function) as an atomic operation.A transation object is passed to the callback parameter

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise.&lt;object&gt;</code> - a promise with the result of updateFunction  

| Param | Type | Description |
| --- | --- | --- |
| updateFunction | <code>callback</code> | callback function that expects a Transaction token as it's sole argument.  either all the included/chained record operations will succeed, or none |

<a name="module_FirebaseFirestoreWrapper.openWriteBatch"></a>

### FirebaseFirestoreWrapper.openWriteBatch() ⇒ <code>WriteBatch</code>
----------------------------------------------------------------------

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>WriteBatch</code> - object that operations are added to for a bulkoperation  
**Sync**:   
<a name="module_FirebaseFirestoreWrapper.closeWriteBatch"></a>

### FirebaseFirestoreWrapper.closeWriteBatch(batch) ⇒ <code>Promise.&lt;void&gt;</code>
dispatches an asynchronous Closure to submit Batch

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| batch | <code>WriteBatch</code> | WriteBatch to close |

<a name="module_FirebaseFirestoreWrapper.createUniqueReference"></a>

### FirebaseFirestoreWrapper.createUniqueReference(tablePath, refPath) ⇒ <code>DocumentReference</code>
adds a blank document to the collectionreferenced in parameter tablePath (relative to optional refPath) andreturns it's reference.  This is useful for Transactions and Batches, whichcan only get(), set() or update() existing documents. Tricksie!

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>DocumentReference</code> - Firestore Document Reference  
**Sync**:   

| Param | Description |
| --- | --- |
| tablePath | string representing a valid path to a collection to create the new document in, relative to a document reference passed in |
| refPath | an optional valid document reference to start the table path |

<a name="module_FirebaseFirestoreWrapper.dbReference"></a>

### FirebaseFirestoreWrapper.dbReference(refPath)
generates a document reference from a pathif passed; else returns the db base reference

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Sync**:   

| Param | Type | Description |
| --- | --- | --- |
| refPath | <code>string</code> | Path to base actions from. May be null |

<a name="module_FirebaseFirestoreWrapper.writeRecord"></a>

### FirebaseFirestoreWrapper.writeRecord(tablePath, data, refPath, batch, mergeOption) ⇒ <code>Promise.&lt;Record&gt;</code>
writes a Firestore record to collectionindicated by tablePath relative to option DocumentReference refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string representing a valid path to a collection to create or update the document in, relative to a document reference passed in |
| data | <code>Record</code> | Data/Record object to write to database |
| refPath | <code>string</code> | an optional valid document reference to start the table path |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional chain token to include this operation as part of an Atomic Transaction |
| mergeOption | <code>boolean</code> | whether to merge into existin data; default TRUE |

<a name="module_FirebaseFirestoreWrapper.writeRecordByRefPath"></a>

### FirebaseFirestoreWrapper.writeRecordByRefPath(data, refPath, Transaction, mergeOption) ⇒ <code>Promise.&lt;Record&gt;</code>
Writes given data object (or map) to the given documentReference

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise.&lt;Record&gt;</code> - data record as written  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | Object/Map to be written back to the Firestore |
| refPath | <code>string</code> | DocumentReference to write document to |
| Transaction | <code>WriteBatch</code> \| <code>Transaction</code> | Optional Transaction to enclose this action in |
| mergeOption | <code>boolean</code> | whether to merge into existin data; default TRUE |

<a name="module_FirebaseFirestoreWrapper.writeBack"></a>

### FirebaseFirestoreWrapper.writeBack(data, Transaction, mergeOption) ⇒ <code>Promise.&lt;Record&gt;</code>
Writes a local-schema document back to the Firestore.  Assumeobject/map came from the firestore

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise.&lt;Record&gt;</code> - record as written.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | Object/Map to be written back to the Firestore |
| Transaction | <code>WriteBatch</code> \| <code>Transaction</code> | Optional Transaction to enclose this action in |
| mergeOption | <code>boolean</code> | whether to merge into existin data; default TRUE |

<a name="module_FirebaseFirestoreWrapper.collectRecords"></a>

### FirebaseFirestoreWrapper.collectRecords(tablePath, refPath) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
query for a SET of records

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string representing path ro requested collection |
| refPath | <code>string</code> | string representing a path to the relative PARENT of the requested collection |

<a name="module_FirebaseFirestoreWrapper.collectRecordsByFilter"></a>

### FirebaseFirestoreWrapper.collectRecordsByFilter(tablePath, [filterArray], refPath) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
----------------------------------------------------------------------

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Descriptions**: returns an array of documents from Firestore  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | an array of filterObjects The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| refPath | <code>string</code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |

<a name="module_FirebaseFirestoreWrapper.collectRecordsInGroup"></a>

### FirebaseFirestoreWrapper.collectRecordsInGroup(tableName) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
query for a SET of records from a COLLECTIONGROUP - allcollections of a similar name, regardless of parents.  It is up to theUser to ensure these are at a similar level/structure - Firestore justmatches the name

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | string describing the NAME of the collection group desired |

<a name="module_FirebaseFirestoreWrapper.collectRecordsInGroupByFilter"></a>

### FirebaseFirestoreWrapper.collectRecordsInGroupByFilter(tableName, [filterArray]) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
queries for Records from a CollectionGroup, filtered bythe passed array of filterObjects

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | string describing the Name of the collectiongroup |
| [filterArray] | <code>filterObject</code> | array of objects describing filter operations |

<a name="module_FirebaseFirestoreWrapper.fetchRecord"></a>

### FirebaseFirestoreWrapper.fetchRecord(tablePath, Id, refPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
retrieve a record from the Firestore.  If a Batch object is passed,returns a chained Btahc object

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | path to the enclosing collection |
| Id | <code>string</code> | Id of the specific document requested |
| refPath | <code>string</code> | optional document reference to base tablePath from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper.fetchRecordByRefPath"></a>

### FirebaseFirestoreWrapper.fetchRecordByRefPath(docRefPath, batch) ⇒ <code>Promise.&lt;Record&gt;</code>
fetches a single record from the database, using just arefPath to identify the document

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| docRefPath | <code>string</code> | string identifying the full path to the requested document |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | object for collecting batched operations |

<a name="module_FirebaseFirestoreWrapper.fetchRecordByFilter"></a>

### FirebaseFirestoreWrapper.fetchRecordByFilter(table, [filterArray], refPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
fetches a SINGLE record from the database, using just afilter to identify the document. DANGEROUSLY assumes the filteridentifies a SINGLE document, even if the query always returns an array

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | array of objects describing filter operations |
| refPath | <code>string</code> | optional document reference to base tablePath from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper.fetchRecordInGroupByFilter"></a>

### FirebaseFirestoreWrapper.fetchRecordInGroupByFilter(table, [filterArray], batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
fetches a SINGLE record from the database, using just afilter to identify the document. DANGEROUSLY assumes the filteridentifies a SINGLE document, even if the query always returns an array

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | array of objects describing filter operations |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper.deleteRecord"></a>

### FirebaseFirestoreWrapper.deleteRecord(table, record, refPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
deletes a single record from the database

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | string naming the parent collection of the document |
| record | <code>Record</code> |  |
| refPath | <code>string</code> | optional document reference to base tablePath from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper.deleteRecordByRefPath"></a>

### FirebaseFirestoreWrapper.deleteRecordByRefPath(docRefPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
deletes a single record from the database

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| docRefPath | <code>string</code> | string identifying the full path to the requested document |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper.updateRecordFields"></a>

### FirebaseFirestoreWrapper.updateRecordFields(recordUpdate) ⇒ <code>Promise.&lt;Record&gt;</code>
update record by fields - Allows use of FieldPath optionssuch as .delete(). Only specifically referenced fields will beaffected. Assumes the originating docRef is passed as refPath: field

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| recordUpdate | <code>Record</code> | object of field:value entries to update. |
| recordUpdate.refPath | <code>string</code> | full path to document/record |

<a name="module_FirebaseFirestoreWrapper.updateRecordByRefPath"></a>

### FirebaseFirestoreWrapper.updateRecordByRefPath(docRefPath, data, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
----------------------------------------------------------------------

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| docRefPath | <code>string</code> | full path to document to update |
| data | <code>Record</code> | Record of values to update |
| data.Id | <code>string</code> | document Id of record |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object |

<a name="module_FirebaseFirestoreWrapper.writeArrayValue"></a>

### FirebaseFirestoreWrapper.writeArrayValue(fieldName, fieldValue, docRefPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
adds a new value to a firestore record array entry

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> | the string name of the array to be updated |
| fieldValue | <code>any</code> | the value to add to the array |
| docRefPath | <code>string</code> | the reference path for the document to be updated |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional - used to chain transactions |

<a name="module_FirebaseFirestoreWrapper.ListenQuery"></a>

### FirebaseFirestoreWrapper.ListenQuery(table, [filterArray], [sortArray], refPath, dataCallback, errCallback) ⇒ <code>callback</code>
Sets up a listener to a query

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Sync**:   

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | Name of table to query too - may be sub-collection of optional reference |
| [filterArray] | <code>filterObject</code> | a 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |
| refPath | <code>string</code> | An optional Firestore DocumentReference. If present, the "table" parameter above is relative to this reference |
| dataCallback | <code>QuerySnapshot</code> | callback function with query results |
| errCallback | <code>callback</code> | callback function with error results |

<a name="module_FirebaseFirestoreWrapper.ListenCollectionGroupRecords"></a>

### FirebaseFirestoreWrapper.ListenCollectionGroupRecords(tablePath, refPath, dataCallback, errCallback) ⇒ <code>callback</code>
sets up a listener for changes to a collectionGroup

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Sync**:   

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to document |
| refPath | <code>string</code> | string describing path to parent document |
| dataCallback | <code>QuerySnapshot</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper.ListenCollectionGroupQuery"></a>

### FirebaseFirestoreWrapper.ListenCollectionGroupQuery(table, [filterArray], [sortArray], dataCallback, errCallback) ⇒ <code>callback</code>
sets up a listener for changes to a collectionGroup by query

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Sync**:   

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | string describing the name of a collectionGroup |
| [filterArray] | <code>filterObject</code> | a 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |
| dataCallback | <code>QuerySnapshot</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper.ListenRecord"></a>

### FirebaseFirestoreWrapper.ListenRecord(tablePath, Id, refPath, dataCallback, errCallback) ⇒ <code>callback</code>
Listen to changes to a single record

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Sync**:   

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to requested record |
| Id | <code>string</code> | string of Id of requested document |
| refPath | <code>string</code> | string od full path to parent document |
| dataCallback | <code>RecordListener</code> | callback to handle changes to requested document |
| errCallback | <code>callback</code> | callback to handle error reporting and operations |

<a name="module_FirebaseFirestoreWrapper.ownerFilter"></a>

### FirebaseFirestoreWrapper.ownerFilter(owner, refPath, queryFilter) ⇒ <code>filterObject</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| refPath | <code>string</code> | string representing the full path to the Firestore document. |
| queryFilter | <code>filterObject</code> | additional filter parameters |

<a name="module_FirebaseFirestoreWrapper.fetchSlice"></a>

### FirebaseFirestoreWrapper.fetchSlice(owner, collectionName) ⇒ <code>QuerySnapshot</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>QuerySnapshot</code> - response  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |

<a name="module_FirebaseFirestoreWrapper.querySlice"></a>

### FirebaseFirestoreWrapper.querySlice(owner, collectionName, queryFilter) ⇒ <code>QuerySnapshot</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>QuerySnapshot</code> - response  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| queryFilter | <code>filterObject</code> | filter parameters |

<a name="module_FirebaseFirestoreWrapper.typedWrite"></a>

### FirebaseFirestoreWrapper.typedWrite(data, parent, type, batch) ⇒ <code>Promise</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise</code> - WriteBatch, Transaction or Void  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>DocumentObject</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| data.Id | <code>string</code> |  |
| data.refPath | <code>string</code> |  |
| parent | <code>DocumentObject</code> | parent object (if any) this belongs to |
| parent.refPath | <code>string</code> | full path to parent document |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper.typedWriteByTree"></a>

### FirebaseFirestoreWrapper.typedWriteByTree(data, tree, type, batch) ⇒ <code>Promise</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise</code> - WriteBatch, Transaction or Void  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| tree | <code>ArtistTree</code> | Object with properties of refPath segments |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper.typedCreate"></a>

### FirebaseFirestoreWrapper.typedCreate(data, parent, type, batch) ⇒ <code>Promise</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise</code> - WriteBatch, Transaction or Void  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | the data object/record to create.  This will create a new one if it doesn't exist |
| parent | <code>DocumentObject</code> | parent object (if any) this belongs to |
| parent.refPath | <code>string</code> | full path to parent document |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object. Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper.treeFromChild"></a>

### FirebaseFirestoreWrapper.treeFromChild(child) ⇒ <code>RecordTree</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Sync**:   

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.typedRefPathFromTree"></a>

### FirebaseFirestoreWrapper.typedRefPathFromTree(tree, type, branchType) ⇒ <code>string</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - constructed refPath (collection)  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> |  |
| type | <code>string</code> |  |
| branchType | <code>string</code> | a collection name to start branching from. This is in case tree was built from a sister collection/document |

<a name="module_FirebaseFirestoreWrapper.typedIdFromChild"></a>

### FirebaseFirestoreWrapper.typedIdFromChild(child, type)
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>DocumentObject</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> | name of desired type/collection level in tree |

<a name="module_FirebaseFirestoreWrapper.typedRefPathFromChild"></a>

### FirebaseFirestoreWrapper.typedRefPathFromChild(child, type) ⇒ <code>string</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - constructed refPath (collection)  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>DocumentObject</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.typedFetchFromChild"></a>

### FirebaseFirestoreWrapper.typedFetchFromChild(child, refPath, type, batch)
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>DocumentObject</code> | assumed to be an object in a collection/document Tree |
| refPath | <code>string</code> |  |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper.typedFetchFromTree"></a>

### FirebaseFirestoreWrapper.typedFetchFromTree(tree, refPath, type, batch)
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> | assumed to be an object in a collection/document Tree |
| refPath | <code>string</code> |  |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper.typedCollectFromTree"></a>

### FirebaseFirestoreWrapper.typedCollectFromTree(tree, type, batch)
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> | assumed to be an object in a collection/document Tree |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper.typedCollectFromChild"></a>

### FirebaseFirestoreWrapper.typedCollectFromChild(child, type, batch)
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | assumed to be an object in a collection/document Tree |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper.localBatchReturn"></a>

### FirebaseFirestoreWrapper.localBatchReturn(incomingBatch, internalBatch) ⇒ <code>WriteBatch</code> \| <code>Transaction</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>WriteBatch</code> \| <code>Transaction</code> - WriteBatch, Transaction or Void  

| Param | Type | Description |
| --- | --- | --- |
| incomingBatch | <code>WriteBatch</code> \| <code>Transaction</code> | a batching object passed into the subroutine Internal Transaction will be added to the incoming batch |
| internalBatch | <code>WriteBatch</code> \| <code>Transaction</code> | a batching object as built *in* the routine, built on the incomingBatch if it exists |

**Example**  
```export const suboperation = (data, batch = null) => { let myBatch = batch || openWriteBatch(); //note short circuit //stuff that happens in the routine writeRecord(table, data, parent, myBatch); writeRecord(otherTable, otherData, otherParent, myBatch); return localBatchReturn(batch, myBatch);}```
<a name="module_FirebaseFirestoreWrapper.RecordListener"></a>

### FirebaseFirestoreWrapper.RecordListener : <code>function</code>
**Kind**: static typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type |
| --- | --- |
| documentSnapshot | <code>DocumentSnapshot</code> | 

<a name="module_FirebaseFirestoreWrapper.CollectionListener"></a>

### FirebaseFirestoreWrapper.CollectionListener : <code>function</code>
**Kind**: static typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type |
| --- | --- |
| querySnapshot | <code>QuerySnapshot</code> | 

<a name="module_FirebaseFirestoreWrapper.errCallback"></a>

### FirebaseFirestoreWrapper.errCallback ⇒ <code>callback</code>
sets up a listener for changes to a single record

**Kind**: static typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Sync**:   

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to document |
| refPath | <code>string</code> | string describing path to parent document |
| response | <code>QuerySnapshot</code> |  |
| response | <code>callback</code> |  |

<a name="module_FirebaseFirestoreWrapper.PagingStatus"></a>

### FirebaseFirestoreWrapper.PagingStatus : <code>PAGINATE\_INIT</code> \| <code>PAGINATE\_PENDING</code> \| <code>PAGINATE\_UPDATED</code> \| <code>PAGINATE\_DEFAULT</code>
**Kind**: static typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.errCallback"></a>

### FirebaseFirestoreWrapper.errCallback ⇒ <code>callback</code>
**Kind**: static typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| response | <code>QuerySnapshot</code> |  |
| response | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.errCallback"></a>

### FirebaseFirestoreWrapper.errCallback ⇒ <code>callback</code>
**Kind**: static typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| filterArray | <code>filterObject</code> | filter parameters |
| response | <code>QuerySnapshot</code> |  |
| response | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper..Record"></a>

### FirebaseFirestoreWrapper~Record : <code>object</code>
common properties of our database records

**Kind**: inner typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Id | <code>string</code> | Id of the document as stored in Firestore May be null for new objects |
| refPath | <code>string</code> | string representing the full path to the Firestore document.  May be blank for new documents to be saved. |

<a name="module_FirebaseFirestoreWrapper..RecordArray"></a>

### FirebaseFirestoreWrapper~RecordArray : <code>Record</code>
an array of database records

**Kind**: inner typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper..RecordTree"></a>

### FirebaseFirestoreWrapper~RecordTree : <code>Map</code>
**Kind**: inner typedef of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

* * *

&copy; 2020-2021 Tracy Hall
