import axios from "axios";
import React from "react";
import Layout from "../layout/index";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { LayoutContext } from "../index";

const FResetPassword = (props) => {
  const { dispatch } = useContext(LayoutContext);
  const history = useHistory();

  const [message, setMessage] = useState(false);
  const [ismessage, getMessage] = useState("");
  const [loading, isloading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const path = window.location.pathname;
  const pathArray = path.split("/");
  const userId = pathArray[2];
  const token = pathArray[3];

  async function FindUser(userId, token) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/password-reset/${userId}/${token}`
      );

      if (response.status === 200) {
        getMessage("User password can be modified");
      }
    } catch (error) {
      if (error.response.status === 400) {
        getMessage("Invalid link or expired");
      }
    }
  }
  async function resetP(userId, token, password) {
    isloading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/password-reset/${userId}/${token}`,
        { password }
      );

      if (response.status === 200) {
        const message = response.data;
        if (message === "Password reset sucessfully") {
          setMessage("Password reset sucessfully");
          isloading(false);
          setTimeout(() => {
            history.push("/");
          }, 1000);
          setTimeout(() => {
            dispatch({ type: "loginSignupModalToggle", payload: true });
          }, 2500);
        } else {
          setMessage("Invalid link or expired");
          isloading(false);
        }
      } else {
        setMessage("Invalid link or expired");
        isloading(false);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage("Invalid link or expired");
        isloading(false);
      }
    }
  }
  useEffect(() => {
    FindUser(userId, token);
  }, [userId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage(false);
      }, 2000);
    } else if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      setTimeout(() => {
        setMessage(false);
      }, 2000);
    } else {
      resetP(userId, token, password);
    }
  };

  return (
    <>
      {ismessage === "Invalid link or expired" ? (
        <div className="flex flex-col items-center justify-center mt-40">
          <span>
            <svg
              className="w-32 h-32 text-red-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="text-center text-red-900 sm:text-3xl text-2xl lg:text-4xl font-bold tracking-widest mt-3">
            {ismessage}
          </span>
        </div>
      ) : (
        ""
      )}
      {ismessage === "User password can be modified" ? (
        <>
        <div className="flex flex-col items-center justify-center mt-40 my-10">
        <h2 className="text-2xl sm:text-3xl mb-2 font-semibold">Reset Password</h2>

          {message ? (
            <div
              className={
                message === "Password reset sucessfully"
                  ? "bg-green-300 py-2 sm:px-4 px-6 rounded text-center lg:w-[500px] sm:w-[300px]"
                  : "bg-red-200 py-2 sm:px-4 px-6 rounded text-center lg:w-[500px] sm:w-[300px]"
              }
            >
              {message}
            </div>
          ) : (
            ""
          )}
          <form className="flex flex-col space-y-4 lg:w-[500px] sm:w-[300px]">
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-600">
                New Password:
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`px-4 py-2 focus:outline-none border rounded-md`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cpassword" className="text-sm text-gray-600">
                Confirm Password:
              </label>
              <input
                type="password"
                id="cpassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`px-4 py-2 focus:outline-none border rounded-md`}
              />
            </div>
            {loading ? (
              <div
                type="button"
                className="bg-gray-600 p-2 text-center font-medium text-white rounded-md cursor-wait"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 mr-2  animate-spin dark:text-gray-600 fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Processing...
              </div>
            ) : (
              <div
                onClick={(e) => handleSubmit(e)}
                className="font-medium px-4 py-2 text-white text-center cursor-pointer rounded-md bg-[#303031] hover:bg-gray-900"
              >
                Reset password
              </div>
            )}
          </form>
        </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

const ResetPassword = (props) => {
  return <Layout children={<FResetPassword />} />;
};

export default ResetPassword;
