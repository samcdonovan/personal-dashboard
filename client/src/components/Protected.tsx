import React from 'react';
import { Navigate } from "react-router-dom";

interface Props extends React.PropsWithChildren {
    isLoggedIn: boolean
}

/**
 * Protected page component; handles conditional rendering of pages
 * depending on if the user is logged in.
 * 
 * @param props The component props for a Photo component
 * @returns React component
 */
function Protected(props: Props) {

    return (

        <>
            {props.isLoggedIn ?
                <div>
                    {props.children}
                </div>
                :
                <Navigate to="/" replace />
            }
        </>
    );
}

export default Protected;