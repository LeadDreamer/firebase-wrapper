import FirebaseAuthAdminWrapper from "./authAdmin.js";
import FirebaseAuthClientWrapper from "./authClient.js";

export default async function FirebaseAuthWrapper(
  firebase,
  config,
  thisLogger
) {
  if (!config?.appId) {
    thisLogger("Auth Admin");
    return FirebaseAuthAdminWrapper(firebase);
  } else {
    thisLogger("Auth Client");
    return FirebaseAuthClientWrapper(firebase);
  }
}

export * from "./authClient.js";
export * from "./authAdmin.js";
