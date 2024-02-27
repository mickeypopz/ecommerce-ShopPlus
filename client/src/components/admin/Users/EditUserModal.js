import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { UserContext } from "./index";
import { editUser, getAllUser } from "./FetchApi";

const EditUserModal = (props) => {
  const { data, dispatch } = useContext(UserContext);
  const myDivRef = useRef(null);
  function Lowercase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );
  const [fData, setFdata] = useState({
    oId: "",
    name: "",
    email: "",
    // cImage: "",
    userRole: "",
    password: "",
    verified: "",
    success: false,
    error: false,
  });

  useEffect(() => {
    setFdata({
      oId: data.editUserModal.oId,
      name: data.editUserModal.name,
      email: data.editUserModal.email,
      userRole: data.editUserModal.userRole,
      password: data.editUserModal.password,

      verified: data.editUserModal.verified,
    });
  }, [data.editUserModal]);

  const fetchData = async () => {
    let responseData = await getAllUser();
    if (responseData.Users) {
      dispatch({
        type: "fetchUserAndChangeState",
        payload: responseData.Users,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    myDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    let responseData = await editUser({
      oId: fData.oId,
      name: fData.name,
      email: fData.email,
      password: fData.password,
      userRole: fData.userRole,
      verified: fData.verified,
    });
    if (responseData.success) {
      fetchData();
      setFdata({ ...fData, success: responseData.success});
      setTimeout(() => {
        return setFdata({
          ...fData,
          success: false,
        });
      }, 3000);
    } else if (responseData.error) {
      setFdata({ ...fData, error: responseData.error
      });
      setTimeout(() => {
        return setFdata({
          ...fData,
          error: false,
        });
      }, 3000);
    }
    let edit = await editUser(fData);
    if (edit.error) {
      console.log(edit.error);
      dispatch({ type: "loading", payload: false });
    } else if (edit.success) {
      console.log(edit.success);
      setTimeout(() => {
        fetchData();
        // dispatch({ type: "editUserModalClose" })
        dispatch({ type: "loading", payload: false });
      }, 2000);
    }
  };


  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "editUserModalClose", payload: false })}
        className={`${
          data.editUserModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editUserModal.modal ? "" : "hidden"
        } fixed inset-0 m-4   scroll flex items-start md:top-8 z-30 justify-center overflow-auto`}
      >
        <div
          ref={myDivRef}
          id="myDiv"
          className="relative bg-white w-[80%] sm:w-[60%] shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8"
        >
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add User
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "editUserModalClose", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error
            ? fData.error.name !== ""
              ? alert(fData.error.name, "red")
              : fData.error.password !== ""
              ? alert(fData.error.password, "red")
              : fData.error.email !== ""
              ? alert(fData.error.email, "red")
              : ""
            : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex flex-col space-y-1 w-full py-2">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    name: e.target.value,
                  })
                }
                value={fData.name}
                className="px-4 py-2 border focus:outline-none"
                type="text"
                id="name"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full py-2">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    email: e.target.value,
                  })
                }
                value={Lowercase(fData.email)}
                className="px-4 py-2 border focus:outline-none"
                name="email"
                id="email"
                type="text"
              />
            </div>

            <div className="flex flex-col space-y-1 w-full py-2">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    password: e.target.value,
                  })
                }
                value={fData.password}
                className="px-4 py-2 border focus:outline-none"
                name="password"
                id="password"
                type="password"
              />
            </div>

            <div className="flex flex-col space-y-1 w-full py-2">
              <label htmlFor="status">Role</label>
              <select
                name="status"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    userRole: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                id="status"
                type="number"
                value={fData.userRole}
              >
                <option name="status" value="0">
                  User
                </option>
                <option name="status" value="1">
                  Admin
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full py-2">
              <label htmlFor="verifed">Verified</label>
              <select
                name="verifed"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    verified: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                id="verifed"
                value={fData.verified}

              >
                <option name="verifed" value="false">
                  false
                </option>
                <option name="verifed" value="true">
                  true
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                type="submit"
                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
              >
                Edit User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUserModal;
