/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { 
    TimeWrapStyle,
    TimeItemBlock,
    TimeInputBlock,
    TimeArrowBlock
} from "./stylesheets/style";

const upIconSrc   = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ5Mi4wMDIgNDkyLjAwMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkyLjAwMiA0OTIuMDAyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQ4NC4xMzYsMzI4LjQ3M0wyNjQuOTg4LDEwOS4zMjljLTUuMDY0LTUuMDY0LTExLjgxNi03Ljg0NC0xOS4xNzItNy44NDRjLTcuMjA4LDAtMTMuOTY0LDIuNzgtMTkuMDIsNy44NDQNCgkJCUw3Ljg1MiwzMjguMjY1QzIuNzg4LDMzMy4zMzMsMCwzNDAuMDg5LDAsMzQ3LjI5N2MwLDcuMjA4LDIuNzg0LDEzLjk2OCw3Ljg1MiwxOS4wMzJsMTYuMTI0LDE2LjEyNA0KCQkJYzUuMDY0LDUuMDY0LDExLjgyNCw3Ljg2LDE5LjAzMiw3Ljg2czEzLjk2NC0yLjc5NiwxOS4wMzItNy44NmwxODMuODUyLTE4My44NTJsMTg0LjA1NiwxODQuMDY0DQoJCQljNS4wNjQsNS4wNiwxMS44Miw3Ljg1MiwxOS4wMzIsNy44NTJjNy4yMDgsMCwxMy45Ni0yLjc5MiwxOS4wMjgtNy44NTJsMTYuMTI4LTE2LjEzMg0KCQkJQzQ5NC42MjQsMzU2LjA0MSw0OTQuNjI0LDMzOC45NjUsNDg0LjEzNiwzMjguNDczeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K';
const downIconSrc = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ5MS45OTYgNDkxLjk5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkxLjk5NiA0OTEuOTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQ4NC4xMzIsMTI0Ljk4NmwtMTYuMTE2LTE2LjIyOGMtNS4wNzItNS4wNjgtMTEuODItNy44Ni0xOS4wMzItNy44NmMtNy4yMDgsMC0xMy45NjQsMi43OTItMTkuMDM2LDcuODZsLTE4My44NCwxODMuODQ4DQoJCQlMNjIuMDU2LDEwOC41NTRjLTUuMDY0LTUuMDY4LTExLjgyLTcuODU2LTE5LjAyOC03Ljg1NnMtMTMuOTY4LDIuNzg4LTE5LjAzNiw3Ljg1NmwtMTYuMTIsMTYuMTI4DQoJCQljLTEwLjQ5NiwxMC40ODgtMTAuNDk2LDI3LjU3MiwwLDM4LjA2bDIxOS4xMzYsMjE5LjkyNGM1LjA2NCw1LjA2NCwxMS44MTIsOC42MzIsMTkuMDg0LDguNjMyaDAuMDg0DQoJCQljNy4yMTIsMCwxMy45Ni0zLjU3MiwxOS4wMjQtOC42MzJsMjE4LjkzMi0yMTkuMzI4YzUuMDcyLTUuMDY0LDcuODU2LTEyLjAxNiw3Ljg2NC0xOS4yMjQNCgkJCUM0OTEuOTk2LDEzNi45MDIsNDg5LjIwNCwxMzAuMDQ2LDQ4NC4xMzIsMTI0Ljk4NnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==';

const Time = ({
    propsSelectedHour    = 0,
    propsSelectedMinute  = 0,
    propsSelectedSecond  = 0,
    onHandleSelectedTime = () => {}
}) => {

    const handleArrow = ({ value=0, arrowType="addition", max=0 }) => {
        if( arrowType=="subtraction" ){
            return value>0? (value-1)%max : ((max-value)-1)%max;
        }else{
            return (value+1)%max;
        }
    }

    const fillZero = (val) => String(val).length<2? `0${val}`:val;

    return(
        <TimeWrapStyle>
            <TimeItemBlock>
                <TimeInputBlock>{fillZero(propsSelectedHour)}</TimeInputBlock>
                <TimeArrowBlock>
                    <div 
                        onClick = {() => { onHandleSelectedTime([handleArrow({value: propsSelectedHour, max:24, arrowType: 'subtraction'}), propsSelectedMinute, propsSelectedSecond]) }} 
                        style   = {{ backgroundImage: `url(${upIconSrc})` }}
                    />
                    <div 
                        onClick = {() => { onHandleSelectedTime([handleArrow({value: propsSelectedHour, max:24, arrowType: 'addition'}), propsSelectedMinute, propsSelectedSecond]) }} 
                        style   = {{ backgroundImage: `url(${downIconSrc})` }}
                    />
                </TimeArrowBlock>
            </TimeItemBlock>
            <span>:</span>
            <TimeItemBlock>
                <TimeInputBlock>{fillZero(propsSelectedMinute)}</TimeInputBlock>
                <TimeArrowBlock>
                    <div 
                        onClick = {() => { onHandleSelectedTime([propsSelectedHour, handleArrow({value: propsSelectedMinute, max:60, arrowType: 'subtraction'}), propsSelectedSecond]) }} 
                        style   = {{ backgroundImage: `url(${upIconSrc})` }}
                    />
                    <div 
                        onClick = {() => { onHandleSelectedTime([propsSelectedHour, handleArrow({value: propsSelectedMinute, max:60, arrowType: 'addition'}), propsSelectedSecond]) }} 
                        style   = {{ backgroundImage: `url(${downIconSrc})` }}
                    />
                </TimeArrowBlock>
            </TimeItemBlock>
            <span>:</span>
            <TimeItemBlock>
                <TimeInputBlock>{fillZero(propsSelectedSecond)}</TimeInputBlock>
                <TimeArrowBlock>
                    <div 
                        onClick = {() => { onHandleSelectedTime([propsSelectedHour, propsSelectedMinute, handleArrow({value: propsSelectedSecond, max:60, arrowType: 'subtraction'})]) }} 
                        style   = {{ backgroundImage: `url(${upIconSrc})` }}
                    />
                    <div 
                        onClick = {() => { onHandleSelectedTime([propsSelectedHour, propsSelectedMinute, handleArrow({value: propsSelectedSecond, max:60, arrowType: 'addition'})]) }} 
                        style   = {{ backgroundImage: `url(${downIconSrc})` }}
                    />
                </TimeArrowBlock>
            </TimeItemBlock>
        </TimeWrapStyle>
    );
}

Time.propTypes = {
    propsSelectedHour    : PropTypes.number,
    propsSelectedMinute  : PropTypes.number,
    propsSelectedSecond  : PropTypes.number,
    onHandleSelectedTime : PropTypes.func
}

export default Time;