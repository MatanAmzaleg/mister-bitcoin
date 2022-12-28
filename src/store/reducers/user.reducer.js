const INITIAL_STATE = {
  loggedInUser: {},
  userName: "",
};

export function userReducer(state = INITIAL_STATE, action) {
  const { loggedInUser } = state;
  switch (action.type) {
    case "SET_LOGGED_IN_USER":
      console.log(action.LiUser);
      return {
        ...state,
        loggedInUser: action.LiUser,
      };
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.userName,
      };
    case "TRANSACT_COINS":
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          coins: loggedInUser.coins - action.amount,
        },
      };
    case "ADD_MOVE":
        console.log(action.move);
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          moves:[action.move, ...loggedInUser.moves] 
        },
      };

    default:
      return state;
  }
}
