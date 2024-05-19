import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

import {
    setBoard,
    setCurrentBoard,
} from "../../../../redux/board/board.actions";
import { taskSchema } from "../../../../redux/board/board.schema";
import "./task.form.css";

function TaskForm({ listIndex }) {
    const dispatch = useDispatch();

    const boards = useSelector((state) => state.boardReducer.boards);
    const currentBoard = useSelector(
        (state) => state.boardReducer.currentBoard
    );
    const [showPrevTask, setShowPrevTask] = useState(false);

    useEffect(() => {
        if (currentBoard) {
            const updatedBoard = boards.map((board) =>
                board.id === currentBoard.id ? currentBoard : board
            );
            dispatch(setBoard(updatedBoard));
        }
    }, [currentBoard, showPrevTask]);

    const handleTaskAddition = (filteredTask) => {
        if (currentBoard) {
            const updatedCurrentBoard = produce(currentBoard, (draft) => {
                draft.lists[listIndex].taskList.push(filteredTask);
                draft.lists.map((list, idx) => {
                    if (idx !== listIndex) {
                        const filteredTaskIndex = list.taskList.findIndex(
                            (task) => task.taskId === filteredTask.taskId
                        );
                        if (filteredTaskIndex !== -1) {
                            draft.lists[idx].taskList.splice(
                                filteredTaskIndex,
                                1
                            );
                        }
                    }
                });
            });

            dispatch(setCurrentBoard(updatedCurrentBoard));
            setShowPrevTask(!showPrevTask);
        }
    };

    return (
        <div className="task-form-container">
            <Formik
                initialValues={{
                    taskName: "",
                }}
                validationSchema={taskSchema}
                onSubmit={(values, { resetForm }) => {
                    if (
                        currentBoard &&
                        currentBoard.lists &&
                        currentBoard.lists[listIndex]
                    ) {
                        const updatedCurrentBoard = produce(
                            currentBoard,
                            (draft) => {
                                draft.lists[listIndex].taskList.push({
                                    taskTitle: values.taskName,
                                    taskId: uuidv4(),
                                });
                            }
                        );

                        // Dispatch an action to update the current board in the Redux store
                        dispatch(setCurrentBoard(updatedCurrentBoard));
                    }

                    resetForm();
                }}>
                {(formikProps) => {
                    const { values, handleChange } = formikProps;
                    return (
                        <div>
                            <Form>
                                <div className="task-form-group">
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
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary task-submit-button">
                                        Add
                                    </button>
                                </div>

                                <div className="invalid-feedback d-block">
                                    <ErrorMessage name="taskName" />
                                </div>
                            </Form>

                            {showPrevTask && (
                                <div>
                                    <ul className="task-list-suggestion">
                                        {currentBoard.lists.map(
                                            (list, listIndx) => {
                                                return (
                                                    listIndex > listIndx &&
                                                    list.taskList
                                                        .filter(
                                                            (task, taskIndex) =>
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
                                                                    ]
                                                                        .taskList &&
                                                                    currentBoard.lists[
                                                                        listIndex
                                                                    ].taskList.some(
                                                                        (
                                                                            task
                                                                        ) =>
                                                                            filteredTask.taskId ===
                                                                            task.taskId
                                                                    );

                                                                if (
                                                                    !IsAlreadySelected
                                                                ) {
                                                                    return (
                                                                        <li
                                                                            className="task-list-item"
                                                                            onClick={() =>
                                                                                handleTaskAddition(
                                                                                    filteredTask
                                                                                )
                                                                            }>
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
                                </div>
                            )}
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
}

export default TaskForm;
