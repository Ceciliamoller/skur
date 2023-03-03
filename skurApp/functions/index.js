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
        pass: 'gruppe39'
    }
});

const mailOptions = {
    from: `skurapp39@gmail.com`,
    to: snap.data().email,
    subject: 'contact form message',
    html: `<h1>Order Confirmation</h1>
     <p> <b>Email: </b>${snap.data().email} </p>`
};

exports.removeTool = functions.firestore
  .document('tools/{docId}')
  .onUpdate(async (change, context) => {
      const newValue = change.after.data();

      // access a particular field as you would any JS property
      const ratingCount = newValue.ratingCount;
      const totalRating = newValue.totalRating;
      const average = totalRating/ratingCount;
      const email = newValue.creatorEmail;

      // perform desired operations ...
      if (average < 2.0 && ratingCount >= 3) {
        db.doc("tools/" + context.params.docId).delete().then(() => {
        })
      
      }
   });

exports.removeUser = functions.firestore
  .document('users/{docId}')
  .onUpdate(async (change, context) => {
      const newValue = change.after.data();

      // access a particular field as you would any JS property
      const numberOfUserRatings = newValue.numberOfUserRatings;
      const totalUserRating = newValue.totalUserRating;
      const averageUserRating = totalUserRating/numberOfUserRatings;
      const email = email;

      // perform desired operations ...
      if (averageUserRating < 2 && numberOfUserRatings >= 3) {
        db.doc("users/" + context.params.docId).delete().then(() => {
      }
      
   )}},

exports.deletedAd = functions.firestore
    .document('tools/{docId}')
    .onDelete((snap, context) => {

        const mailOptions = {
            from: `skurapp39@gmail.com`,
            to: snap.data().email,
            subject: 'Din annonse har blitt fjernet',
            html: `<h1>Annonse fjernet</h1>
                                <p>
                                   <b>Email: </b>${snap.data().email}<br>
                                </p>`
        };

        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    }),

exports.deletedUser = functions.firestore
    .document('users/{docId}')
    .onDelete((snap, context) => {

        const mailOptions = {
            from: `skurapp39@gmail.com`,
            to: snap.data().email,
            subject: 'Din bruker har blitt fjernet',
            html: `<h1>Bruker fjernet</h1>
                                <p>
                                   <b>Email: </b>${snap.data().email}<br>
                                </p>`
        };

        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    })

);
