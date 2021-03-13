/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import styled from 'styled-components';

export const TextWrapStyle = styled.div`
    width: 100%;
    min-height: 40px;
    border-style: solid;
    border-width: 1px;
    border-color: ${ props => props.required? 'red':'#eee' };
    border-radius: 3px;
    background-color: #fff;
    input{
        appearance: none;
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0px 5px;
        box-sizing: border-box;
        font-size: .9em;
        border: 0 !important;
    }
`;