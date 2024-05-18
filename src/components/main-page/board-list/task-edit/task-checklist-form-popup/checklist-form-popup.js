import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { produce } from "immer";
import { setSelectedTask } from "../../../../../redux/board/board.actions";
import "./checklist-form-popup.css";

function CheckListForm({ showCheckListForm, setShowCheckListForm }) {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        (state) => state.boardReducer.selectedTask
    );

    return (
        <div className="check-list-form-popup">
            <div className="check-list-form-popup-content">
                <button
                    className="close-window"
                    onClick={() => setShowCheckListForm(!showCheckListForm)}>
                    X
                </button>
                <Formik
                    initialValues={{ checkListTitle: "CheckList" }}
                    onSubmit={(values, { resetForm }) => {
                        if (selectedTask) {
                            const updatedSelectedTask = produce(
                                selectedTask,
                                (draft) => {
                                    let updatedCheckLists;
                                    if (draft.checkLists) {
                                        updatedCheckLists = [
                                            ...draft.checkLists,
                                            {
                                                checkListTitle:
                                                    values.checkListTitle,
                                            },
                                        ];
                                    } else {
                                        updatedCheckLists = [
                                            {
                                                checkListTitle:
                                                    values.checkListTitle,
                                            },
                                        ];
                                    }
                                    draft.checkLists = updatedCheckLists;
                                }
                            );
                            dispatch(setSelectedTask(updatedSelectedTask));
                        }
                        setShowCheckListForm(!showCheckListForm);
                        resetForm();
                    }}>
                    {(formikProps) => {
                        return (
                            <Form className="form-group">
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
                                <button type="submit" className="btn-save">
                                    Add
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default CheckListForm;
