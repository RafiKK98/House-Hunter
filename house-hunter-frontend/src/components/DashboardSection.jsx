import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom";

const DashboardSection = () => {

    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user);
    if (loading) {
        return (
            <div>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (!user) {
        navigate('/login');
    }

    return (
        <div>DashboardSection</div>
    )
}

export default DashboardSection