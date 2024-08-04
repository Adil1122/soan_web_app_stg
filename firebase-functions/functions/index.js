/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const { Message } = require("firebase-functions/v1/pubsub");
const { db } = require("./config/firebase");
const corsModule = require('cors');
const cors = corsModule({origin: true});
//const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

 exports.helloWorld = onRequest((request, response) => {
   //logger.info("Hello logs!", {structuredData: true});
   console.log(request.query.qr_code) 
   
   var qr_code = request.query.qr_code;

   cors(request, response, async () => {

        try {

            const usersRef = db.ref('users');
            var userData = [];

            usersRef.once("value", function(snapshot) {
                snapshot.forEach((data) => {
                    var data_val = data.val();
                    if(data_val.qr_code === qr_code) {
                        userData = data_val;
                    }
                });
                if(userData.length === 0) {
                    response.status(200).send({
                        status: "error",
                        Message: "user not found",
                        data: {userData}
                    });
                } else {
                    response.status(200).send({
                        status: "success",
                        Message: "user found successfully.",
                        data: {userData}
                    });
                }
            });

        } catch (error) {
            res.status(500).send(error.Message);
        }

    })

 });
