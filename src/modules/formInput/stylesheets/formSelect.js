/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import styled from 'styled-components';

export const SelectWrapStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    div, input {
        box-sizing: border-box;
    }
`;

export const SelectSetStyle = styled.div`
    width: 100%;
    min-height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 5px 5px 0px 5px;
    border: 1px solid #eee;
    border-radius: 3px;
`;

export const SelectInputBox = styled.div`
    width: ${props => `calc(${props.reWidth}px + 10px)`}; 
    max-width: 100%;
    height: 30px;
    position: relative;
    margin-bottom: 5px;
    input, span{
        max-width: 100%;
        min-height: 100% !important;
        padding: 0px 5px;
        font-size: 0.9rem !important;
        line-height: 0em;
        font-family: auto;
    }
    input{
        border: 0px !important;
        position: relative;
        z-index: 2;
        background-color: transparent;
    }
    span{
        padding: 0px 5px;
        display: flex;
        align-items: center;
        position: absolute;
        z-index: 1;
        left: 0px;
        top: 0px;
        visibility: hidden;
    }
`;

export const SelectSetItemStyle = styled.div`
    min-height: 30px;
    padding: 0px 10px;
    margin-bottom: 5px;
    margin-right: 5px;
    display: inline-flex;
    align-items: center;
    background: #eee;
    border-radius: 3px;
    font-size: 0.9em;
`;

export const RemoveItem = styled.div`
    width: 18px;
    height: 18px;
    margin-left: 10px;
    border-radius: 100px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAwMSA1MTIuMDAxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAxIDUxMi4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjg0LjI4NiwyNTYuMDAyTDUwNi4xNDMsMzQuMTQ0YzcuODExLTcuODExLDcuODExLTIwLjQ3NSwwLTI4LjI4NWMtNy44MTEtNy44MS0yMC40NzUtNy44MTEtMjguMjg1LDBMMjU2LDIyNy43MTcNCgkJCUwzNC4xNDMsNS44NTljLTcuODExLTcuODExLTIwLjQ3NS03LjgxMS0yOC4yODUsMGMtNy44MSw3LjgxMS03LjgxMSwyMC40NzUsMCwyOC4yODVsMjIxLjg1NywyMjEuODU3TDUuODU4LDQ3Ny44NTkNCgkJCWMtNy44MTEsNy44MTEtNy44MTEsMjAuNDc1LDAsMjguMjg1YzMuOTA1LDMuOTA1LDkuMDI0LDUuODU3LDE0LjE0Myw1Ljg1N2M1LjExOSwwLDEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdMMjU2LDI4NC4yODcNCgkJCWwyMjEuODU3LDIyMS44NTdjMy45MDUsMy45MDUsOS4wMjQsNS44NTcsMTQuMTQzLDUuODU3czEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdjNy44MTEtNy44MTEsNy44MTEtMjAuNDc1LDAtMjguMjg1DQoJCQlMMjg0LjI4NiwyNTYuMDAyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K);
    background-color: #fff;
    background-position: center;
    background-size: 8px;
    background-repeat: no-repeat;
    cursor: pointer;
`;
