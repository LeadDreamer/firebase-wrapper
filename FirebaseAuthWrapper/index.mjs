import FirebaseAuthAdminWrapper from "./authAdmin";
import FirebaseAuthWrapperClient from "./authClient";

export default function FirebaseAuthWrapper(firebase, config){
  if (!config?.appId) {
     FirebaseAuthAdminWrapper(firebase);
  } else {
    FirebaseAuthWrapperClient(firebase);
  }
}

export * from "./authClient";
export * from "./authAdmin";
