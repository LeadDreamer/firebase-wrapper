[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseFirestoreWrapper"></a>

## FirebaseFirestoreWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseFirestoreWrapper](#module_FirebaseFirestoreWrapper)
    * _static_
        * [.MAX_CONCURRENCY](#module_FirebaseFirestoreWrapper.MAX_CONCURRENCY) : <code>number</code>
        * [.FirebaseFirestore(firebase)](#module_FirebaseFirestoreWrapper.FirebaseFirestore)
        * [.createUniqueReference(tablePath, refPath)](#module_FirebaseFirestoreWrapper.createUniqueReference) ⇒ <code>DocumentReference</code>
        * [.writeRecord(tablePath, data, refPath, batch, mergeOption)](#module_FirebaseFirestoreWrapper.writeRecord) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.writeRecordByRefPath(data, refPath, Transaction, mergeOption)](#module_FirebaseFirestoreWrapper.writeRecordByRefPath) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.writeBack(data, Transaction, mergeOption)](#module_FirebaseFirestoreWrapper.writeBack) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.collectRecords(tablePath, refPath)](#module_FirebaseFirestoreWrapper.collectRecords) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.collectRecordsByFilter(tablePath, refPath, [filterArray], [sortArray], limit)](#module_FirebaseFirestoreWrapper.collectRecordsByFilter) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.collectRecordsInGroup(tableName)](#module_FirebaseFirestoreWrapper.collectRecordsInGroup) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.collectRecordsInGroupByFilter(tableName, [filterArray], [sortArray], limit)](#module_FirebaseFirestoreWrapper.collectRecordsInGroupByFilter) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
        * [.fetchRecord(tablePath, Id, refPath, batch)](#module_FirebaseFirestoreWrapper.fetchRecord) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.fetchRecordByRefPath(docRefPath, batch)](#module_FirebaseFirestoreWrapper.fetchRecordByRefPath) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.fetchRecordByFilter(table, [filterArray], refPath, batch)](#module_FirebaseFirestoreWrapper.fetchRecordByFilter) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.fetchRecordInGroupByFilter(table, [filterArray], batch)](#module_FirebaseFirestoreWrapper.fetchRecordInGroupByFilter) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.deleteRecord(table, record, refPath, batch)](#module_FirebaseFirestoreWrapper.deleteRecord) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.deleteRecordByRefPath(docRefPath, batch)](#module_FirebaseFirestoreWrapper.deleteRecordByRefPath) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.updateRecordFields(recordUpdate)](#module_FirebaseFirestoreWrapper.updateRecordFields) ⇒ <code>Promise.&lt;Record&gt;</code>
        * [.updateRecordByRefPath(docRefPath, data, batch)](#module_FirebaseFirestoreWrapper.updateRecordByRefPath) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.writeArrayValue(fieldName, fieldValue, docRefPath, batch)](#module_FirebaseFirestoreWrapper.writeArrayValue) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
        * [.localBatchReturn(incomingBatch, internalBatch)](#module_FirebaseFirestoreWrapper.localBatchReturn) ⇒ <code>WriteBatch</code> \| <code>Transaction</code>
        * _Batch_
            * [.runTransaction(updateFunction)](#module_FirebaseFirestoreWrapper.runTransaction) ⇒ <code>Promise.&lt;object&gt;</code>
            * [.openWriteBatch()](#module_FirebaseFirestoreWrapper.openWriteBatch) ⇒ <code>WriteBatch</code>
            * [.closeWriteBatch(batch)](#module_FirebaseFirestoreWrapper.closeWriteBatch) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.openBulkWriter()](#module_FirebaseFirestoreWrapper.openBulkWriter) ⇒ <code>BulkWriter</code>
            * [.closeBulkWriter(bulkWriter)](#module_FirebaseFirestoreWrapper.closeBulkWriter) ⇒ <code>Promise.&lt;void&gt;</code>
        * _FieldPath_
            * [.documentId](#module_FirebaseFirestoreWrapper.documentId) : <code>Object</code>
        * _FieldValue_
            * [.deleteFieldValue](#module_FirebaseFirestoreWrapper.deleteFieldValue) : <code>Object</code>
            * [.serverTimestampFieldValue](#module_FirebaseFirestoreWrapper.serverTimestampFieldValue) : <code>Object</code>
            * [.incrementFieldValue(n)](#module_FirebaseFirestoreWrapper.incrementFieldValue) ⇒
            * [.decrementFieldValue(n)](#module_FirebaseFirestoreWrapper.decrementFieldValue) ⇒
            * [.arrayRemoveFieldValue(elements)](#module_FirebaseFirestoreWrapper.arrayRemoveFieldValue) ⇒ <code>sentinelValue</code>
            * [.arrayUnionFieldValue(elements)](#module_FirebaseFirestoreWrapper.arrayUnionFieldValue) ⇒
        * _Listeners_
            * [.ListenRecords(tablePath, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenRecords) ⇒ <code>unsubscribe</code>
            * [.ListenQuery(tablePath, refPath, dataCallback, errCallback, [filterArray], [sortArray])](#module_FirebaseFirestoreWrapper.ListenQuery) ⇒ <code>unsubscribe</code>
            * [.ListenCollectionGroupRecords(tablePath, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenCollectionGroupRecords) ⇒ <code>callback</code>
            * [.ListenCollectionGroupQuery(table, [filterArray], [sortArray], dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenCollectionGroupQuery) ⇒ <code>unsubscribe</code>
            * [.ListenRecord(tablePath, Id, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper.ListenRecord) ⇒ <code>unsubscribe</code>
        * _Paginator_
            * [.PaginateFetch](#module_FirebaseFirestoreWrapper.PaginateFetch)
                * [new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)](#new_module_FirebaseFirestoreWrapper.PaginateFetch_new)
                * [.limit](#module_FirebaseFirestoreWrapper.PaginateFetch+limit) : <code>number</code>
                * [.status](#module_FirebaseFirestoreWrapper.PaginateFetch+status) : <code>PagingStatus</code>
                * [.PageForward()](#module_FirebaseFirestoreWrapper.PaginateFetch+PageForward) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
                * [.PageBack()](#module_FirebaseFirestoreWrapper.PaginateFetch+PageBack) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
            * [.PaginateGroupFetch](#module_FirebaseFirestoreWrapper.PaginateGroupFetch)
                * [new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)](#new_module_FirebaseFirestoreWrapper.PaginateGroupFetch_new)
                * [.limit](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+limit) : <code>number</code>
                * [.status](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+status) : <code>PagingStatus</code>
                * [.PageForward()](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+PageForward) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
                * [.PageBack()](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+PageBack) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
            * [.PaginatedListener](#module_FirebaseFirestoreWrapper.PaginatedListener)
                * [new exports.PaginatedListener(tablePath, refPath, dataCallback, errCallback, limit, [filterArray], [sortArray])](#new_module_FirebaseFirestoreWrapper.PaginatedListener_new)
                * [.limit](#module_FirebaseFirestoreWrapper.PaginatedListener+limit) : <code>number</code>
                * [.status](#module_FirebaseFirestoreWrapper.PaginatedListener+status) : <code>number</code>
                * [.PageForward()](#module_FirebaseFirestoreWrapper.PaginatedListener+PageForward) ⇒ <code>unsubscribe</code>
                * [.PageBack()](#module_FirebaseFirestoreWrapper.PaginatedListener+PageBack) ⇒ <code>unsubscribe</code>
                * [.ChangeLimit(newLimit)](#module_FirebaseFirestoreWrapper.PaginatedListener+ChangeLimit) ⇒ <code>unsubscribe</code>
                * [.ChangeFilter([filterArray])](#module_FirebaseFirestoreWrapper.PaginatedListener+ChangeFilter) ⇒ <code>unsubscribe</code>
                * [.unsubscribe()](#module_FirebaseFirestoreWrapper.PaginatedListener+unsubscribe)
        * _Tree Slice_
            * [.ownerFilter(owner, queryFilter)](#module_FirebaseFirestoreWrapper.ownerFilter) ⇒ <code>filterObject</code>
            * [.listenSlice(owner, collectionName, dataCallback, response, errCallback, response)](#module_FirebaseFirestoreWrapper.listenSlice) ⇒ <code>callback</code>
            * [.fetchSlice(owner, collectionName)](#module_FirebaseFirestoreWrapper.fetchSlice) ⇒ <code>QuerySnapshot</code>
            * [.querySlice(owner, collectionName, queryFilter)](#module_FirebaseFirestoreWrapper.querySlice) ⇒ <code>QuerySnapshot</code>
            * [.listenQuerySlice(owner, collectionName, filterArray, dataCallback, response, errCallback, response)](#module_FirebaseFirestoreWrapper.listenQuerySlice) ⇒ <code>callback</code>
            * [.ownerType(record)](#module_FirebaseFirestoreWrapper.ownerType) ⇒ <code>string</code>
            * [.ownerId(record)](#module_FirebaseFirestoreWrapper.ownerId) ⇒ <code>string</code>
            * [.ownerRefPath(record)](#module_FirebaseFirestoreWrapper.ownerRefPath) ⇒ <code>string</code>
            * [.ownerByChild(record)](#module_FirebaseFirestoreWrapper.ownerByChild) ⇒ <code>Record</code>
            * [.ownerByOwnerType(ownerId, ownerType)](#module_FirebaseFirestoreWrapper.ownerByOwnerType) ⇒ <code>Record</code>
            * [.fetchOwner(record)](#module_FirebaseFirestoreWrapper.fetchOwner) ⇒ <code>Document</code>
        * _Typed_
            * [.recordType(record)](#module_FirebaseFirestoreWrapper.recordType) ⇒ <code>string</code>
            * [.recordId()](#module_FirebaseFirestoreWrapper.recordId) ⇒ <code>string</code>
            * [.typedWrite(data, parent, type, batch)](#module_FirebaseFirestoreWrapper.typedWrite) ⇒ <code>Promise.&lt;Record&gt;</code>
            * [.typedWriteByTree(data, tree, type, batch)](#module_FirebaseFirestoreWrapper.typedWriteByTree) ⇒ <code>Promise</code>
            * [.typedWriteByChild(data, tree, type, batch)](#module_FirebaseFirestoreWrapper.typedWriteByChild) ⇒ <code>Promise</code>
            * [.typedCreate(data, parent, type, batch)](#module_FirebaseFirestoreWrapper.typedCreate) ⇒ <code>Promise</code>
            * [.treeFromChild(child)](#module_FirebaseFirestoreWrapper.treeFromChild) ⇒ <code>RecordTree</code>
            * [.typedTablePathFromTree(tree, type, branchType)](#module_FirebaseFirestoreWrapper.typedTablePathFromTree) ⇒ <code>string</code>
            * [.typedRefPathFromTree(tree, type)](#module_FirebaseFirestoreWrapper.typedRefPathFromTree) ⇒ <code>string</code>
            * [.typedIdFromChild(child, type)](#module_FirebaseFirestoreWrapper.typedIdFromChild)
            * [.typedTablePathFromChild(child, type)](#module_FirebaseFirestoreWrapper.typedTablePathFromChild) ⇒ <code>string</code>
            * [.typedRefPathFromChild(child, type)](#module_FirebaseFirestoreWrapper.typedRefPathFromChild) ⇒ <code>string</code>
            * [.typedFetchFromChild(child, refPath, type, batch)](#module_FirebaseFirestoreWrapper.typedFetchFromChild) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
            * [.typedFetchFromTree(tree, refPath, type, batch)](#module_FirebaseFirestoreWrapper.typedFetchFromTree) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
            * [.typedCollectFromTree(tree, type, batch)](#module_FirebaseFirestoreWrapper.typedCollectFromTree) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
            * [.typedCollectFromChild(child, type, batch)](#module_FirebaseFirestoreWrapper.typedCollectFromChild)
    * _inner_
        * [~timestamp](#module_FirebaseFirestoreWrapper..timestamp)
            * [new timestamp()](#new_module_FirebaseFirestoreWrapper..timestamp_new)

<a name="module_FirebaseFirestoreWrapper.MAX_CONCURRENCY"></a>

### FirebaseFirestoreWrapper.MAX\_CONCURRENCY : <code>number</code>
maximum concurrent writes

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="module_FirebaseFirestoreWrapper.FirebaseFirestore"></a>

### FirebaseFirestoreWrapper.FirebaseFirestore(firebase)
Initializes the Firestore service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

**Example**  
```import * as firebase from "firebase/app";import "firebase/firestore";import FirebaseFirestore from "@leaddreamer/firebase-wrapper/FirebaseFirestoreWrapper";import {config} from "whereever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseFirestore(firebase);})(config)```
<a name="module_FirebaseFirestoreWrapper.createUniqueReference"></a>

### FirebaseFirestoreWrapper.createUniqueReference(tablePath, refPath) ⇒ <code>DocumentReference</code>
----------------------------------------------------------------------Creates a DocumentReference document to the collectionreferenced in parameter tablePath (relative to optional refPath).This is can be useful for Transactions and Batches, whichcan only get(), set() or update() existing documents. Tricksie!

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>DocumentReference</code> - Firestore Document Reference  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string representing a valid path to a collection to create the new document in, relative to a document reference passed in |
| refPath | <code>string</code> | an optional valid document reference to start the table path |

<a name="module_FirebaseFirestoreWrapper.writeRecord"></a>

### FirebaseFirestoreWrapper.writeRecord(tablePath, data, refPath, batch, mergeOption) ⇒ <code>Promise.&lt;Record&gt;</code>
----------------------------------------------------------------------Writes a Firestore record to collection indicated by tablePathrelative to option DocumentReference refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise.&lt;Record&gt;</code> - - a copy of the written record  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string representing a valid path to a collection to create or update the document in, relative to a document reference passed in |
| data | <code>Record</code> | Data/Record object to write to database |
| refPath | <code>string</code> | an optional valid document reference to start the table path |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional chain token to include this operation as part of an Atomic Transaction |
| mergeOption | <code>boolean</code> | whether to merge into existing data; default TRUE |

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
----------------------------------------------------------------------Writes a local-schema document back to the Firestore.  Assumeobject/map came from the firestore

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise.&lt;Record&gt;</code> - record as written.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | Object/Map to be written back to the Firestore |
| data.refPath | <code>string</code> | required to be present |
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

### FirebaseFirestoreWrapper.collectRecordsByFilter(tablePath, refPath, [filterArray], [sortArray], limit) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
----------------------------------------------------------------------

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Descriptions**: returns an array of documents from Firestore  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | a properly formatted string representing the requested collection - always an ODD number of elements |
| refPath | <code>string</code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |
| [filterArray] | <code>filterObject</code> | an array of filterObjects The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| [sortArray] | <code>sortObject</code> | a 2xn array of sort (i.e. "orderBy") conditions |
| limit | <code>number</code> | limit result to this number (if at all) |

<a name="module_FirebaseFirestoreWrapper.collectRecordsInGroup"></a>

### FirebaseFirestoreWrapper.collectRecordsInGroup(tableName) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
query for a SET of records from a COLLECTIONGROUP - allcollections of a similar name, regardless of parents.  It is up to theUser to ensure these are at a similar level/structure - Firestore justmatches the name

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | string describing the NAME of the collection group desired |

<a name="module_FirebaseFirestoreWrapper.collectRecordsInGroupByFilter"></a>

### FirebaseFirestoreWrapper.collectRecordsInGroupByFilter(tableName, [filterArray], [sortArray], limit) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
queries for Records from a CollectionGroup, filtered bythe passed array of filterObjects

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | string describing the Name of the collectiongroup |
| [filterArray] | <code>filterObject</code> | an array of filterObjects The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| [sortArray] | <code>sortObject</code> | a 2xn array of sort (i.e. "orderBy") conditions |
| limit | <code>number</code> | limit result to this number (if at all) |

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
<a name="module_FirebaseFirestoreWrapper.runTransaction"></a>

### FirebaseFirestoreWrapper.runTransaction(updateFunction) ⇒ <code>Promise.&lt;object&gt;</code>
----------------------------------------------------------------------creates and runs a series of record operations(executed in the param function) as an atomic operation.A transation object is passed to the callback parameter

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise.&lt;object&gt;</code> - a promise with the result of updateFunction  
**Category**: Batch  

| Param | Type | Description |
| --- | --- | --- |
| updateFunction | <code>callback</code> | callback function that expects a Transaction token as it's sole argument.  either all the included/chained record operations will succeed, or none |

<a name="module_FirebaseFirestoreWrapper.openWriteBatch"></a>

### FirebaseFirestoreWrapper.openWriteBatch() ⇒ <code>WriteBatch</code>
----------------------------------------------------------------------Creates a WriteBatch object tocollect actions for Batch writing to backend

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>WriteBatch</code> - object that operations are added to for a bulkoperation  
**Category**: Batch  
<a name="module_FirebaseFirestoreWrapper.closeWriteBatch"></a>

### FirebaseFirestoreWrapper.closeWriteBatch(batch) ⇒ <code>Promise.&lt;void&gt;</code>
----------------------------------------------------------------------Dispatches an asynchronous Closure to submit Batch

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Batch  

| Param | Type | Description |
| --- | --- | --- |
| batch | <code>WriteBatch</code> | WriteBatch to close |

<a name="module_FirebaseFirestoreWrapper.openBulkWriter"></a>

### FirebaseFirestoreWrapper.openBulkWriter() ⇒ <code>BulkWriter</code>
----------------------------------------------------------------------Creates a bulkWriter object to collect actions for Bulk writing to backendoffers parallel operations, writes only, does NOT check for contentions,admin/Node-side only.

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>BulkWriter</code> - object that operations are added to for a bulkoperation  
**Category**: Batch  
<a name="module_FirebaseFirestoreWrapper.closeBulkWriter"></a>

### FirebaseFirestoreWrapper.closeBulkWriter(bulkWriter) ⇒ <code>Promise.&lt;void&gt;</code>
----------------------------------------------------------------------Dispatches an asynchronous Closure to complete BulkWriter

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Batch  

| Param | Type | Description |
| --- | --- | --- |
| bulkWriter | <code>BulkWriter</code> | bulkWriter to close |

<a name="module_FirebaseFirestoreWrapper.documentId"></a>

### FirebaseFirestoreWrapper.documentId : <code>Object</code>
a fieldPath value to represent the document Id - WARNINGGoogle Firestore has a bug, and this actually represents the FULL PATHto the document

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: FieldPath  
<a name="module_FirebaseFirestoreWrapper.deleteFieldValue"></a>

### FirebaseFirestoreWrapper.deleteFieldValue : <code>Object</code>
a sentinel value used to delete a field during anupdate operation

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: FieldValue  
<a name="module_FirebaseFirestoreWrapper.serverTimestampFieldValue"></a>

### FirebaseFirestoreWrapper.serverTimestampFieldValue : <code>Object</code>
a sentinel value to set a field to aserver-generated timestamp during set(0 or update())

**Kind**: static constant of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: FieldValue  
<a name="module_FirebaseFirestoreWrapper.incrementFieldValue"></a>

### FirebaseFirestoreWrapper.incrementFieldValue(n) ⇒
----------------------------------------------------------------------return a sentinel to incrment/decrement a field

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: a sentinel value  
**Category**: FieldValue  

| Param | Description |
| --- | --- |
| n | If either the operand or the current field value uses    floating point precision, all arithmetic follows IEEE 754    semantics. If both values are integers, values outside of    JavaScript's safe number range (Number.MIN_SAFE_INTEGER to    Number.MAX_SAFE_INTEGER) are also subject to precision loss.    Furthermore, once processed by the Firestore backend, all integer    operations are capped between -2^63 and 2^63-1.     If the current field value is not of type number, or if the field     does not yet exist, the transformation sets the field to the given value. |

<a name="module_FirebaseFirestoreWrapper.decrementFieldValue"></a>

### FirebaseFirestoreWrapper.decrementFieldValue(n) ⇒
----------------------------------------------------------------------return a sentinel to decrment/decrement a fieldNOT REALLY A FIREBASE FUNCTIONFire base has only increment; we implement this for legibility

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: a sentinel value  
**Category**: FieldValue  

| Param | Description |
| --- | --- |
| n | If either the operand or the current field value uses    floating point precision, all arithmetic follows IEEE 754    semantics. If both values are integers, values outside of    JavaScript's safe number range (Number.MIN_SAFE_INTEGER to    Number.MAX_SAFE_INTEGER) are also subject to precision loss.    Furthermore, once processed by the Firestore backend, all integer    operations are capped between -2^63 and 2^63-1.     If the current field value is not of type number, or if the field     does not yet exist, the transformation sets the field to the given value. |

<a name="module_FirebaseFirestoreWrapper.arrayRemoveFieldValue"></a>

### FirebaseFirestoreWrapper.arrayRemoveFieldValue(elements) ⇒ <code>sentinelValue</code>
----------------------------------------------------------------------returns a sentinel to remove elements from array field

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>sentinelValue</code> - a sentinel value  
**Category**: FieldValue  

| Param | Description |
| --- | --- |
| elements | REST expanded list of elements to remove |

<a name="module_FirebaseFirestoreWrapper.arrayUnionFieldValue"></a>

### FirebaseFirestoreWrapper.arrayUnionFieldValue(elements) ⇒
----------------------------------------------------------------------return a sentinel to add/join elements to array field

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: a sentinel value  
**Category**: FieldValue  

| Param | Description |
| --- | --- |
| elements | REST expanded list of elements to add |

<a name="module_FirebaseFirestoreWrapper.ListenRecords"></a>

### FirebaseFirestoreWrapper.ListenRecords(tablePath, refPath, dataCallback, errCallback) ⇒ <code>unsubscribe</code>
----------------------------------------------------------------------sets up a listener for changes to a single record

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to document |
| refPath | <code>string</code> | string describing path to parent document |
| dataCallback | <code>CollectionListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper.ListenQuery"></a>

### FirebaseFirestoreWrapper.ListenQuery(tablePath, refPath, dataCallback, errCallback, [filterArray], [sortArray]) ⇒ <code>unsubscribe</code>
----------------------------------------------------------------------Sets up a listener to a query

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | Name of table to query too - may be sub-collection of optional reference |
| refPath | <code>string</code> | An optional Firestore DocumentReference. If present, the "table" parameter above is relative to this reference |
| dataCallback | <code>CollectionListener</code> | callback function with query results |
| errCallback | <code>callback</code> | callback function with error results |
| [filterArray] | <code>filterObject</code> | a 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |

<a name="module_FirebaseFirestoreWrapper.ListenCollectionGroupRecords"></a>

### FirebaseFirestoreWrapper.ListenCollectionGroupRecords(tablePath, refPath, dataCallback, errCallback) ⇒ <code>callback</code>
----------------------------------------------------------------------sets up a listener for changes to a collectionGroup

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to document |
| refPath | <code>string</code> | string describing path to parent document |
| dataCallback | <code>CollectionListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper.ListenCollectionGroupQuery"></a>

### FirebaseFirestoreWrapper.ListenCollectionGroupQuery(table, [filterArray], [sortArray], dataCallback, errCallback) ⇒ <code>unsubscribe</code>
----------------------------------------------------------------------sets up a listener for changes to a collectionGroup by query

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | string describing the name of a collectionGroup |
| [filterArray] | <code>filterObject</code> | a 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |
| dataCallback | <code>CollectionListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper.ListenRecord"></a>

### FirebaseFirestoreWrapper.ListenRecord(tablePath, Id, refPath, dataCallback, errCallback) ⇒ <code>unsubscribe</code>
Listen to changes to a single record

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to requested record |
| Id | <code>string</code> | string of Id of requested document |
| refPath | <code>string</code> | string od full path to parent document |
| dataCallback | <code>RecordListener</code> | callback to handle changes to requested document |
| errCallback | <code>callback</code> | callback to handle error reporting and operations |

<a name="module_FirebaseFirestoreWrapper.PaginateFetch"></a>

### FirebaseFirestoreWrapper.PaginateFetch
**Kind**: static class of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Paginator  

* [.PaginateFetch](#module_FirebaseFirestoreWrapper.PaginateFetch)
    * [new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)](#new_module_FirebaseFirestoreWrapper.PaginateFetch_new)
    * [.limit](#module_FirebaseFirestoreWrapper.PaginateFetch+limit) : <code>number</code>
    * [.status](#module_FirebaseFirestoreWrapper.PaginateFetch+status) : <code>PagingStatus</code>
    * [.PageForward()](#module_FirebaseFirestoreWrapper.PaginateFetch+PageForward) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
    * [.PageBack()](#module_FirebaseFirestoreWrapper.PaginateFetch+PageBack) ⇒ <code>Promise.&lt;RecordArray&gt;</code>

<a name="new_module_FirebaseFirestoreWrapper.PaginateFetch_new"></a>

#### new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)
constructs an object to paginate through large Firestore Tables


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| table | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| filterArray | <code>array</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| sortArray | <code>array</code> | <code></code> | a 2xn array of sort (i.e. "orderBy") conditions |
| refPath | <code>string</code> | <code>null</code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |
| limit | <code>number</code> |  | page size |

<a name="module_FirebaseFirestoreWrapper.PaginateFetch+limit"></a>

#### paginateFetch.limit : <code>number</code>
current limit of query results

**Kind**: instance property of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper.PaginateFetch)  
<a name="module_FirebaseFirestoreWrapper.PaginateFetch+status"></a>

#### paginateFetch.status : <code>PagingStatus</code>
current status of pagination-1 pending; 0 uninitialized; 1 updated;

**Kind**: instance property of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper.PaginateFetch)  
<a name="module_FirebaseFirestoreWrapper.PaginateFetch+PageForward"></a>

#### paginateFetch.PageForward() ⇒ <code>Promise.&lt;RecordArray&gt;</code>
executes the query again to fetch the next set of records

**Kind**: instance method of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper.PaginateFetch)  
**Returns**: <code>Promise.&lt;RecordArray&gt;</code> - returns an array of record - the next page  
<a name="module_FirebaseFirestoreWrapper.PaginateFetch+PageBack"></a>

#### paginateFetch.PageBack() ⇒ <code>Promise.&lt;RecordArray&gt;</code>
executes the query again to fetch the previous set of records

**Kind**: instance method of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper.PaginateFetch)  
**Returns**: <code>Promise.&lt;RecordArray&gt;</code> - returns an array of record - the next page  
<a name="module_FirebaseFirestoreWrapper.PaginateGroupFetch"></a>

### FirebaseFirestoreWrapper.PaginateGroupFetch
**Kind**: static class of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Paginator  

* [.PaginateGroupFetch](#module_FirebaseFirestoreWrapper.PaginateGroupFetch)
    * [new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)](#new_module_FirebaseFirestoreWrapper.PaginateGroupFetch_new)
    * [.limit](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+limit) : <code>number</code>
    * [.status](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+status) : <code>PagingStatus</code>
    * [.PageForward()](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+PageForward) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
    * [.PageBack()](#module_FirebaseFirestoreWrapper.PaginateGroupFetch+PageBack) ⇒ <code>Promise.&lt;RecordArray&gt;</code>

<a name="new_module_FirebaseFirestoreWrapper.PaginateGroupFetch_new"></a>

#### new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)
constructs an object to paginate through largeFirestore Tables


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> | <code></code> | a 2xn array of sort (i.e. "orderBy") conditions The array(s) are assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| limit | <code>number</code> |  | (optional) |

<a name="module_FirebaseFirestoreWrapper.PaginateGroupFetch+limit"></a>

#### paginateGroupFetch.limit : <code>number</code>
current limit basis for listener query

**Kind**: instance property of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper.PaginateGroupFetch)  
<a name="module_FirebaseFirestoreWrapper.PaginateGroupFetch+status"></a>

#### paginateGroupFetch.status : <code>PagingStatus</code>
current status of listener -1 pending; 0 uninitialized; 1 updated;

**Kind**: instance property of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper.PaginateGroupFetch)  
<a name="module_FirebaseFirestoreWrapper.PaginateGroupFetch+PageForward"></a>

#### paginateGroupFetch.PageForward() ⇒ <code>Promise.&lt;RecordArray&gt;</code>
executes the query again to fetch the next set of records

**Kind**: instance method of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper.PaginateGroupFetch)  
**Returns**: <code>Promise.&lt;RecordArray&gt;</code> - returns an array of record - the next page  
<a name="module_FirebaseFirestoreWrapper.PaginateGroupFetch+PageBack"></a>

#### paginateGroupFetch.PageBack() ⇒ <code>Promise.&lt;RecordArray&gt;</code>
executes the query again to fetch the previous set of records

**Kind**: instance method of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper.PaginateGroupFetch)  
**Returns**: <code>Promise.&lt;RecordArray&gt;</code> - returns an array of record - the next page  
<a name="module_FirebaseFirestoreWrapper.PaginatedListener"></a>

### FirebaseFirestoreWrapper.PaginatedListener
**Kind**: static class of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Paginator  

* [.PaginatedListener](#module_FirebaseFirestoreWrapper.PaginatedListener)
    * [new exports.PaginatedListener(tablePath, refPath, dataCallback, errCallback, limit, [filterArray], [sortArray])](#new_module_FirebaseFirestoreWrapper.PaginatedListener_new)
    * [.limit](#module_FirebaseFirestoreWrapper.PaginatedListener+limit) : <code>number</code>
    * [.status](#module_FirebaseFirestoreWrapper.PaginatedListener+status) : <code>number</code>
    * [.PageForward()](#module_FirebaseFirestoreWrapper.PaginatedListener+PageForward) ⇒ <code>unsubscribe</code>
    * [.PageBack()](#module_FirebaseFirestoreWrapper.PaginatedListener+PageBack) ⇒ <code>unsubscribe</code>
    * [.ChangeLimit(newLimit)](#module_FirebaseFirestoreWrapper.PaginatedListener+ChangeLimit) ⇒ <code>unsubscribe</code>
    * [.ChangeFilter([filterArray])](#module_FirebaseFirestoreWrapper.PaginatedListener+ChangeFilter) ⇒ <code>unsubscribe</code>
    * [.unsubscribe()](#module_FirebaseFirestoreWrapper.PaginatedListener+unsubscribe)

<a name="new_module_FirebaseFirestoreWrapper.PaginatedListener_new"></a>

#### new exports.PaginatedListener(tablePath, refPath, dataCallback, errCallback, limit, [filterArray], [sortArray])
Creates an object to allow for paginating a listener for tableread from Firestore. REQUIRES a sorting choice; masks somesubscribe/unsubscribe action for paging forward/backward


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tablePath | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| refPath | <code>refPath</code> | <code></code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |
| dataCallback | <code>callback</code> |  |  |
| errCallback | <code>callback</code> |  |  |
| limit | <code>number</code> |  | (optional) |
| [filterArray] | <code>filterObject</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions |
| [sortArray] | <code>sortObject</code> |  | a 2xn array of sort (i.e. "orderBy") conditions defaults to [{ fieldRef: "name", dirStr: "asc" }] as pagination *requires* a sort The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |

<a name="module_FirebaseFirestoreWrapper.PaginatedListener+limit"></a>

#### paginatedListener.limit : <code>number</code>
current limit basis for listener query

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper.PaginatedListener+status"></a>

#### paginatedListener.status : <code>number</code>
current status of listener

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper.PaginatedListener+PageForward"></a>

#### paginatedListener.PageForward() ⇒ <code>unsubscribe</code>
resets the listener query to the next page of results.Unsubscribes from the current listener, constructs a new query, and sets itas the new listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper.PaginatedListener)  
**Returns**: <code>unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  
<a name="module_FirebaseFirestoreWrapper.PaginatedListener+PageBack"></a>

#### paginatedListener.PageBack() ⇒ <code>unsubscribe</code>
resets the listener query to the next page of results.Unsubscribes from the current listener, constructs a new query, and sets it\as the new listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper.PaginatedListener)  
**Returns**: <code>unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  
<a name="module_FirebaseFirestoreWrapper.PaginatedListener+ChangeLimit"></a>

#### paginatedListener.ChangeLimit(newLimit) ⇒ <code>unsubscribe</code>
sets page size limit to new value, and restarts the paged listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper.PaginatedListener)  
**Returns**: <code>unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  

| Param | Type |
| --- | --- |
| newLimit | <code>number</code> | 

<a name="module_FirebaseFirestoreWrapper.PaginatedListener+ChangeFilter"></a>

#### paginatedListener.ChangeFilter([filterArray]) ⇒ <code>unsubscribe</code>
changes the filter on the subscriptionThis has to unsubscribe the current listener,create a new query, then apply it as the listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper.PaginatedListener)  
**Returns**: <code>unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  

| Param | Type | Description |
| --- | --- | --- |
| [filterArray] | <code>filterObject</code> | an array of filter descriptors |

<a name="module_FirebaseFirestoreWrapper.PaginatedListener+unsubscribe"></a>

#### paginatedListener.unsubscribe()
IF unsubscribe function is set, run it.

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper.ownerFilter"></a>

### FirebaseFirestoreWrapper.ownerFilter(owner, queryFilter) ⇒ <code>filterObject</code>
Contructs a filter that selects only the "owner" section of acollectionGroup query - in other words, descendents of a particulartop=level document.  This takes advantage of Firestore's indexing,which "names"/indexes all documents using the FULL PATH to thedocument, starting from the top-most, i.e.:TOP_COLLECTION/{dociId}/NEXT_COLLECTION/{docId}/NEXT_NEXT_COLLECTION/{etc}This functions knowns NOTHING about the actual schema; it simply usesthe path of the indicated "owner" as starting portion of ALL the"child" documents of the owner. It also takes advantage of thestrictly alpha-numeric nature of the path string.As such, ALL children paths strings MUST be "greater than" the ownerbare path, and MUST be LESS THAN the alpha-numerically "next" value:e.g. if the "owner" path is TOP_COLLECTION/abcdefg, then/TOP_COLLECTION/abcdefh > __name__ > //TOP_COLLECTION/abcdefg(assuming LEXICAL SORT)IMPORTANT NOTE:Because this filter uses an INEQUALITY, .sortBy() conditionsare not supported

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| queryFilter | <code>filterObject</code> | additional filter parameters |

<a name="module_FirebaseFirestoreWrapper.listenSlice"></a>

### FirebaseFirestoreWrapper.listenSlice(owner, collectionName, dataCallback, response, errCallback, response) ⇒ <code>callback</code>
Uses the ownerFilter (above) to establish a listener to "just" theparts of a collectionGroup that are descendants of the passed "owner"record.

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| dataCallback | <code>callback</code> | function to be called with changes to record |
| response | <code>QuerySnapshot</code> |  |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |
| response | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.fetchSlice"></a>

### FirebaseFirestoreWrapper.fetchSlice(owner, collectionName) ⇒ <code>QuerySnapshot</code>
Wrapper around database fetch, using ownerFilter above toselect/fetch just an "owner" parent document's descendants from acollectionGroup

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>QuerySnapshot</code> - response  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |

<a name="module_FirebaseFirestoreWrapper.querySlice"></a>

### FirebaseFirestoreWrapper.querySlice(owner, collectionName, queryFilter) ⇒ <code>QuerySnapshot</code>
Wrapper around database fetch, using ownerFilter above toselect/fetch just an "owner" parent document's descendants from acollectionGroup

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>QuerySnapshot</code> - response  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| queryFilter | <code>filterObject</code> | filter parameters |

<a name="module_FirebaseFirestoreWrapper.listenQuerySlice"></a>

### FirebaseFirestoreWrapper.listenQuerySlice(owner, collectionName, filterArray, dataCallback, response, errCallback, response) ⇒ <code>callback</code>
Uses the ownerFilter (above) to establish a listener to "just" theparts of a collectionGroup that are descendants of the passed "owner"record.

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| filterArray | <code>filterObject</code> | filter parameters |
| dataCallback | <code>callback</code> | function to be called with changes to record |
| response | <code>QuerySnapshot</code> |  |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |
| response | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.ownerType"></a>

### FirebaseFirestoreWrapper.ownerType(record) ⇒ <code>string</code>
Returns the "type" (collection name) of the top-most parent of arecord, derived from the refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - the collection name  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper.ownerId"></a>

### FirebaseFirestoreWrapper.ownerId(record) ⇒ <code>string</code>
Returns the Id (documentId) of the top-most parent of arecord, derived from the refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - the Id  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper.ownerRefPath"></a>

### FirebaseFirestoreWrapper.ownerRefPath(record) ⇒ <code>string</code>
Returns the Id (documentId) of the top-most parent of arecord, derived from the refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - the Id  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper.ownerByChild"></a>

### FirebaseFirestoreWrapper.ownerByChild(record) ⇒ <code>Record</code>
Returns the bare owner record reference to the parent (root) of aprovided child

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Record</code> - reference to the parent (root) record  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>Record</code> | child record |

<a name="module_FirebaseFirestoreWrapper.ownerByOwnerType"></a>

### FirebaseFirestoreWrapper.ownerByOwnerType(ownerId, ownerType) ⇒ <code>Record</code>
**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Record</code> - reference to the parent (root) record  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| ownerId | <code>string</code> | Document ID of owner account |
| ownerType | <code>string</code> | "type" (top-level collection) of owner account |

<a name="module_FirebaseFirestoreWrapper.fetchOwner"></a>

### FirebaseFirestoreWrapper.fetchOwner(record) ⇒ <code>Document</code>
returns the record for the top-most parent of a record,derived from the refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper.recordType"></a>

### FirebaseFirestoreWrapper.recordType(record) ⇒ <code>string</code>
Returns the "type" (collection name) the passed record isstored in, derived from the refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - the collection name  
**Category**: Typed  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper.recordId"></a>

### FirebaseFirestoreWrapper.recordId() ⇒ <code>string</code>
Returns the Id (documentId) of the passed record derived from the refPath

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - the Id  
**Category**: Typed  
<a name="module_FirebaseFirestoreWrapper.typedWrite"></a>

### FirebaseFirestoreWrapper.typedWrite(data, parent, type, batch) ⇒ <code>Promise.&lt;Record&gt;</code>
optionally batched record update - abstracts batch process from specific types

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise.&lt;Record&gt;</code> - record, with Id & refpath  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| data.refPath | <code>string</code> | only part used |
| parent | <code>Record</code> | parent object (if any) this belongs to |
| parent.refPath | <code>string</code> | full path to parent document |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper.typedWriteByTree"></a>

### FirebaseFirestoreWrapper.typedWriteByTree(data, tree, type, batch) ⇒ <code>Promise</code>
optionally batched record update - abstracts batch process from specific types

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise</code> - record, with Id & refpath  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| tree | <code>ArtistTree</code> | Object with properties of refPath segments |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper.typedWriteByChild"></a>

### FirebaseFirestoreWrapper.typedWriteByChild(data, tree, type, batch) ⇒ <code>Promise</code>
optionally batched record update - abstracts batch process from specific types

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise</code> - WriteBatch, Transaction or Void  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| tree | <code>ArtistTree</code> | Object with properties of refPath segments |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper.typedCreate"></a>

### FirebaseFirestoreWrapper.typedCreate(data, parent, type, batch) ⇒ <code>Promise</code>
Creates a new document reference of the indicated type, and writesit to the backend. Specific intent is when the Id needs to bepre-specified, or shared outside this function. Normal writingaction will silently create a new document, which has to then befound by query

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>Promise</code> - WriteBatch, Transaction or Void  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to create.  This will create a new one if it doesn't exist |
| parent | <code>Record</code> | parent object (if any) this belongs to |
| parent.refPath | <code>string</code> | full path to parent document |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object. Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper.treeFromChild"></a>

### FirebaseFirestoreWrapper.treeFromChild(child) ⇒ <code>RecordTree</code>
Extracts a tree of document ID's from a child document (assumes is a child)

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.typedTablePathFromTree"></a>

### FirebaseFirestoreWrapper.typedTablePathFromTree(tree, type, branchType) ⇒ <code>string</code>
Builds a refPath *down* to a desired collection/type from an existingRecordTree Map.

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - constructed TablePath (collection)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> |  |
| type | <code>string</code> |  |
| branchType | <code>string</code> | a collection name to start branching from. This is in case tree was built from a sister collection/document |

<a name="module_FirebaseFirestoreWrapper.typedRefPathFromTree"></a>

### FirebaseFirestoreWrapper.typedRefPathFromTree(tree, type) ⇒ <code>string</code>
Builds a refPath *down* to a desired collection/type from an existingRecordTree Map.

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - constructed refPath (document)  
**Category**: Typed  

| Param | Type |
| --- | --- |
| tree | <code>RecordTree</code> | 
| type | <code>string</code> | 

<a name="module_FirebaseFirestoreWrapper.typedIdFromChild"></a>

### FirebaseFirestoreWrapper.typedIdFromChild(child, type)
Looks up a "tree" to find the Id of the document at the requestedcollection level ("type")

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> | name of desired type/collection level in tree |

<a name="module_FirebaseFirestoreWrapper.typedTablePathFromChild"></a>

### FirebaseFirestoreWrapper.typedTablePathFromChild(child, type) ⇒ <code>string</code>
Builds a refPath *up* to a desired collection/type from an existingchild in a tree

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - constructed refPath (collection)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.typedRefPathFromChild"></a>

### FirebaseFirestoreWrapper.typedRefPathFromChild(child, type) ⇒ <code>string</code>
Builds a refPath *up* to a desired collection/type from an existingchild in a tree

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Returns**: <code>string</code> - constructed refPath (document)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper.typedFetchFromChild"></a>

### FirebaseFirestoreWrapper.typedFetchFromChild(child, refPath, type, batch) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
function to fetch a document from "up" the collection/document tree of a child document

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | assumed to be an object in a collection/document Tree |
| refPath | <code>string</code> |  |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper.typedFetchFromTree"></a>

### FirebaseFirestoreWrapper.typedFetchFromTree(tree, refPath, type, batch) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
function to fetch a document from "up" the collection/document tree of a child document

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> | assumed to be an object in a collection/document Tree |
| refPath | <code>string</code> |  |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper.typedCollectFromTree"></a>

### FirebaseFirestoreWrapper.typedCollectFromTree(tree, type, batch) ⇒ <code>Promise.&lt;RecordArray&gt;</code>
function to collect documents from "up" the collection/document tree of a child document

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> | assumed to be an object in a collection/document Tree |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper.typedCollectFromChild"></a>

### FirebaseFirestoreWrapper.typedCollectFromChild(child, type, batch)
function to collect documents from "up" the collection/document tree of a child document

**Kind**: static method of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | assumed to be an object in a collection/document Tree |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper..timestamp"></a>

### FirebaseFirestoreWrapper~timestamp
**Kind**: inner class of [<code>FirebaseFirestoreWrapper</code>](#module_FirebaseFirestoreWrapper)  
<a name="new_module_FirebaseFirestoreWrapper..timestamp_new"></a>

#### new timestamp()
class for a Firestore timestamp processor


* * *

&copy; 2020-2021 Tracy Hall
