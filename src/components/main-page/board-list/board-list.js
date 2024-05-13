import { useState } from "react";
import TaskForm from "./task-form/task.form";
import TaskEdit from "./task-edit/task-edit";

function BoardList({ boards, currentBoard, setBoard, setCurrentBoard, users }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState();
    const [selectedListIndex, setSelectedListIndex] = useState();
    const [threeDotExpand, setThreeDotExpand] = useState(false);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
            {currentBoard.lists &&
                currentBoard.lists.map((list, listIndex) => (
                    <ul
                        class="list-group"
                        style={{
                            width: "300px",
                            border: "1px solid black",
                            borderRadius: "5px",
                            marginTop: "30px",
                            marginLeft: "10px",
                        }}>
                        <h3
                            class="list-group-item"
                            style={{
                                textAlign: "center",
                            }}>
                            {list.listTitle}
                        </h3>

                        {list.taskList &&
                            list.taskList.map((task, taskIndex) => {
                                return (
                                    <li
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                        class="list-group-item">
                                        <span
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setSelectedTaskIndex(taskIndex);
                                                setSelectedListIndex(listIndex);
                                            }}>
                                            {task.taskTitle}
                                        </span>
                                        <div
                                            class="dropend"
                                            data-bs-toggle="dropdown"
                                            style={{
                                                marginLeft: "200px",
                                            }}>
                                            <i class="bi bi-three-dots-vertical"></i>

                                            <ul class="dropdown-menu">
                                                <li
                                                    class="dropdown-item"
                                                    onClick={() => {
                                                        setSelectedTask(task);
                                                        setSelectedTaskIndex(
                                                            taskIndex
                                                        );
                                                        setSelectedListIndex(
                                                            listIndex
                                                        );
                                                        console.log(boards);
                                                    }}>
                                                    Edit
                                                </li>
                                                <li class="dropdown-item">
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                );
                            })}

                        <TaskForm
                            boards={boards}
                            currentBoard={currentBoard}
                            setCurrentBoard={setCurrentBoard}
                            listIndex={listIndex}
                            setBoard={setBoard}
                        />
                    </ul>
                ))}

            {selectedTask && (
                <TaskEdit
                    selectedTask={selectedTask}
                    selectedTaskIndex={selectedTaskIndex}
                    setSelectedTask={setSelectedTask}
                    setSelectedTaskIndex={setSelectedTaskIndex}
                    boards={boards}
                    setBoard={setBoard}
                    currentBoard={currentBoard}
                    selectedListIndex={selectedListIndex}
                    setSelectedListIndex={setSelectedListIndex}
                    setCurrentBoard={setCurrentBoard}
                    users={users}
                />
            )}
        </div>
    );
}

export default BoardList;
