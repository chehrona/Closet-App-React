import React, { useEffect } from "react"
import "../css/Closet.css"

import CategoryList from "./CategoryList"
import Footer from "./Footer"
import UploadChoicePopup from "./UploadChoicePopup"
import UploadPopup from "./UploadPopup";
import PicPreviewPopup from "./PicPreviewPopup"
import ImgInfoPopup from "./ImgInfoPopup"
import LookCreatorPopup from "./LookCreatorPopup"

import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, push } from "firebase/database";
import ClothesItem from "./ClothesItem"

const firebaseConfig = {
    apiKey: "AIzaSyBADzc7z8CWQtVClO68p2zXZUs6Bc-D_Ss",
    authDomain: "closet-e1cb1.firebaseapp.com",
    databaseURL: "https://closet-e1cb1-default-rtdb.firebaseio.com",
    projectId: "closet-e1cb1",
    storageBucket: "closet-e1cb1.appspot.com",
    messagingSenderId: "111891866061",
    appId: "1:111891866061:web:bd466fe92200669a886484"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Closet() {
    const [isFooterPopupOneShown, setIsFooterPopupOneShown] = React.useState(false);
    const [isFooterPopupTwoShown, setIsFooterPopupTwoShown] = React.useState(false);
    const [isImgFileChosen, setIsImgFileChosen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState();
    const [selectedFileName, setSelectedFileName] = React.useState("")
    const [imageURL, setImageURL] = React.useState()
    const [isImgPreviewShown, setIsImgPreviewShown] = React.useState(false);
    const [imageFromDB, setImageFromDB] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [isLookButtonActive, setIsLookButtonActive] = React.useState(false);
    const [isLookCreatorPopupShown, setIsLookCreatorPopupShown] = React.useState(false);

    function handlesFooterPopupOne(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsFooterPopupOneShown(prevStatus => !prevStatus);
    }   

    function handlesFooterPopupTwo(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsFooterPopupTwoShown(prevState => !prevState);
        setIsFooterPopupOneShown(false);
    }

    function cleanUpPopups() {
        setIsFooterPopupOneShown(false);
    }

    useEffect(() => {
        if (!selectedFile) {
            setImageURL(undefined)
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setImageURL(objectUrl);

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile, selectedItems])

    function savesUploadedPic(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
        setSelectedFileName(e.target.files[0].name)
        setIsImgFileChosen(true);
        setIsFooterPopupTwoShown(false);
    }

    function closesPopup() {
        setIsImgPreviewShown(false);
        setSelectedFile();  
        setIsImgFileChosen(false); 
        setIsLookCreatorPopupShown(false);
        setSelectedItems([]);
    }

    function handlesImgPopupOne() {
        setIsImgPreviewShown(prevState => !prevState);
        setIsImgFileChosen(false); 
    }

    function handlesImgInfoPopup() {
        setIsImgPreviewShown(false);
    }

    useEffect(() => {
        return onValue(ref(db, "clothesItems"), function(snapshot) {
            let categories = snapshot.val();
            let urls = [];

            for (let category in categories) {
                let images = categories[category]
                for (let image in images) {
                    urls.push(images[image].imageURL);
                }
            }
            setImageFromDB(urls);
        })
    }, []);

    useEffect(() => {
        if (selectedItems.length !== 0 && selectedItems.length <= 10) {
            setIsLookButtonActive(true);
        } else {
            setIsLookButtonActive(false);
        }
    }, [selectedItems]);

    function picksItemsForLooks(e) {
        let lookItemURL = e.target.attributes[0].value;
        if (selectedItems.includes(lookItemURL)) {
            setSelectedItems(selectedItems.filter(url => url !== lookItemURL));
        } else {
            setSelectedItems(prevArr => [...prevArr, lookItemURL])
        }
    }

    function handlesLookCreaterPopup() {
        setIsLookCreatorPopupShown(prevState => !prevState);
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
                    <div className={isLookButtonActive ? "header--button" : "header--button inactive-button"} onClick={handlesLookCreaterPopup}>+ Look</div>
                </div>
            </div>
            <div className="closet-body-box">
                <div className="categories-box">
                    <CategoryList />
                    <Footer popupHandler={e => handlesFooterPopupOne(e)}/>
                    {isFooterPopupOneShown && <UploadPopup choiceHandler={e => handlesFooterPopupTwo(e)}/>}
                    {isFooterPopupTwoShown && <UploadChoicePopup picUploaded={savesUploadedPic}/>}
                    {isImgFileChosen && <PicPreviewPopup fileSource={imageURL} closesPopup={closesPopup} handlesImgPopupOne={handlesImgPopupOne}/>}
                    {isImgPreviewShown && <ImgInfoPopup handlesImgInfoPopup={handlesImgInfoPopup} closesPopup={closesPopup}
                                        imgFile={selectedFile} name={selectedFileName}/>}
                    {isLookCreatorPopupShown && <LookCreatorPopup closesPopup={closesPopup} items={selectedItems}/>}
                </div>
                <div className="clothes-item-box">
                    {imageFromDB.map((image, i) => (<ClothesItem key={i} source={image} picksItemsForLooks={picksItemsForLooks}/>))}
                    
                </div>   
            </div>
        </div>
    )
}

