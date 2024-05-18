import UserLogin from "./pages/login-page/user.login";
import Homepage from "./pages/home-page/homepage";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { setIsLoggedIn } from "./redux/user/user.actions";

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

    useEffect(() => {
        const storedUserLoggedIn = localStorage.getItem("userLoggedIn");
        if (storedUserLoggedIn !== null) {
            try {
                dispatch(setIsLoggedIn(storedUserLoggedIn));
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<UserLogin />} />

            <Route
                path="/homepage"
                element={isLoggedIn ? <Homepage /> : <Navigate to="/login" />}
            />
            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
