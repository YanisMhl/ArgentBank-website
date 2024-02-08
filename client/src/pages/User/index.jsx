import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const { token, firstName, lastName, userName } = useSelector(state => state.user);

    useEffect(() => {
        console.log("ici");
        if (!token) {
            console.log("if");
            navigate('/');
        }
    }, [token]);
    return (<h1>User</h1>);
}

export default User;