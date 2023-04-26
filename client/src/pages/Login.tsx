import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { login } from "../utils/ProxyAPI";
import styles from "../styles/loginRegister.module.css";

/* Login page functional component; 
this will be the first page the user sees */
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginData, setLoginData] = useState<LoginData>({ status: 0 });

    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        login(username, password, setLoginData);
    }

    useEffect(() => {

        if (loginData.status === 200) {
            localStorage.setItem('credentials',
                JSON.stringify({
                    username: loginData.username, profilePicture: loginData.profilePicture,
                    gallery: loginData.gallery, tasks: loginData.tasks
                }));
            navigate('/dashboard');
        }
    }, [loginData]);

    return (
        <div>
            <h1 className={"welcome-message " + styles["main-title"]}>Dev Challenge</h1>

            <form className={styles["lr-container"]} onSubmit={handleSubmit}>
                <div className={styles["input-container"]}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event: any) => { setUsername(event.target.value) }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event: any) => { setPassword(event.target.value) }}
                    />
                </div>
                <div className={styles["lr-btn-container"]}>
                    <button className={styles["lr-btn"]} type="submit">Login</button>

                    {/* link to the Register page */}
                    <p className={styles["sign-up"]}>New to the challenge? <Link to="/register"><span className="highlighted">Sign up</span></Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
