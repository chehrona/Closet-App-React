import React, { useEffect } from "react"
import "./css/Closet.css"
import {icons} from "./Icons"

import CategoryList from "./CategoryList"
import Footer from "./Footer"
import UploadChoicePopup from "./UploadChoicePopup"
import UploadPopup from "./UploadPopup";
import PicPreviewPopup from "./PicPreviewPopup"
import ImgInfoPopup from "./ImgInfoPopup"

export default function Closet() {
    const [isPopupShown, setIsPopupShown] = React.useState(false);
    const [isChoiceMade, setIsChoiceMade] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState()
    const [preview, setPreview] = React.useState();
    const [isPicUploaded, setIsPicUploaded] = React.useState(false);

    function bringUploadPic(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsPopupShown(prevStatus => !prevStatus);
    }   

    function uploadPicHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsChoiceMade(prevState => !prevState);
        setIsPopupShown(false);
    }

    function cleanUpPopups() {
        setIsPopupShown(false);
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function picUploaded(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setIsChoiceMade(false);
        setSelectedFile(e.target.files[0])
    }

    function handleImgAction(e) {
        e.preventDefault();
        if (e.target.innerHTML == "Cancel") {
            setSelectedFile();
        } else {
            setIsPicUploaded(true);
        }
    }

    function handleImgInfo(e) {
        e.preventDefault();
        if (e.target.innerHTML == "Cancel") {
            setSelectedFile();
            setIsPicUploaded(false);
        } else {
            
        }
    }

    

    return (
        <div className="page--container" onClick={cleanUpPopups}>
            <div className="closet-header-box">
                <div className="category-title">
                    <img className="side-bar--icons" src="https://cdn-icons-png.flaticon.com/512/8054/8054906.png"/>
                    Category
                </div>
                <div className="header-button-wrapper">
                    <div className="header--button">Edit</div>
                    <div className="box-banner-name">Closet</div>
                    <div className="header--button inactive-button">+ Look</div>
                </div>
            </div>
            <div className="closet-body-box">
                <div className="categories-box">
                    {/* <CategoryList /> */}
                    <Footer popupHandler={e => bringUploadPic(e)}/>
                    {isPopupShown && <UploadPopup choiceHandler={e => uploadPicHandler(e)}/>}
                    {isChoiceMade && <UploadChoicePopup picUploaded={e => picUploaded(e)}/>}
                    {selectedFile && <PicPreviewPopup fileSource={preview} handleImgAction={handleImgAction}/>}
                    {isPicUploaded && <ImgInfoPopup handleImgInfo={handleImgInfo} />}
                </div>
            </div>
        </div>
    )
}

