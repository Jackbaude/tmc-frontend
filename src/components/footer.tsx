import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub, faYoutube, faReddit} from '@fortawesome/free-brands-svg-icons'

const Footer = () => (
    <div>
        <footer className="page-footer font-small special-color-dark pt-4">
            <div className="container">
                <nav className="list-unstyled list-inline text-center">
                    <a className="footer-icon" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"
                       rel="noreferrer noopener">
                        <FontAwesomeIcon icon={faGithub} size="2x"/>
                    </a>
                    <a className="footer-icon" href="https://discord.gg/FcTFg2E" target="_blank"
                       rel="noreferrer noopener">
                        <FontAwesomeIcon icon={faDiscord} size="2x"/>
                    </a>
                    <a className="footer-icon"
                       href="https://www.reddit.com/r/technicalminecraft/" target="_blank"
                       rel="noreferrer noopener">
                        <FontAwesomeIcon icon={faReddit} size="2x" color={""}/>
                    </a>
                </nav>
            </div>
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a className={"link"} href="license"> technicalmc.xyz</a>
            </div>
        </footer>
    </div>
)

export default Footer
