import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";


function Loader() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="sweet-loading text-center">

            <HashLoader
                color={'#000'}
                loading={loading}
                style={{marginRight: loading}}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Loader;
