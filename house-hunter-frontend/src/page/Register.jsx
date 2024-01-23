import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useSessionStorage from "../hooks/useSessionStorage";
import { AuthContext } from "../providers/AuthProvider";


const Register = () => {
    const navigate = useNavigate();
    const { setItem } = useSessionStorage();
    const { setUser, setLoading } = useContext(AuthContext);
    const [registerForm, setRegisterForm] = useState({
        fullName: "",
        role: "",
        phoneNumber: "",
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
        console.log(registerForm);
        
        axios.post('http://localhost:5000/api/auth/register', registerForm)
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
                        title: "Registered successfully!",
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
        setRegisterForm((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center relative bg-neutral">
                <div className="w-full max-w-md border-2 shadow-md rounded-md p-4 z-50 bg-white border-theme_color-blue mx-2 sm:mx-0">
                    <h2 className="text-center font-medium text-3xl mb-6 text-neutral">Register</h2>
                    <div>
                        <form className="flex flex-col relative w-full space-y-6" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Enter your Full Name" className="input input-bordered w-full text-black placeholder:text-gray-500" name="fullName" value={registerForm.fullName} onChange={handleChange} required/>
                            <select className="select select-bordered w-full text-gray-500" name="role" onChange={handleChange} required>
                                <option disabled selected value="">Select Role</option>
                                <option value="House Owner">House Owner</option>
                                <option value="House Renter">House Renter</option>
                            </select>
                            <input type="text" placeholder="Enter your Phone Number" className="input input-bordered w-full text-black placeholder:text-gray-500" name="phoneNumber" value={registerForm.phoneNumber} onChange={handleChange} required/>
                            <input type="email" placeholder="Enter your Email" className="input input-bordered w-full text-black placeholder:text-gray-500" name="email" value={registerForm.email} onChange={handleChange} required/>
                            <input type="password" placeholder="Enter your password" className="input input-bordered w-full text-black placeholder:text-gray-500" name="password" value={registerForm.password} onChange={handleChange} required/>
                            <button className="btn btn-secondary" type="submit">Register</button>
                        </form>
                        <p className="pt-2 text-center text-base text-neutral">Already have an account? <Link to="/login" className="underline text-blue-500"> Login Here</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register