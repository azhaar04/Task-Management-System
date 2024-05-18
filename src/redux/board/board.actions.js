import { type } from "@testing-library/user-event/dist/type";
import Types from "./board.types";

export function setBoard(board) {
    return {
        type: Types.SET_BOARD,
        payload: board,
    };
}

export function setCurrentBoard(board) {
    return {
        type: Types.SET_CURRENT_BOARD,
        payload: board,
    };
}

export function setSelectedTask(task) {
    return {
        type: Types.SET_SELECTED_TASK,
        payload: task,
    };
}

export function setSelectedTaskIndex(index) {
    return {
        type: Types.SET_SELECTED_TASK_INDEX,
        payload: index,
    };
}
export function setSelectedListIndex(index) {
    return {
        type: Types.SET_SELECTED_LIST_INDEX,
        payload: index,
    };
}
