import React, {useState} from "react"
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


const EditPost = () => {
    const rawData = [{
        "blocks": [{
            "key": "aai25",
            "text": "Hello this is the test of some stuff!",
            "type": "header-one",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "e9pi5",
            "text": "wow such heading two",
            "type": "header-two",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "elm9g",
            "text": "Boom shaka Laka",
            "type": "header-two",
            "depth": 0,
            "inlineStyleRanges": [{"offset": 0, "length": 15, "style": "BOLD"}],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "13ij2",
            "text": "Booma shaka laka",
            "type": "header-two",
            "depth": 0,
            "inlineStyleRanges": [{"offset": 0, "length": 16, "style": "BOLD"}, {
                "offset": 0,
                "length": 16,
                "style": "ITALIC"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "8igtu",
            "text": "Book shaka laka",
            "type": "header-two",
            "depth": 0,
            "inlineStyleRanges": [{"offset": 0, "length": 15, "style": "BOLD"}, {
                "offset": 0,
                "length": 15,
                "style": "ITALIC"
            }, {"offset": 0, "length": 15, "style": "UNDERLINE"}],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "2sp69",
            "text": "BOOOM shaka laka",
            "type": "header-two",
            "depth": 0,
            "inlineStyleRanges": [{"offset": 0, "length": 16, "style": "BOLD"}, {
                "offset": 0,
                "length": 16,
                "style": "ITALIC"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "7ktth",
            "text": "Boom shaka laka",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{"offset": 0, "length": 15, "style": "BOLD"}, {
                "offset": 0,
                "length": 15,
                "style": "ITALIC"
            }, {"offset": 0, "length": 15, "style": "CODE"}],
            "entityRanges": [],
            "data": {}
        }], "entityMap": {}
    }];

// let parse = JSON.parse(rawData);
// const contentState = (convertFromRaw(rawData));
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
                <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={keyBindingFunction}
                    onChange={onChange}
                    placeholder={"Start writing here!"}
                />
                <input type={"button"} value={"Submit"} required/>
            </form>
        </Layout>
    );
}
export default EditPost

