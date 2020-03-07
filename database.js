const admin = require("firebase-admin");
const serviceAccount = require("./firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pears-cceee.firebaseio.com"
});

const database = admin.database();

module.exports = database;
