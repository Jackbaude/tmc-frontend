import React, {useEffect, useMemo, useState} from "react"
import {faDiscord, faYoutube, faGithub} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Jumbotron = () => {
    const [metadata, setMetadata] = useState([])
    //default state of the fetch getPost is loading
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
        const response = await fetch('/__allposts__?')
        var data = await response.json()
        console.log(data)
        data = data.slice(0,3)
        console.log(data)
        await setMetadata(data);
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
    return (
        <div className="jumbotron">
            <h1 className="display-3">Technical Minecraft Wiki</h1>
            <p className="lead">Welcome to the Technical Minecraft Wiki.</p>
            <hr className="my-4"/>
            {/*<p> It uses utility classes for typography and spacing to space content out within the larger container.</p>*/}

            <p className="lead">Latest Posts</p>
            {postLink}
            <p className="lead">
                <a className="btn btn-lg jumbo-link jello" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"
                   rel="noreferrer noopener" role="button">Contribute <FontAwesomeIcon icon={faGithub} size={"lg"}/></a>
                <a className="btn btn-lg jumbo-link jello" href="https://discord.gg/FcTFg2E" target="_blank"
                   rel="noreferrer noopener" role="button">Connect <FontAwesomeIcon icon={faDiscord} size={"lg"}/></a>
            </p>
        </div>
    );
}

export default Jumbotron
