/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

// Modules
import DatePicker from '../../modules/datePicker';
import {
    FormSelect,
    FromText
} from '../../modules/formInput';

// Stylesheets
import { 
    FormWrapStyle,
    FormItemsStyle,
    FormItemsLabel,
    FormItemsContainer,
    TextareaStyle
} from "./style/style";

const initalForm = {
    start   : 0,
    end     : 0,
    title   : "",
    level   : 1,
    content : "",
    address : "",
    tags    : []
};

const Index = ({
    mode           = [],
    actionType     = "add",
    defaultStrok   = {},
    onHandleCancel = () => {},
    onHandleSubmit = () => {},
    onHandleDelete = () => {}
}) => {
    const required = [ 'start', 'end', 'title' ];
    const [ stateRequired, setRequired ] = useState([]);
    const [ stateStart   , setStart    ] = useState(0);
    const [ stateEnd     , setEnd      ] = useState(0);
    const [ stateForm    , setForm     ] = useState(initalForm);
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...stateForm, [name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const mergeForm = { ...stateForm, start: stateStart, end: stateEnd };
        const checkRequired = required.filter( key => key=='tags'? mergeForm[key].length==0:String(mergeForm[key]).trim()=="");
        if( stateStart>stateEnd ){
            checkRequired.push('start','end');
        }
        if( stateStart<stateEnd && checkRequired.length==0 ){
            onHandleSubmit(mergeForm);
        }
        setRequired(checkRequired);
    }

    useEffect(() => {
        if( Object.keys(defaultStrok).length==0 ){
            setForm(initalForm);
        }else{
            setForm(defaultStrok);
            setStart( defaultStrok.start );
            setEnd( defaultStrok.end );
        }
    }, [defaultStrok]);

    const { start, end, title, level, content, address, tags } = stateForm;

    return(
        <FormWrapStyle onSubmit={handleSubmit.bind(this)}>
            <FormItemsStyle>
                <FormItemsLabel>* Start date :</FormItemsLabel>
                <FormItemsContainer>
                    <DatePicker 
                        mode         = {mode}
                        defaultValue = {start}
                        required     = {stateRequired.includes('start')}
                        onChange     = { date => setStart(date.ms)}
                    />
                </FormItemsContainer>
            </FormItemsStyle>

            <FormItemsStyle>
                <FormItemsLabel>* End date :</FormItemsLabel>
                <FormItemsContainer>
                    <DatePicker 
                        mode         = {mode}
                        defaultValue = {end}
                        required     = {stateRequired.includes('end')}
                        onChange     = { date => setEnd(date.ms)}
                    />
                </FormItemsContainer>
            </FormItemsStyle>

            <FormItemsStyle>
                <FormItemsLabel>* Title :</FormItemsLabel>
                <FormItemsContainer>
                    <FromText
                        defaultValue = {title}
                        required     = {stateRequired.includes("title")}
                        onChange     = { val => setForm( prev => ({ ...prev, title: val })) }
                    />
                </FormItemsContainer>
            </FormItemsStyle>

            <FormItemsStyle>
                <FormItemsLabel>Address :</FormItemsLabel>
                <FormItemsContainer>
                    <FromText
                        defaultValue = {address}
                        onChange     = { val => setForm( prev => ({ ...prev, address: val })) }
                    />
                </FormItemsContainer>
            </FormItemsStyle>

            <FormItemsStyle>
                <FormItemsLabel>Priority :</FormItemsLabel>
                <FormItemsContainer>
                    <select name="level" value={level} onChange={handleChange.bind(this)}>
                        <option value="0">High</option>
                        <option value="1">Normal</option>
                        <option value="2">Low</option>
                    </select>
                </FormItemsContainer>
            </FormItemsStyle>

            <FormItemsStyle>
                <FormItemsLabel>Content :</FormItemsLabel>
                <FormItemsContainer>
                    <TextareaStyle 
                        name       = "content" 
                        value      = {content} 
                        onChange   = {handleChange.bind(this)}
                    />
                </FormItemsContainer>
            </FormItemsStyle>

            <FormItemsStyle>
                <FormItemsLabel>Hash Tag :</FormItemsLabel>
                <FormItemsContainer>
                    <FormSelect 
                        defaultValue = {tags}
                        onChange     = { tags  => setForm( prevForm => ({ ...prevForm, tags: tags }))}
                    />
                </FormItemsContainer>
            </FormItemsStyle>
            <FormItemsStyle className="form-action">
                <button className="cancel" type="button" onClick={onHandleCancel.bind(this)}>Cancel</button>
                <button className="submit" type="submit">{ actionType=='add'? 'Add':'Update' } Stroke</button>
                { actionType=='update' && <button className="delete" type="button" onClick={onHandleDelete.bind(this, stateForm)}>Delete Stroke</button> }
            </FormItemsStyle>
        </FormWrapStyle>
    );
}

Index.prototype = {
    mode           : PropTypes.array,
    actionType     : PropTypes.string,
    defaultStrok   : PropTypes.object,
    onHandleCancel : PropTypes.func,
    onHandleSubmit : PropTypes.func,
    onHandleDelete : PropTypes.func
}

export default Index;