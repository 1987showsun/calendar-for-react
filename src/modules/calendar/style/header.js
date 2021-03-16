/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import styled from "styled-components";

export const HeaderWrapStyle = styled.div`
    width: 100%;
    height: 80px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderItemStyle = styled.div`
    display: inline-flex;
    align-items: center;
`;

export const ArrowStyle = styled.button`
    width: 30px;
    height: 40px;
    border: 0;
    cursor: pointer;
    background-size: 60%;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    ${ props => props.backgroundImage!=undefined && `background-image: url("${props.backgroundImage}")` }
`;

export const DateStyle = styled.div`
    width: 100%;
    margin: 0px 15px;
    display: flex;
    justify-content: center;
    font-size: 1.4em;
    font-weight: bold;
    >span{
        display: inline-flex;
        margin: 0px 5px;
        &:first-child{
            margin-left: 0px;
            cursor: pointer;
        }
        &:last-child{
            margin-right: 0px;
            cursor: pointer;
        }
    }
`;

export const HeaderActionBtn = styled.button`
    min-height: 40px;
    padding: 0px 15px;
    border: 1px solid #ccc !important;
    border-radius: 5px;
    font-size: 0.8em;
    cursor: pointer;
    &.type-btn-action{
        border-radius: 0;
        &:first-child{
            border-right: 0 !important;
            border-radius: 5px 0 0 5px;
        }
        &:nth-child(3){
            border-left: 0 !important;
            border-radius: 0px 5px 5px 0px;
            margin-right: 5px;
        }
        &[data-active="true"]{
            background-color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
            color: #fff;
        }
    }
    &.today-btn{
        margin-right: 5px;
        color: #fff;
        background-color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
    }
`;