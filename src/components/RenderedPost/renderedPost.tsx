import React, {useState} from "react"
// import {Editor, EditorState, RichUtils} from 'draft-js';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import 'draft-js/dist/Draft.css'
// import 'draft-js-mention-plugin/lib/plugin.css'
import Layout from "../layout";

const RenderedPost = () => {
    let [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    let onChange = editorState => setEditorState(editorState);
    const handleKeyCommand = (command) =>{
        // inline formatting key commands handles bold, italic, code, underline
        editorState = RichUtils.handleKeyCommand(editorState, command);
        if (editorState) {
            setEditorState(editorState);
            return 'handled';
        }

        return 'not-handled';
    }


    const toggleInlineStyle = (event) =>{
        event.preventDefault();

        let style = event.currentTarget.getAttribute('data-style');
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }

    const toggleBlockType = (event) =>{
        event.preventDefault();
        let block = event.currentTarget.getAttribute('data-block');
        setEditorState(RichUtils.toggleBlockType(editorState, block));
    }

    const renderBlockButton = (value, block) =>{
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

    const renderInlineStyleButton = (value, style) =>{
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
        }
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
    const keyBindingFunction = (event) =>{
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
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={keyBindingFunction}
                onChange={onChange}
                placeholder={"Start writing here!"}
            />
        </Layout>
    );
}
export default RenderedPost

