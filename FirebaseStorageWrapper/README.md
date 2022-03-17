[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

## Modules

<dl>
<dt><a href="#module_FirebaseStorageWrapper">FirebaseStorageWrapper</a></dt>
<dd><p>A set of helper-wrapper functions around firebase firestore, storage
and auth. Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.</p>
</dd>
<dt><a href="#module_FirebaseStorageAdminEmulator">FirebaseStorageAdminEmulator</a></dt>
<dd><p>A set of helper-wrapper functions around firebase storage
Intent is to treat Firestore as a hierarchical
record-oriented database and Storage as a parallel structure
originally conceived to port from one database to another.</p>
</dd>
</dl>

<a name="module_FirebaseStorageWrapper"></a>

## FirebaseStorageWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseStorageWrapper](#module_FirebaseStorageWrapper)
    * _static_
        * [.FirebaseStorageWrapper(firebase)](#module_FirebaseStorageWrapper.FirebaseStorageWrapper)
        * [.makeStorageRefFromRecord(record, key, filename)](#module_FirebaseStorageWrapper.makeStorageRefFromRecord) ⇒ <code>StorageReference</code>
        * [.listReference(storageReference, optionsObject)](#module_FirebaseStorageWrapper.listReference) ⇒ <code>ListResult</code>
        * [.makeFileURLFromRecord(record, key, filename)](#module_FirebaseStorageWrapper.makeFileURLFromRecord) ⇒ <code>external:promise</code>
        * [.makePrivateURLFromRecord(record, key)](#module_FirebaseStorageWrapper.makePrivateURLFromRecord) ⇒ <code>string</code>
        * [.makePrivateURLFromReference(reference, key)](#module_FirebaseStorageWrapper.makePrivateURLFromReference) ⇒ <code>string</code>
        * [.makePrivateURLFromPath(fullPath)](#module_FirebaseStorageWrapper.makePrivateURLFromPath) ⇒ <code>string</code>
        * [.storeBlobByRecord(blob, record, key, filename)](#module_FirebaseStorageWrapper.storeBlobByRecord) ⇒ <code>UploadTask</code>
        * [.storeDataURLByRecord(dataURL, record, key, filename)](#module_FirebaseStorageWrapper.storeDataURLByRecord) ⇒
        * [.getDefaultImageURL(key)](#module_FirebaseStorageWrapper.getDefaultImageURL) ⇒ <code>string</code>
        * [.getURLFromFilePath(filePath)](#module_FirebaseStorageWrapper.getURLFromFilePath) ⇒ <code>string</code>
        * [.dataURLToBlob(dataURL)](#module_FirebaseStorageWrapper.dataURLToBlob) ⇒ <code>Object</code>
    * _inner_
        * [~File](#module_FirebaseStorageWrapper..File) : <code>object</code>
        * [~FileMetadata](#module_FirebaseStorageWrapper..FileMetadata) : <code>object</code>

<a name="module_FirebaseStorageWrapper.FirebaseStorageWrapper"></a>

### FirebaseStorageWrapper.FirebaseStorageWrapper(firebase)
Initializes the Auth service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

**Example**  
```import * as firebase from "firebase/app";import "firebase/storage";import FirebaseStorage from "@leaddreamer/firebase-wrapper/FirebaseStorageWrapper";import {config} from "whereever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseStorage(firebase);})(config);```
<a name="module_FirebaseStorageWrapper.makeStorageRefFromRecord"></a>

### FirebaseStorageWrapper.makeStorageRefFromRecord(record, key, filename) ⇒ <code>StorageReference</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>StorageReference</code> - a Firestore Storage Reference  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>string</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |
| filename | <code>string</code> | an optional name to be associated with the stored item. |

<a name="module_FirebaseStorageWrapper.listReference"></a>

### FirebaseStorageWrapper.listReference(storageReference, optionsObject) ⇒ <code>ListResult</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| storageReference | <code>StorageReference</code> | a storage reference to a "directory", not a file. More accurate to state that it is *treated* as a directory, since such niceties are a Firestore convention, not a physical reality |
| optionsObject | <code>ListOptions</code> |  |

<a name="module_FirebaseStorageWrapper.makeFileURLFromRecord"></a>

### FirebaseStorageWrapper.makeFileURLFromRecord(record, key, filename) ⇒ <code>external:promise</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Fulfil**: <code>string</code>  a "long-lived" URL to access the file.  
**Reject**: <code>string</code>  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>RecordObject</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |
| filename | <code>string</code> | an optional name to be associated with the stored item. |

<a name="module_FirebaseStorageWrapper.makePrivateURLFromRecord"></a>

### FirebaseStorageWrapper.makePrivateURLFromRecord(record, key) ⇒ <code>string</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>string</code> - The resulting Security-Rule-compliant URL  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>RecordObject</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |

<a name="module_FirebaseStorageWrapper.makePrivateURLFromReference"></a>

### FirebaseStorageWrapper.makePrivateURLFromReference(reference, key) ⇒ <code>string</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>string</code> - The resulting Security-Rule-compliant URL  

| Param | Type | Description |
| --- | --- | --- |
| reference | <code>StorageReference</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |

<a name="module_FirebaseStorageWrapper.makePrivateURLFromPath"></a>

### FirebaseStorageWrapper.makePrivateURLFromPath(fullPath) ⇒ <code>string</code>
This function is part of a storage scheme that uses parallel structuresbetween Firestore collection/documents and Storage paths.  The concepthere is all Storage items are part of/belong to Firestore documents.This function takes a full path to a Storage object and turns it intoURL.  If "type"is not included, the URL will return the metadata, notthe contents.Note this simply makes the URL - it does not carry out *any* operations

**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>string</code> - constructed Security-Rule-compliant URL  

| Param | Type | Description |
| --- | --- | --- |
| fullPath | <code>string</code> | required path to the stored item. |

<a name="module_FirebaseStorageWrapper.storeBlobByRecord"></a>

### FirebaseStorageWrapper.storeBlobByRecord(blob, record, key, filename) ⇒ <code>UploadTask</code>
Firestore's document sizes can be limited - 1MB - so our system storeslarger digital "blobs" in a parallel Firestore Storage.

**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>UploadTask</code> - Firestore Storage UploadTask Object  

| Param | Type | Description |
| --- | --- | --- |
| blob | <code>blob</code> | A data blob in DataURI format to store in Storage |
| record | <code>RecordObject</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |
| filename | <code>string</code> | an optional name to be associated with the stored item. |

<a name="module_FirebaseStorageWrapper.storeDataURLByRecord"></a>

### FirebaseStorageWrapper.storeDataURLByRecord(dataURL, record, key, filename) ⇒
Firestore's document sizes can be limited - 1MB - so our system storeslarger digital "blobs" in a parallel Firestore Storage.

**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: Firestore Storage UploadTask Object  

| Param | Type | Description |
| --- | --- | --- |
| dataURL | <code>dataURL</code> | A data blob in DataURI format to store in Storage |
| record | <code>RecordObject</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |
| filename | <code>string</code> | an optional name to be associated with the stored item. |

<a name="module_FirebaseStorageWrapper.getDefaultImageURL"></a>

### FirebaseStorageWrapper.getDefaultImageURL(key) ⇒ <code>string</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | name/key of default image file |

<a name="module_FirebaseStorageWrapper.getURLFromFilePath"></a>

### FirebaseStorageWrapper.getURLFromFilePath(filePath) ⇒ <code>string</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  

| Param | Type |
| --- | --- |
| filePath | <code>string</code> | 

<a name="module_FirebaseStorageWrapper.dataURLToBlob"></a>

### FirebaseStorageWrapper.dataURLToBlob(dataURL) ⇒ <code>Object</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>Object</code> - {ext: extension, base64: data}  

| Param | Type |
| --- | --- |
| dataURL | <code>object</code> | 

<a name="module_FirebaseStorageWrapper..File"></a>

### FirebaseStorageWrapper~File : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| metadata | <code>FileMetadata</code> |  |
| acl | <code>object</code> |  |
| name | <code>string</code> | //various methods |

<a name="module_FirebaseStorageWrapper..FileMetadata"></a>

### FirebaseStorageWrapper~FileMetadata : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| kind | <code>string:&quot;storage#object&quot;</code> |  |
| id | <code>string</code> |  |
| selfLink | <code>string</code> |  |
| name | <code>string</code> |  |
| bucket | <code>string</code> |  |
| generation | <code>long</code> |  |
| metageneration | <code>long</code> |  |
| contentType | <code>string</code> |  |
| timeCreated | <code>datetime</code> |  |
| updated | <code>datetime</code> |  |
| customTime | <code>datetime</code> |  |
| timeDeleted | <code>datetime</code> |  |
| temporaryHold | <code>boolean</code> |  |
| eventBasedHold | <code>boolean</code> |  |
| retentionExpirationTime | <code>datetime</code> |  |
| storageClass | <code>string</code> |  |
| timeStorageClassUpdated | <code>datetime</code> |  |
| size | <code>ulong</code> |  |
| md5Hash | <code>string</code> |  |
| mediaLink | <code>string</code> |  |
| contentEncoding | <code>string</code> |  |
| contentDisposition | <code>string</code> |  |
| contentLanguage | <code>string</code> |  |
| cacheControl | <code>string</code> |  |
| metadata | <code>object</code> | Custom metadata key:value pairs |
| metadata.firebaseStorageDownloadTokens | <code>string</code> |  |
| metadata.key | <code>string</code> |  |
| [acl] | <code>objectAccessControls</code> |  |
| owner | <code>object</code> |  |
| owner.entity | <code>string</code> |  |
| owner.entityId | <code>string</code> |  |
| crc32c | <code>string</code> |  |
| componentCount | <code>integer</code> |  |
| etag | <code>string</code> |  |
| customerEncryption | <code>object</code> |  |
| customerEncryption.encryptionAlgorithm | <code>string</code> |  |
| customerEncryption.keySha256 | <code>string</code> |  |
| kmsKeyName | <code>string</code> |  |

<a name="module_FirebaseStorageAdminEmulator"></a>

## FirebaseStorageAdminEmulator
A set of helper-wrapper functions around firebase storageIntent is to treat Firestore as a hierarchicalrecord-oriented database and Storage as a parallel structureoriginally conceived to port from one database to another.


* [FirebaseStorageAdminEmulator](#module_FirebaseStorageAdminEmulator)
    * _static_
        * [.FirebaseStorageAdminEmulator(firebase)](#module_FirebaseStorageAdminEmulator.FirebaseStorageAdminEmulator)
    * _inner_
        * [~adminRef](#module_FirebaseStorageAdminEmulator..adminRef)
            * [new adminRef(bucket, path)](#new_module_FirebaseStorageAdminEmulator..adminRef_new)
            * [.fileRef](#module_FirebaseStorageAdminEmulator..adminRef+fileRef) : <code>storageRef</code>
            * [.fullPath](#module_FirebaseStorageAdminEmulator..adminRef+fullPath) : <code>string</code>
            * [.name](#module_FirebaseStorageAdminEmulator..adminRef+name) : <code>string</code>
            * [.bucket](#module_FirebaseStorageAdminEmulator..adminRef+bucket) : <code>string</code>
            * [.parent](#module_FirebaseStorageAdminEmulator..adminRef+parent) : <code>storageRef</code>
            * [.storage](#module_FirebaseStorageAdminEmulator..adminRef+storage) : <code>storageApp</code>
            * [.metadata](#module_FirebaseStorageAdminEmulator..adminRef+metadata) : <code>string</code>
        * [~childcreates and returns a new adminRef object from existin path(path)](#module_FirebaseStorageAdminEmulator..childcreates and returns a new adminRef object from existin path) ⇒ <code>StorageRefEmulation</code>
        * [~deleteDeletes the referenced storage item()](#module_FirebaseStorageAdminEmulator..deleteDeletes the referenced storage item) ⇒ <code>Promise</code>
        * [~getDownloadURLGenerates a long-lived (essentially permanent until revoked)Public-Access URL for a storage item in FIREBASE (not Cloud Storage)format()](#module_FirebaseStorageAdminEmulator..getDownloadURLGenerates a long-lived (essentially permanent until revoked)Public-Access URL for a storage item in FIREBASE (not Cloud Storage)format) ⇒ <code>string</code>
        * [~getTokenFetches (or creates as needed) a unique token for a storage object()](#module_FirebaseStorageAdminEmulator..getTokenFetches (or creates as needed) a unique token for a storage object) ⇒ <code>Promise.&lt;string&gt;</code>
        * [~getMetadataFetches the FileMetadata for the storage object. Custom/Client metadatais located in FileMetadata.metadata()](#module_FirebaseStorageAdminEmulator..getMetadataFetches the FileMetadata for the storage object. Custom/Client metadatais located in FileMetadata.metadata) ⇒ <code>FileMetadata</code>
        * [~put(data, metadata)](#module_FirebaseStorageAdminEmulator..put) ⇒ <code>Promise.&lt;object&gt;</code>
        * [~putString(dataString, stringFormat, metadata)](#module_FirebaseStorageAdminEmulator..putString) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="module_FirebaseStorageAdminEmulator.FirebaseStorageAdminEmulator"></a>

### FirebaseStorageAdminEmulator.FirebaseStorageAdminEmulator(firebase)
Initializes the Storage service of the provided firebase app.  Alsoinstantiates various constants and helper functions.This is a WRAPPER around CLOUD STORAGE (admin) functionsto emulate FIREBASE functionality, keeping a similar APIbetween client & cloud code.NOTE: admin "references" ARE NOT the same as client references, and are NOTinterchangeable.  Do not mix client & admin code (not actually possiblein this wrapper)

**Kind**: static method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

<a name="module_FirebaseStorageAdminEmulator..adminRef"></a>

### FirebaseStorageAdminEmulator~adminRef
**Kind**: inner class of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

* [~adminRef](#module_FirebaseStorageAdminEmulator..adminRef)
    * [new adminRef(bucket, path)](#new_module_FirebaseStorageAdminEmulator..adminRef_new)
    * [.fileRef](#module_FirebaseStorageAdminEmulator..adminRef+fileRef) : <code>storageRef</code>
    * [.fullPath](#module_FirebaseStorageAdminEmulator..adminRef+fullPath) : <code>string</code>
    * [.name](#module_FirebaseStorageAdminEmulator..adminRef+name) : <code>string</code>
    * [.bucket](#module_FirebaseStorageAdminEmulator..adminRef+bucket) : <code>string</code>
    * [.parent](#module_FirebaseStorageAdminEmulator..adminRef+parent) : <code>storageRef</code>
    * [.storage](#module_FirebaseStorageAdminEmulator..adminRef+storage) : <code>storageApp</code>
    * [.metadata](#module_FirebaseStorageAdminEmulator..adminRef+metadata) : <code>string</code>

<a name="new_module_FirebaseStorageAdminEmulator..adminRef_new"></a>

#### new adminRef(bucket, path)
Create a class that emulates a Firebase Storage storageRefusing Firebase Admin Cloud Storage Functions.  This is notan exact replica, but one with similar static members andmethods.  Intended for use with a higher-level Wrapper libraryThis returns an object that has many of the same members andmethods as a Firebase storageRef, but only in conjunction withthe methods here, and likely only with the "wrapper" it is definedfor.


| Param | Type | Description |
| --- | --- | --- |
| bucket | <code>StorageBucket</code> | A bucket instance |
| path | <code>string</code> | a string representing the "path" to the intended target document |

<a name="module_FirebaseStorageAdminEmulator..adminRef+fileRef"></a>

#### adminRef.fileRef : <code>storageRef</code>
used to affect file operations to emulate Firebase Storage functions

**Kind**: instance property of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+fullPath"></a>

#### adminRef.fullPath : <code>string</code>
Full path, including file name

**Kind**: instance property of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+name"></a>

#### adminRef.name : <code>string</code>
filename portion only

**Kind**: instance property of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+bucket"></a>

#### adminRef.bucket : <code>string</code>
name of containing bucket

**Kind**: instance property of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+parent"></a>

#### adminRef.parent : <code>storageRef</code>
Cloud Storage object don't really have a parent or root

**Kind**: instance property of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+storage"></a>

#### adminRef.storage : <code>storageApp</code>
app instance

**Kind**: instance property of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+metadata"></a>

#### adminRef.metadata : <code>string</code>
access token

**Kind**: instance property of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..childcreates and returns a new adminRef object from existin path"></a>

### FirebaseStorageAdminEmulator~childcreates and returns a new adminRef object from existin path(path) ⇒ <code>StorageRefEmulation</code>
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | a relative path *from* the existing storageRef to create child |

<a name="module_FirebaseStorageAdminEmulator..deleteDeletes the referenced storage item"></a>

### FirebaseStorageAdminEmulator~deleteDeletes the referenced storage item() ⇒ <code>Promise</code>
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..getDownloadURLGenerates a long-lived (essentially permanent until revoked)Public-Access URL for a storage item in FIREBASE (not Cloud Storage)format"></a>

### FirebaseStorageAdminEmulator~getDownloadURLGenerates a long-lived (essentially permanent until revoked)Public-Access URL for a storage item in FIREBASE (not Cloud Storage)format() ⇒ <code>string</code>
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..getTokenFetches (or creates as needed) a unique token for a storage object"></a>

### FirebaseStorageAdminEmulator~getTokenFetches (or creates as needed) a unique token for a storage object() ⇒ <code>Promise.&lt;string&gt;</code>
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..getMetadataFetches the FileMetadata for the storage object. Custom/Client metadatais located in FileMetadata.metadata"></a>

### FirebaseStorageAdminEmulator~getMetadataFetches the FileMetadata for the storage object. Custom/Client metadatais located in FileMetadata.metadata() ⇒ <code>FileMetadata</code>
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..put"></a>

### FirebaseStorageAdminEmulator~put(data, metadata) ⇒ <code>Promise.&lt;object&gt;</code>
puts a block of data (and optional metadata) into storage atlocation specified by adminRef

**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type |
| --- | --- |
| data | <code>blob</code> | 
| metadata | <code>object</code> | 

<a name="module_FirebaseStorageAdminEmulator..putString"></a>

### FirebaseStorageAdminEmulator~putString(dataString, stringFormat, metadata) ⇒ <code>Promise.&lt;object&gt;</code>
puts a string (possibly encoded data) into a storage filedescribed by the provided reference.

**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type |
| --- | --- |
| dataString | <code>string</code> | 
| stringFormat | <code>string</code> | 
| metadata | <code>FileMetadata</code> | 


* * *

&copy; 2020-2021 Tracy Hall
