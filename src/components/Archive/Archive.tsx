//TODO add pagnation
import React, {memo, useEffect, useMemo, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFile, faUpload} from "@fortawesome/free-solid-svg-icons";

const Archive = () => {
    const [metadata, setMetadata] = useState([])
    //default state of the fetch getPost is loading
    const [fetchState, setFetchState] = useState("loading")
    const [file, setFile] = useState("")
    const [showForm, setShowForm] = useState(false)
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
    const getPost = async () => {
        const response = await fetch('/api/archive?')
        const data = await response.json()
        console.log(data)
        await setMetadata(data);
    };
    const postLink = useMemo(() => Object.entries(metadata).map
        (([id, {name, size, created, link}]) => (
                <tr>
                    <th scope="row">{name}</th>
                    <td>{created}</td>
                    <td>{size} kb</td>
                    <td><a href={"/api" + link}><FontAwesomeIcon icon={faDownload} size={"lg"}/></a></td>
                </tr>
            )
        ),
        [metadata]);
    const formButtons = () => {
        const file_ext = (file.split('.').pop())
        if (file === "") {
            return <label htmlFor="getFile" className={"btn btn-lg file-input-button"}><FontAwesomeIcon
                icon={faFile}/> Select File To Upload</label>
        } else if (file_ext !== "litematic" && file_ext !== "schematic" && file_ext !== "nbt") {
            return (<div>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Woah There! We only accept <strong>.litematic .schematic </strong>and <strong>.nbt </strong>files
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <label htmlFor="getFile" className={"btn btn-lg file-input-button"}><FontAwesomeIcon
                    icon={faFile}/> Select File To Upload</label>
            </div>)
        } else {
            return <button className={"btn btn-lg file-input-button"} type={"submit"} value={"submit"}><FontAwesomeIcon
                icon={faUpload}/> {file}</button>
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
            <div className="alert alert-danger" role="alert">Sorry Looks like something is going wrong. Is the API down?
                Check with Jakku on the Discord.</div>
        )
    } else return (
        <div>
            <form action={"/api/__archive-upload__"} encType={"multipart/form-data"} method={"POST"}>
                <input id={"getFile"} type={"file"} name={"file"} className={"file-input"} onChange={(event) => {
                    setFile(event.target.files[0].name)
                }}/>
                {formButtons()}


            </form>
            <table className="table table-sm table-borderless">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Size</th>
                    <th scope="col">Download</th>
                </tr>
                </thead>
                <tbody>
                {postLink}
                </tbody>
            </table>
        </div>
    );
}
export default memo(Archive)
