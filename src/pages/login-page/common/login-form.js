import { Formik, Form, Field, ErrorMessage } from "formik";

import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../utils/user.schema";
import { login } from "../../../utils/user.actions";

function Login() {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
                login(values)
                    .then((response) => {
                        localStorage.setItem("token", response.accessToken);
                        navigate("/homepage", { replace: true });
                        console.log("Login Successfull", response);
                    })
                    .catch((error) => {
                        console.log("Error");
                    });

                // console.log(values);
            }}>
            {(formikprops) => {
                return (
                    <Form className="formm">
                        <h3 className="titleName">Welcome To TaskTrek</h3>
                        <div className="form-group mb-3 ">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <Field
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                            />
                            <div className="invalid-feedback d-block">
                                <ErrorMessage name="email" />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <Field
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                            />
                            <div className="invalid-feedback d-block">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <div className="btnContainer">
                            <button
                                type="submit"
                                className="btn btn-primary btnLogin">
                                Login
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default Login;
