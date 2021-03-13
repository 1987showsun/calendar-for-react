/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import styled, { css } from "styled-components";

export const DatetimeWrapStyle = styled.div`
    width: 100%;
    height: auto !important;
    display: flex;
    position: relative;
    outline: 0;
    user-select: none;
    div, span, section, button, select {
        box-sizing: border-box;
    }
    .show-date{
        min-height: ${props => props.height!=undefined? `${props.height}px`:`40px`};
    }
    .calendar-wrap{
        top: calc( ${props => props.height!=undefined? `${props.height}px`:`40px`} + 10px );
    }
    button{
        appearance: none;
        border: 0;
        background-color: transparent;
    }
`;

export const DatetimeStyle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px 5px;
    border: 1px solid #eee;
    border-radius: 3px;
    font-size: .9em;
    cursor: pointer;
    span{
        margin-right: 2px;
        &:nth-child(6){
            margin-left: 10px;
        }
        &:last-child{
            margin-right: 0px;
        }
    }
`;

export const CalendarWrapStyle = styled.div`
    width: 290px;
    background: #fff;
    border-radius: 5px;
    display: ${props => !props.propsSwitch? 'none':'flex'};
    flex-direction: column;
    box-shadow: 0px 0px 5px rgba(0,0,0,.2);
    position: absolute;
    z-Index: 2;
`;

export const HeaderStyle = styled.div`
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .show-current-date{
        span{
            margin-right: 10px;
            cursor: pointer;
            &:last-child{
                margin-right: 0px;
            }
        }
    }
`;

export const CalendarArrowStyle = styled.div`
    width: 100%;
    max-width: 35px;
    height: 100%;
    cursor: pointer;
    ${
        props => 
            props.image!=undefined && css`
                background-image: url(${props.image});
                background-position: center;
                background-size: 50%;
                background-repeat: no-repeat;
            `
    }
`;

export const ContainerWrapStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const DaysWrapStyle = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const DaysTitleItemStyle = styled.div`
    width: calc( 100% / 7 );
    min-height: 40px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: .8em;
`;

export const DaysItemStyle = styled.div`
    width: calc( 100% / 7 );
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    position: relative;
    cursor: pointer;
    &:nth-child(7n+7){
        border-right: 0;
    }
    &:nth-last-child(-n+7){
        border-bottom: 0;
    }
    &:hover{
        .date-set{
            background-color: #eee;
        }
        &[data-current="false"]{
            .date-set{
                color: #fff;
            }
        }
    }
    &[data-istoday="true"]{
        .date-set{
            color: ${props => props.color!=undefined? props.color: '#1d79fc'};
        }
    }
    &[data-current="false"]{
        .date-set{
            color: #eee;
        }
    }
    &[data-selected="true"]{
        .date-set{
            color: #fff;
            background-color: ${props => props.color!=undefined? props.color: '#1d79fc'};
        }
    }
`;

export const DateStyle = styled.div`
    width: 27px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    font-size: .9rem;
    line-height: 0em;
    user-select: none;
`;


export const TimeWrapStyle = styled.div`
    width: 100%;
    height: 50px;
    padding: 5px;
    display: flex;
    border-top: 1px solid #eee;
    >div, >span{
        display: inline-flex;
    }
    >span{
        margin: 0px 10px;
        align-items: center;
    }
`;

export const TimeItemBlock = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
    border-radius: 5px;
    >div{
        height: 100%;
        display: inline-flex;
    }
`;

export const TimeInputBlock = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    font-weight: bold;
    
`;

export const TimeArrowBlock = styled.div`
    min-width: 30px;
    border-left: 1px solid #eee;
    flex-direction: column;
    >div{
        width: 100%;
        height: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 10px;
        background-color: #eee;
        cursor: pointer;
        &:first-child{
            border-bottom: 1px solid #ccc;
        }
        &:last-child{
            border-top: 1px solid #fff;
        }
    }
`;
