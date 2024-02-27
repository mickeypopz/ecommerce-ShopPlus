import axios from "axios";
import React from "react";
import Layout from "./index";
import { useEffect, useState } from "react";

const FVerify = (props) => {
  const [message, setMessage] = useState("");

  const path = window.location.pathname;
  const pathArray = path.split("/");
  const userId = pathArray[2];
  const token = pathArray[3];

  async function verifyEmail(userId, token) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/verify/${userId}/${token}`
      );

      if (response.status === 200) {
        const message = response.data;
        if (message === "email verified sucessfully") {
          setMessage("Email has been verified successfully");
        } else {
          setMessage("Invalid link");
        }
      } else {
        setMessage("Invalid link");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMessage("Invalid link");
      }
    }
  }

  useEffect(() => {
    verifyEmail(userId, token);
  }, [userId, token]);
  // Usage:
  return (
    <>
      {message === "Invalid link" ? (
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
            {message}
          </span>
        </div>
      ) : (
        <></>
      )}
      {message === "Email has been verified successfully" ? (
        <div className="flex flex-col items-center justify-center mt-40 ">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-emoji-smile text-[rgb(0_107_12)] w-32 h-32"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                fill="#006b0c"
              ></path>
              <path
                d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
                fill="#006b0c"
              ></path>
            </svg>
          </span>
          <span className="text-center text-[rgb(0_107_12)] mx-6 md:text-3xl sm:text-2xl text-lg lg:text-4xl font-bold tracking-widest mt-6">
            Email has been verified successfully
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
const Verify = (props) => {
  return <Layout children={<FVerify />} />;
};

export default Verify;
