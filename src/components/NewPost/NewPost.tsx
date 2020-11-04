import React, {useState, useMemo, useCallback} from 'react'
import isHotkey from 'is-hotkey'
import {Node, Transforms, Editor, createEditor} from 'slate'
import {
    Slate,
    Editable,
    useEditor,
    withReact,
    useSlate,
} from 'slate-react'
import {withHistory} from 'slate-history'
import {Button, Icon, Toolbar} from '../RichUtils'
import {Element, insertLink, isLinkActive, Leaf, withLinks, withImages, insertImage} from "../Elements";

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']
const NewPost = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [author, setAuthor] = useState('');
    const [failed, setFailed] = useState(false)
    const [, setSubmitted] = useState(false)
    const [madeChanges, setMadeChanges] = useState(false)
    const [success, setSuccess] = useState(false)
    const [value, setValue] = useState<Node[]>(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(
        () => withImages(withLinks(withHistory(withReact(createEditor())))),
        []
    )
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
            author: author,
            body: window.localStorage.getItem('content')
        })
        fetch("/api/__newpost__", {
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
        } else {
            return
        }
    }
    const submitButton = () => {
        if (madeChanges) {
            return (
                <button type="button" className={"btn btn-primary btn-lg"} value={"Submit"}
                        onClick={submitPost}>Create Post
                </button>
            )
        } else {
            return <div/>
        }
    }
    if (!success) {
        return (
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value)
                    setMadeChanges(true)
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }}
            >
                <form className={"submit-post"}>
                    {failedPost()}
                    <Toolbar>
                        <MarkButton format="bold" icon="format_bold"/>
                        <MarkButton format="italic" icon="format_italic"/>
                        <MarkButton format="underline" icon="format_underlined"/>
                        <MarkButton format="code" icon="code"/>
                        <BlockButton format="heading-one" icon="looks_one"/>
                        <BlockButton format="heading-two" icon="looks_two"/>
                        <BlockButton format="block-quote" icon="format_quote"/>
                        <BlockButton format="numbered-list" icon="format_list_numbered"/>
                        <BlockButton format="bulleted-list" icon="format_list_bulleted"/>
                        <InsertImageButton/>
                        <LinkButton/>
                    </Toolbar>
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

                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event as any)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}

                    />
                    <input type={"text"}
                           onChange={event => {
                               setAuthor(event.target.value);
                               setMadeChanges(true);
                           }}
                           placeholder={"Author"}
                           name={"author"}
                           required/>
                    <div className={"spacing-block"}/>
                    {submitButton()}

                </form>
            </Slate>
        )
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

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type as string),
        split: true,
    })

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })

    if (!isActive && isList) {
        const block = {type: format, children: []}
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}


const BlockButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}

const MarkButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}
const LinkButton = () => {
    const editor = useSlate()
    return (
        <Button
            active={isLinkActive(editor)}
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                insertLink(editor, url)
            }}
        >
            <Icon>link</Icon>
        </Button>
    )
}



const InsertImageButton = () => {
    const editor = useEditor()
    return (
        <Button
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the image:')
                if (!url) return
                insertImage(editor, url)
            }}
        >
            <Icon>image</Icon>
        </Button>
    )
}


const initialValue = [
    {
        children: [
            { text: '' },
        ],
    },
]

export default NewPost