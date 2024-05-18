// import { type } from "@testing-library/user-event/dist/type";
import Types from "./user.types";

export function setUsers(user) {
    return {
        type: Types.SET_USERS,
        payload: user,
    };
}

export function setIsLoggedIn(isLogged) {
    return {
        type: Types.SET_IS_LOGGED_IN,
        payload: isLogged,
    };
}

// export function setSortColumn(column) {
//     return {
//         type: Types.SET_SORT_COLUMN,
//         payload: column,
//     };
// }
