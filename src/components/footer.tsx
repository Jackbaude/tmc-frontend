import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons'

const Footer = () => (
    <div>
        <footer className="page-footer font-small special-color-dark pt-4">
            <div className="container">
                <nav className="list-unstyled list-inline text-center">
                    <a className="btn-floating btn-fb mx-1" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"
                       rel="noreferrer noopener">
                        <FontAwesomeIcon icon={faGithub} size="2x"/>
                    </a>
                    <a className="btn-floating btn-tw mx-1" href="https://discord.gg/FcTFg2E" target="_blank"
                       rel="noreferrer noopener">
                        <FontAwesomeIcon icon={faDiscord} size="2x"/>
                    </a>
                    <a className="btn-floating btn-gplus mx-1"
                       href="https://www.youtube.com/channel/UCf9SYal_h3WSoksvxLYruuQ" target="_blank"
                       rel="noreferrer noopener">
                        <FontAwesomeIcon icon={faYoutube} size="2x"/>
                    </a>
                </nav>
            </div>

            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="www.technicalmc.xyz/"> technicalmc.xyz</a>
            </div>
        </footer>
    </div>
)

export default Footer
