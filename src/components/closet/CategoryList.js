import React, {useEffect} from "react"
import "../css/CategoryList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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

export default function CategoryList() {
    const [categoryList, setCategoryList] = React.useState([]);

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

        return (
            <div className="categories-list">
                {categoryList.map((category, i) => 
                                (<div className="category-name" key={i}>
                                    <img src={category.icon} className="side-bar--icons"/>{category.name}
                                    <FontAwesomeIcon className="side-bar-edit" icon={faPenToSquare} />
                                </div>))}
            </div>)
}