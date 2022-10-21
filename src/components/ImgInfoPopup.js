import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

import "./css/ImgInfoPopup.css"

import ItemColorPicker from "./ItemColorPicker"
import IconsDropDown from "./IconsDropDown"

import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from "firebase/database";

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

export default function ImgInfoPopup(props) {
  const pushCategoryInfo = () => {
    set(ref(db, "categories"), function(snapshot) {
      name : props.categoryName,
      icon : props.categoryIcon,
    }).catch(alert);
  }
    return (
        <div className="popup--container">
            <div className="action-button--wrapper">
                <div className="action--button" onClick={(e) => props.handleImgInfo(e)}>Cancel</div>
                <div className="action--label">Save To</div>
                <div className="action--button" onClick={(e) => props.handleImgInfo(e)}>Done</div>
            </div>
            <div className="features-container">
                <div className="category-box">
                    <div className="prompt--name">Please select a category</div>
                    <div className="category-list">
                        <div className="category-info-wrapper">
                            <div className="drop-down-icon">
                                <FontAwesomeIcon icon={faAngleDown} onClick={e => props.showsDropDownMenu(e)}/>
                                {props.isDropDownShown && <IconsDropDown getCategoryIcon={props.getCategoryIcon}/>}
                            </div>
                            <input className="category-name-input" placeholder="Add category"
                            onChange={(e) => props.getCategoryName(e)}/>
                        </div>
                    </div>
                </div>
                <ItemColorPicker />
            </div>
        </div>
    )
}


