import React from "react";

const NotAuthenticated = () => {
    return (
        <React.Fragment>
            <p><b>This page requires you to be authenticated.</b></p>
            <a className={"btn btn-lg"} href={"/api/auth"}>Login</a>
        </React.Fragment>
    )
};
export default NotAuthenticated;
