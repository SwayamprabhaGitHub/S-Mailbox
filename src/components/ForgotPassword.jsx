import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalContext from "../store/modal-context";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const modalCtx = useContext(ModalContext);
  const navigate = useNavigate();

  const emailInputRef = useRef();

  const forgotPswrdFormHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const forgotPswrdHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDqqDphsLF4JNB6LVS9CUOsAfnBdm_KxSU",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        console.log(data);
        modalCtx.showModal({
          title: "Check your Mail",
          message: "We have sent you a mail for reseting your password",
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        modalCtx.showModal({
            title: "Couldn't change Password",
          message: error.message || "Something went wrong!",
        })
      } finally {
        setIsLoading(false);
      }
    };
    forgotPswrdHandler();
  };
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <form onSubmit={forgotPswrdFormHandler}>
          <div className="mb-6">
            <label
              htmlFor="forgotPswrdEmail"
              className="block text-gray-700 font-semibold mb-2"
            >
              Enter email:
            </label>
            <input
              type="email"
              id="forgotPswrdEmail"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ref={emailInputRef}
              required
            />
          </div>
          {isLoading && (
            <p className="text-blue-500 text-center mb-4">Loading...</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Reset my Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
