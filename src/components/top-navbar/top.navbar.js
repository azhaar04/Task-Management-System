import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";

function TopNavbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand ms-5" href="#">
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "2rem",
                            letterSpacing: "2px",
                            // marginLeft: "100px",
                        }}>
                        TaskTrek
                    </span>
                </span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent">
                    <form className="d-flex me-3">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-success"
                            type="submit">
                            Search
                        </button>
                    </form>
                    <ul className="navbar-nav mb-2 me-5 mb-lg-0">
                        <li className="nav-item dropdown">
                            <span
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i
                                    className="bi bi-person-circle"
                                    style={{ fontSize: "2em" }}></i>
                            </span>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdown">
                                <li>
                                    <span className="dropdown-item">
                                        Switch Account
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown-item">
                                        Manage Account
                                    </span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("userLoggedIn");
                                        dispatch(setIsLoggedIn(false));
                                        navigate("/login", {
                                            replace: true,
                                        });
                                    }}>
                                    <span className="dropdown-item">
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default TopNavbar;
