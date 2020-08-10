import React, {useState} from "react"
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Layout from "../layout";


const NewPost = () => {
    let [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

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
    const submitPost = () => {

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
                <input type={"text"} placeholder={"Title"} name={"title"} required/>
                <br/>
                <input type={"text"} placeholder={"Description"} name={"description"} required/>
                <br/>
                <input type={"text"} placeholder={"Tags"} name={"tags"} required/>
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

