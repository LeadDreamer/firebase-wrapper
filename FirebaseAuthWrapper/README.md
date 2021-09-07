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

A set of helpers around Firebase admin SDK auth.
Specific to use in Cloud Functions

- [FirebaseAuthWrapper/authAdmin](#module_FirebaseAuthWrapper/authAdmin)
  - _static_
    - [.FirebaseAuthAdminWrapper(firebase)](#module_FirebaseAuthWrapper/authAdmin.FirebaseAuthAdminWrapper)
  - _inner_
    - [~getUser(userID)](#module_FirebaseAuthWrapper/authAdmin..getUser) ⇒ <code>Promise.&lt;userData&gt;</code>
    - [~DeleteUser(userID)](#module_FirebaseAuthWrapper/authAdmin..DeleteUser) ⇒ <code>Promise</code>
    - [~setCustomClaims(uid, customClaim)](#module_FirebaseAuthWrapper/authAdmin..setCustomClaims)
    - [~addCustomClaims(uid, customClaim)](#module_FirebaseAuthWrapper/authAdmin..addCustomClaims)
    - [~clearCustomClaims(uid)](#module_FirebaseAuthWrapper/authAdmin..clearCustomClaims)
    - [~PageUsers(pageSize, pageToken)](#module_FirebaseAuthWrapper/authAdmin..PageUsers)

<a name="module_FirebaseAuthWrapper/authAdmin.FirebaseAuthAdminWrapper"></a>

### FirebaseAuthWrapper/authAdmin.FirebaseAuthAdminWrapper(firebase)

Initializes the administrative Auth service of the provided
firebase app. Also instantiates various constants and helper functions

**Kind**: static method of [<code>FirebaseAuthWrapper/authAdmin</code>](#module_FirebaseAuthWrapper/authAdmin)

| Param    | Type                  |
| -------- | --------------------- |
| firebase | <code>firebase</code> |

<a name="module_FirebaseAuthWrapper/authAdmin..getUser"></a>

### FirebaseAuthWrapper/authAdmin~getUser(userID) ⇒ <code>Promise.&lt;userData&gt;</code>

asynchronously fetches user data from Firestore Authentication

**Kind**: inner method of [<code>FirebaseAuthWrapper/authAdmin</code>](#module_FirebaseAuthWrapper/authAdmin)

| Param  | Type                |
| ------ | ------------------- |
| userID | <code>string</code> |

<a name="module_FirebaseAuthWrapper/authAdmin..DeleteUser"></a>

### FirebaseAuthWrapper/authAdmin~DeleteUser(userID) ⇒ <code>Promise</code>

deletes a single user from the authentication system, identified by user ID

**Kind**: inner method of [<code>FirebaseAuthWrapper/authAdmin</code>](#module_FirebaseAuthWrapper/authAdmin)

| Param  | Type                |
| ------ | ------------------- |
| userID | <code>string</code> |

<a name="module_FirebaseAuthWrapper/authAdmin..setCustomClaims"></a>

### FirebaseAuthWrapper/authAdmin~setCustomClaims(uid, customClaim)

sets custom claims on user object
overwrites other needed settings

**Kind**: inner method of [<code>FirebaseAuthWrapper/authAdmin</code>](#module_FirebaseAuthWrapper/authAdmin)

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| uid         | <code>string</code> | user ID                                          |
| customClaim | <code>Object</code> | claims object, less than 1000 Bytes. null clears |

<a name="module_FirebaseAuthWrapper/authAdmin..addCustomClaims"></a>

### FirebaseAuthWrapper/authAdmin~addCustomClaims(uid, customClaim)

adds/merges to new claims to user customClaims

**Kind**: inner method of [<code>FirebaseAuthWrapper/authAdmin</code>](#module_FirebaseAuthWrapper/authAdmin)

| Param       | Type                | Description                                     |
| ----------- | ------------------- | ----------------------------------------------- |
| uid         | <code>string</code> | user ID                                         |
| customClaim | <code>Object</code> | claims object to be merged with existing claims |

<a name="module_FirebaseAuthWrapper/authAdmin..clearCustomClaims"></a>

### FirebaseAuthWrapper/authAdmin~clearCustomClaims(uid)

removes all current customClaims on user (sets to null)

**Kind**: inner method of [<code>FirebaseAuthWrapper/authAdmin</code>](#module_FirebaseAuthWrapper/authAdmin)

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| uid   | <code>string</code> | user ID     |

<a name="module_FirebaseAuthWrapper/authAdmin..PageUsers"></a>

### FirebaseAuthWrapper/authAdmin~PageUsers(pageSize, pageToken)

pages through the full list of users. Woefully inefficient.

**Kind**: inner method of [<code>FirebaseAuthWrapper/authAdmin</code>](#module_FirebaseAuthWrapper/authAdmin)

| Param     | Type                | Description  |
| --------- | ------------------- | ------------ |
| pageSize  | <code>number</code> | default 1000 |
| pageToken | <code>object</code> | default null |

<a name="module_FirebaseAuthWrapper/authClient"></a>

## FirebaseAuthWrapper/authClient

A set of helper-wrapper functions around firebase firestore, storage
and auth. Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.

**Example**

```
import * as firebase from "firebase/app";
import "firebase/auth";
import FirebaseAuth from "@leaddreamer/firebase-wrapper/FirebaseAuthWrapper";
//the next is optional - if you want the React component
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {config} from "wherever-you-put-it";

((myconfig) {
try {
  firebase.app();
} catch (err) {
  firebase.initializeApp(myconfig);
}
FirebaseAuth(firebase, StyledFirebaseAuth);
})(config)
```

- [FirebaseAuthWrapper/authClient](#module_FirebaseAuthWrapper/authClient)
  - _static_
    - [.FirebaseAuth](#module_FirebaseAuthWrapper/authClient.FirebaseAuth) : <code>object</code>
    - [.FirebaseAuthSignInOptions](#module_FirebaseAuthWrapper/authClient.FirebaseAuthSignInOptions) : <code>string</code>
    - [.FirebaseAuthWrapper(firebase)](#module_FirebaseAuthWrapper/authClient.FirebaseAuthWrapper)
    - [.fetchToken(user)](#module_FirebaseAuthWrapper/authClient.fetchToken) ⇒ <code>external:promise</code>
    - [.fetchJWT(user)](#module_FirebaseAuthWrapper/authClient.fetchJWT) ⇒ <code>Promise.&lt;JWT&gt;</code>
    - [.refreshAuthUser()](#module_FirebaseAuthWrapper/authClient.refreshAuthUser) ⇒ <code>Promise.&lt;void&gt;</code>
    - [.doCreateUserWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper/authClient.doCreateUserWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
    - [.doSignInWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper/authClient.doSignInWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
    - [.doSignInWithGoogle()](#module_FirebaseAuthWrapper/authClient.doSignInWithGoogle)
    - [.doSignInWithFacebook()](#module_FirebaseAuthWrapper/authClient.doSignInWithFacebook)
    - [.doSignInWithTwitter()](#module_FirebaseAuthWrapper/authClient.doSignInWithTwitter)
    - [.doSignOut()](#module_FirebaseAuthWrapper/authClient.doSignOut)
    - [.doPasswordReset()](#module_FirebaseAuthWrapper/authClient.doPasswordReset)
    - [.doSendEmailVerification()](#module_FirebaseAuthWrapper/authClient.doSendEmailVerification)
    - [.doPasswordUpdate()](#module_FirebaseAuthWrapper/authClient.doPasswordUpdate)
    - [.createAnonymousUser()](#module_FirebaseAuthWrapper/authClient.createAnonymousUser) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
    - [.attachAuthUserListener()](#module_FirebaseAuthWrapper/authClient.attachAuthUserListener) ⇒ <code>callback</code>
    - [.setPersistence()](#module_FirebaseAuthWrapper/authClient.setPersistence)
  - _inner_
    - [~fromJSON()](#module_FirebaseAuthWrapper/authClient..fromJSON) : <code>object</code>
    - [~AdditionalUserInfo](#module_FirebaseAuthWrapper/authClient..AdditionalUserInfo) : <code>object</code>
    - [~User](#module_FirebaseAuthWrapper/authClient..User) : <code>object</code>
    - [~UserCredential](#module_FirebaseAuthWrapper/authClient..UserCredential) : <code>object</code>
    - [~AuthChangeProcess](#module_FirebaseAuthWrapper/authClient..AuthChangeProcess) : <code>function</code>

<a name="module_FirebaseAuthWrapper/authClient.FirebaseAuth"></a>

### FirebaseAuthWrapper/authClient.FirebaseAuth : <code>object</code>

**Kind**: static property of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.FirebaseAuthSignInOptions"></a>

### FirebaseAuthWrapper/authClient.FirebaseAuthSignInOptions : <code>string</code>

**Kind**: static property of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.FirebaseAuthWrapper"></a>

### FirebaseAuthWrapper/authClient.FirebaseAuthWrapper(firebase)

Initializes the Auth service of the provided
firebase app. Also instantiates various constants and
helper functions

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)

| Param    | Type                  |
| -------- | --------------------- |
| firebase | <code>firebase</code> |

<a name="module_FirebaseAuthWrapper/authClient.fetchToken"></a>

### FirebaseAuthWrapper/authClient.fetchToken(user) ⇒ <code>external:promise</code>

fetches our specific custom claim values from firebase auth

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
**Fulfil**: Returns a user token object
**Reject**: returns err

| Param | Type                          |
| ----- | ----------------------------- |
| user  | <code>FirebaseAuthUser</code> |

<a name="module_FirebaseAuthWrapper/authClient.fetchJWT"></a>

### FirebaseAuthWrapper/authClient.fetchJWT(user) ⇒ <code>Promise.&lt;JWT&gt;</code>

Fetch a JWT token for authenticated signed requests

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
**Fulfil**: Returnsa JWT token
**Reject**: returns an err

| Param | Type                          |
| ----- | ----------------------------- |
| user  | <code>FirebaseAuthUser</code> |

<a name="module_FirebaseAuthWrapper/authClient.refreshAuthUser"></a>

### FirebaseAuthWrapper/authClient.refreshAuthUser() ⇒ <code>Promise.&lt;void&gt;</code>

triggers an update of the Firebase Auth user object. A listener
can be set to monitor these changes

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.doCreateUserWithEmailAndPassword"></a>

### FirebaseAuthWrapper/authClient.doCreateUserWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>

Creates AND SIGNS IN an authenticated user with the provided email and password
Creates a new user account associated with the specified email
address and password.
On successful creation of the user account, this user will also be
signed in to your application.
User account creation can fail if the account already exists or the
password is invalid.
Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)

| Param    | Type                |
| -------- | ------------------- |
| email    | <code>string</code> |
| password | <code>string</code> |

<a name="module_FirebaseAuthWrapper/authClient.doSignInWithEmailAndPassword"></a>

### FirebaseAuthWrapper/authClient.doSignInWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>

SIGNS IN an existing authenticated user with the provided email and password
Creates a new user account associated with the specified email
address and password.
On successful creation of the user account, this user will also be
signed in to your application.
User account creation can fail if the account already exists or the
password is invalid.
Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)

| Param    | Type                |
| -------- | ------------------- |
| email    | <code>string</code> |
| password | <code>string</code> |

<a name="module_FirebaseAuthWrapper/authClient.doSignInWithGoogle"></a>

### FirebaseAuthWrapper/authClient.doSignInWithGoogle()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.doSignInWithFacebook"></a>

### FirebaseAuthWrapper/authClient.doSignInWithFacebook()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.doSignInWithTwitter"></a>

### FirebaseAuthWrapper/authClient.doSignInWithTwitter()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.doSignOut"></a>

### FirebaseAuthWrapper/authClient.doSignOut()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.doPasswordReset"></a>

### FirebaseAuthWrapper/authClient.doPasswordReset()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.doSendEmailVerification"></a>

### FirebaseAuthWrapper/authClient.doSendEmailVerification()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.doPasswordUpdate"></a>

### FirebaseAuthWrapper/authClient.doPasswordUpdate()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.createAnonymousUser"></a>

### FirebaseAuthWrapper/authClient.createAnonymousUser() ⇒ <code>Promise.&lt;UserCredential&gt;</code>

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient.attachAuthUserListener"></a>

### FirebaseAuthWrapper/authClient.attachAuthUserListener() ⇒ <code>callback</code>

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
**Returns**: <code>callback</code> - unsubscribe function
**Properties**

| Name | Type                           |
| ---- | ------------------------------ |
| next | <code>AuthChangeProcess</code> |

<a name="module_FirebaseAuthWrapper/authClient.setPersistence"></a>

### FirebaseAuthWrapper/authClient.setPersistence()

**Kind**: static method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient..fromJSON"></a>

### FirebaseAuthWrapper/authClient~fromJSON() : <code>object</code>

**Kind**: inner method of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
**Properties**

| Name         | Type                |
| ------------ | ------------------- |
| providerId   | <code>string</code> |
| signInMethod | <code>string</code> |

<a name="module_FirebaseAuthWrapper/authClient..AdditionalUserInfo"></a>

### FirebaseAuthWrapper/authClient~AdditionalUserInfo : <code>object</code>

**Kind**: inner typedef of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
**Properties**

| Name       | Type                 |
| ---------- | -------------------- |
| isNewUser  | <code>boolean</code> |
| profile    | <code>object</code>  |
| providerId | <code>string</code>  |
| username   | <code>string</code>  |

<a name="module_FirebaseAuthWrapper/authClient..User"></a>

### FirebaseAuthWrapper/authClient~User : <code>object</code>

See https://firebase.google.com/docs/reference/js/firebase.User

**Kind**: inner typedef of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
<a name="module_FirebaseAuthWrapper/authClient..UserCredential"></a>

### FirebaseAuthWrapper/authClient~UserCredential : <code>object</code>

**Kind**: inner typedef of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)
**Properties**

| Name               | Type                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| additionalUserInfo | <code>AdditionalUserInfo</code>                                                                             |
| credential         | <code>AuthCredential</code>                                                                                 |
| operationType      | <code>&quot;signin&quot;</code> \| <code>&quot;link&quot;</code> \| <code>&quot;reauthenticate&quot;</code> |
| user               | <code>&quot;User&quot;</code>                                                                               |

<a name="module_FirebaseAuthWrapper/authClient..AuthChangeProcess"></a>

### FirebaseAuthWrapper/authClient~AuthChangeProcess : <code>function</code>

**Kind**: inner typedef of [<code>FirebaseAuthWrapper/authClient</code>](#module_FirebaseAuthWrapper/authClient)

| Param | Type              |
| ----- | ----------------- |
| user  | <code>User</code> |

---

&copy; 2020-2021 Tracy Hall
