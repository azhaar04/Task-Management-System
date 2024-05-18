import { Formik, Form, Field } from "formik";
import { produce } from "immer";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTask } from "../../../../../redux/board/board.actions";
import "./add-member-popup.css";

function AddMemberPopup({ showAddMembersForm, setShowAddMembersForm }) {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        (state) => state.boardReducer.selectedTask
    );
    const users = useSelector((state) => state.userReducer.users);

    const handleMemberSelection = (selectedUser, setFieldValue) => {
        setFieldValue("member", selectedUser.name);
        const inputField = document.getElementById("member");
        inputField.focus();

        if (selectedTask) {
            const updatedSelectedTask = produce(selectedTask, (draft) => {
                draft.members = draft.members
                    ? [...draft.members, selectedUser]
                    : [selectedUser];
            });
            dispatch(setSelectedTask(updatedSelectedTask));
        }
    };

    return (
        showAddMembersForm && (
            <div className="task-add-member-popup">
                <div className="task-add-member-popup-content">
                    <button
                        className="close-window"
                        onClick={() =>
                            setShowAddMembersForm(!showAddMembersForm)
                        }>
                        X
                    </button>
                    <Formik
                        initialValues={{ member: "" }}
                        onSubmit={(values, { resetForm }) => {
                            resetForm();
                        }}>
                        {(formikProps) => {
                            const { values, handleChange, setFieldValue } =
                                formikProps;

                            // Filter users based on input value
                            const filteredUsers = users.filter(
                                (user) =>
                                    user.name
                                        .toLowerCase()
                                        .includes(
                                            values.member.toLowerCase()
                                        ) &&
                                    !selectedTask.members?.some(
                                        (member) => member.name === user.name
                                    )
                            );

                            return (
                                <div>
                                    <Form>
                                        <div className="form-group mb-3">
                                            <label
                                                htmlFor="renameTask"
                                                className="form-label">
                                                Add Members
                                            </label>
                                            <Field
                                                type="input"
                                                className="form-control"
                                                id="member"
                                                name="member"
                                                value={values.member}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form>

                                    <div
                                        style={{
                                            border: "1px solid black",
                                            borderRadius: "5px",
                                            width: "100%",
                                        }}>
                                        <ul className="list-group">
                                            {filteredUsers.map(
                                                (selectedUser, index) => (
                                                    <li
                                                        key={index}
                                                        className="list-group-item"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleMemberSelection(
                                                                selectedUser,
                                                                setFieldValue
                                                            )
                                                        }>
                                                        {selectedUser.name}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        )
    );
}

export default AddMemberPopup;
