import React, { useState } from "react";
import { handleImageUpload } from "../utils/ProxyAPI";

interface Props {
    callback: Function
}
function ImageUploader(props: Props) {

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>
            <h1>Upload and Display Image usign React Hook's</h1>

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

            <input
                type="file"
                name="image-upload"
                onChange={(event) => { handleImageUpload(event, props.callback) }}
            />
        </div>
    );
};

export default ImageUploader;