import React, {useState, useMemo, useCallback, useEffect} from 'react'
import {Node, createEditor} from 'slate'
import {
    Slate,
    Editable,
    withReact,

} from 'slate-react'
import {withHistory} from 'slate-history'
import {useParams} from "react-router";
import {Element, Leaf, withLinks, withImages} from "../Elements";

const RenderedPost = () => {
    const {id} = useParams();
    const [fetchState, setFetchState] = useState("loading")
    const [authenticated, setAuthenticated] = useState(false);
    const getAuthenticated = async () => {
        const response = await fetch('/api/__userinfo__');
        const data = await response.json();
        setAuthenticated(data.authenticated);
    }
    useEffect(() => {
        getAuthenticated().catch(() => setAuthenticated(false));
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

    const [title, setTitle] = useState('')
    const [lastEdited, setLastEdited] = useState('')
    const getPost = async () => {
        const response = await fetch('/api/__getpost__?id=' + id)
        const data = await response.json()
        console.log(data)
        setTitle(data.title)
        setLastEdited(data.last_edited)
        setValue(JSON.parse(data.body))
    }
    const [value, setValue] = useState<Node[]>(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(
        () => withImages(withLinks(withHistory(withReact(createEditor())))),
        []
    )

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
            <div className="alert alert-danger" role="alert">Sorry Looks like something is going wrong. Are you sure
                this post exists? Is the API down? Check with Jakku on the Discord.</div>
        )
    }
    const editLink = authenticated ? <a className={"btn btn-lg"} href={"/edit-post/" + id}>Edit Post</a> : <div/>
    return (
        <div>
            <h1>{title}</h1>
            <p>Last Edited: {lastEdited}</p>
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    readOnly
                />
                <div className={"spacing-block"}/>
            </Slate>
            {editLink}
        </div>
    )

}

const initialValue = [
    {
        children: [
            {text: ''},
        ],
    },
]

export default RenderedPost