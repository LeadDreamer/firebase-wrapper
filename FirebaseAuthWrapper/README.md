[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

<a name="module_FirebaseAuthWrapper"></a>

## FirebaseAuthWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseAuthWrapper](#module_FirebaseAuthWrapper)
    * _static_
        * [.FirebaseAuth](#module_FirebaseAuthWrapper.FirebaseAuth) : <code>object</code>
        * [.FirebaseAuthSignInOptions](#module_FirebaseAuthWrapper.FirebaseAuthSignInOptions) : <code>string</code>
        * [.doSignInWithGoogle](#module_FirebaseAuthWrapper.doSignInWithGoogle)
        * [.doSignInWithFacebook](#module_FirebaseAuthWrapper.doSignInWithFacebook)
        * [.doSignInWithTwitter](#module_FirebaseAuthWrapper.doSignInWithTwitter)
        * [.doSignOut](#module_FirebaseAuthWrapper.doSignOut)
        * [.doPasswordReset](#module_FirebaseAuthWrapper.doPasswordReset)
        * [.doSendEmailVerification](#module_FirebaseAuthWrapper.doSendEmailVerification)
        * [.doPasswordUpdate](#module_FirebaseAuthWrapper.doPasswordUpdate)
        * [.setPersistence](#module_FirebaseAuthWrapper.setPersistence)
        * [.FirebaseAuthWrapper(firebase)](#module_FirebaseAuthWrapper.FirebaseAuthWrapper)
        * [.fetchToken(user)](#module_FirebaseAuthWrapper.fetchToken) ⇒ <code>external:promise</code>
        * [.refreshAuthUser()](#module_FirebaseAuthWrapper.refreshAuthUser) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.doCreateUserWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper.doCreateUserWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
        * [.doSignInWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper.doSignInWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
        * [.createAnonymousUser()](#module_FirebaseAuthWrapper.createAnonymousUser) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
        * [.attachAuthUserListener()](#module_FirebaseAuthWrapper.attachAuthUserListener) ⇒ <code>callback</code>
    * _inner_
        * [~fromJSON()](#module_FirebaseAuthWrapper..fromJSON) : <code>object</code>
        * [~AdditionalUserInfo](#module_FirebaseAuthWrapper..AdditionalUserInfo) : <code>object</code>
        * [~User](#module_FirebaseAuthWrapper..User) : <code>object</code>
        * [~UserCredential](#module_FirebaseAuthWrapper..UserCredential) : <code>object</code>
        * [~AuthChangeProcess](#module_FirebaseAuthWrapper..AuthChangeProcess) : <code>function</code>

<a name="module_FirebaseAuthWrapper.FirebaseAuth"></a>

### FirebaseAuthWrapper.FirebaseAuth : <code>object</code>
**Kind**: static property of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.FirebaseAuthSignInOptions"></a>

### FirebaseAuthWrapper.FirebaseAuthSignInOptions : <code>string</code>
**Kind**: static property of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
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
<a name="module_FirebaseAuthWrapper.fetchToken"></a>

### FirebaseAuthWrapper.fetchToken(user) ⇒ <code>external:promise</code>
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
<a name="module_FirebaseAuthWrapper.doCreateUserWithEmailAndPassword"></a>

### FirebaseAuthWrapper.doCreateUserWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_FirebaseAuthWrapper.doSignInWithEmailAndPassword"></a>

### FirebaseAuthWrapper.doSignInWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_FirebaseAuthWrapper.createAnonymousUser"></a>

### FirebaseAuthWrapper.createAnonymousUser() ⇒ <code>Promise.&lt;UserCredential&gt;</code>
**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper.attachAuthUserListener"></a>

### FirebaseAuthWrapper.attachAuthUserListener() ⇒ <code>callback</code>
**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
**Returns**: <code>callback</code> - unsubscribe function  
**Properties**

| Name | Type |
| --- | --- |
| next | <code>AuthChangeProcess</code> | 

<a name="module_FirebaseAuthWrapper..fromJSON"></a>

### FirebaseAuthWrapper~fromJSON() : <code>object</code>
**Kind**: inner method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
**Properties**

| Name | Type |
| --- | --- |
| providerId | <code>string</code> | 
| signInMethod | <code>string</code> | 

<a name="module_FirebaseAuthWrapper..AdditionalUserInfo"></a>

### FirebaseAuthWrapper~AdditionalUserInfo : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
**Properties**

| Name | Type |
| --- | --- |
| isNewUser | <code>boolean</code> | 
| profile | <code>object</code> | 
| providerId | <code>string</code> | 
| username | <code>string</code> | 

<a name="module_FirebaseAuthWrapper..User"></a>

### FirebaseAuthWrapper~User : <code>object</code>
See https://firebase.google.com/docs/reference/js/firebase.User

**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
<a name="module_FirebaseAuthWrapper..UserCredential"></a>

### FirebaseAuthWrapper~UserCredential : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  
**Properties**

| Name | Type |
| --- | --- |
| additionalUserInfo | <code>AdditionalUserInfo</code> | 
| credential | <code>AuthCredential</code> | 
| operationType | <code>&quot;signin&quot;</code> \| <code>&quot;link&quot;</code> \| <code>&quot;reauthenticate&quot;</code> | 
| user | <code>&quot;User&quot;</code> | 

<a name="module_FirebaseAuthWrapper..AuthChangeProcess"></a>

### FirebaseAuthWrapper~AuthChangeProcess : <code>function</code>
**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)  

| Param | Type |
| --- | --- |
| user | <code>User</code> | 


* * *

&copy; 2020-2021 Tracy Hall
