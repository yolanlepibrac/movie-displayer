
import { ADD_CATEGORY } from "../Constants/action-types";
import { ADD_KEYWORD } from "../Constants/action-types";
import { RESET_CATEGORY } from "../Constants/action-types";

export function addCategory(category) {
  return { type: "ADD_CATEGORY", category }
};

export function addKeyword(keyWord) {
  return { type: "ADD_KEYWORD", keyWord }
};

export function resetCategories() {
  return { type: "RESET_CATEGORY" }
};
