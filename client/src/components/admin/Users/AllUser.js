import React, { Fragment, useContext, useEffect, useRef } from "react";
import { getAllUser, deleteUser } from "./FetchApi";
import { UserContext } from "./index";
import moment from "moment";

// const apiURL = process.env.REACT_APP_API_URL;

const AllUser = (props) => {
  const { data, dispatch } = useContext(UserContext);
  const { users, loading } = data;
  const myDivRef = useRef(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllUser();
      if (responseData && responseData.Users) {
        dispatch({
          type: "fetchUserAndChangeState",
          payload: responseData.Users,
        });
      }
    } catch (error) {
      console.log(error);
      alert("Error occurred while fetching data!");
    }
    dispatch({ type: "loading", payload: false });
  };

  const deleteUserReq = async (oId) => {
    let deleteC = await deleteUser(oId);
    if (deleteC.error) {
      myDivRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerHTML = deleteC.error;
      errorMessage.style.display = "block";
      errorMessage.style.textAlign = "center";
      errorMessage.style.backgroundColor = "rgba(255,0,0,0.1)";
      errorMessage.style.color = "red";
      errorMessage.style.padding = "10px";
      errorMessage.style.margin = "20px 10px -6px 10px";
      errorMessage.style.fontWeight = "bolder";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 5000);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch User context */
  const editUser = (oId, name, email, password, verified, userRole, type) => {
    if (type) {
      dispatch({
        type: "editUserModalOpen",
        oId: oId,
        name: name,
        email: email,
        userRole: userRole,
        password: password,
        verified: verified,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div ref={myDivRef} id="myDiv"></div>

      <div id="error-message"></div>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Email</th>
              {/* <th className="px-4 py-2 border">Image</th> */}
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Number</th>
              <th className="px-4 py-2 border">verified</th>

              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((item, key) => {
                return (
                  <UserTable
                    User={item}
                    editCat={(
                      oId,
                      name,
                      email,
                      password,
                      verified,
                      userRole,
                      type
                    ) =>
                      editUser(
                        oId,
                        name,
                        email,
                        password,
                        verified,
                        userRole,
                        type
                      )
                    }
                    deleteCat={(oId) => deleteUserReq(oId)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-xl text-center font-semibold py-8"
                >
                  No User found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {users && users.length} User found
        </div>
      </div>
    </Fragment>
  );
};

/* Single User Component */
const UserTable = ({ User, deleteCat, editCat }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {User.name.length > 20 ? User.name.slice(0, 20) + "..." : User.name}
        </td>
        <td className="p-2 text-left">{User.email}</td>

        <td className="p-2 text-center">
          {User.userRole === 1 ? (
            <span className=" rounded text-center text-base p-2 bg-green-200 font-normal">
              Admin
            </span>
          ) : (
            <span className=" rounded text-center text-base p-2 font-normal bg-red-200">
              User
            </span>
          )}
        </td>
        <td className="p-2 text-center">
          {User.phoneNumber === "" ||
          User.phoneNumber === null ||
          User.phoneNumber === undefined ? (
            <span className=" rounded text-center text-base p-2 font-normal bg-red-200">
              Null
            </span>
          ) : (
            <span className=" rounded text-center text-base px-2 font-normal">
              {User.phoneNumber}
            </span>
          )}
        </td>
        <td className="p-2 text-center">
          {User.verified === "true" ? (
            <>
              <span className="bg-green-200 rounded text-center text-base p-3 font-normal">
                {User.verified}
              </span>{" "}
            </>
          ) : (
            <span className="bg-red-200 rounded text-center text-base p-3 font-normal">
              {User.verified}
            </span>
          )}
        </td>
        <td className="p-2 text-center">
          {moment(User.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(User.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) =>
              editCat(
                User._id,
                User.name,
                User.email,
                User.password,
                User.verified,
                User.userRole,
                true
              )
            }
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteCat(User._id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllUser;
