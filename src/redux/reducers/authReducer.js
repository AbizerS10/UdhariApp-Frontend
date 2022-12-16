import ACTIONS from "../actions/";

const initialstate = {
  user: [],
  isLogged: false,
  isAdmin: false,
};

const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        // isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer;
