import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPahtname }) => {
                if (history.location.pathname !== nextPahtname) {
                    history.push(nextPahtname)
                }
            },
            onSignIn
        });


        history.listen(onParentNavigate);

    }, [])

    return (
        <div ref={ref}>

        </div>
    )
}