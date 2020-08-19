import React, {useEffect, useState} from "react"
import Draft, {convertFromRaw, Editor, EditorState,} from 'draft-js';
import 'draft-js/dist/Draft.css'

import {useParams} from "react-router";


const RenderedPost = () => {
    const {id} = useParams();
    const [fetchState, setFetchState] = useState("loading")
    useEffect(() => {
        getPost()
            //If the fetch got the data make the state a success
            .then(() => {
                setFetchState("success")
            })
            //If the fetch was bad set the state of the fecth to failed
            .catch(() => {
                setFetchState("failed")
            })
    }, []);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [title, setTitle] = useState('')
    const [lastEdited, setLastEdited] = useState('')
    const [resGood, setResGood] = useState(false)
    const getPost = async () => {
        const response = await fetch('/__getpost__?id=' + id)
        const data = await response.json()
        console.log(data)
        setTitle(data.title)
        setLastEdited(data.last_edited)
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.body))))
        if (response.ok) {
            setResGood(true)
        }
    }
    // if the post is still loading just render a loading bar
    if (fetchState === "loading") {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    //if we caught a error send a failed message
    else if (fetchState === "failed") {
        return (
            <div className="alert alert-danger" role="alert">Sorry Looks like something is going wrong. Are you sure this post exists? Is the API down? Check with Jakku on the Discord.</div>
        )
    }
    return (
        <div>
            <h1>{title}</h1>
            <p>Last Edited: {lastEdited}</p>
            <Editor
                editorState={editorState}
                readOnly={true}
                onChange={setEditorState}
            />
            <a className={"edit-post-button"} href={"/edit-post/" + id}>Edit Post</a>
        </div>
    );
}
export default RenderedPost
