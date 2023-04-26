import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { register } from "../utils/ProxyAPI";
import ImageUploader from '../components/ImageUploader';

/* Register page functional component; allows user to register an
account for the dashboard */
function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [imageBlob, setImageBlob] = useState(new Blob());
    const [registerStatus, setRegisterStatus] = useState(0);

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(imageBlob)
        register(username, email, password, imgPath, setRegisterStatus);
    }

    useEffect(() => {

        if (registerStatus === 201) {

            alert('Success!');
        }
    }, [registerStatus]);

    useEffect(() => {
        console.log(imgPath)
    }, [imgPath]);

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="content">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event: any) => { setUsername(event.target.value) }}

                        />
                    </div> <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event: any) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event: any) => { setPassword(event.target.value) }}
                        />
                    </div> <div>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(event: any) => { setConfirmPassword(event.target.value) }}
                        />
                    </div>

                    <ImageUploader callback={setImgPath} page="register" />
                    <div>
                        <button type="submit">Register</button>
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
