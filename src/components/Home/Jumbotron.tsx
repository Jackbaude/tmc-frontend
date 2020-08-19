import React from "react"
import {faDiscord, faYoutube, faGithub} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Jumbotron = () => (
    <div className="jumbotron">
        <h1 className="display-3">Technical Minecraft Wiki</h1>
        <p className="lead">Welcome to the Technical Minecraft Wiki.</p>
        <hr className="my-4"/>
            {/*<p> It uses utility classes for typography and spacing to space content out within the larger container.</p>*/}
            <p className="lead">
                <a className="btn btn-lg jumbo-link jello" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"
                   rel="noreferrer noopener" role="button">Contribute <FontAwesomeIcon icon={faGithub} size={"lg"}/></a>
                <a className="btn btn-lg jumbo-link jello" href="https://discord.gg/FcTFg2E" target="_blank"
                   rel="noreferrer noopener"role="button">Connect <FontAwesomeIcon icon={faDiscord} size={"lg"}/></a>

            </p>
    </div>
)

export default Jumbotron
