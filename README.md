[![view on
npm](http://img.shields.io/npm/v/@leaddreamer/firebase-wrapper.svg)](https://www.npmjs.org/package/@leaddreamer/firebase-wrapper)
# @leaddreamer/firebase-wrapper

A set of helper-wrapper functions around firebase firestore, storage and auth. Intent is to treat Firestore as a
hierarchical record-oriented database; originally conceived to port from one database to another.

## Modules

<dl>
<dt><a href="#module_FirebaseWrapper">FirebaseWrapper</a></dt>
<dd><p>A set of helper-wrapper functions around firebase firestore, storage
and auth.
all-in-one wrapper for a solid subset of CLIENT-SIDE Firebase
functions, with a consistent interface.  There is a parallel set for
ADMIN-SIDE functions as well.
Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.
NOTE:
Most helpers return PROMISE.REJECT if no documents are returned.
it is assumed projects using this library <em>might</em> want to have an
explicitly error trap for such events.</p>
</dd>
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
<dt><a href="#module_FirebaseCloudFunctionsWrapper">FirebaseCloudFunctionsWrapper</a></dt>
<dd><p>A set of helper-wrapper functions around firebase firestore, storage
and auth. Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.</p>
</dd>
<dt><a href="#module_FirebaseFirestoreWrapper">FirebaseFirestoreWrapper</a></dt>
<dd><p>A set of helper-wrapper functions around firebase firestore, storage
and auth. Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.</p>
</dd>
<dt><a href="#module_FirebaseStorageWrapper">FirebaseStorageWrapper</a></dt>
<dd><p>A set of helper-wrapper functions around firebase firestore, storage
and auth. Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.</p>
</dd>
<dt><a href="#module_FirebaseStorageAdminEmulator">FirebaseStorageAdminEmulator</a></dt>
<dd><p>A set of helper-wrapper functions around firebase storage
Intent is to treat Firestore as a hierarchical
record-oriented database and Storage as a parallel structure
originally conceived to port from one database to another.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#PAGINATE_INIT">PAGINATE_INIT</a> : <code>number</code></dt>
<dd></dd>
<dt><a href="#PAGINATE_PENDING">PAGINATE_PENDING</a> : <code>number</code></dt>
<dd></dd>
<dt><a href="#PAGINATE_UPDATED">PAGINATE_UPDATED</a> : <code>number</code></dt>
<dd></dd>
<dt><a href="#PAGINATE_END">PAGINATE_END</a> : <code>number</code></dt>
<dd></dd>
<dt><a href="#PAGINATE_DEFAULT">PAGINATE_DEFAULT</a> : <code>number</code></dt>
<dd></dd>
<dt><a href="#PAGINATE_CHOICES">PAGINATE_CHOICES</a> : <code>Array.number</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PagingStatus">PagingStatus</a> : <code><a href="#PAGINATE_INIT">PAGINATE_INIT</a></code> | <code><a href="#PAGINATE_PENDING">PAGINATE_PENDING</a></code> | <code><a href="#PAGINATE_UPDATED">PAGINATE_UPDATED</a></code> | <code><a href="#PAGINATE_DEFAULT">PAGINATE_DEFAULT</a></code></dt>
<dd></dd>
</dl>

<a name="module_FirebaseWrapper"></a>

## FirebaseWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth.all-in-one wrapper for a solid subset of CLIENT-SIDE Firebasefunctions, with a consistent interface.  There is a parallel set forADMIN-SIDE functions as well.Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.NOTE:Most helpers return PROMISE.REJECT if no documents are returned.it is assumed projects using this library *might* want to have anexplicitly error trap for such events.


* [FirebaseWrapper](#module_FirebaseWrapper)
    * [module.exports(firebase, config, thislogger)](#exp_module_FirebaseWrapper--module.exports) ⇒ ⏏
        * [~FirebaseConfigObject](#module_FirebaseWrapper--module.exports..FirebaseConfigObject) : <code>Object</code>

<a name="exp_module_FirebaseWrapper--module.exports"></a>

### module.exports(firebase, config, thislogger) ⇒ ⏏
all-in-one wrapper for a solid subset of CLIENT-SIDE Firebasefunctions, with a consistent interface.  There is a parallel set forADMIN-SIDE functions as well.Call/initialize with Firebase Configuration settings in an object asdescribed below

**Kind**: Exported function  
**Returns**: none  

| Param | Type | Description |
| --- | --- | --- |
| firebase | <code>Firebase</code> | Local (client or server) version of firebase app |
| config | <code>FirebaseConfigObject</code> | Firebase Admin object |
| thislogger | <code>callback</code> | Local (client or server) version of a (console) logger |

**Example**  
```//this specifically loads ALL the subsections, specifically for//the Browser.  See later (tbd) notes for NodeJSimport FirebaseWrapper from "@leaddreamer/firebase-wrapper";FirebaseWrapper(config); //see belowexport * from "@leaddreamer/firebase-wrapper";```
<a name="module_FirebaseWrapper--module.exports..FirebaseConfigObject"></a>

#### module.exports~FirebaseConfigObject : <code>Object</code>
only authDomain, databaseURL and storageBucket are present whencalled from a cloud environment

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseWrapper--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | required api Key from Firebase Console, |
| appId | <code>string</code> | required app ID from Firebase Console |
| projectId | <code>string</code> | required Firebase projectID from Firebase console |
| authDomain | <code>string</code> | (optional) auth domain from Firebase Console |
| databaseURL | <code>string</code> | (optional) Firestore database URL from Firebase console |
| storageBucket: | <code>string</code> | (optional) URL of Firestore Storage Bucket |
| messagingSenderId: | <code>string</code> | (optional) ID for Messaing service from Firebase Console |
| measurementId: | <code>string</code> | (optional) Analytics/Measurement ID from Firebase Console |
| mapsAPIKey | <code>string</code> | (optional) App ID for Google Maps API, from Google |

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
Creates the FUNCTION refered to by the passed name.  Said function can*then* be called for the desired results. SYNCHRONOUS

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

<a name="module_FirebaseFirestoreWrapper"></a>

## FirebaseFirestoreWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseFirestoreWrapper](#module_FirebaseFirestoreWrapper)
    * [module.exports(firebase, config, thisLogger)](#exp_module_FirebaseFirestoreWrapper--module.exports) ⇒ <code>Promise.&lt;(object\|void)&gt;</code> ⏏
        * _static_
            * [.timestamp](#module_FirebaseFirestoreWrapper--module.exports.timestamp)
            * [.MAX_CONCURRENCY](#module_FirebaseFirestoreWrapper--module.exports.MAX_CONCURRENCY)
            * [.RecordFromSnapshot(documentSnapshot)](#module_FirebaseFirestoreWrapper--module.exports.RecordFromSnapshot) ⇒ <code>Record</code>
            * [.RecordsFromSnapshot(querySnapshot)](#module_FirebaseFirestoreWrapper--module.exports.RecordsFromSnapshot) ⇒ <code>Array.Record</code>
            * [.createUniqueReference(tablePath, refPath)](#module_FirebaseFirestoreWrapper--module.exports.createUniqueReference) ⇒ <code>DocumentReference</code>
            * [.writeRecord(tablePath, data, parentRefPath, batch, mergeOption)](#module_FirebaseFirestoreWrapper--module.exports.writeRecord) ⇒ <code>Promise.Record</code>
            * [.writeRecordByRefPath(data, refPath, Transaction, mergeOption)](#module_FirebaseFirestoreWrapper--module.exports.writeRecordByRefPath) ⇒ <code>Promise.&lt;Record&gt;</code>
            * [.writeBack(data, Transaction, mergeOption)](#module_FirebaseFirestoreWrapper--module.exports.writeBack) ⇒ <code>Promise.Record</code>
            * [.updateRecord(record, parent, tablePath, batch, mergeOption)](#module_FirebaseFirestoreWrapper--module.exports.updateRecord) ⇒ <code>Promise.Record</code>
            * [.collectRecords(tablePath, refPath)](#module_FirebaseFirestoreWrapper--module.exports.collectRecords) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
            * [.collectRecordsByFilter(tablePath, refPath, filterArray, sortArray, limit)](#module_FirebaseFirestoreWrapper--module.exports.collectRecordsByFilter) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
            * [.collectRecordsInGroup(tableName)](#module_FirebaseFirestoreWrapper--module.exports.collectRecordsInGroup) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
            * [.collectRecordsInGroupByFilter(tableName, filterArray)](#module_FirebaseFirestoreWrapper--module.exports.collectRecordsInGroupByFilter) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
            * [.fetchRecord(tablePath, Id, refPath, batch)](#module_FirebaseFirestoreWrapper--module.exports.fetchRecord) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
            * [.fetchRecordByRefPath(docRefPath, batch)](#module_FirebaseFirestoreWrapper--module.exports.fetchRecordByRefPath) ⇒ <code>Promise.&lt;Record&gt;</code>
            * [.fetchRecordByFilter(table, [filterArray], refPath, batch)](#module_FirebaseFirestoreWrapper--module.exports.fetchRecordByFilter) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
            * [.fetchRecordInGroupByFilter(table, [filterArray], batch)](#module_FirebaseFirestoreWrapper--module.exports.fetchRecordInGroupByFilter) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
            * [.deleteRecord(record, table, parentRefPath, batch)](#module_FirebaseFirestoreWrapper--module.exports.deleteRecord) ⇒ <code>void</code>
            * [.deleteRecordInParts(table, record, parentRefPath, batch)](#module_FirebaseFirestoreWrapper--module.exports.deleteRecordInParts) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
            * [.deleteRecordByRefPath(docRefPath, batch)](#module_FirebaseFirestoreWrapper--module.exports.deleteRecordByRefPath) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
            * [.updateRecordFields(recordUpdate)](#module_FirebaseFirestoreWrapper--module.exports.updateRecordFields) ⇒ <code>Promise.&lt;Record&gt;</code>
            * [.updateRecordByRefPath(docRefPath, data, batch)](#module_FirebaseFirestoreWrapper--module.exports.updateRecordByRefPath) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
            * [.writeArrayValue(fieldName, fieldValue, docRefPath, batch)](#module_FirebaseFirestoreWrapper--module.exports.writeArrayValue) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
            * [.localBatchReturn(incomingBatch, internalBatch)](#module_FirebaseFirestoreWrapper--module.exports.localBatchReturn) ⇒ <code>WriteBatch</code> \| <code>Transaction</code>
            * _Batch_
                * [.runTransaction(updateFunction)](#module_FirebaseFirestoreWrapper--module.exports.runTransaction) ⇒ <code>Promise.object</code>
                * [.openWriteBatch()](#module_FirebaseFirestoreWrapper--module.exports.openWriteBatch) ⇒ <code>WriteBatch</code>
                * [.closeWriteBatch(batch)](#module_FirebaseFirestoreWrapper--module.exports.closeWriteBatch) ⇒ <code>Promise.&lt;void&gt;</code>
                * [.openBulkWriter()](#module_FirebaseFirestoreWrapper--module.exports.openBulkWriter) ⇒ <code>BulkWriter</code>
                * [.closeBulkWriter(bulkWriter)](#module_FirebaseFirestoreWrapper--module.exports.closeBulkWriter) ⇒ <code>Promise.&lt;void&gt;</code>
            * _FieldPath_
                * [.documentId](#module_FirebaseFirestoreWrapper--module.exports.documentId) : <code>Object</code>
            * _FieldValue_
                * [.deleteFieldValue](#module_FirebaseFirestoreWrapper--module.exports.deleteFieldValue) : <code>Object</code>
                * [.serverTimestampFieldValue](#module_FirebaseFirestoreWrapper--module.exports.serverTimestampFieldValue) : <code>Object</code>
                * [.incrementFieldValue(n)](#module_FirebaseFirestoreWrapper--module.exports.incrementFieldValue) ⇒ <code>sentinelValue</code>
                * [.decrementFieldValue(n)](#module_FirebaseFirestoreWrapper--module.exports.decrementFieldValue) ⇒
                * [.arrayRemoveFieldValue(arrayElements)](#module_FirebaseFirestoreWrapper--module.exports.arrayRemoveFieldValue) ⇒ <code>sentinelValue</code>
                * [.arrayUnionFieldValue(arrayElements)](#module_FirebaseFirestoreWrapper--module.exports.arrayUnionFieldValue) ⇒ <code>sentinelValue</code>
            * _Listeners_
                * [.ListenRecords(tablePath, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper--module.exports.ListenRecords) ⇒ <code>Unsubscribe</code>
                * [.ListenQuery(tablePath, refPath, dataCallback, errCallback, filterArray, sortArray)](#module_FirebaseFirestoreWrapper--module.exports.ListenQuery) ⇒ <code>Unsubscribe</code>
                * [.ListenCollectionGroupRecords(tablePath, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper--module.exports.ListenCollectionGroupRecords) ⇒ <code>Unsubscribe</code>
                * [.ListenCollectionGroupQuery(table, dataCallback, errCallback, filterArray, sortArray)](#module_FirebaseFirestoreWrapper--module.exports.ListenCollectionGroupQuery) ⇒ <code>Unsubscribe</code>
                * [.ListenRecord(tablePath, Id, refPath, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper--module.exports.ListenRecord) ⇒ <code>Unsubscribe</code>
            * _Paginator_
                * [.PaginateFetch](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch)
                    * [new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)](#new_module_FirebaseFirestoreWrapper--module.exports.PaginateFetch_new)
                    * [.limit](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+limit) : <code>number</code>
                    * [.Query](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+Query) : <code>Query</code>
                    * [.status](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+status) : [<code>PagingStatus</code>](#PagingStatus)
                    * [.PageForward()](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+PageForward) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
                    * [.PageBack()](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+PageBack) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
                * [.PaginateGroupFetch](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch)
                    * [new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)](#new_module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch_new)
                    * [.limit](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+limit) : <code>number</code>
                    * [.status](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+status) : [<code>PagingStatus</code>](#PagingStatus)
                    * [.PageForward()](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+PageForward) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
                    * [.PageBack()](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+PageBack) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
                * [.PaginatedListener](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)
                    * [new exports.PaginatedListener(tablePath, refPath, dataCallback, errCallback, limit, filterArray, sortArray)](#new_module_FirebaseFirestoreWrapper--module.exports.PaginatedListener_new)
                    * [.tablePath](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+tablePath) : <code>string</code>
                    * [.filterArray](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+filterArray) : <code>filterObject</code>
                    * [.sortArray](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+sortArray) : <code>sortObject</code>
                    * [.refPath](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+refPath) : <code>string</code>
                    * [.limit](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+limit) : <code>number</code>
                    * [.dataCallback](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+dataCallback) : <code>RecordListener</code>
                    * [.errCallback](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+errCallback) : <code>callback</code>
                    * [.status](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+status) : <code>number</code>
                    * [._setQuery()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+_setQuery) ⇒ <code>Query</code>
                    * [.PageForward()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+PageForward) ⇒ <code>Unsubscribe</code>
                    * [.PageBack()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+PageBack) ⇒ <code>Unsubscribe</code>
                    * [.ChangeLimit(newLimit)](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+ChangeLimit) ⇒ <code>Unsubscribe</code>
                    * [.ChangeFilter([filterArray])](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+ChangeFilter) ⇒ <code>Unsubscribe</code>
                    * [.unsubscribe()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+unsubscribe)
            * _Tree Slice_
                * [.ownerFilter(owner, queryFilter)](#module_FirebaseFirestoreWrapper--module.exports.ownerFilter) ⇒ <code>filterObject</code>
                * [.listenSlice(owner, collectionName, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper--module.exports.listenSlice) ⇒ <code>Unsubscribe</code>
                * [.fetchSlice(owner, collectionName)](#module_FirebaseFirestoreWrapper--module.exports.fetchSlice) ⇒ <code>Promise.Array.Record</code>
                * [.querySlice(owner, collectionName, filterArray)](#module_FirebaseFirestoreWrapper--module.exports.querySlice) ⇒ <code>Promise.Array.Record</code>
                * [.listenQuerySlice(owner, collectionName, filterArray, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper--module.exports.listenQuerySlice) ⇒ <code>callback</code>
                * [.ownerType(record)](#module_FirebaseFirestoreWrapper--module.exports.ownerType) ⇒ <code>string</code>
                * [.ownerId(record)](#module_FirebaseFirestoreWrapper--module.exports.ownerId) ⇒ <code>string</code>
                * [.ownerRefPath(record)](#module_FirebaseFirestoreWrapper--module.exports.ownerRefPath) ⇒ <code>string</code>
                * [.ownerByChild(record)](#module_FirebaseFirestoreWrapper--module.exports.ownerByChild) ⇒ <code>Record</code>
                * [.ownerByOwnerType(ownerId, ownerType)](#module_FirebaseFirestoreWrapper--module.exports.ownerByOwnerType) ⇒ <code>Record</code>
                * [.fetchOwner(record)](#module_FirebaseFirestoreWrapper--module.exports.fetchOwner) ⇒ <code>Document</code>
            * _Typed_
                * [.typedPaginatedListener](#module_FirebaseFirestoreWrapper--module.exports.typedPaginatedListener) ⇐ <code>PaginatedListener</code>
                    * [new exports.typedPaginatedListener(type, parent, pageSize, dataCallback, errCallback)](#new_module_FirebaseFirestoreWrapper--module.exports.typedPaginatedListener_new)
                * [.recordType(record)](#module_FirebaseFirestoreWrapper--module.exports.recordType) ⇒ <code>string</code>
                * [.recordId(record)](#module_FirebaseFirestoreWrapper--module.exports.recordId) ⇒ <code>string</code>
                * [.typedWrite(data, parent, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedWrite) ⇒ <code>Promise.ChainType</code>
                * [.typedWriteByTree(data, tree, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedWriteByTree) ⇒ <code>Promise.ChainType</code>
                * [.typedWriteByChild(data, tree, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedWriteByChild) ⇒ <code>Promise.ChainType</code>
                * [.typedCreate(data, parent, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedCreate) ⇒ <code>Promise.ChainType</code>
                * [.treeFromChild(child)](#module_FirebaseFirestoreWrapper--module.exports.treeFromChild) ⇒ <code>RecordTree</code>
                * [.typedTablePathFromTree(tree, type, branchType)](#module_FirebaseFirestoreWrapper--module.exports.typedTablePathFromTree) ⇒ <code>string</code>
                * [.typedRefPathFromTree(tree, type)](#module_FirebaseFirestoreWrapper--module.exports.typedRefPathFromTree) ⇒ <code>string</code>
                * [.typedIdFromChild(child, type)](#module_FirebaseFirestoreWrapper--module.exports.typedIdFromChild)
                * [.typedTablePathFromChild(child, type)](#module_FirebaseFirestoreWrapper--module.exports.typedTablePathFromChild) ⇒ <code>string</code>
                * [.typedRefPathFromChild(child, type)](#module_FirebaseFirestoreWrapper--module.exports.typedRefPathFromChild) ⇒ <code>string</code>
                * [.typedFetchFromChild(child, refPath, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedFetchFromChild) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
                * [.typedFetchFromTree(tree, refPath, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedFetchFromTree) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
                * [.typedCollectFromTree(tree, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedCollectFromTree) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
                * [.typedCollectFromChild(child, type, batch)](#module_FirebaseFirestoreWrapper--module.exports.typedCollectFromChild)
                * [.typedListener(type, parent, type, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper--module.exports.typedListener) ⇒ <code>callback</code>
        * _inner_
            * [~dbReference(refPath)](#module_FirebaseFirestoreWrapper--module.exports..dbReference) ⇒ <code>DocumentReference</code>
            * [~createRefFromPath(docPath, refPath)](#module_FirebaseFirestoreWrapper--module.exports..createRefFromPath) ⇒ <code>DocumentReference</code>
            * [~filterQuery(query, filterArray)](#module_FirebaseFirestoreWrapper--module.exports..filterQuery) ⇒ <code>Query</code>
            * [~sortQuery(query, sortArray)](#module_FirebaseFirestoreWrapper--module.exports..sortQuery) ⇒
            * [~limitQuery(query, limit)](#module_FirebaseFirestoreWrapper--module.exports..limitQuery) ⇒ <code>Query</code>
            * [~ListenRecordsCommon(reference, dataCallback, errCallback)](#module_FirebaseFirestoreWrapper--module.exports..ListenRecordsCommon) ⇒ <code>function</code>
            * [~Record](#module_FirebaseFirestoreWrapper--module.exports..Record) : <code>object</code>
            * [~filterObject](#module_FirebaseFirestoreWrapper--module.exports..filterObject) : <code>Object</code>
            * [~RecordListener](#module_FirebaseFirestoreWrapper--module.exports..RecordListener) : <code>function</code>
            * [~Unsubscribe](#module_FirebaseFirestoreWrapper--module.exports..Unsubscribe) : <code>function</code>
            * [~CollectionListener](#module_FirebaseFirestoreWrapper--module.exports..CollectionListener) : <code>function</code>

<a name="exp_module_FirebaseFirestoreWrapper--module.exports"></a>

### module.exports(firebase, config, thisLogger) ⇒ <code>Promise.&lt;(object\|void)&gt;</code> ⏏
Initializes the Firestore service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| firebase | <code>firebase</code> | provided firebase app (allows use between client & server) |
| config | <code>object</code> | configuration object to detect client/server use |
| config.appId | <code>string</code> | missing parameter indicates server |
| thisLogger | <code>callback</code> | passed logging function  (allows use between client & server) |

**Example**  
```import * as firebase from "firebase/app";import "firebase/firestore";import FirebaseFirestore from "@leaddreamer/firebase-wrapper/FirebaseFirestoreWrapper";import {config} from "whereever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseFirestore(firebase);})(config)```
<a name="module_FirebaseFirestoreWrapper--module.exports.timestamp"></a>

#### module.exports.timestamp
class for a Firestore timestamp processor

**Kind**: static property of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
<a name="module_FirebaseFirestoreWrapper--module.exports.MAX_CONCURRENCY"></a>

#### module.exports.MAX\_CONCURRENCY
maximum concurrent writes

**Kind**: static constant of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
<a name="module_FirebaseFirestoreWrapper--module.exports.RecordFromSnapshot"></a>

#### module.exports.RecordFromSnapshot(documentSnapshot) ⇒ <code>Record</code>
returns an internal record structure from a firestoreDocument snapshot

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type |
| --- | --- |
| documentSnapshot | <code>DocumentSnapshot</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.RecordsFromSnapshot"></a>

#### module.exports.RecordsFromSnapshot(querySnapshot) ⇒ <code>Array.Record</code>
returns an array of internal record structures from afirestore Query snapshot

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type |
| --- | --- |
| querySnapshot | <code>QuerySnapshot</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.createUniqueReference"></a>

#### module.exports.createUniqueReference(tablePath, refPath) ⇒ <code>DocumentReference</code>
Creates a DocumentReference document to the collectionreferenced in parameter tablePath (relative to optional refPath).This is can be useful for Transactions and Batches, whichcan only get(), set() or update() existing documents. Tricksie!

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>DocumentReference</code> - Firestore Document Reference  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string representing a valid path to a collection to create the new document in, relative to a document reference passed in |
| refPath | <code>string</code> | an optional valid document reference to start the table path |

<a name="module_FirebaseFirestoreWrapper--module.exports.writeRecord"></a>

#### module.exports.writeRecord(tablePath, data, parentRefPath, batch, mergeOption) ⇒ <code>Promise.Record</code>
Writes a Firestore record to collection indicated by tablePathrelative to option DocumentReference refPath

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Fulfil**: document record  
**Reject**: error message  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string representing a valid path to a collection to create or update the document in, relative to a document reference passed in |
| data | <code>Record</code> | Data/Record object to write to database |
| parentRefPath | <code>string</code> | an optional valid document reference to start the table path |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional chain token to include this operation as part of an Atomic Transaction |
| mergeOption | <code>boolean</code> | whether to merge into existing data; default TRUE |

<a name="module_FirebaseFirestoreWrapper--module.exports.writeRecordByRefPath"></a>

#### module.exports.writeRecordByRefPath(data, refPath, Transaction, mergeOption) ⇒ <code>Promise.&lt;Record&gt;</code>
Writes given data object (or map) to the given documentReference

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.&lt;Record&gt;</code> - data record as written  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | Object/Map to be written back to the Firestore |
| refPath | <code>string</code> | DocumentReference to write document to |
| Transaction | <code>WriteBatch</code> \| <code>Transaction</code> | Optional Transaction to enclose this action in |
| mergeOption | <code>boolean</code> | whether to merge into existin data; default TRUE |

<a name="module_FirebaseFirestoreWrapper--module.exports.writeBack"></a>

#### module.exports.writeBack(data, Transaction, mergeOption) ⇒ <code>Promise.Record</code>
Writes a local-schema document back to the Firestore.  Assumeobject/map came from the firestore

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.Record</code> - record as written.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | Object/Map to be written back to the Firestore |
| data.refPath | <code>string</code> | required to be present |
| Transaction | <code>WriteBatch</code> \| <code>Transaction</code> | Optional Transaction to enclose this action in |
| mergeOption | <code>boolean</code> | whether to merge into existin data; default TRUE |

<a name="module_FirebaseFirestoreWrapper--module.exports.updateRecord"></a>

#### module.exports.updateRecord(record, parent, tablePath, batch, mergeOption) ⇒ <code>Promise.Record</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Fulfil**: document record  
**Reject**: error message  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>Record</code> | Data/Record object to write to database |
| parent | <code>Record</code> \| <code>null</code> | an optional valid parent document with  reference to start the table path |
| parent.refPath | <code>string</code> \| <code>null</code> |  |
| tablePath | <code>string</code> \| <code>null</code> | string representing a valid path to a collection to create or update the document in, relative to a document reference - can only be null if data is from database. |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> \| <code>null</code> | optional chain token to include this operation as part of an Atomic Transaction |
| mergeOption | <code>boolean</code> \| <code>null</code> | whether to merge into existing data; default TRUE |

<a name="module_FirebaseFirestoreWrapper--module.exports.collectRecords"></a>

#### module.exports.collectRecords(tablePath, refPath) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
query for a SET of records

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string representing path ro requested collection |
| refPath | <code>string</code> | string representing a path to the relative PARENT of the requested collection |

<a name="module_FirebaseFirestoreWrapper--module.exports.collectRecordsByFilter"></a>

#### module.exports.collectRecordsByFilter(tablePath, refPath, filterArray, sortArray, limit) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
returns an array of documents from Firestore

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | a properly formatted string representing the requested collection - always an ODD number of elements |
| refPath | <code>string</code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |
| filterArray | <code>Array.filterObject</code> | an array of filterObjects The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| sortArray | <code>Arrayt.sortObject</code> | a 2xn array of sort (i.e. "orderBy") conditions |
| limit | <code>number</code> | limit result to this number (if at all) |

<a name="module_FirebaseFirestoreWrapper--module.exports.collectRecordsInGroup"></a>

#### module.exports.collectRecordsInGroup(tableName) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
query for a SET of records from a COLLECTIONGROUP - allcollections of a similar name, regardless of parents.  It is up to theUser to ensure these are at a similar level/structure - Firestore justmatches the name

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | string describing the NAME of the collection group desired |

<a name="module_FirebaseFirestoreWrapper--module.exports.collectRecordsInGroupByFilter"></a>

#### module.exports.collectRecordsInGroupByFilter(tableName, filterArray) ⇒ <code>Promise.&lt;Array.&lt;Record&gt;&gt;</code>
queries for Records from a CollectionGroup, filtered bythe passed array of filterObjects

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | string describing the Name of the collectiongroup |
| filterArray | <code>Array.filterObject</code> | array of objects describing filter operations |

<a name="module_FirebaseFirestoreWrapper--module.exports.fetchRecord"></a>

#### module.exports.fetchRecord(tablePath, Id, refPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
retrieve a record from the Firestore.  If a Batch object is passed,returns a chained Btahc object

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | path to the enclosing collection |
| Id | <code>string</code> | Id of the specific document requested |
| refPath | <code>string</code> | optional document reference to base tablePath from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper--module.exports.fetchRecordByRefPath"></a>

#### module.exports.fetchRecordByRefPath(docRefPath, batch) ⇒ <code>Promise.&lt;Record&gt;</code>
fetches a single record from the database, using just arefPath to identify the document

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| docRefPath | <code>string</code> | string identifying the full path to the requested document |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | object for collecting batched operations |

<a name="module_FirebaseFirestoreWrapper--module.exports.fetchRecordByFilter"></a>

#### module.exports.fetchRecordByFilter(table, [filterArray], refPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
fetches a SINGLE record from the database, using just afilter to identify the document. DANGEROUSLY assumes the filteridentifies a SINGLE document, even if the query always returns an array

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | array of objects describing filter operations |
| refPath | <code>string</code> | optional document reference to base tablePath from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper--module.exports.fetchRecordInGroupByFilter"></a>

#### module.exports.fetchRecordInGroupByFilter(table, [filterArray], batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
fetches a SINGLE record from the database, using just afilter to identify the document. DANGEROUSLY assumes the filteridentifies a SINGLE document, even if the query always returns an array

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | array of objects describing filter operations |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper--module.exports.deleteRecord"></a>

#### module.exports.deleteRecord(record, table, parentRefPath, batch) ⇒ <code>void</code>
deletes a record from the database. Checkis if record is FROM the data (has refPath)or if if only Id (so supporting parts are needed)

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>Record</code> |  |
| table | <code>Record</code> \| <code>null</code> |  |
| parentRefPath | <code>string</code> \| <code>null</code> | optional document reference to base tablePath from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> \| <code>null</code> |  |

<a name="module_FirebaseFirestoreWrapper--module.exports.deleteRecordInParts"></a>

#### module.exports.deleteRecordInParts(table, record, parentRefPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
deletes a single record from the database

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | string naming the parent collection of the document |
| record | <code>Record</code> |  |
| parentRefPath | <code>string</code> | optional document reference to base tablePath from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper--module.exports.deleteRecordByRefPath"></a>

#### module.exports.deleteRecordByRefPath(docRefPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
deletes a single record from the database

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| docRefPath | <code>string</code> | string identifying the full path to the requested document |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch reference |

<a name="module_FirebaseFirestoreWrapper--module.exports.updateRecordFields"></a>

#### module.exports.updateRecordFields(recordUpdate) ⇒ <code>Promise.&lt;Record&gt;</code>
update record by fields - Allows use of FieldPath optionssuch as .delete(). Only specifically referenced fields will beaffected. Assumes the originating docRef is passed as refPath: field

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| recordUpdate | <code>Record</code> | object of field:value entries to update. |
| recordUpdate.refPath | <code>string</code> | full path to document/record |

<a name="module_FirebaseFirestoreWrapper--module.exports.updateRecordByRefPath"></a>

#### module.exports.updateRecordByRefPath(docRefPath, data, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| docRefPath | <code>string</code> | full path to document to update |
| data | <code>Record</code> | Record of values to update |
| data.Id | <code>string</code> | document Id of record |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object |

<a name="module_FirebaseFirestoreWrapper--module.exports.writeArrayValue"></a>

#### module.exports.writeArrayValue(fieldName, fieldValue, docRefPath, batch) ⇒ <code>Promise.&lt;(Record\|WriteBatch\|Transaction)&gt;</code>
adds a new value to a firestore record array entry

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> | the string name of the array to be updated |
| fieldValue | <code>any</code> | the value to add to the array |
| docRefPath | <code>string</code> | the reference path for the document to be updated |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional - used to chain transactions |

<a name="module_FirebaseFirestoreWrapper--module.exports.localBatchReturn"></a>

#### module.exports.localBatchReturn(incomingBatch, internalBatch) ⇒ <code>WriteBatch</code> \| <code>Transaction</code>
**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>WriteBatch</code> \| <code>Transaction</code> - WriteBatch, Transaction or Void  

| Param | Type | Description |
| --- | --- | --- |
| incomingBatch | <code>WriteBatch</code> \| <code>Transaction</code> | a batching object passed into the subroutine Internal Transaction will be added to the incoming batch |
| internalBatch | <code>WriteBatch</code> \| <code>Transaction</code> | a batching object as built *in* the routine, built on the incomingBatch if it exists |

**Example**  
```export const suboperation = (data, batch = null) => { let myBatch = batch || openWriteBatch(); //note short circuit //stuff that happens in the routine writeRecord(table, data, parent, myBatch); writeRecord(otherTable, otherData, otherParent, myBatch); return localBatchReturn(batch, myBatch);}```
<a name="module_FirebaseFirestoreWrapper--module.exports.runTransaction"></a>

#### module.exports.runTransaction(updateFunction) ⇒ <code>Promise.object</code>
creates and runs a series of record operations(executed in the param function) as an atomic operation.A transation object is passed to the callback parameter

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.object</code> - a promise with the result of updateFunction  
**Category**: Batch  

| Param | Type | Description |
| --- | --- | --- |
| updateFunction | <code>callback</code> | callback function that expects a Transaction token as it's sole argument.  either all the included/chained record operations will succeed, or none |

<a name="module_FirebaseFirestoreWrapper--module.exports.openWriteBatch"></a>

#### module.exports.openWriteBatch() ⇒ <code>WriteBatch</code>
Creates a WriteBatch object to collect actions for Batch writing to backend

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>WriteBatch</code> - object that operations are added to for a bulkoperation  
**Category**: Batch  
<a name="module_FirebaseFirestoreWrapper--module.exports.closeWriteBatch"></a>

#### module.exports.closeWriteBatch(batch) ⇒ <code>Promise.&lt;void&gt;</code>
Dispatches an asynchronous Closure to submit Batch

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Batch  

| Param | Type | Description |
| --- | --- | --- |
| batch | <code>WriteBatch</code> | WriteBatch to close |

<a name="module_FirebaseFirestoreWrapper--module.exports.openBulkWriter"></a>

#### module.exports.openBulkWriter() ⇒ <code>BulkWriter</code>
Creates a bulkWriter object to collect actions for Bulk writing to backendoffers parallel operations, writes only, does NOT check for contentions,admin/Node-side only.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>BulkWriter</code> - object that operations are added to for a bulkoperation  
**Category**: Batch  
<a name="module_FirebaseFirestoreWrapper--module.exports.closeBulkWriter"></a>

#### module.exports.closeBulkWriter(bulkWriter) ⇒ <code>Promise.&lt;void&gt;</code>
Dispatches an asynchronous Closure to complete BulkWriter

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Batch  

| Param | Type | Description |
| --- | --- | --- |
| bulkWriter | <code>BulkWriter</code> | bulkWriter to close |

<a name="module_FirebaseFirestoreWrapper--module.exports.documentId"></a>

#### module.exports.documentId : <code>Object</code>
a fieldPath value to represent the document Id - WARNINGGoogle Firestore has a bug, and this actually represents the FULL PATHto the document

**Kind**: static constant of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: FieldPath  
<a name="module_FirebaseFirestoreWrapper--module.exports.deleteFieldValue"></a>

#### module.exports.deleteFieldValue : <code>Object</code>
a sentinel value used to delete a field during anupdate operation

**Kind**: static constant of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: FieldValue  
<a name="module_FirebaseFirestoreWrapper--module.exports.serverTimestampFieldValue"></a>

#### module.exports.serverTimestampFieldValue : <code>Object</code>
a sentinel value to set a field to aserver-generated timestamp during set(0 or update())

**Kind**: static constant of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: FieldValue  
<a name="module_FirebaseFirestoreWrapper--module.exports.incrementFieldValue"></a>

#### module.exports.incrementFieldValue(n) ⇒ <code>sentinelValue</code>
return a sentinel to incrment/decrement a field

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>sentinelValue</code> - a sentinel value  
**Category**: FieldValue  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | If either the operand or the current field value uses    floating point precision, all arithmetic follows IEEE 754    semantics. If both values are integers, values outside of    JavaScript's safe number range (Number.MIN_SAFE_INTEGER to    Number.MAX_SAFE_INTEGER) are also subject to precision loss.    Furthermore, once processed by the Firestore backend, all integer    operations are capped between -2^63 and 2^63-1.     If the current field value is not of type number, or if the field     does not yet exist, the transformation sets the field to the given value. |

<a name="module_FirebaseFirestoreWrapper--module.exports.decrementFieldValue"></a>

#### module.exports.decrementFieldValue(n) ⇒
----------------------------------------------------------------------return a sentinel to decrment/decrement a fieldNOT REALLY A FIREBASE FUNCTIONFire base has only increment; we implement this for legibility

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: a sentinel value  
**Category**: FieldValue  

| Param | Description |
| --- | --- |
| n | If either the operand or the current field value uses    floating point precision, all arithmetic follows IEEE 754    semantics. If both values are integers, values outside of    JavaScript's safe number range (Number.MIN_SAFE_INTEGER to    Number.MAX_SAFE_INTEGER) are also subject to precision loss.    Furthermore, once processed by the Firestore backend, all integer    operations are capped between -2^63 and 2^63-1.     If the current field value is not of type number, or if the field     does not yet exist, the transformation sets the field to the given value. |

<a name="module_FirebaseFirestoreWrapper--module.exports.arrayRemoveFieldValue"></a>

#### module.exports.arrayRemoveFieldValue(arrayElements) ⇒ <code>sentinelValue</code>
returns a sentinel to remove elements from array field

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>sentinelValue</code> - a sentinel value  
**Category**: FieldValue  

| Param | Type | Description |
| --- | --- | --- |
| arrayElements | <code>any</code> | REST expanded list of elements to remove |

<a name="module_FirebaseFirestoreWrapper--module.exports.arrayUnionFieldValue"></a>

#### module.exports.arrayUnionFieldValue(arrayElements) ⇒ <code>sentinelValue</code>
return a sentinel to add/join elements to array field

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>sentinelValue</code> - a sentinel value  
**Category**: FieldValue  

| Param | Type | Description |
| --- | --- | --- |
| arrayElements | <code>any</code> | REST expanded list of elements to add |

<a name="module_FirebaseFirestoreWrapper--module.exports.ListenRecords"></a>

#### module.exports.ListenRecords(tablePath, refPath, dataCallback, errCallback) ⇒ <code>Unsubscribe</code>
sets up a listener for changes to a single record

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to document |
| refPath | <code>string</code> | string describing path to parent document |
| dataCallback | <code>CollectionListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper--module.exports.ListenQuery"></a>

#### module.exports.ListenQuery(tablePath, refPath, dataCallback, errCallback, filterArray, sortArray) ⇒ <code>Unsubscribe</code>
Sets up a listener to a query

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | Name (or pathname) of table to query too - may be sub-collection of optional reference |
| refPath | <code>string</code> | An optional Firestore DocumentReference. If present, the "table" parameter above is relative to this reference |
| dataCallback | <code>CollectionListener</code> | callback function with query results |
| errCallback | <code>callback</code> | callback function with error results |
| filterArray | <code>Array.filterObject</code> | a 3xn array of filter(i.e. "where") conditions |
| sortArray | <code>Array.sortObject</code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |

<a name="module_FirebaseFirestoreWrapper--module.exports.ListenCollectionGroupRecords"></a>

#### module.exports.ListenCollectionGroupRecords(tablePath, refPath, dataCallback, errCallback) ⇒ <code>Unsubscribe</code>
sets up a listener for changes to a collectionGroup

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to document |
| refPath | <code>string</code> | string describing path to parent document |
| dataCallback | <code>CollectionListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper--module.exports.ListenCollectionGroupQuery"></a>

#### module.exports.ListenCollectionGroupQuery(table, dataCallback, errCallback, filterArray, sortArray) ⇒ <code>Unsubscribe</code>
sets up a listener for changes to a collectionGroup by query

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> | string describing the name of a collectionGroup |
| dataCallback | <code>CollectionListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |
| filterArray | <code>Array.filterObject</code> | a 3xn array of filter(i.e. "where") conditions |
| sortArray | <code>Array.sortObject</code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |

<a name="module_FirebaseFirestoreWrapper--module.exports.ListenRecord"></a>

#### module.exports.ListenRecord(tablePath, Id, refPath, dataCallback, errCallback) ⇒ <code>Unsubscribe</code>
Listen to changes to a single record

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Unsubscribe</code> - function to be called to release subscription  
**Category**: Listeners  

| Param | Type | Description |
| --- | --- | --- |
| tablePath | <code>string</code> | string describing relative path to requested record |
| Id | <code>string</code> | string of Id of requested document |
| refPath | <code>string</code> | string od full path to parent document |
| dataCallback | <code>RecordListener</code> | callback to handle changes to requested document |
| errCallback | <code>callback</code> | callback to handle error reporting and operations |

<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateFetch"></a>

#### module.exports.PaginateFetch
constructs an object to paginate through large Firestore Tables

**Kind**: static class of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Paginator  

* [.PaginateFetch](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch)
    * [new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)](#new_module_FirebaseFirestoreWrapper--module.exports.PaginateFetch_new)
    * [.limit](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+limit) : <code>number</code>
    * [.Query](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+Query) : <code>Query</code>
    * [.status](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+status) : [<code>PagingStatus</code>](#PagingStatus)
    * [.PageForward()](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+PageForward) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
    * [.PageBack()](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+PageBack) ⇒ <code>Promise.&lt;Array.Record&gt;</code>

<a name="new_module_FirebaseFirestoreWrapper--module.exports.PaginateFetch_new"></a>

##### new exports.PaginateFetch(table, filterArray, sortArray, refPath, limit)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| table | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| filterArray | <code>array</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| sortArray | <code>array</code> | <code></code> | a 2xn array of sort (i.e. "orderBy") conditions |
| refPath | <code>string</code> | <code>null</code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |
| limit | <code>number</code> |  | page size |

<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+limit"></a>

##### paginateFetch.limit : <code>number</code>
current limit of query results

**Kind**: instance property of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+Query"></a>

##### paginateFetch.Query : <code>Query</code>
underlying query for fetch

**Kind**: instance property of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+status"></a>

##### paginateFetch.status : [<code>PagingStatus</code>](#PagingStatus)
current status of pagination-1 pending; 0 uninitialized; 1 updated;

**Kind**: instance property of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+PageForward"></a>

##### paginateFetch.PageForward() ⇒ <code>Promise.&lt;Array.Record&gt;</code>
executes the query again to fetch the next set of records

**Kind**: instance method of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch)  
**Returns**: <code>Promise.&lt;Array.Record&gt;</code> - returns an array of records - the next page  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateFetch+PageBack"></a>

##### paginateFetch.PageBack() ⇒ <code>Promise.&lt;Array.Record&gt;</code>
executes the query again to fetch the previous set of records

**Kind**: instance method of [<code>PaginateFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateFetch)  
**Returns**: <code>Promise.&lt;Array.Record&gt;</code> - returns an array of records - the next page  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch"></a>

#### module.exports.PaginateGroupFetch
constructs an object to paginate through large Firestore Tables

**Kind**: static class of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Paginator  

* [.PaginateGroupFetch](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch)
    * [new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)](#new_module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch_new)
    * [.limit](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+limit) : <code>number</code>
    * [.status](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+status) : [<code>PagingStatus</code>](#PagingStatus)
    * [.PageForward()](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+PageForward) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
    * [.PageBack()](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+PageBack) ⇒ <code>Promise.&lt;Array.Record&gt;</code>

<a name="new_module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch_new"></a>

##### new exports.PaginateGroupFetch(group, [filterArray], [sortArray], limit)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| [filterArray] | <code>filterObject</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last |
| [sortArray] | <code>sortObject</code> | <code></code> | a 2xn array of sort (i.e. "orderBy") conditions |
| limit | <code>number</code> |  | (optional) page size |

<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+limit"></a>

##### paginateGroupFetch.limit : <code>number</code>
current limit basis for listener query

**Kind**: instance property of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+status"></a>

##### paginateGroupFetch.status : [<code>PagingStatus</code>](#PagingStatus)
current status of listener -1 pending; 0 uninitialized; 1 updated;

**Kind**: instance property of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+PageForward"></a>

##### paginateGroupFetch.PageForward() ⇒ <code>Promise.&lt;Array.Record&gt;</code>
executes the query again to fetch the next set of records

**Kind**: instance method of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch)  
**Returns**: <code>Promise.&lt;Array.Record&gt;</code> - returns data as an array of objects (not dissimilar to Redux State objects)with both the documentID and documentReference added as fields.  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch+PageBack"></a>

##### paginateGroupFetch.PageBack() ⇒ <code>Promise.&lt;Array.Record&gt;</code>
executes the query again to fetch the previous set of records

**Kind**: instance method of [<code>PaginateGroupFetch</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginateGroupFetch)  
**Returns**: <code>Promise.&lt;Array.Record&gt;</code> - returns data as an array of objects (not dissimilar to Redux State objects)with both the documentID and documentReference added as fields.  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener"></a>

#### module.exports.PaginatedListener
Creates an object to allow for paginating a listener for tableread from Firestore. REQUIRES a sorting choice; masks somesubscribe/unsubscribe action for paging forward/backward

**Kind**: static class of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Paginator  

* [.PaginatedListener](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)
    * [new exports.PaginatedListener(tablePath, refPath, dataCallback, errCallback, limit, filterArray, sortArray)](#new_module_FirebaseFirestoreWrapper--module.exports.PaginatedListener_new)
    * [.tablePath](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+tablePath) : <code>string</code>
    * [.filterArray](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+filterArray) : <code>filterObject</code>
    * [.sortArray](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+sortArray) : <code>sortObject</code>
    * [.refPath](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+refPath) : <code>string</code>
    * [.limit](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+limit) : <code>number</code>
    * [.dataCallback](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+dataCallback) : <code>RecordListener</code>
    * [.errCallback](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+errCallback) : <code>callback</code>
    * [.status](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+status) : <code>number</code>
    * [._setQuery()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+_setQuery) ⇒ <code>Query</code>
    * [.PageForward()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+PageForward) ⇒ <code>Unsubscribe</code>
    * [.PageBack()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+PageBack) ⇒ <code>Unsubscribe</code>
    * [.ChangeLimit(newLimit)](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+ChangeLimit) ⇒ <code>Unsubscribe</code>
    * [.ChangeFilter([filterArray])](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+ChangeFilter) ⇒ <code>Unsubscribe</code>
    * [.unsubscribe()](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+unsubscribe)

<a name="new_module_FirebaseFirestoreWrapper--module.exports.PaginatedListener_new"></a>

##### new exports.PaginatedListener(tablePath, refPath, dataCallback, errCallback, limit, filterArray, sortArray)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tablePath | <code>string</code> |  | a properly formatted string representing the requested collection - always an ODD number of elements |
| refPath | <code>refPath</code> | <code></code> | (optional) allows "table" parameter to reference a sub-collection of an existing document reference (I use a LOT of structured collections) |
| dataCallback | <code>RecordListener</code> | <code></code> | returns data as an array of objects (not dissimilar to Redux State objects) with both the documentID and documentReference added as fields. |
| errCallback | <code>RecordListener</code> | <code></code> |  |
| limit | <code>number</code> |  | (optional) pagesize |
| filterArray | <code>Array.filterObject</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions The array is assumed to be sorted in the correct order - i.e. filterArray[0] is added first; filterArray[length-1] last |
| sortArray | <code>Array.sortObject</code> |  | a 2xn array of sort (i.e. "orderBy") conditions |

<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+tablePath"></a>

##### paginatedListener.tablePath : <code>string</code>
table path at base of listener query, relative to original refPath

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+filterArray"></a>

##### paginatedListener.filterArray : <code>filterObject</code>
array of filter objects for listener query

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+sortArray"></a>

##### paginatedListener.sortArray : <code>sortObject</code>
array of sort objects for listener query

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+refPath"></a>

##### paginatedListener.refPath : <code>string</code>
refPath as basis for listener query

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+limit"></a>

##### paginatedListener.limit : <code>number</code>
current limit basis for listener query

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+dataCallback"></a>

##### paginatedListener.dataCallback : <code>RecordListener</code>
current dataCallback of listener query

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+errCallback"></a>

##### paginatedListener.errCallback : <code>callback</code>
current errCallback of listener query

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+status"></a>

##### paginatedListener.status : <code>number</code>
current status of listener

**Kind**: instance property of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+_setQuery"></a>

##### paginatedListener.\_setQuery() ⇒ <code>Query</code>
reconstructs the basis query

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+PageForward"></a>

##### paginatedListener.PageForward() ⇒ <code>Unsubscribe</code>
resets the listener query to the next page of results.Unsubscribes from the current listener, constructs a new query, and sets itas the new listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
**Returns**: <code>Unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+PageBack"></a>

##### paginatedListener.PageBack() ⇒ <code>Unsubscribe</code>
resets the listener query to the next page of results.Unsubscribes from the current listener, constructs a new query, and sets it\as the new listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
**Returns**: <code>Unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  
<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+ChangeLimit"></a>

##### paginatedListener.ChangeLimit(newLimit) ⇒ <code>Unsubscribe</code>
sets page size limit to new value, and restarts the paged listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
**Returns**: <code>Unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  

| Param | Type |
| --- | --- |
| newLimit | <code>number</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+ChangeFilter"></a>

##### paginatedListener.ChangeFilter([filterArray]) ⇒ <code>Unsubscribe</code>
changes the filter on the subscriptionThis has to unsubscribe the current listener,create a new query, then apply it as the listener

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
**Returns**: <code>Unsubscribe</code> - returns the unsubscriber function (for lifecycle events)  

| Param | Type | Description |
| --- | --- | --- |
| [filterArray] | <code>filterObject</code> | an array of filter descriptors |

<a name="module_FirebaseFirestoreWrapper--module.exports.PaginatedListener+unsubscribe"></a>

##### paginatedListener.unsubscribe()
IF unsubscribe function is set, run it.

**Kind**: instance method of [<code>PaginatedListener</code>](#module_FirebaseFirestoreWrapper--module.exports.PaginatedListener)  
<a name="module_FirebaseFirestoreWrapper--module.exports.ownerFilter"></a>

#### module.exports.ownerFilter(owner, queryFilter) ⇒ <code>filterObject</code>
Contructs a filter that selects only the "owner" section of acollectionGroup query - in other words, descendents of a particulartop=level document.  This takes advantage of Firestore's indexing,which "names"/indexes all documents using the FULL PATH to thedocument, starting from the top-most, i.e.:TOP_COLLECTION/{dociId}/NEXT_COLLECTION/{docId}/NEXT_NEXT_COLLECTION/{etc}This functions knowns NOTHING about the actual schema; it simply usesthe path of the indicated "owner" as starting portion of ALL the"child" documents of the owner. It also takes advantage of thestrictly alpha-numeric nature of the path string.As such, ALL children paths strings MUST be "greater than" the ownerbare path, and MUST be LESS THAN the alpha-numerically "next" value:e.g. if the "owner" path is TOP_COLLECTION/abcdefg, then/TOP_COLLECTION/abcdefh > __name__ > //TOP_COLLECTION/abcdefg(assuming LEXICAL SORT)IMPORTANT NOTE:Because this filter uses an INEQUALITY, .sortBy() conditionsare not supported

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| queryFilter | <code>filterObject</code> | additional filter parameters |

<a name="module_FirebaseFirestoreWrapper--module.exports.listenSlice"></a>

#### module.exports.listenSlice(owner, collectionName, dataCallback, errCallback) ⇒ <code>Unsubscribe</code>
Uses the ownerFilter (above) to establish a listener to "just" theparts of a collectionGroup that are descendants of the passed "owner"record.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Unsubscribe</code> - function to be called to release subscription  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| dataCallback | <code>RecordListener</code> | function to be called with changes to record |
| errCallback | <code>RecordListener</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper--module.exports.fetchSlice"></a>

#### module.exports.fetchSlice(owner, collectionName) ⇒ <code>Promise.Array.Record</code>
Wrapper around database fetch, using ownerFilter above toselect/fetch just an "owner" parent document's descendants from acollectionGroup

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.Array.Record</code> - response  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |

<a name="module_FirebaseFirestoreWrapper--module.exports.querySlice"></a>

#### module.exports.querySlice(owner, collectionName, filterArray) ⇒ <code>Promise.Array.Record</code>
Wrapper around database fetch, using ownerFilter above toselect/fetch just an "owner" parent document's descendants from acollectionGroup

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.Array.Record</code> - response  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| filterArray | <code>Array.filterObject</code> | filter parameters |

<a name="module_FirebaseFirestoreWrapper--module.exports.listenQuerySlice"></a>

#### module.exports.listenQuerySlice(owner, collectionName, filterArray, dataCallback, errCallback) ⇒ <code>callback</code>
Uses the ownerFilter (above) to establish a listener to "just" theparts of a collectionGroup that are descendants of the passed "owner"record.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| owner | <code>Record</code> |  |
| owner.refPath | <code>string</code> | string representing the full path to the Firestore document. |
| collectionName | <code>string</code> | name of the desired collectionGroup |
| filterArray | <code>Array.filterObject</code> | filter parameters |
| dataCallback | <code>RecordListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper--module.exports.ownerType"></a>

#### module.exports.ownerType(record) ⇒ <code>string</code>
Returns the "type" (collection name) of the top-most parent of arecord, derived from the refPath

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - the collection name  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.ownerId"></a>

#### module.exports.ownerId(record) ⇒ <code>string</code>
Returns the Id (documentId) of the top-most parent of arecord, derived from the refPath

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - the Id  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.ownerRefPath"></a>

#### module.exports.ownerRefPath(record) ⇒ <code>string</code>
Returns the Id (documentId) of the top-most parent of arecord, derived from the refPath

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - the Id  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.ownerByChild"></a>

#### module.exports.ownerByChild(record) ⇒ <code>Record</code>
Returns the bare owner record reference to the parent (root) of aprovided child

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Record</code> - reference to the parent (root) record  
**Category**: Tree Slice  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>Record</code> | child record |

<a name="module_FirebaseFirestoreWrapper--module.exports.ownerByOwnerType"></a>

#### module.exports.ownerByOwnerType(ownerId, ownerType) ⇒ <code>Record</code>
returns the minimal reference record from an Id and "type"

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Record</code> - reference to the parent (root) record  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| ownerId | <code>string</code> | 
| ownerType | <code>string</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.fetchOwner"></a>

#### module.exports.fetchOwner(record) ⇒ <code>Document</code>
returns the record for the top-most parent of a record,derived from the refPath

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Tree Slice  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.typedPaginatedListener"></a>

#### module.exports.typedPaginatedListener ⇐ <code>PaginatedListener</code>
**Kind**: static class of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Extends**: <code>PaginatedListener</code>  
**Category**: Typed  
<a name="new_module_FirebaseFirestoreWrapper--module.exports.typedPaginatedListener_new"></a>

##### new exports.typedPaginatedListener(type, parent, pageSize, dataCallback, errCallback)
Implements a PaginatedListener using type syntax


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | the "type" (CollectionName) for this record |
| parent | <code>RecordObject</code> | the (optional) parent for this record (i.e. a sub-type) |
| parent.refPath | <code>string</code> | the only required part of a parent record |
| pageSize | <code>number</code> | the page size requested |
| dataCallback | <code>CollectionListener</code> | the callback where data is returned |
| errCallback | <code>callback</code> | callback for errors |

<a name="module_FirebaseFirestoreWrapper--module.exports.recordType"></a>

#### module.exports.recordType(record) ⇒ <code>string</code>
Returns the "type" (collection name) the passed record isstored in, derived from the refPath

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - the collection name  
**Category**: Typed  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.recordId"></a>

#### module.exports.recordId(record) ⇒ <code>string</code>
Returns the Id (documentId) of the passed record derived from the refPath

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - the Id  
**Category**: Typed  

| Param | Type |
| --- | --- |
| record | <code>Record</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.typedWrite"></a>

#### module.exports.typedWrite(data, parent, type, batch) ⇒ <code>Promise.ChainType</code>
optionally batched record update - abstracts batch process from specific types

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.ChainType</code> - WriteBatch, Transaction or Void  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| parent | <code>Record</code> | parent object (if any) this belongs to |
| parent.refPath | <code>string</code> | full path to parent document |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedWriteByTree"></a>

#### module.exports.typedWriteByTree(data, tree, type, batch) ⇒ <code>Promise.ChainType</code>
optionally batched record update - abstracts batch process from specific types

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.ChainType</code> - WriteBatch, Transaction or Void  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| tree | <code>ArtistTree</code> | Object with properties of refPath segments |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedWriteByChild"></a>

#### module.exports.typedWriteByChild(data, tree, type, batch) ⇒ <code>Promise.ChainType</code>
optionally batched record update - abstracts batch process from specific types

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.ChainType</code> - WriteBatch, Transaction or Void  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to update.  This will create a new one if it doesn't exist |
| tree | <code>ArtistTree</code> | Object with properties of refPath segments |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object.  Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedCreate"></a>

#### module.exports.typedCreate(data, parent, type, batch) ⇒ <code>Promise.ChainType</code>
Creates a new document reference of the indicated type, and writesit to the backend. Specific intent is when the Id needs to bepre-specified, or shared outside this function. Normal writingaction will silently create a new document, which has to then befound by query

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Promise.ChainType</code> - WriteBatch, Transaction or Void  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Record</code> | the data object/record to create.  This will create a new one if it doesn't exist |
| parent | <code>Record</code> | parent object (if any) this belongs to |
| parent.refPath | <code>string</code> | full path to parent document |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | batching object. Transaction will be added to the batch |

<a name="module_FirebaseFirestoreWrapper--module.exports.treeFromChild"></a>

#### module.exports.treeFromChild(child) ⇒ <code>RecordTree</code>
Extracts a tree of document ID's from a child document (assumes is a child)

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedTablePathFromTree"></a>

#### module.exports.typedTablePathFromTree(tree, type, branchType) ⇒ <code>string</code>
Builds a refPath *down* to a desired collection/type from an existingRecordTree Map.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - constructed TablePath (collection)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> |  |
| type | <code>string</code> |  |
| branchType | <code>string</code> | a collection name to start branching from. This is in case tree was built from a sister collection/document |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedRefPathFromTree"></a>

#### module.exports.typedRefPathFromTree(tree, type) ⇒ <code>string</code>
Builds a refPath *down* to a desired collection/type from an existingRecordTree Map.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - constructed refPath (document)  
**Category**: Typed  

| Param | Type |
| --- | --- |
| tree | <code>RecordTree</code> | 
| type | <code>string</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports.typedIdFromChild"></a>

#### module.exports.typedIdFromChild(child, type)
Looks up a "tree" to find the Id of the document at the requestedcollection level ("type")

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> | name of desired type/collection level in tree |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedTablePathFromChild"></a>

#### module.exports.typedTablePathFromChild(child, type) ⇒ <code>string</code>
Builds a refPath *up* to a desired collection/type from an existingchild in a tree

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - constructed refPath (collection)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedRefPathFromChild"></a>

#### module.exports.typedRefPathFromChild(child, type) ⇒ <code>string</code>
Builds a refPath *up* to a desired collection/type from an existingchild in a tree

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>string</code> - constructed refPath (document)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | document (regardless of depth)  of a tree |
| child.refPath | <code>string</code> |  |
| type | <code>string</code> |  |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedFetchFromChild"></a>

#### module.exports.typedFetchFromChild(child, refPath, type, batch) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
function to fetch a document from "up" the collection/document tree of a child document

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | assumed to be an object in a collection/document Tree |
| refPath | <code>string</code> |  |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>ChainType</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedFetchFromTree"></a>

#### module.exports.typedFetchFromTree(tree, refPath, type, batch) ⇒ <code>Promise.&lt;RecordObject&gt;</code>
function to fetch a document from "up" the collection/document tree of a child document

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> | assumed to be an object in a collection/document Tree |
| refPath | <code>string</code> |  |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedCollectFromTree"></a>

#### module.exports.typedCollectFromTree(tree, type, batch) ⇒ <code>Promise.&lt;Array.Record&gt;</code>
function to collect documents from "up" the collection/document tree of a child document

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>RecordTree</code> | assumed to be an object in a collection/document Tree |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedCollectFromChild"></a>

#### module.exports.typedCollectFromChild(child, type, batch)
function to collect documents from "up" the collection/document tree of a child document

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Record</code> | assumed to be an object in a collection/document Tree |
| type | <code>string</code> | type/collection to fetch parent document from |
| batch | <code>WriteBatch</code> \| <code>Transaction</code> | optional batch object to chain |

<a name="module_FirebaseFirestoreWrapper--module.exports.typedListener"></a>

#### module.exports.typedListener(type, parent, type, dataCallback, errCallback) ⇒ <code>callback</code>
Uses the ownerFilter (above) to establish a listener to "just" theparts of a collectionGroup that are descendants of the passed "owner"record.

**Kind**: static method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>callback</code> - function to be called to release subscription  
**Category**: Typed  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | name of type of object - i.e. the sub-collection name |
| parent | <code>Record</code> | parent object (if any) this belongs to |
| parent.refPath | <code>string</code> | full path to parent document |
| type | <code>string</code> | name of the desired collectionGroup |
| dataCallback | <code>CollectionListener</code> | function to be called with changes to record |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper--module.exports..dbReference"></a>

#### module.exports~dbReference(refPath) ⇒ <code>DocumentReference</code>
generates a document reference from a pathif passed; else returns the db base reference

**Kind**: inner method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| refPath | <code>string</code> | Path to base actions from. May be null |

<a name="module_FirebaseFirestoreWrapper--module.exports..createRefFromPath"></a>

#### module.exports~createRefFromPath(docPath, refPath) ⇒ <code>DocumentReference</code>
Creates a DocumentReference from *relative* docPathand an (optional) absolute refPath

**Kind**: inner method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type | Default |
| --- | --- | --- |
| docPath | <code>string</code> |  | 
| refPath | <code>refPath</code> | <code></code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports..filterQuery"></a>

#### module.exports~filterQuery(query, filterArray) ⇒ <code>Query</code>
builds and returns a query built from an array of filter (i.e. "where")conditions

**Kind**: inner method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Query</code> - Firestore Query object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>Query</code> |  | collectionReference or Query to build filter upong |
| filterArray | <code>Array.filterObject</code> | <code></code> | an (optional) 3xn array of filter(i.e. "where") conditions |

<a name="module_FirebaseFirestoreWrapper--module.exports..sortQuery"></a>

#### module.exports~sortQuery(query, sortArray) ⇒
builds and returns a query built from an array of filter (i.e. "where")conditions

**Kind**: inner method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: Firestore Query object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>Query</code> |  | collectionReference or Query to build filter upong |
| sortArray | <code>Array.sortObject</code> | <code></code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |

<a name="module_FirebaseFirestoreWrapper--module.exports..limitQuery"></a>

#### module.exports~limitQuery(query, limit) ⇒ <code>Query</code>
builds and returns a query built from an array of filter (i.e. "where")conditions

**Kind**: inner method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>Query</code> - Firestore Query object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>Query</code> |  | collectionReference or Query to build filter upong |
| limit | <code>number</code> | <code></code> | an (optional) 2xn array of sort (i.e. "orderBy") conditions |

<a name="module_FirebaseFirestoreWrapper--module.exports..ListenRecordsCommon"></a>

#### module.exports~ListenRecordsCommon(reference, dataCallback, errCallback) ⇒ <code>function</code>
**Kind**: inner method of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Returns**: <code>function</code> - function to be called to release subscription  

| Param | Type | Description |
| --- | --- | --- |
| reference | <code>DocumentReference</code> |  |
| dataCallback | <code>RecordListener</code> |  |
| errCallback | <code>callback</code> | function to be called when an error occurs in listener |

<a name="module_FirebaseFirestoreWrapper--module.exports..Record"></a>

#### module.exports~Record : <code>object</code>
common properties of our database records

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Id | <code>string</code> | Id of the document as stored in Firestore May be null for new objects |
| refPath | <code>string</code> | string representing the full path to the Firestore document.  May be blank for new documents to be saved. |

<a name="module_FirebaseFirestoreWrapper--module.exports..filterObject"></a>

#### module.exports~filterObject : <code>Object</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
**Properties**

| Name | Type |
| --- | --- |
| fieldRef | <code>string</code> | 
| opStr | <code>string</code> | 
| value | <code>any</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports..RecordListener"></a>

#### module.exports~RecordListener : <code>function</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type |
| --- | --- |
| documentSnapshot | <code>DocumentSnapshot</code> | 

<a name="module_FirebaseFirestoreWrapper--module.exports..Unsubscribe"></a>

#### module.exports~Unsubscribe : <code>function</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  
<a name="module_FirebaseFirestoreWrapper--module.exports..CollectionListener"></a>

#### module.exports~CollectionListener : <code>function</code>
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_FirebaseFirestoreWrapper--module.exports)  

| Param | Type |
| --- | --- |
| querySnapshot | <code>QuerySnapshot</code> | 

<a name="module_FirebaseStorageWrapper"></a>

## FirebaseStorageWrapper
A set of helper-wrapper functions around firebase firestore, storageand auth. Intent is to treat Firestore as a hierarchicalrecord-oriented database; originally conceived to port from onedatabase to another.


* [FirebaseStorageWrapper](#module_FirebaseStorageWrapper)
    * _static_
        * [.paginateListing](#module_FirebaseStorageWrapper.paginateListing)
            * [new exports.paginateListing(storageReference, limit)](#new_module_FirebaseStorageWrapper.paginateListing_new)
            * [.PageForward()](#module_FirebaseStorageWrapper.paginateListing+PageForward) ⇒ <code>Promise.&lt;Array.StorageReference&gt;</code>
        * [.makeStorageRefFromRecord(record, key, filename)](#module_FirebaseStorageWrapper.makeStorageRefFromRecord) ⇒ <code>StorageReference</code>
        * [.listReference(storageReference, optionsObject)](#module_FirebaseStorageWrapper.listReference) ⇒ <code>Promise.&lt;ListResult&gt;</code>
        * [.makeFileURLFromRecord(record, key, filename)](#module_FirebaseStorageWrapper.makeFileURLFromRecord) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.makePrivateURLFromRecord(record, key)](#module_FirebaseStorageWrapper.makePrivateURLFromRecord) ⇒ <code>string</code>
        * [.makePrivateURLFromReference(reference, key)](#module_FirebaseStorageWrapper.makePrivateURLFromReference) ⇒ <code>string</code>
        * [.makePrivateURLFromPath(fullPath)](#module_FirebaseStorageWrapper.makePrivateURLFromPath) ⇒ <code>string</code>
        * [.getDefaultImageURL(key)](#module_FirebaseStorageWrapper.getDefaultImageURL) ⇒ <code>string</code>
        * [.getURLFromFilePath(filePath)](#module_FirebaseStorageWrapper.getURLFromFilePath) ⇒ <code>string</code>
        * [.dataURLToBlob(dataURL)](#module_FirebaseStorageWrapper.dataURLToBlob) ⇒ <code>Object</code>
    * _inner_
        * [~FirebaseStorageWrapper(firebase)](#module_FirebaseStorageWrapper..FirebaseStorageWrapper)
        * [~storeBlobByRecord(blob, record, key, filename)](#module_FirebaseStorageWrapper..storeBlobByRecord) ⇒ <code>UploadTask</code>
        * [~storeDataURLByRecord(dataURL, record, key, filename)](#module_FirebaseStorageWrapper..storeDataURLByRecord) ⇒ <code>UploadTask</code>
        * [~ListOptions](#module_FirebaseStorageWrapper..ListOptions) : <code>object</code>
        * [~ListResult](#module_FirebaseStorageWrapper..ListResult) : <code>object</code>
        * [~PaginateList](#module_FirebaseStorageWrapper..PaginateList) : <code>object</code>
        * [~File](#module_FirebaseStorageWrapper..File) : <code>object</code>
        * [~FileMetadata](#module_FirebaseStorageWrapper..FileMetadata) : <code>object</code>

<a name="module_FirebaseStorageWrapper.paginateListing"></a>

### FirebaseStorageWrapper.paginateListing
A class to manage paging through a listing of storage references

**Kind**: static class of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  

* [.paginateListing](#module_FirebaseStorageWrapper.paginateListing)
    * [new exports.paginateListing(storageReference, limit)](#new_module_FirebaseStorageWrapper.paginateListing_new)
    * [.PageForward()](#module_FirebaseStorageWrapper.paginateListing+PageForward) ⇒ <code>Promise.&lt;Array.StorageReference&gt;</code>

<a name="new_module_FirebaseStorageWrapper.paginateListing_new"></a>

#### new exports.paginateListing(storageReference, limit)
constructs an object to paginate through large Firestore Tables


| Param | Type |
| --- | --- |
| storageReference | <code>StorageReference</code> | 
| limit | <code>number</code> | 

<a name="module_FirebaseStorageWrapper.paginateListing+PageForward"></a>

#### paginateListing.PageForward() ⇒ <code>Promise.&lt;Array.StorageReference&gt;</code>
executes the query again to fetch the next set of records

**Kind**: instance method of [<code>paginateListing</code>](#module_FirebaseStorageWrapper.paginateListing)  
**Returns**: <code>Promise.&lt;Array.StorageReference&gt;</code> - returns an array of records - the next page  
<a name="module_FirebaseStorageWrapper.makeStorageRefFromRecord"></a>

### FirebaseStorageWrapper.makeStorageRefFromRecord(record, key, filename) ⇒ <code>StorageReference</code>
This function is part of a storage scheme that uses parallel structuresbetween Firestore collection/documents and Storage paths.  The concepthere is all Storage items are part of/belong to Firestore documents.The function takes a document record, and combines it with optional key andfilename to construct a '/' separated path to a stored item, , and returns aStorage reference to that item.Note this simply makes the Storage Ref - it does not carry out *any* operations

**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>StorageReference</code> - a Firestore Storage Reference  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>string</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field stored item is associated with |
| filename | <code>string</code> | an optional name to be associated with the stored item. |

<a name="module_FirebaseStorageWrapper.listReference"></a>

### FirebaseStorageWrapper.listReference(storageReference, optionsObject) ⇒ <code>Promise.&lt;ListResult&gt;</code>
**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  

| Param | Type | Description |
| --- | --- | --- |
| storageReference | <code>StorageReference</code> | a storage reference to a "directory", not a file. More accurate to state that it is *treated* as a directory, since such niceties are a Firestore convention, not a physical reality |
| optionsObject | <code>ListOptions</code> |  |

<a name="module_FirebaseStorageWrapper.makeFileURLFromRecord"></a>

### FirebaseStorageWrapper.makeFileURLFromRecord(record, key, filename) ⇒ <code>Promise.&lt;string&gt;</code>
This function is part of a storage scheme that uses parallel structuresbetween Firestore collection/documents and Storage paths.  The concepthere is all Storage items are part of/belong to Firestore documents.This function takes a document record, and combines it with optional key andfilename to construct a '/' separated path to a stored item, , and returns aURL that can be used to access that item.Note this simply makes the URL - it does not carry out *any* operations

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
This function is part of a storage scheme that uses parallel structuresbetween Firestore collection/documents and Storage paths.  The concepthere is all Storage items are part of/belong to Firestore documents.This function takes a document record, and combines it with optional key,to construct a '/' separated path to a stored item, , and returns aURL that can be used to access that item.Note this simply makes the URL - it does not carry out *any* operations

**Kind**: static method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>string</code> - The resulting Security-Rule-compliant URL  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>RecordObject</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |

<a name="module_FirebaseStorageWrapper.makePrivateURLFromReference"></a>

### FirebaseStorageWrapper.makePrivateURLFromReference(reference, key) ⇒ <code>string</code>
This function is part of a storage scheme that uses parallel structuresbetween Firestore collection/documents and Storage paths.  The concepthere is all Storage items are part of/belong to Firestore documents.This function takes a document record, and combines it with optional key,to construct a '/' separated path to a stored item, , and returns aURL that can be used to access that item.Note this simply makes the URL - it does not carry out *any* operations

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

<a name="module_FirebaseStorageWrapper..FirebaseStorageWrapper"></a>

### FirebaseStorageWrapper~FirebaseStorageWrapper(firebase)
Initializes the Auth service of the providedfirebase app.  Also instantiates various constants andhelper functions

**Kind**: inner method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

**Example**  
```import * as firebase from "firebase/app";import "firebase/storage";import FirebaseStorage from "@leaddreamer/firebase-wrapper/FirebaseStorageWrapper";import {config} from "whereever-you-put-it";((myconfig) {try {  firebase.app();} catch (err) {  firebase.initializeApp(myconfig);}FirebaseStorage(firebase);})(config);```
<a name="module_FirebaseStorageWrapper..storeBlobByRecord"></a>

### FirebaseStorageWrapper~storeBlobByRecord(blob, record, key, filename) ⇒ <code>UploadTask</code>
Firestore's document sizes can be limited - 1MB - so our system storeslarger digital "blobs" in a parallel Firestore Storage.

**Kind**: inner method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>UploadTask</code> - Firestore Storage UploadTask Object  

| Param | Type | Description |
| --- | --- | --- |
| blob | <code>blob</code> | A data blob in DataURI format to store in Storage |
| record | <code>RecordObject</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |
| filename | <code>string</code> | an optional name to be associated with the stored item. |

<a name="module_FirebaseStorageWrapper..storeDataURLByRecord"></a>

### FirebaseStorageWrapper~storeDataURLByRecord(dataURL, record, key, filename) ⇒ <code>UploadTask</code>
Firestore's document sizes can be limited - 1MB - so our system storeslarger digital "blobs" in a parallel Firestore Storage.

**Kind**: inner method of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Returns**: <code>UploadTask</code> - Firestore Storage UploadTask Object  

| Param | Type | Description |
| --- | --- | --- |
| dataURL | <code>dataURL</code> | A data blob in DataURI format to store in Storage |
| record | <code>RecordObject</code> | A firestore document Record - the '/' separated collection/ document path is used as the path to the stored item. |
| key | <code>string</code> | An optional string identifying the specific field an stored item is associated with |
| filename | <code>string</code> | an optional name to be associated with the stored item. |

<a name="module_FirebaseStorageWrapper..ListOptions"></a>

### FirebaseStorageWrapper~ListOptions : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| maxResults | <code>number</code> | If set, limits the total number of prefixes and items to return. The default and maximum maxResults is 1000. |
| pageToken | <code>string</code> | The nextPageToken from a previous call to list(). If provided, listing is resumed from the previous position. |

<a name="module_FirebaseStorageWrapper..ListResult"></a>

### FirebaseStorageWrapper~ListResult : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Properties**

| Name | Type |
| --- | --- |
| items | <code>Array.StorageReference</code> | 
| prefixes | <code>Array.StorageReference</code> | 
| nextPageToken | <code>string</code> | 

<a name="module_FirebaseStorageWrapper..PaginateList"></a>

### FirebaseStorageWrapper~PaginateList : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Properties**

| Name | Type |
| --- | --- |
| storageReference | <code>StorageReference</code> | 
| status | <code>number</code> | 
| limit | <code>number</code> | 
| listOptions | <code>ListOptions</code> | 

<a name="module_FirebaseStorageWrapper..File"></a>

### FirebaseStorageWrapper~File : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| metadata | <code>FileMetadata</code> |  |
| acl | <code>object</code> |  |
| name | <code>string</code> | //various methods |

<a name="module_FirebaseStorageWrapper..FileMetadata"></a>

### FirebaseStorageWrapper~FileMetadata : <code>object</code>
**Kind**: inner typedef of [<code>FirebaseStorageWrapper</code>](#module_FirebaseStorageWrapper)  
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

<a name="module_FirebaseStorageAdminEmulator"></a>

## FirebaseStorageAdminEmulator
A set of helper-wrapper functions around firebase storageIntent is to treat Firestore as a hierarchicalrecord-oriented database and Storage as a parallel structureoriginally conceived to port from one database to another.


* [FirebaseStorageAdminEmulator](#module_FirebaseStorageAdminEmulator)
    * [~adminRef](#module_FirebaseStorageAdminEmulator..adminRef)
        * [new adminRef(bucket, path)](#new_module_FirebaseStorageAdminEmulator..adminRef_new)
        * [.fileRef](#module_FirebaseStorageAdminEmulator..adminRef+fileRef) : <code>storageRef</code>
        * [.fullPath](#module_FirebaseStorageAdminEmulator..adminRef+fullPath) : <code>string</code>
        * [.name](#module_FirebaseStorageAdminEmulator..adminRef+name) : <code>string</code>
        * [.bucket](#module_FirebaseStorageAdminEmulator..adminRef+bucket) : <code>string</code>
        * [.parent](#module_FirebaseStorageAdminEmulator..adminRef+parent) : <code>storageRef</code>
        * [.storage](#module_FirebaseStorageAdminEmulator..adminRef+storage) : <code>storageApp</code>
        * [.metadata](#module_FirebaseStorageAdminEmulator..adminRef+metadata) : <code>string</code>
        * [.child(path)](#module_FirebaseStorageAdminEmulator..adminRef+child) ⇒ <code>Promise.&lt;StorageRefEmulation&gt;</code>
        * [.delete()](#module_FirebaseStorageAdminEmulator..adminRef+delete) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.getDownloadURL()](#module_FirebaseStorageAdminEmulator..adminRef+getDownloadURL) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.getToken()](#module_FirebaseStorageAdminEmulator..adminRef+getToken) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.getMetadata()](#module_FirebaseStorageAdminEmulator..adminRef+getMetadata) ⇒ <code>Promise.&lt;FileMetadata&gt;</code>
        * [.put(data, metadata)](#module_FirebaseStorageAdminEmulator..adminRef+put) ⇒ <code>Promise.&lt;object&gt;</code>
        * [.putString(dataString, stringFormat, metadata)](#module_FirebaseStorageAdminEmulator..adminRef+putString) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~FirebaseStorageAdminEmulator(firebase)](#module_FirebaseStorageAdminEmulator..FirebaseStorageAdminEmulator)

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
    * [.child(path)](#module_FirebaseStorageAdminEmulator..adminRef+child) ⇒ <code>Promise.&lt;StorageRefEmulation&gt;</code>
    * [.delete()](#module_FirebaseStorageAdminEmulator..adminRef+delete) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getDownloadURL()](#module_FirebaseStorageAdminEmulator..adminRef+getDownloadURL) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getToken()](#module_FirebaseStorageAdminEmulator..adminRef+getToken) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getMetadata()](#module_FirebaseStorageAdminEmulator..adminRef+getMetadata) ⇒ <code>Promise.&lt;FileMetadata&gt;</code>
    * [.put(data, metadata)](#module_FirebaseStorageAdminEmulator..adminRef+put) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.putString(dataString, stringFormat, metadata)](#module_FirebaseStorageAdminEmulator..adminRef+putString) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="new_module_FirebaseStorageAdminEmulator..adminRef_new"></a>

#### new adminRef(bucket, path)
Create a class that emulates a Firebase Storage storageRefusing Firebase Admin Cloud Storage Functions.  This is notan exact replica, but one with similar static members andmethods.  Intended for use with a higher-level Wrapper libraryThis returns an object that has many of the same members andmethods as a Firebase storageRef, but only in conjunction withthe methods here, and likely only with the "wrapper" it is definedfor.


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
<a name="module_FirebaseStorageAdminEmulator..adminRef+child"></a>

#### adminRef.child(path) ⇒ <code>Promise.&lt;StorageRefEmulation&gt;</code>
creates and returns a new adminRef object from existin path

**Kind**: instance method of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | a relative path *from* the existing storageRef to create child |

<a name="module_FirebaseStorageAdminEmulator..adminRef+delete"></a>

#### adminRef.delete() ⇒ <code>Promise.&lt;void&gt;</code>
Deletes the referenced storage item

**Kind**: instance method of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+getDownloadURL"></a>

#### adminRef.getDownloadURL() ⇒ <code>Promise.&lt;string&gt;</code>
Generates a long-lived (essentially permanent until revoked)Public-Access URL for a storage item in FIREBASE (not Cloud Storage)format

**Kind**: instance method of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+getToken"></a>

#### adminRef.getToken() ⇒ <code>Promise.&lt;string&gt;</code>
Fetches (or creates as needed) a unique token for a storage object

**Kind**: instance method of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+getMetadata"></a>

#### adminRef.getMetadata() ⇒ <code>Promise.&lt;FileMetadata&gt;</code>
Fetches the FileMetadata for the storage object. Custom/Client metadatais located in FileMetadata.metadata

**Kind**: instance method of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  
<a name="module_FirebaseStorageAdminEmulator..adminRef+put"></a>

#### adminRef.put(data, metadata) ⇒ <code>Promise.&lt;object&gt;</code>
puts a block of data (and optional metadata) into storage atlocation specified by adminRef

**Kind**: instance method of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  

| Param | Type | Default |
| --- | --- | --- |
| data | <code>blob</code> |  | 
| metadata | <code>object</code> | <code></code> | 

<a name="module_FirebaseStorageAdminEmulator..adminRef+putString"></a>

#### adminRef.putString(dataString, stringFormat, metadata) ⇒ <code>Promise.&lt;object&gt;</code>
puts a string (possibly encoded data) into a storage filedescribed by the provided reference.

**Kind**: instance method of [<code>adminRef</code>](#module_FirebaseStorageAdminEmulator..adminRef)  

| Param | Type | Default |
| --- | --- | --- |
| dataString | <code>string</code> |  | 
| stringFormat | <code>string</code> | <code>null</code> | 
| metadata | <code>FileMetadata</code> | <code></code> | 

<a name="module_FirebaseStorageAdminEmulator..FirebaseStorageAdminEmulator"></a>

### FirebaseStorageAdminEmulator~FirebaseStorageAdminEmulator(firebase)
Initializes the Storage service of the provided firebase app.  Alsoinstantiates various constants and helper functions.This is a WRAPPER around CLOUD STORAGE (admin) functionsto emulate FIREBASE functionality, keeping a similar APIbetween client & cloud code.NOTE: admin "references" ARE NOT the same as client references, and are NOTinterchangeable.  Do not mix client & admin code (not actually possiblein this wrapper)

**Kind**: inner method of [<code>FirebaseStorageAdminEmulator</code>](#module_FirebaseStorageAdminEmulator)  

| Param | Type |
| --- | --- |
| firebase | <code>firebase</code> | 

<a name="PAGINATE_INIT"></a>

## PAGINATE\_INIT : <code>number</code>
**Kind**: global constant  
**Category**: Paginate Constants  
<a name="PAGINATE_PENDING"></a>

## PAGINATE\_PENDING : <code>number</code>
**Kind**: global constant  
**Category**: Paginate Constants  
<a name="PAGINATE_UPDATED"></a>

## PAGINATE\_UPDATED : <code>number</code>
**Kind**: global constant  
**Category**: Paginate Constants  
<a name="PAGINATE_END"></a>

## PAGINATE\_END : <code>number</code>
**Kind**: global constant  
**Category**: Paginate Constants  
<a name="PAGINATE_DEFAULT"></a>

## PAGINATE\_DEFAULT : <code>number</code>
**Kind**: global constant  
**Category**: Paginate Constants  
<a name="PAGINATE_CHOICES"></a>

## PAGINATE\_CHOICES : <code>Array.number</code>
**Kind**: global constant  
**Category**: Paginate Constants  
<a name="PagingStatus"></a>

## PagingStatus : [<code>PAGINATE\_INIT</code>](#PAGINATE_INIT) \| [<code>PAGINATE\_PENDING</code>](#PAGINATE_PENDING) \| [<code>PAGINATE\_UPDATED</code>](#PAGINATE_UPDATED) \| [<code>PAGINATE\_DEFAULT</code>](#PAGINATE_DEFAULT)
**Kind**: global typedef  
**Category**: Paginate Constants  

* * *

&copy; 2020-2021 Tracy Hall
