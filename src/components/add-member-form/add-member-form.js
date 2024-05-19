import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../redux/user/user.actions";
import { addMemberFormSchema } from "../../redux/user/user.schema";

function AddMemberForm({ setShowNewMemberForm }) {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.userReducer.users);

    useEffect(() => {
        console.log(users);
    }, [users]);
    return (
        <div
            class="col-md-9"
            style={{
                border: "1px solid black",
                height: "80vh",
                display: "flex", // Use flexbox to center the form vertically and horizontally
                alignItems: "center", // Vertically center the form
                justifyContent: "center", // Horizontally center the form
            }}>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                }}
                validationSchema={addMemberFormSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    dispatch(setUsers(values));
                    // setUsers((prevState) => [...prevState, values]);

                    // setUsers([...users, values]);
                    resetForm();
                }}>
                {(formikprops) => {
                    return (
                        <Form
                            className="formm"
                            style={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                padding: "20px",
                                width: "50%",
                                height: "auto",
                            }}>
                            <h3 className="titleName">Add New Member</h3>
                            <div className="form-group mb-3 ">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeHolder="Enter name"
                                />
                                <div className="invalid-feedback d-block">
                                    <ErrorMessage name="name" />
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeHolder="Enter email"
                                />
                                <div className="invalid-feedback d-block">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: "70%" }}>
                                    Add
                                </button>

                                <button
                                    onClick={() => setShowNewMemberForm(false)}
                                    className="btn btn-secondary"
                                    style={{ width: "20%", marginLeft: "10%" }}>
                                    close
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default AddMemberForm;
