
import { ADD_CATEGORY } from "../Constants/action-types";
import { ADD_KEYWORD } from "../Constants/action-types";
import { RESET_CATEGORY } from "../Constants/action-types";
import { SET_USEREMAIL } from "../Constants/action-types";
import { SET_ACCOUNTSTATE } from "../Constants/action-types";

export function addCategory(category) {
  return { type: "ADD_CATEGORY", category }
};

export function addKeyword(keyWord) {
  return { type: "ADD_KEYWORD", keyWord }
};

export function resetCategories() {
  return { type: "RESET_CATEGORY" }
};

export function setUserEmail(email) {
  return { type: "SET_USEREMAIL", email }
};

export function changeAccountState(accountState) {
  return { type: "SET_ACCOUNTSTATE", accountState }
};
