import FirebaseAuthAdminWrapper from "./authAdmin";
import FirebaseAuthWrapper from "./authClient";

export default function(firebase, config){
  if (!config?.appId) {
     FirebaseAuthAdminWrapper(firebase);
  } else {
    FirebaseAuthWrapper(firebase);
  }
}

export * from "./authClient";
export * from "./authAdmin";
