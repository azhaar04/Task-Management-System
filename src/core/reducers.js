import { combineReducers } from "redux";
import userReducer from "../redux/user/user.reducer";
import boardReducer from "../redux/board/board.reducer";
export default combineReducers({ userReducer, boardReducer });
