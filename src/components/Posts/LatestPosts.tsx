//TODO add pagnation
import React, {memo, useEffect, useMemo, useState} from "react"

const LatestPosts = () => {
    const [metadata, setMetadata] = useState([])
    // default state of the fetch getPost is loading
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
        const response = await fetch('/api/__latestposts__?')
        await setMetadata(await response.json());
    };
    const postLink = useMemo(() => metadata.map(
        ({title, id, tags, last_edited, description}) => (
            <div className={"post-link-jumbo flip-in"}>
                <div className={"post-link-title"}><a href={"/render-post/" + id}><h1 className={"link"}>{title}</h1>
                </a></div>
                <div>About: {description}</div>
                <div>Tags: {tags}</div>
                <div>Last updated: {last_edited}</div>
            </div>
        )
        ),
        [metadata]);
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
            <div className="alert alert-danger" role="alert">Sorry Looks like something is going wrong. Is the API down?
                Check with Jakku on the Discord.</div>
        )
    } else return (
        <div>
            <h1 className="">Latest Posts</h1>
            <div className={"post-link-jumbo-container"}>
                {postLink}
            </div>
        </div>
    );
}
export default memo(LatestPosts)
