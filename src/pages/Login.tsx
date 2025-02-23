import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../api";
import { LoginRequest } from "../type";

const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری را وارد کنید."),
    password: Yup.string().min(4, "رمز عبور حداقل ۴ کاراکتر باشد").required("رمز عبور را وارد کنید."),
});

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    const { mutate } = useMutation({
        mutationFn: (values: LoginRequest) => login(values),
        onSuccess: (data) => {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            navigate("/me");
        },
        onError: () => {
            setError("نام کاربری یا رمز عبور اشتباه است!");
        },
    });

    return (
        <div>
            <h2>ورود</h2>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={mutate}
            >
                <Form>
                    <div style={{ padding: "20px" }}>
                        <label>نام کاربری:</label>
                        <Field type="text" name="username" style={{ background: "#333", padding: "10px 30px", border: "1px solid #444", borderRadius: "10px", margin: "10px", color: "#fff" }} />
                        <ErrorMessage name="username" component="div" style={{ color: "red" }} />
                    </div>
                    <div style={{ padding: "20px" }}>
                        <label>رمز عبور:</label>
                        <Field type="password" name="password" style={{ background: "#333", padding: "10px 30px", border: "1px solid #444", borderRadius: "10px", margin: "10px", color: "#fff" }} />
                        <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                    </div>
                    <button type="submit" style={{ background: "#333", padding: "10px 30px", border: "1px solid #444", borderRadius: "10px", margin: "10px", color: "#ddd" }}>ورود</button>
                </Form>
            </Formik>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
