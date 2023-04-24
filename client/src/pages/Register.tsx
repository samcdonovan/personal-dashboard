import React from 'react';

function Register() {
    return (
        <div className="login-container">
            <form className="Alogin-form">
                <div className="content">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                        />
                    </div> <div>
                        <input
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                        />
                    </div> <div>
                        <input
                            type="password"
                            placeholder="Confirm password"
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
                        New to the challenge? <a href="#">Sign up</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Register;
