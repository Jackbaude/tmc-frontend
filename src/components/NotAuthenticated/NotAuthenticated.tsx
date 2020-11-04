import React from "react";

const NotAuthenticated = () => {
    return (
        <React.Fragment>
            <div className="alert alert-danger" role="alert">This page requires you to be logged in. Please log in before creating a new post.</div>
            <a className={"btn btn-lg"} href={"/api/auth"}>Login</a>
        </React.Fragment>
    )
};
export default NotAuthenticated;
