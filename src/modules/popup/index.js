/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

// Stylesheets
import { 
    PopupWrapStyle,
    PopupMaskStyle,
    PopupContainer
} from "./stylesheets/style";

const Index = ({
    children          = null,
    propsDisplay      = false,
    propsPadding      = 0,
    onHandleOpenPopup = () => {}
}) => {
    return(
        <PopupWrapStyle
            propsSwitch   = {propsDisplay}
        >
            <PopupMaskStyle 
                onClick     = {onHandleOpenPopup.bind(this, false)}
            />
            <PopupContainer
                maxWidth      = {480}
                propsPadding  = {propsPadding}
            >
                {children}
            </PopupContainer>
        </PopupWrapStyle>
    );
}

Index.propTypes = {
    propsPadding      : PropTypes.number,
    propsDisplay      : PropTypes.bool,
    onHandleOpenPopup : PropTypes.func,
}

export default Index;

