import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Authorize from "./components/Authorize";
import Me from "./pages/Me";


const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/me" element={<Authorize><Me /></Authorize>} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default Routers;
