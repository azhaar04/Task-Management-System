import { Formik, Form, Field } from "formik";

function AddmMemberPopup({
    showAddMembersForm,
    setShowAddMembersForm,
    users,
    selectedTask,
    setSelectedTask,
}) {
    return (
        <div className="task-edit-popup">
            <div class=" task-edit-popup-content">
                <button
                    className="close-button"
                    onClick={() => setShowAddMembersForm(!showAddMembersForm)}>
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

                        return (
                            <div>
                                <Form>
                                    <div className="form-group mb-3 ">
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
                                    <ul class="list-group">
                                        {users
                                            .filter((user, userIndex) =>
                                                user.name
                                                    .toLowerCase()
                                                    .includes(
                                                        values.member.toLowerCase()
                                                    )
                                            )
                                            .map(
                                                (
                                                    selectedUser,
                                                    selectedUserIndex
                                                ) => {
                                                    const isAlreadySelected =
                                                        selectedTask.members &&
                                                        selectedTask.members.some(
                                                            (member) =>
                                                                member.name ===
                                                                selectedUser.name
                                                        );
                                                    if (!isAlreadySelected) {
                                                        return (
                                                            <li
                                                                class="list-group-item"
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    console.log(
                                                                        selectedUser
                                                                    );
                                                                    setFieldValue(
                                                                        "member",
                                                                        selectedUser.name
                                                                    );
                                                                    const inputField =
                                                                        document.getElementById(
                                                                            "member"
                                                                        );
                                                                    inputField.focus();

                                                                    setSelectedTask(
                                                                        (
                                                                            prevState
                                                                        ) => {
                                                                            let updatedMembers;
                                                                            if (
                                                                                selectedTask.members
                                                                            ) {
                                                                                updatedMembers =
                                                                                    [
                                                                                        ...prevState.members,
                                                                                        selectedUser,
                                                                                    ];
                                                                            } else {
                                                                                updatedMembers =
                                                                                    [
                                                                                        selectedUser,
                                                                                    ];
                                                                            }

                                                                            return {
                                                                                ...prevState,
                                                                                members:
                                                                                    updatedMembers,
                                                                            };
                                                                        }
                                                                    );
                                                                }}>
                                                                {
                                                                    selectedUser.name
                                                                }
                                                            </li>
                                                        );
                                                    }
                                                }
                                            )}
                                    </ul>
                                </div>
                            </div>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default AddmMemberPopup;
