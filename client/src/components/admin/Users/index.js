import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import UserMenu from "./UserMenu";
import AllUser from "./AllUser";
import { UserState, UserReducer } from "./UserContext";

/* This context manage all of the caregories component's data */
export const UserContext = createContext();

const UserComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <UserMenu />
      <AllUser />
    </div>
  );
};

const Users = (props) => {
  const [data, dispatch] = useReducer(UserReducer, UserState);
  return (
    <Fragment>
      <UserContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<UserComponent />} />
      </UserContext.Provider>
    </Fragment>
  );
};

export default Users;
