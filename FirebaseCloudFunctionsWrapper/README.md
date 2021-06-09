[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseCloudFunctionsWrapper"></a>

## FirebaseCloudFunctionsWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseCloudFunctionsWrapper](#module_FirebaseCloudFunctionsWrapper)
    * [.FirebaseCloudFunctions(firebase)](#module_FirebaseCloudFunctionsWrapper.FirebaseCloudFunctions)
    * [.CloudFunctions()](#module_FirebaseCloudFunctionsWrapper.CloudFunctions) ⇒ <code>external:promise</code>
    * [.treeFromParams(Params)](#module_FirebaseCloudFunctionsWrapper.treeFromParams) ⇒ <code>RecordTree</code>

<a name="module_FirebaseCloudFunctionsWrapper.FirebaseCloudFunctions"></a>

### FirebaseCloudFunctionsWrapper.FirebaseCloudFunctions(firebase)
**Kind**: static method of [<code>FirebaseCloudFunctionsWrapper</code>](#module_FirebaseCloudFunctionsWrapper)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

**Example**  
```import * as firebase from "firebase/app";import "firebase/functions";import FirebaseFunctions from "@leaddreamer/firebase-wrapper/FirebaseCloudFunctionsWrapper";import {config} from "whereever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseFunctions(firebase);})(config)```
<a name="module_FirebaseCloudFunctionsWrapper.CloudFunctions"></a>

### FirebaseCloudFunctionsWrapper.CloudFunctions() ⇒ <code>external:promise</code>
**Kind**: static method of [<code>FirebaseCloudFunctionsWrapper</code>](#module_FirebaseCloudFunctionsWrapper)  
**Fulfil**: result as returns from call  
**Reject**: err as returned from call  
**Example**  
```result = await CloudFunctions("MyGloriousFunction")(argumentToFunction);```
<a name="module_FirebaseCloudFunctionsWrapper.treeFromParams"></a>

### FirebaseCloudFunctionsWrapper.treeFromParams(Params) ⇒ <code>RecordTree</code>
**Kind**: static method of [<code>FirebaseCloudFunctionsWrapper</code>](#module_FirebaseCloudFunctionsWrapper)  
**Sync**:   

| Param | Type |
| --- | --- |
| Params | <code>object</code> | 


* * *

&copy; 2020-2021 Tracy Hall
