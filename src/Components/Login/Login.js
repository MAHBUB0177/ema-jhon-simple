import React, { useContext } from 'react';



import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { UserContext } from '../../App';
firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [logedInUser, setLogedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    isLogIn: 'false',
    name: "",
    email: '',
    photo: "",
    error: '',
    success: '',

  })




  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {

        const { email, name, picture } = res.additionalUserInfo.profile;
        const signedInUser = {
          isLogIn: 'true',
          name: name,
          email: email,
          photo: picture

        }
        setUser(signedInUser)
        // const {email,name,given_name}=res.profile;
        console.log(res.additionalUserInfo.profile.email)
      })
      .catch(err => {
        console.log(err)

      })
  };

  const handelSignOut = () => {
    console.log('ok')
    firebase.auth().signOut()
      .then(res => {
        const signedOut = {
          isLogIn: 'false',
          name: '',
          email: '',
          password: '',
          photo: " "

        }
        setUser(signedOut)
      })
  }

  const handelcahnge = (event) => {
    // console.log(event.target.value)

    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === "password") {
      const passValidate = event.target.value.length > 8;
      const isPassVlidate = /\d{1}/.test(event.target.value)
      isFieldValid = passValidate && isPassVlidate;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)

    }

  }

  const formSubmit = (e) => {

    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          console.log(res)
          const newUserInfo = { ...user };
          // newUserInfo.error=''
          newUserInfo.success = true;
          // setLogedInUser(newUserInfo)
          updateName(user.name)

        })
        .catch(error => {
          console.log(error)
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo)
        })
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // console.log(res)
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = 'true';
          setUser(newUserInfo)
          setLogedInUser(newUserInfo)
          console.log('sign in user info', user.email)

        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo)


        })

    }
    e.preventDefault();

  }


  function updateName(name) {
    const user = firebase.auth().currentUser;
    // console.log(user)
    user.updateProfile({
      displayName: name
    })
      .then(res => {
        console.log("user name update successfuly", res)
      })
      .catch(error => {
        console.log(error)
      })
  }


  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user)
      })
      .catch((error) => {
        console.log(error)

      })

  }


  let divStyle = {
    backgroundColor: 'gray',
    width: '800px',
    textAlign: 'center',
    float: 'left',
    marginLeft: '250px'
  }

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "10px" }}>
      {/* {
        user.isLogIn ? <button onClick={handelSignOut}>signOut</button> : <button onClick={handleSignIn}>SignIn</button>

      } */}


      <button onClick={handleSignIn} style={{ backgroundColor: 'rgb(140,119,169)' }}>SignIn with google</button>
      <br />
      <button onClick={handleFbSignIn} style={{ marginTop: '5px', backgroundColor: 'rgb(127,160,160)' }}>login with facebook</button>

      {
        user.isLogIn && <div>
          <h2>welcome,{user.name}</h2>
          <img src={user.photo} alt="" />
        </div>
      }

      <div style={divStyle}>
        <h1>welcome to authentication page</h1>
        <p>email:{user.email}</p>
        <p>password:{user.password}</p>
        <form onSubmit={formSubmit}>
          <div >
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser">New User Sign Up</label>
            <br />
            {newUser && <input type="text" name="username" placeholder="username" />}
            <br />
            <input type="email" onBlur={handelcahnge} name="email" placeholder="email" required />
            <br />
            <input type="password" name="password" onBlur={handelcahnge} placeholder="password" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required></input>
            <br />
            <input type="submit" value="submit" style={{ backgroundColor: '' }}></input>
          </div>
        </form>
        <p style={{ color: 'tomato', fontSize: '20px' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green', fontSize: '20px' }}>user {newUser ? 'created' : 'Logged in'} successfully</p>
        }
      </div>
    </div>
  );
}

export default Login;



