// Login.js
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../utils/user.schema";
import { login } from "../../../utils/user.actions";
import { setIsLoggedIn } from "../../../redux/user/user.actions";
import { useDispatch } from "react-redux";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/homepage", { replace: true });
        }
    }, [navigate]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <h3 className="text-center mb-4">Welcome To TaskTrek</h3>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(values, actions) => {
                            login(values)
                                .then((response) => {
                                    localStorage.setItem(
                                        "token",
                                        response.accessToken
                                    );
                                    localStorage.setItem(
                                        "userLoggedIn",
                                        JSON.stringify(true)
                                    );
                                    dispatch(setIsLoggedIn(true));
                                    navigate("/homepage", { replace: true });
                                })
                                .catch((error) => {
                                    console.log("Error");
                                });
                        }}>
                        {() => (
                            <Form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                        style={{ fontWeight: "normal" }}>
                                        Email address
                                    </label>
                                    <Field
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                        style={{ fontWeight: "normal" }}>
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block">
                                        Login
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
