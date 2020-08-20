import React, {useEffect, useState} from "react"
import {convertFromRaw, convertToRaw, Editor, EditorState, getDefaultKeyBinding, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import {useParams} from "react-router";

const NewPost = () => {
    const {id} = useParams();
    const [fetchState, setFetchState] = useState("loading")
    const [failed, setFailed] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [madeChanges, setMadeChanges] = useState(false)
    const [success, setSuccess] = useState(false)
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
    let [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [resGood, setResGood] = useState(false)
    const postGood = () => {
        return (
            <div className="alert alert-danger" role="alert">Sorry Looks like this post doesnt exist. Check out some
                other <a href="/posts" className="alert-link">Posts</a></div>
        )
    }
    const getPost = async () => {
        const response = await fetch('/__getpost__?id=' + id)
        const data = await response.json()
        await setTitle(data.title)
        await setDescription(data.description)
        await setTags(data.tags)
        await setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.body))))
        if (response.ok) {
            setResGood(true)
        }
    }
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')

    let saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
        console.log(convertToRaw(content))
    }
    let onChange = (editorState) => {
        //if changes were made to the editor state set the made chanegs to true
        setMadeChanges(true)
        const contentState = editorState.getCurrentContent();
        saveContent(contentState);
        console.log('content state', convertToRaw(contentState));
        setEditorState(editorState);
    }
    const handleKeyCommand = (command) => {
        // inline formatting key commands handles bold, italic, code, underline
        editorState = RichUtils.handleKeyCommand(editorState, command);
        if (editorState) {
            setEditorState(editorState);
            return 'handled';
        }
        return 'not-handled';
    }


    const toggleInlineStyle = (event) => {
        event.preventDefault();
        let style = event.currentTarget.getAttribute('data-style');
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    const toggleBlockType = (event) => {
        event.preventDefault();
        let block = event.currentTarget.getAttribute('data-block');
        setEditorState(RichUtils.toggleBlockType(editorState, block));
    }
    const renderBlockButton = (value, block) => {
        const currentBlockType = RichUtils.getCurrentBlockType(editorState);
        let className = '';
        if (currentBlockType === block) {
            className = 'active';
        }
        return (
            <input
                type="button"
                key={block}
                value={value}
                data-block={block}
                onClick={toggleBlockType}
                className={className}
            />
        );
    }

    const renderInlineStyleButton = (value, style) => {
        const currentInlineStyle = editorState.getCurrentInlineStyle();
        let className = '';
        if (currentInlineStyle.has(style)) {
            className = 'active';
        }
        return (
            <input
                type="button"
                key={style}
                value={value}
                className={className}
                data-style={style}
                onClick={toggleInlineStyle}
            />

        );
    }
    const inlineStyleButtons = [
        {
            value: 'Bold',
            style: 'BOLD'
        },

        {
            value: 'Italic',
            style: 'ITALIC'
        },

        {
            value: 'Underline',
            style: 'UNDERLINE'
        },

        {
            value: 'Strikethrough',
            style: 'STRIKETHROUGH'
        },

        {
            value: 'Code',
            style: 'CODE'
        },
    ];

    const blockTypeButtons = [
        {
            value: 'H1',
            block: 'header-one'
        },

        {
            value: 'H2',
            block: 'header-two'
        },

        {
            value: 'H3',
            block: 'header-three'
        },

        {
            value: 'Blockquote',
            block: 'blockquote'
        },

        {
            value: 'Unordered List',
            block: 'unordered-list-item'
        },

        {
            value: 'Ordered List',
            block: 'ordered-list-item'
        }
    ];

    const keyBindingFunction = (event) => {
        return getDefaultKeyBinding(event);
    }
    const submitPost = () => {
        if ((title === "" || description === "" || tags === "" || window.localStorage.getItem('content') === undefined)) {
            setFailed(true)
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
            return;
        }
        var send_body = JSON.stringify({
            title: title,
            description: description,
            tags: tags,
            body: window.localStorage.getItem('content')
        })

        fetch("/__editpost__?id=" + id, {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: send_body,
            // Adding headers to the request
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        })
            // .then(r => window.location.href = r.url)
            .then(() => {
                setSubmitted(true)
                setSuccess(true)
            })
    }
    const failedPost = () => {
        if (failed) {
            return (<div className="alert alert-danger show" role="alert">
                <strong>Woah there something went wrong!</strong> Are you sure you filled in all the fields?
            </div>)
        } else {
            return
        }
    }
    const submitButton = () => {
        if (madeChanges) {
            return (
                <button type="button" className={"btn btn-outline-primary btn-lg"} value={"Submit"}
                        onClick={submitPost}>Edit Post
                </button>
            )
        } else {
            return <div/>
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
            <div className="alert alert-danger" role="alert">Sorry Looks like something is going wrong. Are you sure
                this post exists? Is the API down? Check with Jakku on the Discord.</div>
        )
    }
    if (!success) {
        return (
            <div>
                {failedPost()}
                <div className="inline-style-options">
                    {inlineStyleButtons.map((button) => {
                        return renderInlineStyleButton(button.value, button.style);
                    })}
                </div>
                <div className="block-style-options">
                    {blockTypeButtons.map((button) => {
                        return renderBlockButton(button.value, button.block);

                    })}
                </div>
                <form className={"submit-post"}>
                    <input
                        type={"text"}
                        id={"title"}
                        onChange={event => {
                            setTitle(event.target.value)
                            setMadeChanges(true)
                        }}
                        placeholder={"Title"}
                        name={"title"}
                        required/>
                    <br/>
                    <input type={"text"}
                           onChange={event => {
                               setDescription(event.target.value)
                               setMadeChanges(true)
                           }}
                           placeholder={"Description"}
                           name={"description"}
                           required/>
                    <br/>
                    <input type={"text"}
                           onChange={event => {
                               setTags(event.target.value)
                               setMadeChanges(true)
                           }}
                           placeholder={"Tags"}
                           name={"tags"}
                           required/>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={keyBindingFunction}
                        onChange={onChange}
                        placeholder={"Start writing here!"}

                    />
                    <div className={"spacing-block"}/>
                    {submitButton()}
                </form>
            </div>
        );
    } else {
        return (
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Success!</h4>
                <hr/>
                <p>We appreciate your contribution to not only the technical minecraft wiki, but also the community as a
                    whole. People like you
                    make this community fun and expanding. Keep up the great work, and we hope to see you again!
                </p>
            </div>
        )
    }
}
export default NewPost

