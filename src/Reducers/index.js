import { ADD_CATEGORY } from "../Constants/action-types";
import { RESET_CATEGORY } from "../Constants/action-types";

const initialState = {
  categorySelectedRedux: [],
};


function rootReducer(state = initialState, action) {
  if (action.type === ADD_CATEGORY) {

    var alreadyExistingCategory = false
    for(var i = 0; i< state.categorySelectedRedux.length;i++){
      console.log(Object.values(action.category)[0])
      console.log(state.categorySelectedRedux[i])
      if(state.categorySelectedRedux[i] === Object.values(action.category)[0]){
        alreadyExistingCategory = true;
        console.log("exists")
        state.categorySelectedRedux.splice(i, 1)
        console.log(state.categorySelectedRedux)
      }
    }
    if(alreadyExistingCategory === false){
      state.categorySelectedRedux.push(Object.values(action.category)[0]);
      console.log(state.categorySelectedRedux)
    }

  }else if (action.type === RESET_CATEGORY) {
      state.categorySelectedRedux = [];
  }
  return state;

}
export default rootReducer;
