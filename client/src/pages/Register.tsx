import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { register } from "../utils/ProxyAPI";
import ImageUploader from '../components/ImageUploader';
import styles from "../styles/loginRegister.module.css";
import Photo from '../components/Photo';

/* Register page functional component; allows user to register an
account for the dashboard */
function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [registerStatus, setRegisterStatus] = useState(0);

    function handleSubmit(event: any) {
        event.preventDefault();
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
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event: any) => { setEmail(event.target.value) }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event: any) => { setPassword(event.target.value) }}
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event: any) => { setConfirmPassword(event.target.value) }}
                    />
                </div>

                <div className={styles["upload-register"]}>
                    {imgPath === '' ?
                        <ImageUploader callback={setImgPath} page="register" />
                        :
                        <Photo size="medium" src={imgPath} addImg={false} page="register" />
                    }
                </div>
                <div className={styles["lr-btn-container"]}>
                    <button className={styles["lr-btn"]} type="submit">Register</button>

                    {/* link back to login page for if they already have an account */}
                    <p className={styles["sign-up"]}>Already have an account? <Link to="/"><span className="highlighted">Sign in</span></Link></p>

                </div>
            </form>
        </div>
    );
}

export default Register;
