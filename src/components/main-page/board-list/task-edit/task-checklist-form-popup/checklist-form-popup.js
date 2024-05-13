import { Formik, Form, Field } from "formik";

function CheckListForm({
    showCheckListForm,
    setShowCheckListForm,
    selectedTask,
    setSelectedTask,
}) {
    return (
        <div className="task-edit-popup">
            <div className="task-edit-popup-content">
                <button
                    className="close-button"
                    onClick={() => setShowCheckListForm(!showCheckListForm)}>
                    X
                </button>
                <Formik
                    initialValues={{ checkListTitle: "CheckList" }}
                    onSubmit={(values, { resetForm }) => {
                        setSelectedTask((prevState) => {
                            let updatedCheckList;
                            if (selectedTask.checkLists) {
                                updatedCheckList = [
                                    ...prevState.checkLists,
                                    {
                                        checkListTitle: values.checkListTitle,
                                    },
                                ];
                            } else {
                                updatedCheckList = [
                                    {
                                        checkListTitle: values.checkListTitle,
                                    },
                                ];
                            }

                            return {
                                ...prevState,
                                checkLists: updatedCheckList,
                            };
                        });
                        setShowCheckListForm(!showCheckListForm);
                        resetForm();
                    }}>
                    {(formikProps) => {
                        return (
                            <Form className="form-group mb-3 ">
                                <label
                                    htmlFor="checkListTitle"
                                    className="form-label">
                                    Title
                                </label>
                                <Field
                                    type="text"
                                    className="form-control "
                                    id="checkListTitle"
                                    name="checkListTitle"
                                />
                                <button type="submit">Add</button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default CheckListForm;
