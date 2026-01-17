import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const Email = e.target.email.value;
    const Password = e.target.password.value;
    const Terms = e.target.terms.checked;
    console.log("register", Email, Password, Terms);

    //reset success
    setSuccess(false);
    //reset error
    setError("");

    if (!Terms) {
      setError("You must accept the terms and conditions");
      return;
    }

    // const passwordPattern =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
    // if (!passwordPattern.test(Password)) {
    //   setError("Password must be at least 6 characters long");
    //   return;
    // }

    createUserWithEmailAndPassword(auth, Email, Password)
      .then((result) => {
        const user = result.user;
        console.log("created user", user);
        setSuccess(true);
        e.target.reset();
        //send verification email
        sendEmailVerification(user)
          .then(() => {
            alert("Please check your email for verification");
          })
          .catch((error) => {
            console.error("verification error", error);
          });
      })
      .catch((error) => {
        console.error("error", error);
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form action="" onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                  />
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input"
                      placeholder="Password"
                    />
                    <button
                      onClick={handleTogglePassword}
                      className="btn btn-xs absolute right-6 top-2"
                    >
                      {showPassword ? <FaEye /> : <IoEyeOff />}
                    </button>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <label className="label">
                      <input
                        type="checkbox"
                        name="terms"
                        defaultChecked
                        className="checkbox"
                      />
                      Accept our terms and conditions
                    </label>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Register</button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  {success && (
                    <p className="text-green-500 mt-2">
                      User created successfully{" "}
                    </p>
                  )}
                </fieldset>
              </form>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
