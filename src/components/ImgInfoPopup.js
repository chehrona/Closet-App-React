import React, { useEffect } from "react"
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
    const [categoryName, setCategoryName] = React.useState("");
    const [categoryIcon, setCategoryIcon] = React.useState("");
    const [isDropDownShown, setIsDropDownShown] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([]);

    function getCategoryIcon(e) {
        let icon = e.target;
        e.preventDefault();

        setCategoryIcon(icon.getAttribute("src"))
        setIsDropDownShown(false);
        
    }

    function getCategoryName(e) {
        let name = e.target.value;
        e.preventDefault();

        if (name.length >= 3) {
            setCategoryName(name.charAt(0).toUpperCase() + name.substring(1, name.length))
        }
    }

    function showsDropDownMenu(e) {
        e.preventDefault();
        setIsDropDownShown(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        set(ref(db, "categories/" + categoryName), {
            icon: categoryIcon,
            });

        setCategoryIcon("");
        setCategoryName("");
    }

    useEffect(() => {
        return onValue(ref(db, "categories"), function(snapshot) {
            let data = snapshot.val();
            let categoryData = [];

            if (snapshot.exists()) {
                for (let item in data) {
                    console.log(data[item].icon)
                    categoryData.push({name: item, icon: data[item].icon});
                }
                setCategoryList(categoryData)
            }
        })
    }, []);

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
                        <form className="category-info-wrapper" onSubmit={handleSubmit}>
                            <div className="drop-down-icon">
                                <FontAwesomeIcon icon={faAngleDown} onClick={e => showsDropDownMenu(e)}/>
                                {isDropDownShown && <IconsDropDown getCategoryIcon={getCategoryIcon}/>}
                            </div>
                            <input className="category-name-input" placeholder="Add category"
                            onChange={(e) => getCategoryName(e)}/>
                            {(categoryIcon && categoryName) && <input className="category-add-button" type="submit" value="Add"/>}
                        </form>
                        {categoryList.map((category, i) => (
                        <div className="db-category-name" key={i}>
                            <img src={category.icon} className="db-category-icon"/>{category.name}</div>)
                            )}
                    </div>
                </div>
                <ItemColorPicker />
            </div>
        </div>
    )
}


