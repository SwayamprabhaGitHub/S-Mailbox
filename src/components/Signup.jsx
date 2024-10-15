import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalContext from "../store/modal-context";
import Modal from "../UI/Modal";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const modalCtx = useContext(ModalContext);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    passwordFormat: false,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Validation for empty fields
    setErrors({
      email: email === "",
      password: password === "",
      confirmPassword: confirmPassword === "",
      passwordFormat: password.length < 6,
    });

    if (!email || !password || !confirmPassword) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const signUpHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqqDphsLF4JNB6LVS9CUOsAfnBdm_KxSU",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.error.message || "Sign up failed");
        }
        modalCtx.showModal({
          title: "Sign Up Successful",
          message: "You can login now",
        });
      } catch(error) {
        modalCtx.showModal({
            title: "Sign Up Failed",
            message: error.message || "Something went wrong!",
          });
      }
    };
    signUpHandler();

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <>
    {modalCtx.modalMsg && <Modal />}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.passwordFormat && !errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be 6 characters long
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              ref={confirmPasswordRef}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Confirm password is required
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/")}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
