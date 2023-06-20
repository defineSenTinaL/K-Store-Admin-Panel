import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount: ServiceAccount = {
  type: 'service_account',
  project_id: 'quincy-de7d5',
  private_key_id: 'def97205f1831a5fdc2d5f7788a043960379c0d8',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfsHwuueH0rEF2\nAYhKJ847NTAavaz7GIV0jt1zxtCC7262ZSMmhCNupwSQwuLX4dnCFuupA6AoRg7g\nUZB4V3JMUxMhZwWEOod/icqjMeefyOxLRIW/Nc5aZT11BNXTYTCYcvqr3Alo/3e7\n+tYLm1m8qveJxfPrDddX9xPcHC74tATyCDH5QGJU1p5GtmsRPClbGjYn2MZh8nzk\nW/Q2BzDfelmM3IAoh4rBpHvAsOzoDNyDHVE3nJWa6Nv444jyqWpjOJSsnFOKw2Cr\nDxMnF+dfGVd4gotfOpUAB7oUYE6RDvaMKNTy1/F+2Js15ajdfkncaMJswI8ruDHx\nsA3/4YexAgMBAAECggEAIokbGknmJbG5SImlTZBVSDXFDQt3ZSiU+DPLjfXx81dP\n5M9zrilGtnAViy8yuwijvReS6M8ZbIxWPEo3ieczl3EiAofSyBmWY01MD0ZENyjP\nfam4mTVMRv19MJkWm2v6BAZd0xw3xsb1QKjLcOAspKJ+/YNbsLqiF2qel2xa9js0\nytVpHGQmt7jzMjvLARn3493F9jt3TiVfvdLXPKx2R/ag0dQYzZj0pQbNiNI+nk8f\nyc1S8lO927zmQ8xvymuxoilyMWOQCSZMir6GHqX45X6bkkEE/sxujIekgDlznzxZ\nWeHfJfqPjHBboSZ5fxmzkVkG7Z2IBft1sPTvOWHnBwKBgQDcnwMvy6ZwBC7VKIBX\nMLAIZ+BkSDfw2JsmVTZh1TDL9qDjcT17evojHCyYhubNvOzXPMXCsqOMXSv5Ht90\no2BxcwCakbQN2ZQ2wpEqn1Oz3kdg2DjTJKFbVDoevGFhGO7pywpoxKcKFoHNULy7\nfH6GeerxLWvJ0Ami91lQUk22zwKBgQC5TBbT2l4UF9IY1v5TS1a1+0vrwZDJFK9v\n3Du93KqFz4Tx2cBCP1M5IylvSxjIRZTTMxYGE8je6dzkSLIKahSCvnmNoOK81V16\n3FgSNssZmmL9cm1eiXLv1binjAPOnb1UwP0GjthrFnK+qOmgc7d1X+XbmnHrmEnu\nwvMnTFR5fwKBgQCfmWDCyL5EtqHyjfQaHxyZWBwaL6xYTTofxvEqYQGF64qEPr1N\ngK9HivAv/xckqpFjO5GMwZJSzmwrMcxRIod4SsubBeCNTGNOIf7GKLBypFBanNCu\n3gbkfM/2wCxqA5GCC+Ih3HFCePm5v7hooS0etz/g7QzW1+rAu9MeqguSPQKBgAUu\nA1VYvViCcfUPzXw2lu3vYGfuuUVltqHB3kmoaXvkGStJkv5HFuR5/yaFSuQOTeK5\ngtwYoXzZvLsE7TUtUfV1raAv5yawMDTHBA8+SN8mWa4MDNKftP7PUqIcX97eufQs\nkOYmCBa2Qe7ieeVqVq6JR7ujzZtwXmC2QmXO1G2xAoGAN7NWtfnRb1Pt7nni2jK1\negtffr148pXKlhWZIYCpT9EJjt309R/ui0bLn6du9zxt9TXo0O51SSKMd97odx+t\n9XfYst58dWqElh8jrcTX/uDLRG/afXmd6XzURWRxqz1nbZQCFxIXbSp68ZLhsryu\nLaK3lLIty7hptywnM4Qzucs=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-yfs00@quincy-de7d5.iam.gserviceaccount.com',
  client_id: '101574042961534138816',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yfs00%40quincy-de7d5.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
} as admin.ServiceAccount;

const firebaseParams: admin.AppOptions = {
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(firebaseParams);

export default admin;
