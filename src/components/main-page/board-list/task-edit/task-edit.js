import { useState } from "react";
import { produce } from "immer";
import { useSelector, useDispatch } from "react-redux";

import TaskEditMainPage from "./task-edit-mainpage/task-edit-mainpage";
import TaskEditList from "./task-edit-list/task-edit-list";
import TaskRenamePopup from "./task-rename-popup/task-rename-popup";
import AddmMemberPopup from "./task-add-member-popup/add-member-popup";
import Dates from "./task-dates-popup/dates-popup";
import CheckListForm from "./task-checklist-form-popup/checklist-form-popup";

import {
    setBoard,
    setCurrentBoard,
    setSelectedTask,
} from "../../../../redux/board/board.actions";

import "./task-edit.css";

function TaskEdit() {
    const dispatch = useDispatch();

    const selectedTask = useSelector(
        (state) => state.boardReducer.selectedTask
    );
    const boards = useSelector((state) => state.boardReducer.boards);
    const currentBoard = useSelector(
        (state) => state.boardReducer.currentBoard
    );
    const selectedListIndex = useSelector(
        (state) => state.boardReducer.selectedListIndex
    );
    const selectedTaskIndex = useSelector(
        (state) => state.boardReducer.selectedTaskIndex
    );

    const [showTaskNameRename, setShowTaskNameRename] = useState(false);
    const [showAddMembersForm, setShowAddMembersForm] = useState(false);
    const [showDates, setShowDates] = useState(false);
    const [showCheckListForm, setShowCheckListForm] = useState(false);

    const [showCheckListItem, setShowCheckListItem] = useState(false);

    return (
        <div className="task-edit-popup">
            <div className="task-edit-popup-content">
                <button
                    className="close-window"
                    onClick={() => dispatch(setSelectedTask(null))}>
                    X
                </button>
                <h2
                    onClick={() => {
                        console.log(selectedTask);
                    }}>
                    {selectedTask.taskTitle}
                </h2>

                <div
                    className="row"
                    style={{ display: "flex", flexDirection: "row" }}>
                    <TaskEditMainPage
                        showCheckListItem={showCheckListItem}
                        setShowCheckListItem={setShowCheckListItem}
                    />

                    <TaskEditList
                        showTaskNameRename={showTaskNameRename}
                        setShowTaskNameRename={setShowTaskNameRename}
                        showAddMembersForm={showAddMembersForm}
                        setShowAddMembersForm={setShowAddMembersForm}
                        showDates={showDates}
                        setShowDates={setShowDates}
                        showCheckListForm={showCheckListForm}
                        setShowCheckListForm={setShowCheckListForm}
                    />
                </div>
                <div className="button-container">
                    <button
                        onClick={() => {
                            if (boards) {
                                const newBoards = produce(boards, (draft) => {
                                    const index = draft.findIndex(
                                        (board) => board.id === currentBoard.id
                                    );
                                    if (index !== -1) {
                                        draft[index].lists[
                                            selectedListIndex
                                        ].taskList[selectedTaskIndex] = {
                                            ...selectedTask,
                                        };
                                    }
                                });
                                dispatch(setBoard(newBoards));
                            }
                            if (currentBoard) {
                                const newCurrentBoard = produce(
                                    currentBoard,
                                    (draft) => {
                                        draft.lists[selectedListIndex].taskList[
                                            selectedTaskIndex
                                        ] = { ...selectedTask };
                                    }
                                );
                                dispatch(setCurrentBoard(newCurrentBoard));
                            }
                            dispatch(setSelectedTask(null));
                        }}>
                        Save Changes
                    </button>
                </div>
            </div>

            {showTaskNameRename && (
                <TaskRenamePopup
                    showTaskNameRename={showTaskNameRename}
                    setShowTaskNameRename={setShowTaskNameRename}
                />
            )}

            {showAddMembersForm && (
                <AddmMemberPopup
                    showAddMembersForm={showAddMembersForm}
                    setShowAddMembersForm={setShowAddMembersForm}
                />
            )}

            {showDates && (
                <Dates showDates={showDates} setShowDates={setShowDates} />
            )}

            {showCheckListForm && (
                <CheckListForm
                    showCheckListForm={showCheckListForm}
                    setShowCheckListForm={setShowCheckListForm}
                />
            )}
        </div>
    );
}

export default TaskEdit;
