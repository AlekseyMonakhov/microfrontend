import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history"
import App from "./App";

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history} />,
        el
    );

    return {
        onParentNavigate({ pathname: nextPahtname }) {
            if (nextPahtname !== history.location.pathname) {
                history.push(nextPahtname)
            }
        }
    }
}

if (process.env.NODE_ENV === "development") {
    const el = document.querySelector("#_markerting-root");

    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() })
    }
}

export { mount }