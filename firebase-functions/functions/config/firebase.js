const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const { databaseURL } = require("firebase-functions/params");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://soan-web-app-stg-default-rtdb.asia-southeast1.firebasedatabase.app`
});
const db = admin.database();

module.exports = { admin, db }