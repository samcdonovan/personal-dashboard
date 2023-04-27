import React, { useState, useEffect } from 'react';
import Photo from "../components/Photo";
import styles from "../styles/photo.module.css";
import { Link } from "react-router-dom";

/**
 * Photo gallery page functional component; allows user to view photos 
 * that they have uploaded to their account and add more photos
 * @returns React component
 */
function Photos() {
    const [photos, setPhotos] = useState(Array<string>); // test images, will be removed later
    const [uploadCheck, setUploadCheck] = useState(false);

    /* set photos array on page load */
    useEffect(() => {
        let photosJson = JSON.parse(localStorage.getItem("gallery") || '{}');

        for (let idx = Object.keys(photosJson).length; idx < 6; idx++) {
            photosJson[idx] = "";
        }
        setPhotos(Object.values(photosJson));
    }, []);

    /* set photos array on uploadCheck */
    useEffect(() => {
        let photosJson = JSON.parse(localStorage.getItem("gallery") || '{}');

        for (let idx = Object.keys(photosJson).length; idx < 6; idx++) {
            photosJson[idx] = "";
        }

        setPhotos(Object.values(photosJson));
        setUploadCheck(false);
    }, [uploadCheck]);

    return (
        <div>

            <Link to="/dashboard">
                <button className="link-btn">Go to dashboard</button>
            </Link>
            <h1 className="page-title">Gallery</h1>

            <div className={styles["gallery"]}>
                {photos.map(function (path: string, id: number) {

                    let addImg = false;

                    /* check if the image is not empty */
                    if (!path) {
                        /* check if this is the first image, or if the previous image isn't empty */
                        if (id == 0 || photos[id - 1]) {
                            addImg = true;
                        }
                    }
                    /* return a large Photo component. If the src is empty and this object is either the
                    first Photo in the gallery, or the previous object had a src, addImge will be true and so
                    the 'upload image' button will be displayed instead of an empty box */
                    return <Photo
                        key={id}
                        size="large"
                        addImg={addImg}
                        src={path}
                        callback={setUploadCheck}
                        page={"gallery"}
                    />;
                })}
            </div>

        </div>
    );
}

export default Photos;
