[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseStorageWrapper"></a>

## FirebaseStorageWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseStorageWrapper](#module_FirebaseStorageWrapper)
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


* * *

&copy; 2020-2021 Tracy Hall
