import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";



export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIN = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
     .auth()
     .signInWithPopup(provider)
     .then((res) => {
       const { displayName, email, photoUrl } = res.user;
       const signInUser = {
         isSignIn: true,
         name: displayName,
         email: email,
         photo: photoUrl,
         success: true
       };
       return signInUser;
     })
     .catch((err) => {
       console.log(err);
       console.log(err.message);
     });
 };

 export const handleSignOut = () => {
   return firebase
     .auth()
     .signOut()
     .then((res) => {
       const userSignOut = {
         isSignIn: false,
         name: "",
         email: "",
         password: "",
         error: "",
         success: false,
         photo: "",
       };
       return userSignOut;
     })

     .catch((err) => {
       console.log(err);
     });
 };

 export const createUserWithEmailAndPassword = (name, email, password) => {
     return  firebase
       .auth()
       .createUserWithEmailAndPassword(email, password)
       .then((res) => {
         console.log(res);
         const newUserInfo = res.user;
         newUserInfo.error = " ";
         newUserInfo.success = true;
         updateUserName(name);
         return newUserInfo;
       })
       .catch((error) => {
         // Handle Errors here.
         const newUserInfo = {};
         newUserInfo.error = error.message;
         newUserInfo.success = false;
         return newUserInfo;
         
       });
 }

 export const  signInWithEmailAndPassword = (email, password) => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = " ";
          newUserInfo.success = true;
          return newUserInfo;
        })
        .catch(function (error) {
          // Handle Errors here.
          const newUserInfo = {  };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
          // ...
        });
    
 }

 const updateUserName = (name) => {
   const user = firebase.auth().currentUser;

   user
     .updateProfile({
       displayName: name,
     })
     .then(function () {
       console.log("User name updated successfully");
     })
     .catch(function (error) {
       console.log(error);
     });
 };