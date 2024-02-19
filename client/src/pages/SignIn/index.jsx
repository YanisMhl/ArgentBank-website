import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../features/user/userSlice";
import { useUserLoginMutation } from "../../features/userAuth/userAuthApi";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { token, userName } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [userLogin, { isLoading, error }] = useUserLoginMutation();


    useEffect(() => {
        if (token) {
            if (rememberMe) { 
                localStorage.setItem("token", token);
                localStorage.setItem("userName", userName);
                localStorage.setItem("rememberMe", true);
            };
            navigate('/user');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Veillez remplir tous les champs du formulaire.");
        } else {
            try {
                const response = await userLogin({email, password}).unwrap();
                console.log(response);
                dispatch(setToken(response.body.token));
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
                        <input type="checkbox" id="remember me" onClick={() => setRememberMe(!rememberMe)} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {
                    isLoading ? <p>Loading..</p> :
                    <button className="sign-in-button">Sign In</button>
                    }
                </form>
                {error && <p>Une erreur est survenue.</p>}
            </section>
        </main>
    );
};

export default SignIn;