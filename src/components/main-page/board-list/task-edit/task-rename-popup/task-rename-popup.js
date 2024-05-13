import { Formik, Form, Field } from "formik";
import "./task-rename-popup.css";

function TaskRenamePopup({
    showTaskNameRename,
    setShowTaskNameRename,
    selectedTask,
    setSelectedTask,
}) {
    return (
        <div className="task-rename-popup">
            <div class=" task-rename-popup-content">
                <button
                    className="task-rename-close-button"
                    onClick={() => setShowTaskNameRename(!showTaskNameRename)}>
                    X
                </button>
                <Formik
                    initialValues={{ renameTask: "" }}
                    onSubmit={(values, { resetForm }) => {
                        setSelectedTask({
                            ...selectedTask,
                            taskTitle: values.renameTask,
                        });
                        setShowTaskNameRename(!showTaskNameRename);
                        resetForm();
                    }}>
                    {(formikProps) => {
                        return (
                            <Form>
                                <div className="form-group mb-3 ">
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
                                <button type="submit">Save</button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default TaskRenamePopup;
