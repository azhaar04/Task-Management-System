import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { produce } from "immer";
import { setSelectedTask } from "../../../../../redux/board/board.actions";
import "./task-rename-popup.css";

function TaskRenamePopup({ showTaskNameRename, setShowTaskNameRename }) {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        (state) => state.boardReducer.selectedTask
    );
    return (
        <div className="task-rename-popup">
            <div className="task-rename-popup-content">
                <button
                    className="task-rename-close-button"
                    onClick={() => setShowTaskNameRename(!showTaskNameRename)}>
                    X
                </button>
                <Formik
                    initialValues={{
                        renameTask: selectedTask?.taskTitle || "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                        if (selectedTask) {
                            const updatedSelectedTask = produce(
                                selectedTask,
                                (draft) => {
                                    draft.taskTitle = values.renameTask;
                                }
                            );
                            dispatch(setSelectedTask(updatedSelectedTask));
                        }
                        setShowTaskNameRename(!showTaskNameRename);
                        resetForm();
                    }}>
                    {(formikProps) => {
                        return (
                            <Form>
                                <div className="form-group mb-3">
                                    <label
                                        htmlFor="renameTask"
                                        className="form-label">
                                        Task Name
                                    </label>
                                    <Field
                                        type="input"
                                        className="form-control"
                                        id="renameTask"
                                        name="renameTask"
                                    />
                                </div>
                                <button type="submit" className="btn-save">
                                    Save
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default TaskRenamePopup;
