import React from "react"
import "./css/CategoryList.css"

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

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

export default function CategoryList() {
    onValue(ref(db, "categories"), function(snapshot) {
        let data = snapshot.val();
        return (
            <div className="categories-list">
                {data.map(item => 
                                (<div className="category-name">
                                    <img src={data[item].icon} className="side-bar--icons"/>{item}
                                </div>))}
            </div>)
    });
    
}