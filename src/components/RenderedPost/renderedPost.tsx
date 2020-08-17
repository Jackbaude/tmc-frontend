import React, {useEffect, useState} from "react"
import Draft, {ContentState, convertFromRaw, Editor, EditorState,} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Layout from "../layout";
import {useParams} from "react-router";
import {render} from "react-dom";

const RenderedPost = () => {
    const {id} = useParams();
    useEffect(() => {
        getPost()
    }, []);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [title, setTitle] = useState('')
    const [lastEdited, setLastEdited] = useState('')

    console.log(id);
    const getPost = async () => {
        const response = await fetch('/__getpost__?id=' + id)
        const data = await response.json()
        console.log(data)
        await setTitle(data.title)
        await setLastEdited(data.last_edited)
        await setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.body))))

    }

    if (!editorState) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
    return (
        <Layout>
            <h1>{title}</h1>
            <p>Last Edited: {lastEdited}</p>
            <Editor
                editorState={editorState}
                readOnly={true}
                onChange={setEditorState}
            />
            <a className={"edit-post-button"} href={"/edit-post/" + id}>Edit Post</a>
        </Layout>
    );
}
export default RenderedPost
