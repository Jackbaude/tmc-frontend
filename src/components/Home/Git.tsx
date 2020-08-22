//TODO add pagnation
import React, {memo, useCallback, useEffect, useMemo, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";

const Git = () => {
    const [metadata, setMetadata] = useState([])
    const [fetchState, setFetchState] = useState("loading")
    useEffect(() => {
        getPost()
            //If the fetch got the data make the state a success
            .then(() => {
                setFetchState("success")
            })
            //If the fetch was bad set the state of the fecth to failed
            .catch(() => {
                setFetchState("failed")
            })
    }, []);
    const getPost = async () => {
        const response = await fetch('https://api.github.com/repos/Jackbaude/tmc-frontend/commits?per_page=5')
        await setMetadata(await response.json())
    };
    const latestCommits = useMemo(() => metadata.map(
        ({commit, html_url}) => (
            <div className={""}>
                <div>{commit.message}</div>
                <a href={html_url}>{html_url}</a>
            </div>
        )
        ),
        [metadata]);
    // if the post is still loading just render a loading bar
    if (fetchState === "loading") {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    //if we caught a error send a failed message
    else if (fetchState === "failed") {
        return (
            <div className="alert alert-danger" role="alert">Sorry Looks like something is going wrong. Is the API down? Check with Jakku on the Discord.</div>
        )
    } else return (
        <div className={"git-commits"}>
            <h1>Latest Commits <FontAwesomeIcon icon={faGithub} size={"lg"}/></h1>
            <hr/>
            {latestCommits}
        </div>
    );
}
export default memo(Git)
