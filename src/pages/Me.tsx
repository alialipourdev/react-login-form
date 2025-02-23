import { useEffect, useState } from "react";
import { User } from "../type";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../api";


const Me = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("access");
            if (!token) {
                return navigate("/login");
            }
            try {
                const data = await getUserData(token);
                setUser(data);
            } catch {
                localStorage.removeItem("access");
                navigate("/login");
            }
        };
        fetchUserData();
    }, [navigate]);

    return (
        <div>
            <h2>صفحه کاربری</h2>
            {user ? <p>نام کاربری: {user.username}</p> : <p>در حال بارگذاری...</p>}
            <button onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login");
            }}>خروج</button>
        </div>
    );
};

export default Me;
