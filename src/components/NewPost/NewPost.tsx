/*
TODO add discord auth and give person a role when they make a post
 */
import React, {useState} from "react"
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'


const NewPost = () => {
    let [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [failed, setFailed] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [madeChanges, setMadeChanges] = useState(false)
    const [success, setSuccess] = useState(false)

    let saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
        console.log(convertToRaw(content))
    }
    let onChange = (editorState) => {
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
        // if the title, description, or tags are empty
        if ((title === "" || description === "" || tags === "")) {
            //set the fail state to true, which renders in the alert, then scroll to the top, and return before it submits the post
            setFailed(true)
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
            return
        }
        const body = JSON.stringify({
            title: title,
            description: description,
            tags: tags,
            body: window.localStorage.getItem('content')
        })
        fetch("/__newpost__", {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: body,
            // Adding headers to the request
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        })
            // .then(r => window.location.href = r.url)
            .then(() => {
                setSubmitted(true)
                setSuccess(true)
            })
            .catch(() => {
                setFailed(true)
            })

    }
    const failedPost = () => {
        if (failed) {
            return (<div className="alert alert-danger show" role="alert">
                <strong>Woah there something went wrong!</strong> Are you sure you filled in all the fields?
            </div>)
        }
        else {
            return
        }
    }
    const submitButton = () => {
        if (madeChanges) {
            return (
                <button type="button" className={"btn btn-outline-primary btn-lg"} value={"Submit"}
                        onClick={submitPost}>Create Post
                </button>
            )
        } else {
            return <div/>
        }
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
                <p>We appreciate your contribution to not only the technical minecraft wiki, but also the community as a whole. People like you
                make this community fun and expanding. Keep up the great work, and we hope to see you again!
                </p>
            </div>
        )
    }
}
export default NewPost

