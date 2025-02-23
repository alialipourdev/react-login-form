import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

const Authorize = ({ children }: Props) => {
    const token = localStorage.getItem("access");
    return token ? children : <Navigate to="/login" />;
};

export default Authorize;
