import FirebaseAuthAdminWrapper from "./authAdmin.js";
import FirebaseAuthClientWrapper from "./authClient.js";

export default function FirebaseAuthWrapper(firebase, config) {
  if (!config?.appId) {
    return FirebaseAuthAdminWrapper(firebase);
  } else {
    return FirebaseAuthClientWrapper(firebase);
  }
}

export * from "./authClient.js";
export * from "./authAdmin.js";
