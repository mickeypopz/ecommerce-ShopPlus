import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import axios from "axios";

const Login = (props) => {
  function Lowercase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    verifyerror: false,
    loading: false,
  });
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.verifyerror) {
        setData({
          ...data,
          loading: false,
          verifyerror: responseData.verifyerror,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgotPassword = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/password-reset`,
        { email }
      );
      if (response.data) {
        setError(response.data);
        setTimeout(() => {
          setError(false);
        }, 5000);
        setloading(false);
        if (
          response.data === "Password reset link sent to your email account"
        ) {
          setEmail("");
        }
      } else {
        setError("Something is wrong");
        setTimeout(() => {
          setError(false);
        }, 5000);
        setloading(false);
      }
    } catch (err) {
      console.log(err);
      setError("An error occured");
      setTimeout(() => {
        setError(false);
      }, 5000);
      setloading(false);
    }
  };

  return (
    <Fragment>
      {isLogin ? (
        <>
          <div className="text-center text-2xl font-medium mb-6">Login</div>
          {layoutData.loginSignupError ? (
            <div className="bg-red-200 py-2 px-4 rounded text-center">
              You need to login for checkout. Haven't accont? Create new one.
            </div>
          ) : (
            ""
          )}
          {data.verifyerror ? (
            <div className="bg-red-200 py-2 px-4 rounded text-center">
              {data.verifyerror}
            </div>
          ) : (
            ""
          )}
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600">
                Email address<span className="ml-1">*</span>
              </label>
              <input
                onChange={(e) => {
                  setData({ ...data, email: e.target.value, error: false });
                  layoutDispatch({ type: "loginSignupError", payload: false });
                }}
                value={Lowercase(data.email)}
                autoComplete="email"
                type="email"
                id="email"
                className={`${
                  !data.error ? "" : "border-red-500"
                } px-4 py-2 focus:outline-none border rounded-md`}
              />
              {!data.error ? "" : alert(data.error)}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-600">
                Password<span className="ml-1">*</span>
              </label>
              <input
                onChange={(e) => {
                  setData({ ...data, password: e.target.value, error: false });
                  layoutDispatch({ type: "loginSignupError", payload: false });
                }}
                value={data.password}
                type="password"
                id="password"
                autoComplete="current-password"
                className={`${
                  !data.error ? "" : "border-red-500"
                } px-4 py-2 focus:outline-none border rounded-md`}
              />
              {!data.error ? "" : alert(data.error)}
            </div>
            <div className="flex flex-row space-y-2 justify-between items-center">
              <div
                className="block text-gray-500 cursor-pointer font-medium hover:text-gray-700"
                onClick={() => setIsLogin(false)}
              >
                Lost your password?
              </div>
            </div>
            {data.loading ? (
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
                onClick={(e) => formSubmit()}
                className="font-medium px-4 py-2 text-white text-center cursor-pointer rounded-md bg-[#303031] hover:bg-gray-900"
              >
                Login
              </div>
            )}
          </form>
        </>
      ) : (
        <div>
          <div className="text-center text-2xl font-medium mb-6">
            Reset Password
          </div>
          {error ? (
            <div
              className={
                error === "Password reset link sent to your email account"
                  ? "bg-green-300 py-2 px-4 rounded text-center"
                  : "bg-red-200 py-2 px-4 rounded text-center"
              }
            >
              {error}
            </div>
          ) : (
            ""
          )}
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600">
                Email address<span className="ml-1">*</span>
              </label>

              <input
                type="email"
                className="px-4 py-2 focus:outline-none border rounded-md"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="flex flex-row space-y-2 justify-between items-center">
                <div
                  className="block text-gray-500 cursor-pointer font-medium hover:text-gray-700 mt-6 mb-3"
                  onClick={() => setIsLogin(true)}
                >
                  Back to login
                </div>
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
                  className="font-medium px-4 py-2 text-white text-center cursor-pointer rounded-md bg-[#303031] hover:bg-gray-900"
                  onClick={(e) => handleForgotPassword(e)}
                >
                  Submit
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
