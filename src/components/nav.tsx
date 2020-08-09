import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faYoutube, faGithub} from '@fortawesome/free-brands-svg-icons'
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons'

const Nav = () => (
    <div>
        <nav className="navbar navbar-expand-lg">
            <h1><a className="navbar-brand" href="/">Technical Minecraft Wiki</a></h1>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                    <FontAwesomeIcon icon={faAlignJustify}/>
                </span>

            </button>

            <div className="collapse navbar-collapse nav-links" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/posts">Posts<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/new-post">New Post<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"rel="noreferrer noopener"><FontAwesomeIcon icon={faGithub}/> Github</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            More
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="https://discord.gg/FcTFg2E" target="_blank"rel="noreferrer noopener"><FontAwesomeIcon icon={faDiscord}/> Discord</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="https://www.youtube.com/channel/UCf9SYal_h3WSoksvxLYruuQ"target="_blank"rel="noreferrer noopener"> <FontAwesomeIcon icon={faYoutube}/> Youtube</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
)
export default Nav