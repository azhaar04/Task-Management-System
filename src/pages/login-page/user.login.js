import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./common/login-form";
import { useNavigate } from "react-router-dom";

function UserLogin() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (token) {
    //         navigate("/homepage", { replace: true });
    //     }
    // }, [navigate]);

    return (
        <div className="container">
            <div className="row landing mt-5">
                <img
                    src={require("../../assets/logo.png")}
                    alt="TaskTrek Logo"
                    className="logo"
                />
                <div className="col-md-5">
                    <img
                        src={require("../../assets/landing-page.jpg")}
                        alt="Landing Page"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-7">
                    <div className="text-center mb-4"></div>

                    <Login />
                    <div className="mt-3 text-center">
                        <p className="mb-0">Don't have an account?</p>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
