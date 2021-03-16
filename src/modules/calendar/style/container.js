/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import styled, { css } from "styled-components";

export const ContainerWrapStyle = styled.div`
    border: 1px solid #eee;
    border-top: 0px;
`;

export const DaysWrapStyle = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const DaysTitleItemStyle = styled.div`
    width: calc( 100% / 7 );
    min-height: 50px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1em;
`;

export const MarkStyle = styled.span`
    width: 7px;
    height: 7px;
    margin-left: 7px;
    border-radius: 10px;
    background: #ccc;
    &.have-stroke{
        background-color: #f36;
    }
`;

export const YearItemStyle = styled.div`
    width: calc( 100% / 5 );
    min-height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    position: relative;
    &:nth-child(5n+5){
        border-right: 0;
    }
    &:nth-last-child(-n+5){
        border-bottom: 0;
    }
    &[data-selected="true"]{
        color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
    }
    &[data-current="true"]{
        .current-set{
            background-color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
        }
    }
`;

export const MonthItemStyle = styled.div`
    width: calc( 100% / 4 );
    min-height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    position: relative;
    &:nth-child(4n+4){
        border-right: 0;
    }
    &:nth-last-child(-n+4){
        border-bottom: 0;
    }
    &:hover{
        background-color: #eee;
    }
    &[data-selected="true"]{
        color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
    }
    &[data-current="true"]{
        .current-set{
            background-color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
        }
    }
`;

export const DaysItemStyle = styled.div`
    width: calc( 100% / 7 );
    height: 180px;
    padding: 10px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    position: relative;
    &:nth-child(7n+7){
        border-right: 0;
    }
    &:nth-last-child(-n+7){
        border-bottom: 0;
    }
    &[data-active="true"]{
        .date-set{
            color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
        }
        &:after{
            content: "";
            width: 100%;
            height: 100%;
            background-color: ${props => props.propsColor!=undefined? props.propsColor: '#1d79fc'};
            opacity: .1;
            position: absolute;
            z-index: 1;
            top: 0px;
            left: 0px;
        }
    }
    &[data-current="false"]{
        .date-set{
            color: #eee;
        }
    }
`;

export const DateStyle = styled.div`
    width: 27px;
    height: 27px;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    justify-content: flex-end;
    border-radius: 100px;
    font-size: 1rem;
    font-weight: bold;
    line-height: 0em;
    user-select: none;
`;


export const StrokeContainerStyle = styled.div`
    width: calc(100% + 10px);
    height: 100%;
    overflow: auto;
    padding: 5px;
    margin-right: -5px;
    position: relative;
    z-index: 2;
`;

export const DaysStrokeItem = styled.div`
    width: 100%;
    display: flex;
    background: #fff;
    padding: 6px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,.1);
    align-items: center;
    margin-bottom: 7px;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    ${ props => props.textAlign!=undefined && css`
        justify-content: flex-end
    `};
    &:last-child{
        margin-bottom: 0px;
    }
`;

export const StrokeSort = styled.div`
    min-width: 17px;
    min-height: 17px;
    margin-right: 5px;
    border-radius: 100px;
    background: #666;
    color: #fff;
    font-size: .7em;
    line-height: .7em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const StrokeTitle = styled.div`
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: .9em;
    line-height: 1em;
`;