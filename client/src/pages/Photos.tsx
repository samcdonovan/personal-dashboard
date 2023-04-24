import React from 'react';
import Photo from "../components/Photo";

/* Photo gallery page functional component; allows user to view photos 
that they have uploaded to their account and add more photos */
function Photos() {
    const images = ["../public/images/test.png", "", "", "", "", ""]; // test images, will be removed later

    return (
        <div>
            <h1>Photos</h1>

            {images.map(function (image, id) {
                let addImg = false;

                /* check if the image is not empty */
                if (!image) {
                    /* check if this is the first image, or if the previous image isn't empty */
                    if (id == 1 || image[id - 1]) {
                        addImg = true;
                    }
                }
                /* return a large Photo component. If the src is empty and this object is either the
                first Photo in the gallery, or the previous object had a src, addImge will be true and so
                the 'upload image' button will be displayed instead of an empty box */
                return <Photo size="large" addImg={addImg} src={image} />;
            })}

        </div>
    );
}

export default Photos;
