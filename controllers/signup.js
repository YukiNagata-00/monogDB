//Firebaseの挑戦残骸・・・一応残しておく

// const firebase = require('firebase/app');
// require('firebase/auth');
// const  {getAuth , createUserWithEmailAndPassword} = require("firebase/auth");

// const admin = require("firebase-admin");

// const serviceAccount = require("../serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const firebaseConfig = {
//     apiKey: "AIzaSyDT6Ett7bKawVqO5z31DOVwNwi1AqbB6J4",
//     authDomain: "carbomeee.firebaseapp.com",
//     projectId: "carbomeee",
//     storageBucket: "carbomeee.appspot.com",
//     messagingSenderId: "896331260985",
//     appId: "1:896331260985:web:27aa92014867d9726cd9e8"
//   };

// const firebaseapp = firebase.initializeApp(firebaseConfig);
// const auth = getAuth(firebaseapp);

// const postSignup = (req, res) => {
//     console.log(req.body);
//     const {email, username, password} = req.body;
    
//     createUserWithEmailAndPassword( auth,email, password)
//         .then((userCredential) => {
//         const user = userCredential.user;
//         console.log(user);
//         res.json({message: 'User signed up successfully!'});
//         })
//         .catch((error) => {
//         const errorMessage = error.message;
//         console.log(errorMessage);
//         res.status(400).json({message: errorMessage});
//         });
// }
    // module.exports ={
    //     postSignup
    // }