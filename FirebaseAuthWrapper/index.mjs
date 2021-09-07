import FirebaseAuthAdminWrapper from "./authAdmin";
import FirebaseAuthWrapper from "./authClient";

export default function(firebase, config){
  if (config?.appId) {
    return FirebaseAuthAdminWrapper(firebase);
  } else {
    FirebaseAuthWrapper(firebase);
  }
}

export * from "./authAdmin";
export * from "./authClient";
