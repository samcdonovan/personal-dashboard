import React from 'react';
import { Link } from "react-router-dom";

/* Register page functional component; allows user to register an
account for the dashboard */
function Register() {
    return (
        <div className="login-container">
            <form className="login-form">
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

                    {/* link back to login page for if they already have an account */}
                    <p>Already have an account? <Link to="/login">Sign up</Link></p>

                </div>
            </form>
        </div>
    );
}

export default Register;
