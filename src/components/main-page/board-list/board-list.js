import { useState } from "react";
import TaskForm from "./task-form/task.form";
import TaskEdit from "./task-edit/task-edit";
import { useSelector, useDispatch } from "react-redux";
import {
    setSelectedTask,
    setSelectedTaskIndex,
    setSelectedListIndex,
} from "../../../redux/board/board.actions";
import "./board-list.css";

function BoardList() {
    const dispatch = useDispatch();
    const currentBoard = useSelector(
        (state) => state.boardReducer.currentBoard
    );
    const selectedTask = useSelector(
        (state) => state.boardReducer.selectedTask
    );

    const [threeDotExpand, setThreeDotExpand] = useState(false);

    const handleTaskClick = (task, listIndex, taskIndex) => {
        dispatch(setSelectedTask(task));
        dispatch(setSelectedTaskIndex(taskIndex));
        dispatch(setSelectedListIndex(listIndex));
    };

    return (
        <div className="board-list-container">
            {currentBoard.lists &&
                currentBoard.lists.map((list, listIndex) => (
                    <div key={listIndex} className="list-wrapper">
                        <h3 className="list-title">{list.listTitle}</h3>
                        <ul className="board-list">
                            {list.taskList &&
                                list.taskList.map((task, taskIndex) => (
                                    <li
                                        key={taskIndex}
                                        className="task-item"
                                        onClick={() =>
                                            handleTaskClick(
                                                task,
                                                listIndex,
                                                taskIndex
                                            )
                                        }>
                                        {task.taskTitle}
                                        <div className="dropdown-wrapper">
                                            <i className="bi bi-three-dots-vertical"></i>
                                            <ul className="dropdown-menu">
                                                <li
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        handleTaskClick(
                                                            task,
                                                            listIndex,
                                                            taskIndex
                                                        )
                                                    }>
                                                    Edit
                                                </li>
                                                <li className="dropdown-item">
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            <li>
                                <TaskForm listIndex={listIndex} />
                            </li>
                        </ul>
                    </div>
                ))}
            {selectedTask && <TaskEdit />}
        </div>
    );
}

export default BoardList;
