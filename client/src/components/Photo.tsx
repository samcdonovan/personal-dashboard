import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import styles from '../styles/photo.module.css';

/* Interface for Photo component props */
interface PhotoProps {
    id?: number,
    size: string,
    src?: string,
    addImg?: boolean,
    uploadCheck?: Function,
    deleteCheck?: Function,
    page: string
}

/**
 * Photo component; displays either an upload button, an empty square or a photo
 * depending on the props that are passed to it
 * @param props The component props for a Photo component
 * @returns React component
 */
function Photo(props: PhotoProps) {
    const [newSrc, setNewSrc] = useState("");

    function deleteImage(event: any, galleryIdx: number) {
        event.preventDefault();
        let images = JSON.parse(localStorage.getItem('gallery') || "");

        /* append new image to gallery */
        images[galleryIdx] = '';
        for (let idx = galleryIdx + 1; idx < 6; idx++) {
            images[idx - 1] = images[idx];
        }
        //console.log(images);
        localStorage.setItem('gallery', JSON.stringify(images));
        if (props.deleteCheck) props.deleteCheck(true);
    }


    useEffect(() => {
        console.log(props)
    }, []);


    useEffect(() => {
        console.log("new " + newSrc + " " + !newSrc + " " + props.src !== null)

        if (props.uploadCheck) props.uploadCheck(true);
    }, [newSrc]);

    return (

        <div className={styles[props.size + "-img"]}>
            {/* set size of the div depending on the size prop */}

            {
                /* check whether the current photo should
            display the upload image button */
                props.addImg == true && !newSrc ?

                    <ImageUploader callback={setNewSrc} page={props.page} />

                    :
                    /* if it is not an 'upload image' div, check whether
                    a src exists for this photo */
                    props.src == null ?

                        /* if there is no source, display an empty square */
                        <div></div>
                        :

                        <div>
                            {/* otherwise display the image */}
                            <img className={styles[props.size + "-img"]} src={props.src} />

                            {props.page === "gallery" ?
                                props.src !== '' ?
                                    <button className={styles["delete-btn"]} onClick={(event) => {
                                        console.log(props.id)
                                        if (props.id !== undefined) deleteImage(event, props.id)
                                    }}>Delete</button>
                                    : null
                                : null}
                        </div>
            }

        </div>
    );
}

export default Photo;