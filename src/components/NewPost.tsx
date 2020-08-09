import React, {useState} from "react"
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Layout from "./layout";


const NewPost = () => {
    let [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    let saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
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
        return (
            <input
                type="button"
                key={block}
                value={value}
                data-block={block}
                onMouseDown={toggleBlockType}
            />
        );
    }

    const renderInlineStyleButton = (value, style) => {
        return (
            <input
                type="button"
                key={style}
                value={value}
                data-style={style}
                onMouseDown={toggleInlineStyle}
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
            value: 'Heading One',
            block: 'header-one'
        },

        {
            value: 'Heading Two',
            block: 'header-two'
        },

        {
            value: 'Heading Three',
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
        if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === 'x') {
            return 'strikethrough';
        }

        if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === '7') {
            return 'ordered-list';
        }

        if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === '8') {
            return 'unordered-list';
        }

        if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey && event.key === '9') {
            return 'blockquote';
        }
        return getDefaultKeyBinding(event);
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
                <input type={"text"} placeholder={"Title"}/>
                <br/>
                <input type={"text"} placeholder={"Description"}/>
                <br/>
                <input type={"text"} placeholder={"Tags"}/>
                <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={keyBindingFunction}
                    onChange={onChange}
                    placeholder={"Start writing here!"}
                />
                <input type={"button"} value={"Submit"}/>
            </form>
        </Layout>
    );
}
export default NewPost

