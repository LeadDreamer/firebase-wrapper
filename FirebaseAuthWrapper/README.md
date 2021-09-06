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
<dt><a href="#module_FirebaseAuthWrapper">FirebaseAuthWrapper</a></dt>
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

<a name="module_FirebaseAuthWrapper"></a>

## FirebaseAuthWrapper

A set of helper-wrapper functions around firebase firestore, storage
and auth. Intent is to treat Firestore as a hierarchical
record-oriented database; originally conceived to port from one
database to another.

- [FirebaseAuthWrapper](#module_FirebaseAuthWrapper)
  - _static_
    - [.FirebaseAuth](#module_FirebaseAuthWrapper.FirebaseAuth) : <code>object</code>
    - [.FirebaseAuthSignInOptions](#module_FirebaseAuthWrapper.FirebaseAuthSignInOptions) : <code>string</code>
    - [.FirebaseAuthWrapper(firebase)](#module_FirebaseAuthWrapper.FirebaseAuthWrapper)
    - [.fetchToken(user)](#module_FirebaseAuthWrapper.fetchToken) ⇒ <code>external:promise</code>
    - [.fetchJWT(user)](#module_FirebaseAuthWrapper.fetchJWT) ⇒ <code>Promise.&lt;JWT&gt;</code>
    - [.refreshAuthUser()](#module_FirebaseAuthWrapper.refreshAuthUser) ⇒ <code>Promise.&lt;void&gt;</code>
    - [.doCreateUserWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper.doCreateUserWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
    - [.doSignInWithEmailAndPassword(email, password)](#module_FirebaseAuthWrapper.doSignInWithEmailAndPassword) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
    - [.doSignInWithGoogle()](#module_FirebaseAuthWrapper.doSignInWithGoogle)
    - [.doSignInWithFacebook()](#module_FirebaseAuthWrapper.doSignInWithFacebook)
    - [.doSignInWithTwitter()](#module_FirebaseAuthWrapper.doSignInWithTwitter)
    - [.doSignOut()](#module_FirebaseAuthWrapper.doSignOut)
    - [.doPasswordReset()](#module_FirebaseAuthWrapper.doPasswordReset)
    - [.doSendEmailVerification()](#module_FirebaseAuthWrapper.doSendEmailVerification)
    - [.doPasswordUpdate()](#module_FirebaseAuthWrapper.doPasswordUpdate)
    - [.createAnonymousUser()](#module_FirebaseAuthWrapper.createAnonymousUser) ⇒ <code>Promise.&lt;UserCredential&gt;</code>
    - [.attachAuthUserListener()](#module_FirebaseAuthWrapper.attachAuthUserListener) ⇒ <code>callback</code>
    - [.setPersistence()](#module_FirebaseAuthWrapper.setPersistence)
  - _inner_
    - [~fromJSON()](#module_FirebaseAuthWrapper..fromJSON) : <code>object</code>
    - [~AdditionalUserInfo](#module_FirebaseAuthWrapper..AdditionalUserInfo) : <code>object</code>
    - [~User](#module_FirebaseAuthWrapper..User) : <code>object</code>
    - [~UserCredential](#module_FirebaseAuthWrapper..UserCredential) : <code>object</code>
    - [~AuthChangeProcess](#module_FirebaseAuthWrapper..AuthChangeProcess) : <code>function</code>

<a name="module_FirebaseAuthWrapper.FirebaseAuth"></a>

### FirebaseAuthWrapper.FirebaseAuth : <code>object</code>

**Kind**: static property of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.FirebaseAuthSignInOptions"></a>

### FirebaseAuthWrapper.FirebaseAuthSignInOptions : <code>string</code>

**Kind**: static property of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.FirebaseAuthWrapper"></a>

### FirebaseAuthWrapper.FirebaseAuthWrapper(firebase)

Initializes the Auth service of the provided
firebase app. Also instantiates various constants and
helper functions

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)

| Param    | Type                  |
| -------- | --------------------- |
| firebase | <code>firebase</code> |

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

<a name="module_FirebaseAuthWrapper.fetchToken"></a>

### FirebaseAuthWrapper.fetchToken(user) ⇒ <code>external:promise</code>

fetches our specific custom claim values from firebase auth

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
**Fulfil**: Returns a user token object
**Reject**: returns err

| Param | Type                          |
| ----- | ----------------------------- |
| user  | <code>FirebaseAuthUser</code> |

<a name="module_FirebaseAuthWrapper.fetchJWT"></a>

### FirebaseAuthWrapper.fetchJWT(user) ⇒ <code>Promise.&lt;JWT&gt;</code>

Fetch a JWT token for authenticated signed requests

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
**Fulfil**: Returnsa JWT token
**Reject**: returns an err

| Param | Type                          |
| ----- | ----------------------------- |
| user  | <code>FirebaseAuthUser</code> |

<a name="module_FirebaseAuthWrapper.refreshAuthUser"></a>

### FirebaseAuthWrapper.refreshAuthUser() ⇒ <code>Promise.&lt;void&gt;</code>

triggers an update of the Firebase Auth user object. A listener
can be set to monitor these changes

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.doCreateUserWithEmailAndPassword"></a>

### FirebaseAuthWrapper.doCreateUserWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>

Creates AND SIGNS IN an authenticated user with the provided email and password
Creates a new user account associated with the specified email
address and password.
On successful creation of the user account, this user will also be
signed in to your application.
User account creation can fail if the account already exists or the
password is invalid.
Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)

| Param    | Type                |
| -------- | ------------------- |
| email    | <code>string</code> |
| password | <code>string</code> |

<a name="module_FirebaseAuthWrapper.doSignInWithEmailAndPassword"></a>

### FirebaseAuthWrapper.doSignInWithEmailAndPassword(email, password) ⇒ <code>Promise.&lt;UserCredential&gt;</code>

SIGNS IN an existing authenticated user with the provided email and password
Creates a new user account associated with the specified email
address and password.
On successful creation of the user account, this user will also be
signed in to your application.
User account creation can fail if the account already exists or the
password is invalid.
Note: The email address acts as a unique identifier for the user and enables an email-based password reset. This function will create a new user account and set the initial user password.

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)

| Param    | Type                |
| -------- | ------------------- |
| email    | <code>string</code> |
| password | <code>string</code> |

<a name="module_FirebaseAuthWrapper.doSignInWithGoogle"></a>

### FirebaseAuthWrapper.doSignInWithGoogle()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.doSignInWithFacebook"></a>

### FirebaseAuthWrapper.doSignInWithFacebook()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.doSignInWithTwitter"></a>

### FirebaseAuthWrapper.doSignInWithTwitter()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.doSignOut"></a>

### FirebaseAuthWrapper.doSignOut()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.doPasswordReset"></a>

### FirebaseAuthWrapper.doPasswordReset()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.doSendEmailVerification"></a>

### FirebaseAuthWrapper.doSendEmailVerification()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.doPasswordUpdate"></a>

### FirebaseAuthWrapper.doPasswordUpdate()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.createAnonymousUser"></a>

### FirebaseAuthWrapper.createAnonymousUser() ⇒ <code>Promise.&lt;UserCredential&gt;</code>

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper.attachAuthUserListener"></a>

### FirebaseAuthWrapper.attachAuthUserListener() ⇒ <code>callback</code>

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
**Returns**: <code>callback</code> - unsubscribe function
**Properties**

| Name | Type                           |
| ---- | ------------------------------ |
| next | <code>AuthChangeProcess</code> |

<a name="module_FirebaseAuthWrapper.setPersistence"></a>

### FirebaseAuthWrapper.setPersistence()

**Kind**: static method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper..fromJSON"></a>

### FirebaseAuthWrapper~fromJSON() : <code>object</code>

**Kind**: inner method of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
**Properties**

| Name         | Type                |
| ------------ | ------------------- |
| providerId   | <code>string</code> |
| signInMethod | <code>string</code> |

<a name="module_FirebaseAuthWrapper..AdditionalUserInfo"></a>

### FirebaseAuthWrapper~AdditionalUserInfo : <code>object</code>

**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
**Properties**

| Name       | Type                 |
| ---------- | -------------------- |
| isNewUser  | <code>boolean</code> |
| profile    | <code>object</code>  |
| providerId | <code>string</code>  |
| username   | <code>string</code>  |

<a name="module_FirebaseAuthWrapper..User"></a>

### FirebaseAuthWrapper~User : <code>object</code>

See https://firebase.google.com/docs/reference/js/firebase.User

**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
<a name="module_FirebaseAuthWrapper..UserCredential"></a>

### FirebaseAuthWrapper~UserCredential : <code>object</code>

**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)
**Properties**

| Name               | Type                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| additionalUserInfo | <code>AdditionalUserInfo</code>                                                                             |
| credential         | <code>AuthCredential</code>                                                                                 |
| operationType      | <code>&quot;signin&quot;</code> \| <code>&quot;link&quot;</code> \| <code>&quot;reauthenticate&quot;</code> |
| user               | <code>&quot;User&quot;</code>                                                                               |

<a name="module_FirebaseAuthWrapper..AuthChangeProcess"></a>

### FirebaseAuthWrapper~AuthChangeProcess : <code>function</code>

**Kind**: inner typedef of [<code>FirebaseAuthWrapper</code>](#module_FirebaseAuthWrapper)

| Param | Type              |
| ----- | ----------------- |
| user  | <code>User</code> |

---

&copy; 2020-2021 Tracy Hall

| Param | Type              |
| ----- | ----------------- |
| user  | <code>User</code> |

---

&copy; 2020-2021 Tracy Hall
