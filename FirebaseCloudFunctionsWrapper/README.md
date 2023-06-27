[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseCloudFunctionsWrapper"></a>

## FirebaseCloudFunctionsWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseCloudFunctionsWrapper](#module_FirebaseCloudFunctionsWrapper)
    * [module.exports(firebase, config, thisLogger)](#exp_module_FirebaseCloudFunctionsWrapper--module.exports) ⇒ <code>Promise.&lt;(object\|void)&gt;</code> ⏏
        * [.CloudFunctions()](#module_FirebaseCloudFunctionsWrapper--module.exports.CloudFunctions) ⇒ <code>Promise</code>
        * [.treeFromParams(Params)](#module_FirebaseCloudFunctionsWrapper--module.exports.treeFromParams) ⇒ <code>Map</code>

<a name="exp_module_FirebaseCloudFunctionsWrapper--module.exports"></a>

### module.exports(firebase, config, thisLogger) ⇒ <code>Promise.&lt;(object\|void)&gt;</code> ⏏
Initializes the Auth service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| firebase | <code>firebase</code> | provided firebase app (allows use between client & server) |
| config | <code>object</code> | configuration object to detect client/server use |
| config.appId | <code>string</code> | missing parameter indicates server |
| thisLogger | <code>callback</code> | passed logging function  (allows use between client & server) |

**Example**  
```import * as firebase from "firebase/app";import "firebase/functions";import FirebaseFunctions from "@leaddreamer/firebase-wrapper/FirebaseCloudFunctionsWrapper";import {config} from "whereever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseFunctions(firebase);})(config)```
<a name="module_FirebaseCloudFunctionsWrapper--module.exports.CloudFunctions"></a>

#### module.exports.CloudFunctions() ⇒ <code>Promise</code>
Calls the cloud function named in the passed argument, andasynchronously returns the result

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseCloudFunctionsWrapper--module.exports)  
**Fulfil**: result as returns from call  
**Reject**: err as returned from call  
**Example**  
```result = await CloudFunctions("MyGloriousFunction")(argumentToFunction);```
<a name="module_FirebaseCloudFunctionsWrapper--module.exports.treeFromParams"></a>

#### module.exports.treeFromParams(Params) ⇒ <code>Map</code>
Cloud Function specific - processes a Params list froma firestore function to create a reference/Id "tree"

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseCloudFunctionsWrapper--module.exports)  

| Param | Type |
| --- | --- |
| Params | <code>object</code> | 


* * *

&copy; 2020-2021 Tracy Hall
