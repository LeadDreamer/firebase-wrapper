import FirebaseAuthAdminWrapper from "./authAdmin";
import FirebaseAuthClientWrapper from "./authClient";

export default function FirebaseAuthWrapper(firebase, config){
  if (!config?.appId) {
     return FirebaseAuthAdminWrapper(firebase);
  } else {
    return FirebaseAuthClientWrapper(firebase);
  }
}

export * from "./authClient";
export * from "./authAdmin";
