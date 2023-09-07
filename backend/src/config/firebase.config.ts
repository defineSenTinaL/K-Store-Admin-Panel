import * as admin from 'firebase-admin';
import * as serviceAccount from './fbServiceAccountKey.json'; // Note the *as* keyword

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;

// import * as admin from 'firebase-admin';
// import { ServiceAccount } from 'firebase-admin';

// const serviceAccount: ServiceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY,
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URL,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_URL,
//   universe_domain: process.env.FIREBASE_DOMAIN,
// } as admin.ServiceAccount;

// const firebaseParams: admin.AppOptions = {
//   credential: admin.credential.cert(serviceAccount),
// };

// admin.initializeApp(firebaseParams);

// export default admin;
