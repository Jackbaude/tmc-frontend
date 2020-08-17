import React, {useEffect, useState} from "react"
import {
    Editor,
    EditorState,
    RichUtils,
    getDefaultKeyBinding,
    KeyBindingUtil,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Layout from "../layout";
import {faBold} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams} from "react-router";

const NewPost = () => {
    const {id} = useParams();
    useEffect(() => {
        getPost()
    }, []);
    let [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [metadata, setMetadata ] = useState([])

    console.log(id);
    const getPost = async () => {
        const response = await fetch('/__getpost__?id=' + id)
        const data = await response.json()
        await setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.body))))
        // console.log(data.last_edited, data.title, data.description, data.tags)

        // console.log(data)
    }
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')

    let saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
        console.log(convertToRaw(content))
    }
    let onChange = (editorState) => {
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
            .then(r => console.log(r));


    }
    return (
        <Layout>
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
                    onChange={event => setTitle(event.target.value)}
                    placeholder={"Title"}
                    name={"title"}
                    required/>
                <br/>
                <input type={"text"}
                       onChange={event => setDescription(event.target.value)}
                       placeholder={"Description"}
                       name={"description"}
                       required/>
                <br/>
                <input type={"text"}
                       onChange={event => setTags(event.target.value)}
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
                <input type={"button"} value={"Submit"} onClick={submitPost} required/>
            </form>
        </Layout>
    );
}
export default NewPost

