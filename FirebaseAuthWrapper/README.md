[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseAuthWrapper/authAdmin"></a>

## FirebaseAuthWrapper/authAdmin
<a name="exp_module_FirebaseAuthWrapper/authAdmin--module.exports"></a>

### module.exports(firebase, config, thisLogger, services) ⏏
Initializes the Auth service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| firebase | <code>firebase</code> | provided firebase app (allows use between client & server) |
| config | <code>object</code> | configuration object to detect client/server use |
| config.appId | <code>string</code> | missing parameter indicates server |
| thisLogger | <code>callback</code> | passed logging function  (allows use between client & server) |
| services | <code>object</code> |  |
| services.firebase | <code>object</code> |  |
| services.firestore | <code>object</code> |  |
| services.auth | <code>object</code> |  |
| services.storage | <code>object</code> |  |
| services.functions | <code>object</code> |  |


* * *

&copy; 2020-2026 Tracy Hall
