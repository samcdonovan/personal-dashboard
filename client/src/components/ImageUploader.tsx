import React, { useState } from "react";

interface Props {
    callback: Function
}
function ImageUploader(props: Props) {

    const [selectedImage, setSelectedImage] = useState(null);

    function storePath(path: string) {
        if (localStorage.getItem('images') === null) {
            localStorage.setItem('images', JSON.stringify({ 0: path }))
        }
        else {
            let images = JSON.parse(localStorage.getItem('images') || "");
            images[Object.keys(images).length] = path;
            console.log(images);
            localStorage.setItem('images', JSON.stringify(images));
        }

        props.callback(path);
    }

    function handleImageUpload(event: any) {
        const files = event.target.files;
        const formData = new FormData();
        formData.append('uploadedPhoto', files[0]);
        formData.append("user", "Sam");

        fetch('http://localhost:8080/uploadImage', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                storePath(data.path);
            })
            .catch(error => {
                console.error(error)
            })
    }

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
                onChange={handleImageUpload}
            />
        </div>
    );
};

export default ImageUploader;