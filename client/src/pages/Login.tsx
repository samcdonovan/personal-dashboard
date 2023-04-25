import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { login } from "../utils/ProxyAPI";

/* Login page functional component; 
this will be the first page the user sees */
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginData, setLoginData] = useState<Credentials>({ status: 0 });

    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        login(username, password, setLoginData);

    }

    useEffect(() => {
        console.log(loginData);

        if (loginData.status === 200) {
            localStorage.setItem('credentials',
                JSON.stringify({ username: loginData.username, profilePicture: loginData.profilePicture }));
            navigate('/dashboard');
        }
    }, [loginData]);

    return (
        <div className="login-container">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event: any) => { setUsername(event.target.value) }}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event: any) => { setPassword(event.target.value) }}
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>

                    {/* link to forgotten username or password form (may add later) */}
                    <p>Forgot <a href="#">username or password?</a></p>

                    {/* link to the Register page */}
                    <p>New to the challenge? <Link to="/register">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
