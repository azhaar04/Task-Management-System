import Login from "./common/login-form";
import "./user.login.css";
function UserLogin() {
    return (
        <div class="container">
            <div class="row landing" style={{ marginTop: "50px" }}>
                <div class="col-md-5">
                    <img
                        // src={require("../img/landing-page.jpg")}
                        src={require("../../assets/landing-page.jpg")}
                        alt="Image"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>

                <div class="col-md-7 login">
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
