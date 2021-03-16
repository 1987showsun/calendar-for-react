/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */

import styled, { css } from 'styled-components';

export const PopupWrapStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    top: 0px;
    left: 0px;
    transition: opacity .2s;
    visibility: ${({ propsSwitch=false } )=> !propsSwitch? 'hidden':'initial'};
    opacity: ${({ propsSwitch=false } )=> !propsSwitch? 0:1};
 `;

 export const PopupMaskStyle = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
 `;

export const PopupContainer = styled.div`
   width: 100%;
   max-width: ${props => props.maxWidth!=undefined? `${props.maxWidth}px`:`320px`};
   min-height: 10%;
   ${ props => 
         props.height!=undefined ? css`
            max-height: ${`${props.height}%`};
         `: css`
            max-height: 80%;
         `
   }
   overflow: auto;
   padding: ${props => props.propsPadding!=0? `${props.propsPadding}px`: `0px`};
   border-radius: 5px;
   box-shadow: 0px 0px 10px rgba(0,0,0,.2);
   background: #fff;
   position: relative;
   z-index: 2;
`;