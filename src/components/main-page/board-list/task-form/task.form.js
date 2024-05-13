import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";

function TaskForm({
    boards,
    setCurrentBoard,
    currentBoard,
    listIndex,
    setBoard,
}) {
    const [showPrevTask, setShowPrevTask] = useState(false);

    useEffect(() => {
        const updatedBoard = [...boards];
        const index = updatedBoard.findIndex(
            (board) => board.id === currentBoard.id
        );
        updatedBoard[index] = { ...currentBoard };
        setBoard(updatedBoard);
    }, [currentBoard, showPrevTask]);

    const handleTaskAddition = (filteredTask) => {
        const updatedCurrentBoard = { ...currentBoard };
        updatedCurrentBoard.lists[listIndex].taskList.push(filteredTask);

        updatedCurrentBoard.lists.forEach((list, idx) => {
            if (idx !== listIndex) {
                const filteredTaskIndex = list.taskList.findIndex(
                    (task) => task.taskTitle === filteredTask.taskTitle
                );
                if (filteredTaskIndex !== -1) {
                    updatedCurrentBoard.lists[idx].taskList.splice(
                        filteredTaskIndex,
                        1
                    );
                }
            }
        });

        setCurrentBoard(updatedCurrentBoard);
        setShowPrevTask(!showPrevTask);
    };

    return (
        <Formik
            initialValues={{
                taskName: "",
            }}
            onSubmit={(values, { resetForm }) => {
                const newObj = {
                    taskTitle: values.taskName,
                };

                const updatedCurrentBoard = { ...currentBoard };
                updatedCurrentBoard.lists[listIndex].taskList.push(newObj);
                setCurrentBoard(updatedCurrentBoard);
                console.log(boards);
                resetForm();
            }}>
            {(formikProps) => {
                const { values, handleChange, setFieldValue } = formikProps;
                return (
                    <div>
                        <Form>
                            <div
                                className="form-group mb-3 "
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    padding: "10px",
                                }}>
                                <Field
                                    type="input"
                                    className="form-control"
                                    id="taskName"
                                    name="taskName"
                                    placeholder="Enter task name"
                                    onClick={() =>
                                        setShowPrevTask(!showPrevTask)
                                    }
                                    onChange={handleChange}
                                    style={{
                                        width: "70%",
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        width: "30%",
                                    }}>
                                    Add Task
                                </button>
                            </div>
                        </Form>

                        <div>
                            {showPrevTask && (
                                <ul class="list-group">
                                    {currentBoard.lists.map(
                                        (list, listIndx) => {
                                            return (
                                                listIndex > listIndx &&
                                                list.taskList
                                                    .filter((task, taskIndex) =>
                                                        task.taskTitle
                                                            .toLowerCase()
                                                            .includes(
                                                                values.taskName.toLowerCase()
                                                            )
                                                    )
                                                    .map(
                                                        (
                                                            filteredTask,
                                                            filteredTaskIndex
                                                        ) => {
                                                            const IsAlreadySelected =
                                                                currentBoard
                                                                    .lists[
                                                                    listIndex
                                                                ].taskList &&
                                                                currentBoard.lists[
                                                                    listIndex
                                                                ].taskList.some(
                                                                    (task) =>
                                                                        filteredTask.taskTitle ===
                                                                        task.taskTitle
                                                                );

                                                            if (
                                                                !IsAlreadySelected
                                                            ) {
                                                                return (
                                                                    <li
                                                                        class="list-group-item"
                                                                        onClick={() => {
                                                                            handleTaskAddition(
                                                                                filteredTask
                                                                            );
                                                                        }}>
                                                                        {
                                                                            filteredTask.taskTitle
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        }
                                                    )
                                            );
                                        }
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default TaskForm;
