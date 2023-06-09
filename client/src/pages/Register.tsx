import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { register } from "../utils/ProxyAPI";
import ImageUploader from '../components/ImageUploader';
import styles from "../styles/loginRegister.module.css";
import Photo from '../components/Photo';

/**
 * Register page functional component; allows user to register an
 * account for the dashboard
 * @returns React component
 */
function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [registerStatus, setRegisterStatus] = useState(0);

    /**
     * Simple email validation using regex
     * @param email Email input value
     * @returns Boolean for if the email is valid or not
     */
    function validateEmail(email: string) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    /**
     * Simple password validation
     * 
     * @param password Password input value
     * @param confirmPassword Confirm password input value
     * @returns Boolean for if password is valid or not
     */
    function validatePassword(password: string, confirmPassword: string) {
        let check = false;

        if (password.length < 8) {
            alert("Password must be at least 8 characters long!");
        } else if (password.search(/[a-z]/) < 0) {
            alert("Password must contain at least one lowercase letter!");
        } else if (password.search(/[A-Z]/) < 0) {
            alert("Password must contain at least one uppercase letter!");
        } else if (password.search(/[0-9]/) < 0) {
            alert("Password must contain at least one number!");
        } else if (password.search(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g) < 0) {
            alert("Password must contain at least one special character!");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match!")
        } else {
            check = true;
        }

        return check;
    }
    /**
     * Handles register form submission
     * @param event Event that triggered the submission
     */
    function handleSubmit(event: any) {
        event.preventDefault();

        if (username === '' || !email || !password || !confirmPassword) {
            alert("Required field missing!")
        } else if (!validatePassword(password, confirmPassword)) {
            console.log("Password is not valid")
        } else if (!validateEmail(email)) {
            alert(email + " is not a valid email address!")
        } else {
            register(username, email, password, imgPath, setRegisterStatus);
        }
    }


    /* alert user if registration was successful */
    useEffect(() => {
        if (registerStatus === 201) {
            alert('Success!');
        } else if (registerStatus == 409) {
            alert('User ' + username + ' already exists!')
        }
    }, [registerStatus]);

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
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event: any) => { setEmail(event.target.value) }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event: any) => { setPassword(event.target.value) }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event: any) => { setConfirmPassword(event.target.value) }}
                        required
                    />
                </div>

                {/* profile picture upload container. If the user uploads a photo, it will be displayed here */}
                <div className={styles["upload-register"]}>
                    {imgPath === '' ?
                        <ImageUploader callback={setImgPath} page="register" />
                        :
                        <Photo size="medium" src={imgPath} addImg={false} page="register" />
                    }
                </div>
                <div className={styles["lr-btn-container"]}>
                    <button className="yellow-btn btn-lg" type="submit">Register</button>

                    {/* link back to login page for if they already have an account */}
                    <p className={styles["sign-up"]}>Already have an account? <Link to="/"><span className="highlighted">Sign in</span></Link></p>

                </div>
            </form>
        </div>
    );
}

export default Register;
