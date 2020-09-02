import React, {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faYoutube, faGithub} from '@fortawesome/free-brands-svg-icons'
import {faAlignJustify, faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarToggler"
                        aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <a className="navbar-brand" href="/"><h2 className={"flip-in"}>Technical Minecraft Wiki</h2></a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link link" href="/">Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link link" href="/posts">Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link link" href="/new-post">New Post</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link link" href="/archive">Archive</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link link" href="/about">About</a>
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
                    <ThemeToggle/>
                </div>
            </nav>
        </div>
)
}
export default Nav