import React, {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons'
import ThemeToggle from "./ThemeToggle";
import {faDollarSign, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import book from "./Home/img/book.png"
const Nav = () => {
    useEffect(() => {
        getUser()
            .catch(() => {
                setAuthenticated(false);
            });
    }, []);
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [discriminator, setDiscriminator] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState('');
    const getUser = async () => {
        const response = await fetch('/api/__userinfo__');
        const data = await response.json();
        const auth = data.authenticated;
        setAuthenticated(auth);
        if (auth) {
            setUsername(data.discordName);
            setDiscriminator(data.discordDiscriminator);
            setAvatarUrl(data.discordAvatar);
        }
    }
    const userButton = () => {
        if (authenticated) {
            return (
                <React.Fragment>
                    <li className="nav-item discord-data">
                        <img src={avatarUrl} alt={"Discord Avatar"} width={"32"} height={"32"} className={"discord-avatar"}/>
                        <a className={"discord-username"}>{username}<a className={"discord-discriminator"}>#{discriminator}</a></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={"/api/auth/logout"}><FontAwesomeIcon icon={faSignOutAlt} size={"2x"}/></a>
                    </li>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <li className="nav-item">
                        <a className="nav-link" href={"/api/auth"}><FontAwesomeIcon icon={faSignInAlt} size={"2x"}/></a>
                    </li>
                </React.Fragment>
            )
        }
    };
    const newPost = () => {
        if (authenticated) {
            return (
                <li className="nav-item">
                    <a className="nav-link link" href="/new-post">New Post</a>
                </li>
            )
        } else {
            return <div/>
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarToggler"
                        aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <a className="navbar-brand" href="/"><h1 className={"jello"}><img src={book} alt={"book"} height={"50em"} width={"50em"}/></h1></a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link link" href="/posts">Posts</a>
                        </li>
                        {newPost()}
                        <li className="nav-item">
                            <a className="nav-link link" href="/archive">Archive</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link link" href="/about">About</a>
                        </li>

                    </ul>
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        {userButton()}
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/Jackbaude/tmc-wiki" target="_blank"
                               rel="noreferrer noopener"><FontAwesomeIcon icon={faGithub} size={"2x"}/></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://discord.gg/FcTFg2E" target="_blank"
                               rel="noreferrer noopener"><FontAwesomeIcon icon={faDiscord} size={"2x"}/></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://streamelements.com/jjakuu/tip"><FontAwesomeIcon icon={faDollarSign} size={"2x"}/></a>
                        </li>

                        <li>
                            <ThemeToggle/>
                        </li>
                    </ul>



                </div>
            </nav>
        </div>
)
}
export default Nav