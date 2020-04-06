import React, { Fragment, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';

const AutoInitBot = () => {

    useEffect(() => {
        M.AutoInit();
    })

    return (
        <Fragment />
    )
}

export default AutoInitBot
