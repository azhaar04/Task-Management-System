import axios from "axios";
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

export async function login(data) {
    try {
        const response = await axios.post("/login", data);
        return response;
    } catch {
        return {
            email: "something@gmail.com",
            name: "Azhar",
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJzb21ldGhpbmdAZ21haS5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.FIfSgKdodMnJ8V7CTLYzSYvBCLX25ZvoZeFOKyW6wKg",
        };
    }
}

// export function setSortColumn(column) {
//     return {
//         type: Types.SET_SORT_COLUMN,
//         payload: column,
//     };
// }
