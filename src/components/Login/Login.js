import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


firebase.initializeApp(firebaseConfig);

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const handleSignIN = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoUrl } = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoUrl,
        };
        setUser(signInUser);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleSignOut = () => {
    firebase
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
        setUser(userSignOut);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      const email = event.target.value;
      const regex = /\S+@\S+\.\S+/;
      isFieldValid = regex.test(email);
    }

    if (event.target.name === "password") {
      const password = event.target.value;
      const isPasswordValid = password.length > 6;
      const passwordHasNumber = /\d{1}/.test(password);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = " ";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          // Handle Errors here.
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ...
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = " ";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("Sign in user info", res.user);
        })
        .catch(function (error) {
          // Handle Errors here.
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ...
        });
    }
    event.preventDefault();
  };

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
  return (
    <div style = {{textAlign: "center"}}>
      {user.isSignIn ? (
        <button onClick={handleSignOut}>sign out</button>
      ) : (
        <button onClick={handleSignIN}>sign in</button>
      )}
      {user.isSignIn && <h3>Welcome {user.name}</h3>}

      <h1>Our own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUer"
        id=""
      />
      <label htmlFor="newUser"> New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleChange}
            required
            placeholder="Your name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleChange}
          placeholder="Email address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleChange}
          placeholder="Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}> {user.error} </p>
      {user.success && (
        <p style={{ color: "green" }}>
          {" "}
          User {newUser ? "Created" : "Logged In"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
