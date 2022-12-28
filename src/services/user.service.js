import { storageService } from "./storage.service";
import { makeId } from "./util.service";
export const userService = {
  signUp,
  addMove
};

const STORAGE_KEY = "users";


function signUp(name) {
  const user = {
    id: makeId(),
    name,
    coins: 100,
    moves: [],
  };
  storageService.store(STORAGE_KEY, user);
  return user;
}

function addMove(contact, amount) {
  const move = {
    to: contact.name, 
    amount,
    at: Date.now(),
    toId: contact._id
  }
  return move
}

// storageService.store(STORAGE_KEY, user);
