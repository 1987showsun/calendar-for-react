/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import styled from 'styled-components';

export const FormWrapStyle = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    input, select, button, textarea {
        width: 100%;
        min-height: 40px;
        padding: 0px 5px;
        appearance: none;
        border: 1px solid #eee;
        border-radius: 3px;
        outline: 0;
    }
`;

export const FormItemsStyle = styled.div`
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:last-child{
        margin-bottom: 0px;
    }
    >div{
        display: inline-flex;
    }
`;

export const FormItemsLabel = styled.div`
    min-width: 100px;
    justify-content: flex-end;
    margin-right: 10px;
`;

export const FormItemsContainer = styled.div`
    width: 100%;
`;

export const TextareaStyle = styled.textarea`
    line-height: 1.3em;
    min-height: 6em !important;
    padding: 5px !important;
    resize: none;
`;