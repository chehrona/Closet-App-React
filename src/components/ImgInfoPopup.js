import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

import "./css/ImgInfoPopup.css"

export default function ImgInfoPopup(props) {
    return (
        <div className="popup--container">
            <div className="action-button--wrapper">
                <div className="action--button" onClick={(e) => props.handleImgInfo(e)}>Cancel</div>
                <div className="action--label">Save To</div>
                <div className="action--button" onClick={(e) => props.handleImgInfo(e)}>Done</div>
            </div>
            <div className="pickFeaturesBody">
                <div className="pickFirstCategory">
                    <div>Please select a category</div>
                    <div className="defaultCategories">
                    <div className="customCategory">
                        <div className="popupIcon">
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div><input placeholder="Add category" maxlength="15"/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
    {/* <div class="pickColor">
        <p>Please select upto three colors</p>
        <div class="colorList">
            <div class="colorCircle removeWhenSelected" id="silver"></div>
            <div class="colorCircle removeWhenSelected" id="gold"></div>
            <div class="colorCircle removeWhenSelected" id="red"></div>
            <div class="colorCircle removeWhenSelected" id="green"></div>
            <div class="colorCircle removeWhenSelected" id="blue"></div>
            <div class="colorCircle removeWhenSelected" id="white"></div>
            <div class="colorCircle removeWhenSelected" id="black"></div>
            <div class="colorCircle removeWhenSelected" id="pink"></div>
            <div class="colorCircle removeWhenSelected" id="yellow"></div>
            <div class="colorCircle removeWhenSelected" id="orange"></div>
            <div class="colorCircle removeWhenSelected" id="brown"></div>
            <div class="colorCircle removeWhenSelected" id="purple"></div>
            <div class="colorCircle removeWhenSelected" id="grey"></div>
            <div class="colorCircle removeWhenSelected" id="beige"></div>
        </div>
    </div>
</div>
</div>
<div class="iconDropMenu disabledPopup">
<img id="coats" src="assets/images/011-overcoat.png" class="iconPic">
<img id="puffers" src="assets/images/024-jacket.png" class="iconPic">
<img id="blazers" src="assets/images/035-blazer.png" class="iconPic">
<img id="jackets" src="assets/images/007-denim-jacket.png" class="iconPic">
<img id="vests" src="assets/images/023-vest.png" class="iconPic">
<img id="cardigans" src="assets/images/020-cardigan.png" class="iconPic">
<img id="sweaters" src="assets/images/006-sweater.png" class="iconPic">
<img id="hoodies" src="assets/images/004-hood.png" class="iconPic">
<img id="turtlenecks" src="assets/images/022-turtleneck.png" class="iconPic">
<img id="shirts" src="assets/images/008-long-sleeve.png" class="iconPic">
<img id="blouses" src="assets/images/034-crop-top.png" class="iconPic">
<img id="tshirts" src="assets/images/001-tshirt.png" class="iconPic">
<img id="tanks" src="assets/images/025-vest-1.png" class="iconPic">
<img id="dresses" src="assets/images/010-dress.png" class="iconPic">
<img id="overalls" src="assets/images/014-overall.png" class="iconPic">
<img id="pants" src="assets/images//003-loose-pants.png" class="iconPic">
<img id="jeans" src="assets/images/002-jeans.png" class="iconPic">
<img id="skirts" src="assets/images/005-skirt.png" class="iconPic">
<img id="shorts" src="assets/images/015-shorts.png" class="iconPic">
<img id="beanies" src="assets/images/026-wool-hat.png" class="iconPic">
<img id="fedoras" src="assets/images/030-hat.png" class="iconPic">
<img id="caps" src="assets/images/016-cap.png" class="iconPic">
<img id="overalls" src="assets/images/014-overall.png" class="iconPic">
<img id="scarves" src="assets/images/032-scarf.png" class="iconPic">
<img id="gloves" src="assets/images/029-gloves.png" class="iconPic">
<img id="tights" src="assets/images/033-knee-high-socks.png" class="iconPic">
<img id="boots" src="assets/images/031-boot.png" class="iconPic">
<img id="heels" src="assets/images/028-high-heels.png" class="iconPic">
<img id="shoes" src="assets/images/012-shoe.png" class="iconPic">
<img id="sneakers" src="assets/images/009-sport-shoe.png" class="iconPic">
<img id="sandals" src="assets/images/019-sandals.png" class="iconPic">
<img id="backpacks" src="assets/images/021-backpack.png" class="iconPic">
<img id="purses" src="assets/images/013-purse.png" class="iconPic">
<img id="belts" src="assets/images/018-belt.png" class="iconPic">
<img id="watches" src="assets/images/027-watch.png" class="iconPic">
<img id="accessories" src="assets/images/017-accessories.png" class="iconPic">
</div>  */}
