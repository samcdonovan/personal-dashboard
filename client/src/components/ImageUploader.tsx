import React, { useState } from "react";
import { handleImageUpload } from "../utils/ProxyAPI";
import styles from "../styles/photo.module.css";

interface Props {
    callback: Function,
    page: string
}

function ImageUploader(props: Props) {

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>

            {selectedImage !== null ?
                <div>
                    <img
                        alt="Image not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
                : null
            }

            <div>
                <input
                    id="upload-input"
                    type="file"
                    name="image-upload"
                    onChange={(event) => { handleImageUpload(event, props.page, props.callback) }}
                    hidden={true}
                />
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