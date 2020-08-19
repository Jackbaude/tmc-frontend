import React from "react"
import Carousel from "./Carousel";
import Jumbotron from "./Jumbotron";

const Home = () => (
    <div>

            {/*<Carousel/>*/}
            <Jumbotron/>
            <h2 id="purpose">Purpose</h2>
            <hr className="dividing-line"/>
            <p>Our initiative for building a wiki for the community is to organize everyone's knowledge into one
                place that is
                accessible and quick to reference. Getting started with technical
                minecraft can be confusing and complicated, but the wiki can help those who
                are new to enter the community. Now that there is a place to store everyone's
                knowledge it also makes it easier and more transparent for large scale projects
                across versions.</p>
            <h2 id="contribute">Contribute</h2>
            <hr className="dividing-line"/>
            <p>There are many ways that you can contribute to the project. The project is still getting off the
                ground, and we
                are looking for people to help fill posts on the wiki. The project as of right now is fairly simple,
                but as it
                goes on it could get more complicated, and we are looking for people to help use build. We take in
                pull requests
                because they help us merge and manage multiple posts if more than one person is working on a file at
                once. This
                is how we are getting the initiative off the ground, but as mentioned we are looking for help to
                build this
                up.</p>
            <h2 id="license">License</h2>
            <hr className="dividing-line"/>
            <p>A short and simple permissive license with conditions only requiring preservation of copyright and
                license
                notices. Licensed works, modifications, and larger works may be distributed under different terms
                and without
                source code.</p>
            <p>MIT © Jack Baude</p>


    </div>
)

export default Home
