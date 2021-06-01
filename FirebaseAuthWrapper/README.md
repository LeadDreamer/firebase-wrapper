[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseAuthWrapper"></a>

## FirebaseAuthWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseAuthWrapper](#module_FirebaseAuthWrapper)
    * [.FirebaseAuth](#module_FirebaseAuthWrapper.FirebaseAuth) : <code>object</code>
    * [.FirebaseAuthSignInOptions](#module_FirebaseAuthWrapper.FirebaseAuthSignInOptions) : <code>string</code>
    * [.doCreateUserWithEmailAndPassword](#module_FirebaseAuthWrapper.doCreateUserWithEmailAndPassword)
    * [.doSignInWithEmailAndPassword](#module_FirebaseAuthWrapper.doSignInWithEmailAndPassword)
    * [.doSignInWithGoogle](#module_FirebaseAuthWrapper.doSignInWithGoogle)
    * [.doSignInWithFacebook](#module_FirebaseAuthWrapper.doSignInWithFacebook)
    * [.doSignInWithTwitter](#module_FirebaseAuthWrapper.doSignInWithTwitter)
    * [.doSignOut](#module_FirebaseAuthWrapper.doSignOut)
    * [.doPasswordReset](#module_FirebaseAuthWrapper.doPasswordReset)
    * [.doSendEmailVerification](#module_FirebaseAuthWrapper.doSendEmailVerification)
    * [.doPasswordUpdate](#module_FirebaseAuthWrapper.doPasswordUpdate)
    * [.createAnonymousUser](#module_FirebaseAuthWrapper.createAnonymousUser)
    * [.attachAuthUserListener](#module_FirebaseAuthWrapper.attachAuthUserListener)
    * [.setPersistence](#module_FirebaseAuthWrapper.setPersistence)
    * [.FirebaseAuthWrapper(firebase)](#module_FirebaseAuthWrapper.FirebaseAuthWrapper)
    * [.fetchClaims(user)](#module_FirebaseAuthWrapper.fetchClaims) ⇒ <code>external:promise</code>
    * [.refreshAuthUser()](#module_FirebaseAuthWrapper.refreshAuthUser) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_FirebaseAuthWrapper.FirebaseAuth"></a>

### FirebaseAuthWrapper.FirebaseAuth : <code>object</code>
**Kind**: static property of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.FirebaseAuthSignInOptions"></a>

### FirebaseAuthWrapper.FirebaseAuthSignInOptions : <code>string</code>
**Kind**: static property of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doCreateUserWithEmailAndPassword"></a>

### FirebaseAuthWrapper.doCreateUserWithEmailAndPassword
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doSignInWithEmailAndPassword"></a>

### FirebaseAuthWrapper.doSignInWithEmailAndPassword
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doSignInWithGoogle"></a>

### FirebaseAuthWrapper.doSignInWithGoogle
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doSignInWithFacebook"></a>

### FirebaseAuthWrapper.doSignInWithFacebook
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doSignInWithTwitter"></a>

### FirebaseAuthWrapper.doSignInWithTwitter
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doSignOut"></a>

### FirebaseAuthWrapper.doSignOut
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doPasswordReset"></a>

### FirebaseAuthWrapper.doPasswordReset
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doSendEmailVerification"></a>

### FirebaseAuthWrapper.doSendEmailVerification
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.doPasswordUpdate"></a>

### FirebaseAuthWrapper.doPasswordUpdate
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.createAnonymousUser"></a>

### FirebaseAuthWrapper.createAnonymousUser
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.attachAuthUserListener"></a>

### FirebaseAuthWrapper.attachAuthUserListener
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.setPersistence"></a>

### FirebaseAuthWrapper.setPersistence
----------------------------------------------------------------------

**Kind**: static constant of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.FirebaseAuthWrapper"></a>

### FirebaseAuthWrapper.FirebaseAuthWrapper(firebase)
Initializes the Auth service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

**Example**  
```import * as firebase from "firebase/app";import "firebase/auth";import FirebaseAuth from "@leaddreamer/firebase-wrapper/FirebaseAuthWrapper";//the next is optional - if you want the React componentimport StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";import {config} from "wherever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseAuth(firebase, StyledFirebaseAuth);})(config)```
<a name="module_FirebaseAuthWrapper.fetchClaims"></a>

### FirebaseAuthWrapper.fetchClaims(user) ⇒ <code>external:promise</code>
----------------------------------------------------------------------

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
**Fulfil**: Returns a user token object  
**Reject**: returns err  

| Param | Type |
| --- | --- |
| user | <code>FirebaseAuthUser</code> | 

<a name="module_FirebaseAuthWrapper.refreshAuthUser"></a>

### FirebaseAuthWrapper.refreshAuthUser() ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  

* * *

&copy; 2020-2021 Tracy Hall
