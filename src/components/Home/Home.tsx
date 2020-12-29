import React from "react"
import Jumbotron from "./Jumbotron";
import Directory from "./Directory";

const Home = () => (
    <div className={"home"}>
        <Jumbotron/>
        {/*<iframe src="https://discordapp.com/widget?id=722653456120283197&theme=dark" width="100%" height="500"*/}
        {/*        allowTransparency={true} frameBorder="0"*/}
        {/*        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"/>*/}
        <Directory/>
    </div>
)

export default Home
