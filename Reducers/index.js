import { ADD_CATEGORY } from "../Constants/action-types";
import { ADD_KEYWORD } from "../Constants/action-types";
import { RESET_CATEGORY } from "../Constants/action-types";
import { RESET_KEYWORD } from "../Constants/action-types";
import { SET_USEREMAIL } from "../Constants/action-types";
import { SET_ACCOUNTSTATE } from "../Constants/action-types";
import { DISPLAY_LOADING } from "../Constants/action-types";
import { CONNECT } from "../Constants/action-types";

const initialState = {
  categorySelectedRedux: [],
  keyWordSelectedRedux: [],
  userEmailRedux : "myEmail",
  accountStateRedux:{"sizeCard":1},
  displayLoadingRedux:true,
  connectedRedux:false,
};


function rootReducer(state = initialState, action) {
  if (action.type === ADD_CATEGORY) {

    var alreadyExistingCategory = false
    for(var i = 0; i< state.categorySelectedRedux.length;i++){
      if(state.categorySelectedRedux[i] === Object.values(action.category)[0]){
        alreadyExistingCategory = true;
        state.categorySelectedRedux.splice(i, 1)
      }
    }
    if(alreadyExistingCategory === false){
      state.categorySelectedRedux.push(Object.values(action.category)[0]);
    }

  }else if (action.type === RESET_CATEGORY) {
    let nextState
      nextState = {
        ...state,
        categorySelectedRedux: []
      }
    return nextState || state
  }else if (action.type === RESET_KEYWORD) {
    let nextState
      nextState = {
        ...state,
        keyWordSelectedRedux: []
      }
    return nextState || state
  }else if (action.type === ADD_KEYWORD) {
  var alreadyExistingKeyword = false
  for(var i = 0; i< state.keyWordSelectedRedux.length;i++){
    if(state.keyWordSelectedRedux[i] === Object.values(action.keyWord)[0]){
      alreadyExistingKeyword = true;
      state.keyWordSelectedRedux.splice(i, 1)
    }
  }
  if(alreadyExistingKeyword === false){
    state.keyWordSelectedRedux.push(Object.values(action.keyWord)[0]);
  }

}else if (action.type === RESET_CATEGORY) {
    state.keyWordSelectedRedux = [];

}else if (action.type === SET_ACCOUNTSTATE) {
  let nextState
    nextState = {
      ...state,
      accountStateRedux: action.accountState,
      displayLoadingRedux: false
    }
    localStorage.setItem("userData" , JSON.stringify(action.accountState))
  return nextState || state

}else if (action.type === DISPLAY_LOADING) {
  let nextState
    nextState = {
      ...state,
      displayLoadingRedux: action.displayLoading
    }
  return nextState || state
}else if (action.type === CONNECT) {
  let nextState
    nextState = {
      ...state,
      connectedRedux: action.connected
    }
    console.log(action.connected)
  return nextState || state
}

return state;

}
export default rootReducer;
