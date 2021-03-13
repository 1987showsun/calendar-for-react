/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

import { 
    SelectWrapStyle,
    SelectSetStyle,
    SelectSetItemStyle,
    SelectInputBox,
    RemoveItem
} from "./stylesheets/formSelect";

import {
    TextWrapStyle
} from "./stylesheets/formText";

export const FormSelect = ({
    defaultValue = [],
    options      = [],
    onChange     = () => {}
}) => {

    const inputRef = useRef(null);
    const hiddenSpanRef = useRef(null);

    const [ stateInputValue, setInputValue ] = useState("");
    const [ stateValue, setValue ] = useState(defaultValue);

    const reInputWidth = useCallback(() => {
        if( hiddenSpanRef.current!=null ){
            const hiddenSpanW = hiddenSpanRef.current.offsetWidth;
            return hiddenSpanW;
        }
    },[stateInputValue]);

    useEffect(() => {
        setValue(defaultValue);
    },[defaultValue]);

    useEffect(() => {
        onChange( stateValue );
    }, [stateValue]);

    return(
        <SelectWrapStyle>
            <SelectSetStyle onClick={() => inputRef.current.focus() }>
                {stateValue.map((item,i) => (
                    <SelectSetItemStyle key={i}>
                        {item}
                        <RemoveItem 
                            onClick = {() => setValue( stateValue.filter((item,s) => s!=i) )}
                        />
                    </SelectSetItemStyle>)
                )}
                <SelectInputBox
                    reWidth= {reInputWidth()}
                >
                    <input 
                        ref       = {inputRef} 
                        type      = "text" 
                        name      = "text" 
                        value     = {stateInputValue} 
                        onChange  = { e => {
                            setInputValue( e.target.value );
                        }}
                        onKeyPress = { e => { 
                            if( e.key === 'Enter' ){
                                e.preventDefault();
                                setInputValue("");
                                setValue( prevVal => {
                                    return [ ...prevVal, stateInputValue ]
                                });
                            }
                        }}
                    />
                    <span ref={hiddenSpanRef}>{stateInputValue}</span>
                </SelectInputBox>
            </SelectSetStyle>
        </SelectWrapStyle>
    );
}

FormSelect.propTypes = {
    defaultValue: PropTypes.array,
    options     : PropTypes.array,
    onChange    : PropTypes.func
}

export const FromText = ({
    defaultValue  = "",
    required      = false,
    onChange      = () => {}
}) => {

    const [ stateValue, setValue ] = useState("");
    
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        onChange(stateValue);
    }, [stateValue]);

    return(
        <TextWrapStyle
            required = {required}
        >
            <input type="text" name="text" value={stateValue} onChange={ e => setValue(e.target.value)} />
        </TextWrapStyle>
    );
}

FromText.propTypes = {
    defaultValue: PropTypes.string,
    required    : PropTypes.bool,
    onChange    : PropTypes.func
}