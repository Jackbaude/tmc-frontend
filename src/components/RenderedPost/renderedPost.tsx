import React, {useState} from "react"
import Draft, {ContentState, convertFromRaw, Editor, EditorState,} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Layout from "../layout";

const RenderedPost = () => {
    // const getPost = () => {
    //     fetch('http://example.com/movies.json')
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }
    const rawJsText = `{"blocks":[{"key":"634ab","text":"YO yo yo this is some text for some of yall oout there!","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":55,"style":"BOLD"},{"offset":0,"length":55,"style":"ITALIC"},{"offset":0,"length":55,"style":"UNDERLINE"},{"offset":0,"length":55,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"fl64m","text":"","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"73n30","text":"1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":0,"length":1,"style":"ITALIC"},{"offset":0,"length":1,"style":"UNDERLINE"},{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"fa17k","text":"1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":0,"length":1,"style":"ITALIC"},{"offset":0,"length":1,"style":"UNDERLINE"},{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"98f5","text":"1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":0,"length":1,"style":"ITALIC"},{"offset":0,"length":1,"style":"UNDERLINE"},{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"dgnfa","text":"2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":0,"length":1,"style":"ITALIC"},{"offset":0,"length":1,"style":"UNDERLINE"},{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"e4t9a","text":"3","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":0,"length":1,"style":"ITALIC"},{"offset":0,"length":1,"style":"UNDERLINE"},{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"57rhg","text":"4","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":0,"length":1,"style":"ITALIC"},{"offset":0,"length":1,"style":"UNDERLINE"},{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"28avv","text":"32","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":2,"style":"BOLD"},{"offset":0,"length":2,"style":"ITALIC"},{"offset":0,"length":2,"style":"UNDERLINE"},{"offset":0,"length":2,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"ajqsv","text":"4234","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"},{"offset":0,"length":4,"style":"ITALIC"},{"offset":0,"length":4,"style":"UNDERLINE"},{"offset":0,"length":4,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"8nkak","text":"2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":0,"length":1,"style":"ITALIC"},{"offset":0,"length":1,"style":"UNDERLINE"},{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}`;

    const content = convertFromRaw(JSON.parse(rawJsText));
    let [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(content)
    );
    let lastEdit = new Date;
    return (
        <Layout>
            <p>Last Edited: {lastEdit.getUTCMonth()}/{lastEdit.getDate()}/{lastEdit.getUTCFullYear()}</p>
            <Editor
                editorState={editorState}
                readOnly={true}
                onChange={setEditorState}
            />
            <a className={"edit-post-button"} href={"/edit-post"}>Edit Post</a>
        </Layout>
    );
}
export default RenderedPost

