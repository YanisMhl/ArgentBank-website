import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { useUserLoginMutation } from "../../features/userAuth/userAuth";

const SignIn = () => {
    const dispatch = useDispatch();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [userLogin, { data, isLoading, error }] = useUserLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Veillez remplir tous les champs du formulaire.");
        } else {
            try {
                const response = await userLogin({email, password});
                console.log(response);
            } catch(err) {
                console.log(err.message);
            }
        }
        setemail('');
        setPassword('');
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
                <h1>Sign In</h1>
                <form onSubmit={async (e) => handleSubmit(e)}>
                    <div className="input-wrapper">
                        <label htmlFor="email">email</label>
                        <input 
                        type="text" 
                        id="email" 
                        value={email}
                        onChange={(e) => {setemail(e.target.value)}}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;