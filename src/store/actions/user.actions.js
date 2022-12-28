import { userService } from "../../services/user.service";

export function signUp(name) {
  return async (dispatch) => {
    const LiUser = userService.signUp(name);
    console.log(LiUser);
    dispatch({ type: "SET_LOGGED_IN_USER", LiUser });
  };
}

export function setUsername(userName) {
  console.log(userName);
  return async (dispatch) => {
    dispatch({ type: "SET_USERNAME", userName });
  };
}

export function spendBalance(amount) {
    console.log(amount);
    return async (dispatch) => {
        dispatch({ type: 'TRANSACT_COINS', amount })
    }
}
export function addMove({contact, amount}) {
    console.log(contact);
    return async (dispatch) => {
        const move = userService.addMove(contact, amount)
        console.log(move);
        dispatch({type:'ADD_MOVE', move})
    }
}