import Types from "./user.types.js";

const initialState = {
    users: [],
    isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_USERS: {
            // Ensure action.payload is always an array
            const newUsers = Array.isArray(action.payload)
                ? action.payload
                : [action.payload];
            return { ...state, users: [...state.users, ...newUsers] };
        }
        case Types.SET_IS_LOGGED_IN: {
            return { ...state, isLoggedIn: action.payload };
        }
        default: {
            return state;
        }
    }
}
