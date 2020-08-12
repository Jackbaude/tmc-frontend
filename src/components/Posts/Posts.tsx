import React from "react"
import Layout from "../layout";


const Posts = () => {
    const getPosts = () => {

    }
    const postLink = (title, description, link, lastEdit, tags) => {
        return (
            <div>
                <a href={link}><h1>{{title}}</h1></a>
                <p>{{description}}</p>
                <p>Tags: {{tags}}</p>
                <p>Last Edited {{lastEdit}}</p>
                <hr/>
            </div>
        );
    }
    return (
        <div>
            <Layout>

            </Layout>
        </div>
    );
}
export default Posts
