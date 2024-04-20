import multer from 'multer';

// SAVE THE FILE IN LOCALSTORAGE
 export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// export default storage;

// storage.js

// import firebase from 'firebase';
// import firebaseConfig from '../config/firebaseConfig.js';

// // Initialize Firebase with your configuration
// firebase.initializeApp(firebaseConfig);

// // Create a storage reference
// const storage = firebase.storage().ref();

// export default storage;









