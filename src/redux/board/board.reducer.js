import Types from "./board.types";

const initialState = {
    boards: [],
    currentBoard: null,
    selectedTask: null,
    selectedTaskIndex: null,
    selectedListIndex: null,
};

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_BOARD: {
            let updatedBoards;

            if (Array.isArray(action.payload)) {
                updatedBoards = [...action.payload];
            } else {
                updatedBoards = [...state.boards, action.payload];
            }

            return { ...state, boards: updatedBoards };
        }

        case Types.SET_CURRENT_BOARD: {
            return { ...state, currentBoard: action.payload };
        }

        case Types.SET_SELECTED_TASK: {
            return { ...state, selectedTask: action.payload };
        }
        case Types.SET_SELECTED_TASK_INDEX: {
            return { ...state, selectedTaskIndex: action.payload };
        }
        case Types.SET_SELECTED_LIST_INDEX: {
            return { ...state, selectedListIndex: action.payload };
        }

        default: {
            return state;
        }
    }
}
