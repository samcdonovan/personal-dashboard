import React from 'react';
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login-container">
            <form className="login-form">
                <div className="content">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <button type="submit">
                            Login
                        </button>
                    </div>
                    <p>
                        Forgot <a href="#">username or password?</a>
                    </p>
                    <p>
                        New to the challenge? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
