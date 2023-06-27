[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

## Modules

<dl>
<dt><a href="#module_FirebaseAuthWrapper/authAdmin">FirebaseAuthWrapper/authAdmin</a></dt>
<dd><p>A set of helpers around Firebase admin SDK auth.
Specific to use in Cloud Functions</p>
</dd>
<dt><a href="#module_FirebaseAuthWrapper/authClient">FirebaseAuthWrapper/authClient</a></dt>
<dd><p>A set of helper-wrapper functions around firebase firestore, storage
and auth. Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.</p>
</dd>
</dl>

<a name="module_FirebaseAuthWrapper/authAdmin"></a>

## FirebaseAuthWrapper/authAdmin
A set of helpers around Firebase admin SDK auth.Specific to use in Cloud Functions


* [FirebaseAuthWrapper/authAdmin](#module_FirebaseAuthWrapper/authAdmin)
    * [module.exports(firebase)](#exp_module_FirebaseAuthWrapper/authAdmin--module.exports) ⏏
        * [.getUser(userID)](#module_FirebaseAuthWrapper/authAdmin--module.exports.getUser) ⇒ <code>Promise.userData</code>
        * [.DeleteUser(userID)](#module_FirebaseAuthWrapper/authAdmin--module.exports.DeleteUser) ⇒ <code>Promise.void</code>
        * [.setCustomClaims(uid, customClaim)](#module_FirebaseAuthWrapper/authAdmin--module.exports.setCustomClaims) ⇒ <code>Promise.object</code>
        * [.addCustomClaims(uid, customClaim)](#module_FirebaseAuthWrapper/authAdmin--module.exports.addCustomClaims) ⇒ <code>Promise.object</code>
        * [.clearCustomClaims(uid)](#module_FirebaseAuthWrapper/authAdmin--module.exports.clearCustomClaims) ⇒ <code>Promise.void</code>
        * [.PageUsers(pageSize, pageToken)](#module_FirebaseAuthWrapper/authAdmin--module.exports.PageUsers) ⇒ <code>Promise.Array.object</code>

<a name="exp_module_FirebaseAuthWrapper/authAdmin--module.exports"></a>

### module.exports(firebase) ⏏
Initializes the administrative Auth service of the providedfirebase app.  Also instantiates various constants and helper functions

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

<a name="module_FirebaseAuthWrapper/authAdmin--module.exports.getUser"></a>

#### module.exports.getUser(userID) ⇒ <code>Promise.userData</code>
asynchronously fetches user data from Firestore Authentication

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authAdmin--module.exports)  

| Param | Type |
| --- | --- |
| userID | <code>string</code> | 

<a name="module_FirebaseAuthWrapper/authAdmin--module.exports.DeleteUser"></a>

#### module.exports.DeleteUser(userID) ⇒ <code>Promise.void</code>
deletes a single user from the authentication system, identified by user ID

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authAdmin--module.exports)  

| Param | Type |
| --- | --- |
| userID | <code>string</code> | 

<a name="module_FirebaseAuthWrapper/authAdmin--module.exports.setCustomClaims"></a>

#### module.exports.setCustomClaims(uid, customClaim) ⇒ <code>Promise.object</code>
sets custom claims on user object - overwrites other needed settings

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authAdmin--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | user ID |
| customClaim | <code>Object</code> | claims object, less than 1000 Bytes. null clears |

<a name="module_FirebaseAuthWrapper/authAdmin--module.exports.addCustomClaims"></a>

#### module.exports.addCustomClaims(uid, customClaim) ⇒ <code>Promise.object</code>
adds/merges to new claims to user customClaims

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authAdmin--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | user ID |
| customClaim | <code>Object</code> | claims object to be merged with existing claims |

<a name="module_FirebaseAuthWrapper/authAdmin--module.exports.clearCustomClaims"></a>

#### module.exports.clearCustomClaims(uid) ⇒ <code>Promise.void</code>
removes all current customClaims on user (sets to null)

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authAdmin--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | user ID |

<a name="module_FirebaseAuthWrapper/authAdmin--module.exports.PageUsers"></a>

#### module.exports.PageUsers(pageSize, pageToken) ⇒ <code>Promise.Array.object</code>
pages through the full list of users. Woefully inefficient.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authAdmin--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| pageSize | <code>number</code> | default 1000 |
| pageToken | <code>object</code> | default null |

<a name="module_FirebaseAuthWrapper/authClient"></a>

## FirebaseAuthWrapper/authClient
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.

**Example**  
```import * as firebase from "firebase/app";import "firebase/auth";import FirebaseAuth from "@leaddreamer/firebase-wrapper/FirebaseAuthWrapper";//the next is optional - if you want the React componentimport StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";import {config} from "wherever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseAuth(firebase, StyledFirebaseAuth);})(config)```

* [FirebaseAuthWrapper/authClient](#module_FirebaseAuthWrapper/authClient)
    * [module.exports(firebase, thisLogger)](#exp_module_FirebaseAuthWrapper/authClient--module.exports) ⏏
        * _static_
            * [.FirebaseAuth](#module_FirebaseAuthWrapper/authClient--module.exports.FirebaseAuth) : <code>object</code>
            * [.fetchToken(user)](#module_FirebaseAuthWrapper/authClient--module.exports.fetchToken) ⇒ <code>Promise.Token</code>
            * [.fetchJWT(user)](#module_FirebaseAuthWrapper/authClient--module.exports.fetchJWT) ⇒ <code>Promise.&lt;JWT&gt;</code>
            * [.refreshAuthUser()](#module_FirebaseAuthWrapper/authClient--module.exports.refreshAuthUser) ⇒ <code>Promise.void</code>
            * [.doCreateUserWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper/authClient--module.exports.doCreateUserWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
            * [.doSignInWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
            * [.doSignInWithGoogle(googleProvider)](#module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithGoogle) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
            * [.doSignInWithFacebook(facebookProvider)](#module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithFacebook) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
            * [.doSignInWithTwitter(twitterProvider)](#module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithTwitter) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
            * [.doSignOut()](#module_FirebaseAuthWrapper/authClient--module.exports.doSignOut) ⇒ <code>Promise.void</code>
            * [.doPasswordReset()](#module_FirebaseAuthWrapper/authClient--module.exports.doPasswordReset) ⇒ <code>Promise.void</code>
            * [.doSendEmailVerification()](#module_FirebaseAuthWrapper/authClient--module.exports.doSendEmailVerification) ⇒ <code>Promise.void</code>
            * [.doPasswordUpdate(password)](#module_FirebaseAuthWrapper/authClient--module.exports.doPasswordUpdate) ⇒ <code>Promise.void</code>
            * [.createAnonymousUser()](#module_FirebaseAuthWrapper/authClient--module.exports.createAnonymousUser) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
            * [.attachAuthUserListener(next)](#module_FirebaseAuthWrapper/authClient--module.exports.attachAuthUserListener) ⇒ <code>function</code>
            * [.setPersistence()](#module_FirebaseAuthWrapper/authClient--module.exports.setPersistence) ⇒ <code>Promise.void</code>
        * _inner_
            * [~ID](#module_FirebaseAuthWrapper/authClient--module.exports..ID) : <code>Array.string</code>
            * [~AdditionalUserInfo](#module_FirebaseAuthWrapper/authClient--module.exports..AdditionalUserInfo) : <code>object</code>
            * [~AuthCredential](#module_FirebaseAuthWrapper/authClient--module.exports..AuthCredential) : <code>class</code>
            * [~GetIdToken](#module_FirebaseAuthWrapper/authClient--module.exports..GetIdToken) ⇒ <code>Promise.&lt;string&gt;</code>
            * [~Delete](#module_FirebaseAuthWrapper/authClient--module.exports..Delete) ⇒ <code>Promise.&lt;void&gt;</code>
            * [~User](#module_FirebaseAuthWrapper/authClient--module.exports..User) : <code>object</code>
            * [~UserCredential](#module_FirebaseAuthWrapper/authClient--module.exports..UserCredential) : <code>object</code>
            * [~AuthChangeProcess](#module_FirebaseAuthWrapper/authClient--module.exports..AuthChangeProcess) ⇒ <code>Promise.void</code>

<a name="exp_module_FirebaseAuthWrapper/authClient--module.exports"></a>

### module.exports(firebase, thisLogger) ⏏
Initializes the Auth service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| firebase | <code>firebase</code> | provided firebase app (allows use between client & server) |
| thisLogger | <code>callback</code> | passed logging function  (allows use between client & server) |

<a name="module_FirebaseAuthWrapper/authClient--module.exports.FirebaseAuth"></a>

#### module.exports.FirebaseAuth : <code>object</code>
FirebaseAuth instance for various Login/Logout calls

**Kind**: static property of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports.fetchToken"></a>

#### module.exports.fetchToken(user) ⇒ <code>Promise.Token</code>
fetches our specific custom claim values from firebase auth

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
**Fulfil**: Returns a user token object  
**Reject**: returns err  

| Param | Type |
| --- | --- |
| user | <code>FirebaseAuthUser</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.fetchJWT"></a>

#### module.exports.fetchJWT(user) ⇒ <code>Promise.&lt;JWT&gt;</code>
Fetch a JWT token for authenticated signed requests

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
**Fulfil**: Returnsa JWT token  
**Reject**: returns an err  

| Param | Type |
| --- | --- |
| user | <code>FirebaseAuthUser</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.refreshAuthUser"></a>

#### module.exports.refreshAuthUser() ⇒ <code>Promise.void</code>
triggers an update of the Firebase Auth user object.  A listenercan be set to monitor these changes

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports.doCreateUserWithEmailAndPassword"></a>

#### module.exports.doCreateUserWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
Creates AND SIGNS IN an authenticated user with the provided email and passwordCreates a new user account associated with the specified emailaddress and password.On successful creation of the user account, this user will also besigned in to your application.User account creation can fail if the account already exists or thepassword is invalid.Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithEmailAndPassword"></a>

#### module.exports.doSignInWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
SIGNS IN an existing authenticated user with the provided email and passwordCreates a new user account associated with the specified emailaddress and password.On successful creation of the user account, this user will also besigned in to your application.User account creation can fail if the account already exists or thepassword is invalid.Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| email | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithGoogle"></a>

#### module.exports.doSignInWithGoogle(googleProvider) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| googleProvider | <code>GoogleProvider</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithFacebook"></a>

#### module.exports.doSignInWithFacebook(facebookProvider) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| facebookProvider | <code>FacebookProvider</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.doSignInWithTwitter"></a>

#### module.exports.doSignInWithTwitter(twitterProvider) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| twitterProvider | <code>TwitterProvider</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.doSignOut"></a>

#### module.exports.doSignOut() ⇒ <code>Promise.void</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports.doPasswordReset"></a>

#### module.exports.doPasswordReset() ⇒ <code>Promise.void</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports.doSendEmailVerification"></a>

#### module.exports.doSendEmailVerification() ⇒ <code>Promise.void</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports.doPasswordUpdate"></a>

#### module.exports.doPasswordUpdate(password) ⇒ <code>Promise.void</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| password | <code>string</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.createAnonymousUser"></a>

#### module.exports.createAnonymousUser() ⇒ <code>Promise.&lt;UserCredential&gt;</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports.attachAuthUserListener"></a>

#### module.exports.attachAuthUserListener(next) ⇒ <code>function</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
**Returns**: <code>function</code> - unsubscribe function  

| Param | Type |
| --- | --- |
| next | <code>AuthChangeProcess</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports.setPersistence"></a>

#### module.exports.setPersistence() ⇒ <code>Promise.void</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports..ID"></a>

#### module.exports~ID : <code>Array.string</code>
codes for 3rd party Auth providers

**Kind**: inner property of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports..AdditionalUserInfo"></a>

#### module.exports~AdditionalUserInfo : <code>object</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
**Properties**

| Name | Type |
| --- | --- |
| isNewUser | <code>boolean</code> | 
| profile | <code>object</code> | 
| providerId | <code>string</code> | 
| username | <code>string</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports..AuthCredential"></a>

#### module.exports~AuthCredential : <code>class</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
**Properties**

| Name | Type |
| --- | --- |
| providerId | <code>string</code> | 
| signInMethod | <code>string</code> | 
| toJSON | <code>method</code> | 
| fromJSON | <code>method</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports..GetIdToken"></a>

#### module.exports~GetIdToken ⇒ <code>Promise.&lt;string&gt;</code>
Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.Returns the current token if it has not expired. Otherwise, this will refresh the token and return a new one.

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| forceRefresh | <code>boolean</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports..Delete"></a>

#### module.exports~Delete ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
<a name="module_FirebaseAuthWrapper/authClient--module.exports..User"></a>

#### module.exports~User : <code>object</code>
See https://firebase.google.com/docs/reference/js/v8/firebase.User

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| displayName | <code>string</code> \| <code>null</code> |  |
| email | <code>string</code> \| <code>null</code> |  |
| emailVerified | <code>boolean</code> |  |
| IsAnonymous | <code>boolean</code> |  |
| metadata | <code>UserMetadata</code> |  |
| multiFactor | <code>MultiFactorUser</code> |  |
| phoneNumber | <code>string</code> \| <code>null</code> |  |
| photoURL | <code>string</code> \| <code>null</code> |  |
| providerData | <code>UserInfo</code> |  |
| providerId | <code>string</code> |  |
| refreshToken | <code>string</code> |  |
| tenantId | <code>string</code> \| <code>null</code> | The current user's tenant ID. This is a read-only property, which indicates the tenant ID used to sign in the current user. This is null if the user is signed in from the parent project. |
| uid | <code>string</code> | The user's unique ID. |
| delete | <code>Delete</code> |  |
| getIdToken | <code>GetIdToken</code> |  |

<a name="module_FirebaseAuthWrapper/authClient--module.exports..UserCredential"></a>

#### module.exports~UserCredential : <code>object</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  
**Properties**

| Name | Type |
| --- | --- |
| additionalUserInfo | <code>AdditionalUserInfo</code> | 
| credential | <code>AuthCredential</code> | 
| operationType | <code>&quot;signin&quot;</code> \| <code>&quot;link&quot;</code> \| <code>&quot;reauthenticate&quot;</code> | 
| user | <code>&quot;User&quot;</code> | 

<a name="module_FirebaseAuthWrapper/authClient--module.exports..AuthChangeProcess"></a>

#### module.exports~AuthChangeProcess ⇒ <code>Promise.void</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseAuthWrapper/authClient--module.exports)  

| Param | Type |
| --- | --- |
| user | <code>User</code> | 


* * *

&copy; 2020-2021 Tracy Hall
