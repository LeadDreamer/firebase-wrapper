[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseWrapper"></a>

## FirebaseWrapper
A set of helper-wrapper functions around firebase firestore, storage


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
```
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