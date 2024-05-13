import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";

import TaskEditMainPage from "./task-edit-mainpage/task-edit-mainpage";
import TaskEditList from "./task-edit-list/task-edit-list";
import TaskRenamePopup from "./task-rename-popup/task-rename-popup";
import AddmMemberPopup from "./task-add-member-popup/add-member-popup";
import Dates from "./task-dates-popup/dates-popup";
import CheckListForm from "./task-checklist-form-popup/checklist-form-popup";

import "./task-edit.css";

function TaskEdit({
    selectedTask,
    selectedTaskIndex,
    setSelectedTask,
    setSelectedTaskIndex,
    boards,
    setBoard,
    currentBoard,
    selectedListIndex,
    setSelectedListIndex,
    setCurrentBoard,
    users,
}) {
    const [showTaskNameRename, setShowTaskNameRename] = useState(false);
    const [showAddMembersForm, setShowAddMembersForm] = useState(false);
    const [showDates, setShowDates] = useState(false);
    const [showCheckListForm, setShowCheckListForm] = useState(false);

    const [showCheckListItem, setShowCheckListItem] = useState(false);

    useEffect(() => {}, []);

    return (
        <div className="task-edit-popup">
            <div className="task-edit-popup-content">
                <h2>{selectedTask.taskTitle}</h2>

                <div
                    className="row"
                    style={{ display: "flex", flexDirection: "row" }}>
                    <TaskEditMainPage
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
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

                <button
                    onClick={() => {
                        const newBoards = JSON.parse(JSON.stringify(boards));
                        const newCurrentBoard = { ...currentBoard };
                        const updatedTask = { ...selectedTask };

                        const index = newBoards.findIndex(
                            (board) => board.id === newCurrentBoard.id
                        );

                        newBoards[index].lists[selectedListIndex].taskList[
                            selectedTaskIndex
                        ] = updatedTask;

                        newCurrentBoard.lists[selectedListIndex].taskList[
                            selectedTaskIndex
                        ] = updatedTask;

                        setCurrentBoard(newCurrentBoard);
                        setBoard(newBoards);
                        setSelectedTask(null);
                    }}>
                    Save Changes
                </button>

                <button onClick={() => setSelectedTask(null)}>Close</button>
            </div>

            {showTaskNameRename && (
                <TaskRenamePopup
                    showTaskNameRename={showTaskNameRename}
                    setShowTaskNameRename={setShowTaskNameRename}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                />
            )}

            {showAddMembersForm && (
                <AddmMemberPopup
                    showAddMembersForm={showAddMembersForm}
                    setShowAddMembersForm={setShowAddMembersForm}
                    users={users}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                />
            )}

            {showDates && (
                <Dates
                    showDates={showDates}
                    setShowDates={setShowDates}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                />
            )}

            {showCheckListForm && (
                <CheckListForm
                    showCheckListForm={showCheckListForm}
                    setShowCheckListForm={setShowCheckListForm}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                />
            )}
        </div>
    );
}

export default TaskEdit;
