import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config'
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ setAuth }) {
  const navigate = useNavigate();
  let registerEmail = "";
  let registerPassword = "";
  let repeatPassword = "";


  function navig() {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, 1500);
    }).then(function () {
      navigate(-3);
      setAuth(true);
    });
  }

  function register() {
    if (registerPassword === repeatPassword) {
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then(() => {
          document.querySelector(".login-email").value = "";
          document.querySelector(".password-input").value = "";
          document.querySelector(".repeat-password").value = "";
          document.querySelector(".error-message").innerHTML = 'Success';
          navig();
        })
        .catch(err => {
          document.querySelector(".error-message").innerHTML = 'The email or password is incorrect.';
        })
    }
    else {
      document.querySelector(".error-message").innerHTML = 'Write same password to repeat password filed!';
    }
  }


  return (
    <form className="login" >
      <div className="register-form">

        <h1 className='register_header'>Create account</h1>

        <h4 className='error-message'></h4>

        <h6>Email</h6>

        <input className='login-email' style={{ width: "100%" }} onChange={event => { registerEmail = event.target.value }}></input>

        <h6>Password</h6>

        <input type={'password'} className='password-input' style={{ width: "100%" }} onChange={event => { registerPassword = event.target.value }}></input>

        <h6>Repeat Password</h6>

        <input type={'password'} className='repeat-password' style={{ width: "100%" }} onChange={event => { repeatPassword = event.target.value }}></input>

        <input className='sign_button' type="button" value="Create" style={{ display: "block" }} onClick={register} />

        <p>
          <Link to='/login'>Sign In</Link>
        </p>

      </div>
    </form>
  )
}