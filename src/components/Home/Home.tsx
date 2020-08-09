import React from "react"
import Layout from "../layout";


const Home = () => (
    <div>
        <Layout>
            <div>
                {/*<h1 id="technical-minecraft-wiki">The official wiki for technical minecraft.</h1>*/}
                <h2 id="purpose">Purpose</h2>
                <hr className="dividing-line"/>
                <p>Our initiative for building a wiki for the community is to organize everyone's knowledge into one
                    place that is
                    accessible and quick to reference.</p>
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
                <h2 id="for-developers">For developers</h2>
                <hr className="dividing-line"/>
                <p>Want to contribute to the code base? Here's how.</p>
                <ul>
                    <li>Fork the Repo</li>
                    <li>Run <code>npm install</code> in the root directory of your fork.</li>
                    <li>Start coding!</li>
                </ul>
                <p>Some things you might want to know:</p>
                <ul>
                    <li><p>We are using a framework called <a href="https://www.gatsbyjs.org/">gatsby</a>. We may
                        sometime in the
                        near future move away from this, but it is currently what we use.</p></li>
                    <li><p>Any questions please contact jackbaude@gmail.com, or friend me on
                        discord <code>Jakku#1123</code>.</p>
                    </li>
                </ul>
                <h1 id="license">License</h1>
                <hr className="dividing-line"/>
                <p>A short and simple permissive license with conditions only requiring preservation of copyright and
                    license
                    notices. Licensed works, modifications, and larger works may be distributed under different terms
                    and without
                    source code.</p>
                <p>MIT © Jack Baude</p>


            </div>
        </Layout>
    </div>
)

export default Home
