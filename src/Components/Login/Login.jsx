import React from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { useState } from "react";
import { useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const Email = e.target.email.value;
    const Password = e.target.password.value;
    console.log("login", Email, Password);

    setError("");

    signInWithEmailAndPassword(auth, Email, Password)
      .then((result) => {
        const user = result.user;
        console.log("logged in user", user);
        if(!user.emailVerified){
            alert("Your email is not verified. Please verify your email before login.");
            return;
        }
      })
      .catch((error) => {
        console.error("error", error);
        setError(error.message);
      });
  };

const handleForgetPassword = () =>{
    const email= emailRef.current.value
    console.log("forget password",email);
    sendPasswordResetEmail(auth, email)
    .then(()=>{
        alert("Password reset email sent. Please check your inbox.")
    })
    .catch( error =>{
        console.error("reset error", error);
    }
    )
}

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form action="" onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  ref={emailRef}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div onClick={handleForgetPassword} className="label">
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <p>
              New to our website? Please{" "}
              <Link to="/register" className="text-blue-500 underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
