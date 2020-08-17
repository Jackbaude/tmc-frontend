import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faYoutube, faGithub} from '@fortawesome/free-brands-svg-icons'
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons'

const Nav = () => (
    <div>
        <nav className="navbar navbar-expand-lg">
            <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="/"><h2>Technical Minecraft Wiki</h2></a>
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link" href="/posts">Posts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link" href="/edit-post/2">EDIT POST (DEV PURPOSE)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"
                           rel="noreferrer noopener"><FontAwesomeIcon icon={faGithub} size={"lg"}/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://discord.gg/FcTFg2E" target="_blank"
                           rel="noreferrer noopener"><FontAwesomeIcon icon={faDiscord} size={"lg"}/></a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-n1">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </div>
)
export default Nav