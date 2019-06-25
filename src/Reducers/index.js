import { ADD_CATEGORY } from "../Constants/action-types";
import { ADD_KEYWORD } from "../Constants/action-types";
import { RESET_CATEGORY } from "../Constants/action-types";

const initialState = {
  categorySelectedRedux: [],
  keyWordSelectedRedux: [],
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
      state.categorySelectedRedux = [];
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
}
return state;

}
export default rootReducer;
