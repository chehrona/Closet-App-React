import React, { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

import "./css/ImgInfoPopup.css"
import { colors } from "./Colors"

import IconsDropDown from "./IconsDropDown"

import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import ColorCircle from "./ColorCircle"
import CategoryNamesPopup from "./CategoryNamesPopup"

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
const storage = getStorage(app);

export default function ImgInfoPopup(props) {
    const [categoryName, setCategoryName] = React.useState("");
    const [categoryIcon, setCategoryIcon] = React.useState("");
    const [isDropDownShown, setIsDropDownShown] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([]);
    const [pickedCategory, setPickedCategory] = React.useState("");
    const [pickedColors, setPickedColors] = React.useState([]);

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
                    categoryData.push({name: item, icon: data[item].icon});
                }
                setCategoryList(categoryData)
            }
        })
    }, []);

    function chooseItemCategory(name) {
        setPickedCategory(name)
    }

    function chooseItemColors(color) {
        if (pickedColors.length < 3 && !pickedColors.includes(color)) {
            setPickedColors(prevArr => [...prevArr, color]);
        } else if (pickedColors.includes(color)) {
            let removedColors = [...pickedColors];
            removedColors.splice(removedColors.indexOf(color), 1);
            setPickedColors(removedColors);
        }
    }

    function pushItemInfoToDB(e) {
       if (pickedCategory && pickedColors.length !== 0) {
        const storageFilePath = storageRef(storage, pickedCategory + "/" + props.name);

        uploadBytes(storageFilePath, props.name).then(function(snapshot) {
            getDownloadURL(storageFilePath).then(function(url) {
                push(ref(db, "clothesItems/" + pickedCategory + "/"), {
                    imageURL: url,
                    name: props.name,
                    colors: pickedColors
                    });
                }); 
            });
        
        props.handleImgInfo(e);
       }

       
    }

    return (
        <div className="popup--container">
            <div className="action-button--wrapper">
                <div className="action--button" onClick={(e) => props.handleImgInfo(e)}>Cancel</div>
                <div className="action--label">Save To</div>
                <div className="action--button" onClick={pushItemInfoToDB}>Done</div>
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
                        {categoryList.map((category, i) => {return <CategoryNamesPopup key={i} chooseItemCategory={chooseItemCategory} 
                                                                    icon={category.icon} name={category.name} 
                                                                    extraClassName={pickedCategory == category.name && "category-highlighted"}
                                                            />})}
                    </div>
                </div>
                <div className="colors-box">
                    <div className="prompt--name">Please select upto three colors</div>
                    <div className="colors-list">
                        {colors.map(color => {return <ColorCircle key={color.id} css={color.css} chooseItemColors={chooseItemColors}
                                                    extraClassName={(pickedColors.length >= 3 && !pickedColors.includes(color.css)) ? "color-circle-disabled" : ""}/>})}
                    </div>
                </div>
            </div>
        </div>
    )
}


