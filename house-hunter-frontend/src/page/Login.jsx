import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useSessionStorage from "../hooks/useSessionStorage";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
    const navigate = useNavigate();
    const { setItem } = useSessionStorage();
    const { setUser, setLoading } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const generateError = error => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(loginForm);
        
        axios.post('http://localhost:5000/api/auth/login', loginForm)
        .then(res => {
            console.log(res.data);
            if (res.data) {
                if (res.data.errors) {
                    const { email, password } = res.data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Logged in successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/");
                    setItem('jwt', res.data.token);
                    setUser(res.data);
                    setLoading(false);
                }
            }
        }, err => {
            console.log(err);
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center relative bg-neutral">
                <div className="w-full max-w-md shadow-lg rounded-lg p-4 bg-white z-50 border-theme_color-blue mx-2 sm:mx-0">
                    <h2 className="text-center font-medium text-3xl mb-6 text-neutral">Login</h2>
                    <div>
                        <form className="flex flex-col relative w-full space-y-6" onSubmit={handleSubmit}>
                            <input type="email" placeholder="Enter your Email" className="input input-bordered w-full text-black placeholder:text-gray-500" name="email" value={loginForm.email} onChange={handleChange} required />
                            <input type="password" placeholder="Enter your password" className="input input-bordered w-full text-black placeholder:text-gray-500" name="password" value={loginForm.password} onChange={handleChange} required />
                            <button className="btn btn-secondary" type="submit"> Log In </button>
                        </form>
                        <p className="pt-2 text-center text-base text-neutral"> Don&apos;t have an account? <Link to="/register" className="underline text-blue-500"> Register Here</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login