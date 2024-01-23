import { Link, useNavigate } from "react-router-dom"
import useSessionStorage from "../hooks/useSessionStorage"
import Swal from "sweetalert2";

const Navbar = () => {

    const navigate = useNavigate();
    const { removeItem } = useSessionStorage();

    const navLinks = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
    </>

    const logOut = () => {
        removeItem('jwt');
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logged out successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        navigate('/login');
    }

    return (
        <header className="bg-primary shadow-xl">
            <nav className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navLinks
                        }
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">House Hunter</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-accent" onClick={logOut}>Log out</button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar