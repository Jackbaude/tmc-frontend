import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { cx, css } from 'emotion'
import {Editor, Transforms} from "slate";
import {useEditor, useSlate} from "slate-react";
import {insertImage, insertLink, isLinkActive} from "./Elements";

interface BaseProps {
    className: string
    [key: string]: unknown
}
type OrNull<T> = T | null

export const Button = React.forwardRef(
    (
        {
            className,
            active,
            reversed,
            ...props
        }: PropsWithChildren<
            {
                active: boolean
                reversed: boolean
            } & BaseProps
            >,
        ref: Ref<OrNull<HTMLSpanElement>>
    ) => (
        <span
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          cursor: pointer;
          color: ${reversed
                    ? active
                        ? 'white'
                        : '#aaa'
                    : active
                        ? 'black'
                        : '#ccc'};
        `
            )}
        />
    )
)

export const EditorValue = React.forwardRef(
    (
        {
            className,
            value,
            ...props
        }: PropsWithChildren<
            {
                value: any
            } & BaseProps
            >,
        ref: Ref<OrNull<null>>
    ) => {
        const textLines = value.document.nodes
            .map(node => node.text)
            .toArray()
            .join('\n')
        return (
            <div
                ref={ref}
                {...props}
                className={cx(
                    className,
                    css`
            margin: 30px -20px 0;
          `
                )}
            >
                <div
                    className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
                >
                    Slate's value as text
                </div>
                <div
                    className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
                >
                    {textLines}
                </div>
            </div>
        )
    }
)

export const Icon = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLSpanElement>>
    ) => (
        <span
            {...props}
            ref={ref}
            className={cx(
                'material-icons',
                className,
                css`
          font-size: 34px;
          vertical-align: text-bottom;
        `
            )}
        />
    )
)

export const Instruction = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => (
        <div
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
            )}
        />
    )
)

export const Menu = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => (
        <div
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          & > * {
            display: inline-block;
          }
          
          & > * + * {
            margin-left: 20px;
          }
        `
            )}
        />
    )
)

export const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

export const Toolbar = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => (
        <Menu
            {...props}
            ref={ref}
            className={cx(
                className, "editorbar",
                css`
          position: sticky;
          top: 0;
          // padding: 1px 18px 0px;
          // margin: 10 0;
          margin-bottom: 20px;
          
          
        `
            )}
        />
    )
)
const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const toggleBlock = (editor, format) => {
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

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })

    return !!match
}

export const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

export const BlockButton = ({format, icon}) => {
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

export const MarkButton = ({format, icon}) => {
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
export const LinkButton = () => {
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

export const InsertImageButton = () => {
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