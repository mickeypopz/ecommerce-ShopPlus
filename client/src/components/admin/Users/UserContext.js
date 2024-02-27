export const UserState = {
  users: [],
  addUserModal: false,
  editUserModal: {
    modal: false,
    oId: "",
    name: "",
    email: "",
    userRole: "",
    password: "",
    verified: "",
  },
  loading: false,
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    /* Get all User */
    case "fetchUserAndChangeState":
      return {
        ...state,
        users: action.payload,
      };
    /* Create a User */
    case "addUserModal":
      return {
        ...state,
        addUserModal: action.payload,
      };
    /* Edit a User */
    case "editUserModalOpen":
      return {
        ...state,
        editUserModal: {
          modal: true,
          oId: action.oId,
          name: action.name,
          email: action.email,
          userRole: action.userRole,
          password: action.password,
          verified: action.verified,
        },
      };
    case "editUserModalClose":
      return {
        ...state,
        editUserModal: {
          modal: false,
          oId: "",
          name: "",
          email: "",
          userRole: "",
          password: "",
          verified: "",
        },
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
