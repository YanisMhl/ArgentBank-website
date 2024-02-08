import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "../../components/Account";

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
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />user !</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account 
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
            />
            <Account 
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
            />
            <Account 
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
            />
        </main>
    );
}

export default User;