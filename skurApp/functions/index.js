const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'skurapp39@gmail.com',
        pass: 'gsfeferwjxpdyznf'
    }
});


function sendMail(recipient, subject, text) {
    console.log("SENDING MAIL");
    return transporter.sendMail({
        sender: "SKUR <skurapp39@gmail.com>",
        to: recipient,
        subject: subject,
        text: text
        })
}

exports.removeTool = functions.firestore
  .document('tools/{docId}')
  .onUpdate(async (change, context) => {
      const newValue = change.after.data();

      // access a particular field as you would any JS property
      const ratingCount = newValue.ratingCount;
      const totalRating = newValue.totalRating;
      const average = totalRating/ratingCount;

      // perform desired operations ...
      if (average < 2.0 && ratingCount >= 3) {
        db.doc("tools/" + context.params.docId).delete().then(() => {
            sendMail(newValue.creatorEmail, newValue.toolName + "has been removed", "Your tool has been removed from skur due to bad ratings from other users.")
        })
      
      }
   });

exports.removeUser = functions.firestore
  .document('users/{docId}')
  .onUpdate(async (change, context) => {
      const newValue = change.after.data();

      const numberOfUserRatings = newValue.numberOfUserRatings;
      const totalUserRating = newValue.totalUserRating;
      const averageUserRating = totalUserRating/numberOfUserRatings;

      if (averageUserRating < 2 && numberOfUserRatings >= 3) {
        const dbQuery = db.collection("tools").where("creator", "==", context.params.docId)
            db.doc("users/" + context.params.docId).delete().then(() => {

                dbQuery.get().then((snap) => {
                    snap.forEach((doc) => {
                        doc.ref.delete()
                    })
                })
                admin.auth().deleteUser(context.params.docId);
                sendMail(newValue.email, "Your user has been removed", "Your user has been removed from Skur due to bad ratings from other users.")
            }) 
        
      }
    
});

exports.addUserToDatabase = functions.auth.user().onCreate((user) => {
    const email = user.email;
    const displayName = user.displayName;
    const photo = user.photoURL;

    db.collection("users").doc(user.uid).set({
        name: displayName,
        email,
        photo,
        totalUserRating: 0,
        numberOfUserRatings: 0
    })
  });