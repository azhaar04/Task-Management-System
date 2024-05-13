import UserLogin from "../pages/login-page/user.login";
import Homepage from "../pages/home-page/homepage";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/homepage" element={<Homepage />} />
        </Routes>
    );
}

export default App;
