import React from "react"
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import book from "./img/book.png"
import LatestPosts from "../Posts/LatestPosts";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

const Jumbotron = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Technical Minecraft Wiki <img src={book} alt={"book:("} id={"book-image"}/></h1>
            <p className="lead">Welcome to the Technical Minecraft Wiki.</p>
            <hr className="my-4"/>
            {/*<p> It uses utility classes for typography and spacing to space content out within the larger container.</p>*/}
            <div className={"jumbo-content"}>
                <LatestPosts/>
            </div>

            <p className="lead">
                <a className="btn btn-lg jumbo-link" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"
                   rel="noreferrer noopener" role="button">Contribute <FontAwesomeIcon icon={faGithub} size={"lg"}/></a>
                <a className="btn btn-lg jumbo-link" href="https://github.com/Jackbaude/tmc-frontend/issues/new"
                   target="_blank"
                   rel="noreferrer noopener" role="button">Issues <FontAwesomeIcon icon={faExclamationCircle}
                                                                                   size={"lg"}/></a>
                <a className="btn btn-lg jumbo-link" href="https://discord.gg/FcTFg2E" target="_blank"
                   rel="noreferrer noopener" role="button">Connect <FontAwesomeIcon icon={faDiscord} size={"lg"}/></a>
            </p>

            {/*<Git/>*/}
        </div>
    );
}

export default Jumbotron
