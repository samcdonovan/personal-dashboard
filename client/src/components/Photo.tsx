import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

/* Interface for Photo component props */
interface PhotoProps {
    size: string,
    src?: string,
    addImg?: boolean,
    callback?: Function
}

/**
 * Photo component; displays either an upload button, an empty square or a photo
 * depending on the props that are passed to it
 * @param props The component props for a Photo component
 * @returns React component
 */
function Photo(props: PhotoProps) {
    const [newSrc, setNewSrc] = useState("");
    const [currentSrc, setCurrentSrc] = useState<string>();

    useEffect(() => {
        if (!newSrc) setCurrentSrc(props.src);
        console.log(currentSrc)
    }, [currentSrc]);

    useEffect(() => {
        //if (newSrc) setCurrentSrc(newSrc);
        if (props.callback) props.callback(true);
    }, [newSrc]);

    return (

        <div className={props.size + "-img"}>
            {/* set size of the div depending on the size prop */}

            {
                /* check whether the current photo should 
                display the upload image button */
                props.addImg == true && !newSrc ?

                    <ImageUploader callback={setNewSrc} />
                    //<button>+</button>

                    :
                    /* if it is not an 'upload image' div, check whether
                    a src exists for this photo */
                    props.src == null ?

                        /* if there is no source, display an empty square */
                        <div></div>
                        :

                        /* otherwise display the image */
                        <img src={props.src} />
            }

        </div>
    );
}

export default Photo;