import React, {memo, useEffect, useMemo, useState} from "react"
import Layout from "../layout";
import {convertFromRaw, EditorState} from "draft-js";


const Posts = () => {
    const [metadata, setMetadata] = useState([])
    useEffect(() => {
        getPost()
    }, []);

    const getPost = async () => {
        const response = await fetch('/__allposts__?')
        const data = await response.json()
        await setMetadata(data);
        console.log(data)
    }

    const postLink = useMemo(() => metadata.map(
        ({title, id, tags, last_edited, description}) => (
            <div className={"post-link  slide"}>
                <div className={"post-link-title"}><a href={"/render-post/" + id}><h2 className={"link"}>{title}</h2></a></div>
                <p>About: {description}</p>
                <p>Tags: {tags}</p>
                <p>Last Edited: {last_edited}</p>
                <hr/>
            </div>
        )
        ),
        [metadata]);

    return (
        <div>
            <Layout>
                {postLink}
            </Layout>
        </div>
    );
}
export default memo(Posts)
