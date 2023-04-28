import React, { useState } from "react";
import { handleImageUpload } from "../utils/ProxyAPI";
import styles from "../styles/photo.module.css";

/* Props interface with a callback function to pass
state data and the page that the current ImageUploader is on */
interface Props {
    callback: Function,
    page: string
}

/**
 * Image Uploader functional component; allows the user to upload an image 
 * usung a file upload input
 * 
 * @param props Props for the ImageUploader
 * @returns React component
 */
function ImageUploader(props: Props) {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            {/*isLoading ?
                <div className={"loading-container " + styles["upload-" + props.page]}>

                </div>
    : null*/}

            <div>
                {/* hidden file input field */}
                <input
                    id="upload-input"
                    type="file"
                    name="image-upload"
                    onChange={(event) => { handleImageUpload(event, props.page, props.callback, setIsLoading) }}
                    hidden={true}
                />

                {/* custom label for the input, changes depending on the page */}
                <label
                    className={styles["upload-" + props.page]}
                    htmlFor="upload-input"
                >
                    <span>{props.page === "register" ? "Add picture" : "+"}</span>
                </label>
            </div>
        </div>
    );
};

export default ImageUploader;