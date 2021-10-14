[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

## Modules

<dl>
<dt><a href="#module_FirebaseStorageAdminEmulator">FirebaseStorageAdminEmulator</a></dt>
<dd><p>A set of helper-wrapper functions around firebase storage
Intent is to treat Firestore as a hierarchical
record-oriented database and Storage as a parallel structure
originally conceived to port from one database to another.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#File">File</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#FileMetadata">FileMetadata</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_FirebaseStorageAdminEmulator"></a>

## FirebaseStorageAdminEmulator
A set of helper-wrapper functions around firebase storage


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
        * [~child
        * [~delete
        * [~getDownloadURL
        * [~getToken
        * [~getMetadata
        * [~put(data, metadata)](#module_FirebaseStorageAdminEmulator..put) ⇒ <code>Promise.&lt;object&gt;</code>
        * [~putString(dataString, stringFormat, metadata)](#module_FirebaseStorageAdminEmulator..putString) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="module_FirebaseStorageAdminEmulator.FirebaseStorageAdminEmulator"></a>

### FirebaseStorageAdminEmulator.FirebaseStorageAdminEmulator(firebase)
Initializes the Storage service of the provided firebase app.  Also

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
Create a class that emulates a Firebase Storage storageRef


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
<a name="module_FirebaseStorageAdminEmulator..child

### FirebaseStorageAdminEmulator~child
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | a relative path *from* the existing storageRef to create child |

<a name="module_FirebaseStorageAdminEmulator..delete

### FirebaseStorageAdminEmulator~delete
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..getDownloadURL

### FirebaseStorageAdminEmulator~getDownloadURL
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..getToken

### FirebaseStorageAdminEmulator~getToken
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..getMetadata

### FirebaseStorageAdminEmulator~getMetadata
**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  
<a name="module_FirebaseStorageAdminEmulator..put"></a>

### FirebaseStorageAdminEmulator~put(data, metadata) ⇒ <code>Promise.&lt;object&gt;</code>
puts a block of data (and optional metadata) into storage at

**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type |
| --- | --- |
| data | <code>blob</code> | 
| metadata | <code>object</code> | 

<a name="module_FirebaseStorageAdminEmulator..putString"></a>

### FirebaseStorageAdminEmulator~putString(dataString, stringFormat, metadata) ⇒ <code>Promise.&lt;object&gt;</code>
puts a string (possibly encoded data) into a storage file

**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type |
| --- | --- |
| dataString | <code>string</code> | 
| stringFormat | <code>string</code> | 
| metadata | [<code>FileMetadata</code>](#FileMetadata) | 

<a name="File"></a>

## File : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| metadata | [<code>FileMetadata</code>](#FileMetadata) |  |
| acl | <code>object</code> |  |
| name | <code>string</code> | //various methods |

<a name="FileMetadata"></a>

## FileMetadata : <code>object</code>
**Kind**: global typedef  
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


* * *

&copy; 2020-2021 Tracy Hall