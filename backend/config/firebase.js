const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientId: process.env.FIREBASE_CLIENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = { app, auth };
