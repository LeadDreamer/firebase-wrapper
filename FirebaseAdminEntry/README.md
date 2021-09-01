[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseWrapper"></a>

## FirebaseWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth.all-in-one wrapper for a solid subset of CLIENT-SIDE Firebasefunctions, with a consistent interface.  There is a parallel set forADMIN-SIDE functions as well.Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.NOTE:Most helpers return PROMISE.REJECT if no documents are returned.it is assumed projects using this library *might* want to have anexplicitly error trap for such events.


* [FirebaseWrapper](#module_FirebaseWrapper)
    * _static_
        * [.FirebaseWrapper()](#module_FirebaseWrapper.FirebaseWrapper) ⇒
    * _inner_
        * [~FirebaseConfigObject](#module_FirebaseWrapper..FirebaseConfigObject) : <code>Object</code>

<a name="module_FirebaseWrapper.FirebaseWrapper"></a>

### FirebaseWrapper.FirebaseWrapper() ⇒
**Kind**: static method of [<code>FirebaseWrapper</code>](#module_FirebaseWrapper)  
**Returns**: none  
**Example**  
```//this specifically loads ALL the subsections, specifically for//the Browser.  See later (tbd) notes for NodeJSimport FirebaseWrapper from "@leaddreamer/firebase-wrapper";FirebaseWrapper(config); //see belowexport * from "@leaddreamer/firebase-wrapper";```
<a name="module_FirebaseWrapper..FirebaseConfigObject"></a>

### FirebaseWrapper~FirebaseConfigObject : <code>Object</code>
**Kind**: inner typedef of [<code>FirebaseWrapper</code>](#module_FirebaseWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| projectId | <code>string</code> | required Firebase projectID from Firebase console |
| authDomain | <code>string</code> | (optional) auth domain from Firebase Console |
| databaseURL | <code>string</code> | (optional) Firestore database URL from Firebase console |
| storageBucket: | <code>string</code> | (optional) URL of Firestore Storage Bucket |
| messagingSenderId: | <code>string</code> | (optional) ID for Messaging service from Firebase Console |
| measurementId: | <code>string</code> | (optional) Analytics/Measurement ID from Firebase Console |


* * *

&copy; 2020-2021 Tracy Hall
