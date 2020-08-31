import React, {useState, useMemo, useCallback, useEffect} from 'react'
import {Node, Editor, createEditor} from 'slate'
import {
    Slate,
    Editable,
    useSelected,
    useFocused,
    withReact,

} from 'slate-react'
import {withHistory} from 'slate-history'
import {css} from 'emotion'
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
        () => withImages(withHistory(withReact(createEditor()))),
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
            <a className={"btn btn-primary btn-lg"} href={"/edit-post/" + id}>Edit Post</a>
        </div>
    )

}
const withImages = editor => {
    const {isVoid} = editor

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }
    return editor
}
const Element = props => {
    const {attributes, children, element} = props

    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'image':
            return <ImageElement {...props} />
        case 'link':
            return (
                <a {...attributes} href={element.url}>
                    {children}
                </a>
            )
        default:
            return <p {...attributes}>{children}</p>
    }
}
const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}
const ImageElement = ({attributes, children, element}) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={element.url}
                    className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
                />
            </div>
            {children}
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