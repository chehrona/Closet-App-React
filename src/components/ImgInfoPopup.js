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
            // setCategoryList([]);
            let data = snapshot.val();
            let categoryData = [];

            if (snapshot.exists()) {
                for (let item in data) {
                    categoryData.push({name: item, icon: data[item]});
                }
                setCategoryList(prevData => [...prevData, categoryData])
            }
        })
    }, []);

        // $(".categoryList").empty();
        // $(".defaultCategories").contents(':not(".customCategory")').remove();
        // for (let item in snapshot.val()) {
        //     let categoryIconFromDb = snapshot.val()[item].icon;
        //     let categoryNameFromDb = item;        
        //     $(".categoryList").append('<div class="categoryName">' + '<img src="' + 
        //                     categoryIconFromDb + '" class="iconImage">' + categoryNameFromDb + '</div>');

        //     $(".defaultCategories").append('<div id="' + categoryNameFromDb +
        //                 '" class="pickCategory"><img src="' + categoryIconFromDb +'" class="popupIcon">'
        //                 + categoryNameFromDb + '</div>');
        // }

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
                            <img src={category[i].icon} className="db-category-name"/>{category[i].name}</div>)
                            )}
                    </div>
                </div>
                <ItemColorPicker />
            </div>
        </div>
    )
}


