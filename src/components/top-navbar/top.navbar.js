import { useNavigate } from "react-router-dom";

function TopNavbar() {
    const navigate = useNavigate();

    return (
        <nav
            class="navbar navbar-expand-lg navbar-light bg-light"
            style={{ height: "70px" }}>
            <div class="container-fluid">
                <h3 class="navbar-brand" style={{ marginLeft: "5%" }}>
                    TaskTrek
                </h3>

                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <form class="d-flex" style={{ marginLeft: "70%" }}>
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button class="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>

                    <div
                        class=" navbar-nav dropdown"
                        style={{ marginLeft: "2%" }}>
                        <span
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i
                                class="bi bi-person-circle"
                                style={{ fontSize: "2em" }}></i>
                        </span>

                        <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown">
                            <li>
                                <span class="dropdown-item" href="#">
                                    Switch Account
                                </span>
                            </li>
                            <li>
                                <span class="dropdown-item" href="#">
                                    Manage Account
                                </span>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>

                            <li>
                                <span
                                    class="dropdown-item"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        navigate("/login", { replace: true });
                                    }}>
                                    Log out
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopNavbar;
