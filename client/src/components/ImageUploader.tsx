import React, { useState } from "react";
import { handleImageUpload } from "../utils/ProxyAPI";

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

            <input
                type="file"
                name="image-upload"
                onChange={(event) => { handleImageUpload(event, props.page, props.callback) }}
            />
        </div>
    );
};

export default ImageUploader;