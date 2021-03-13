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
    defaultStrok   = {},
    onHandleSubmit = () => {}
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
        if( checkRequired.length==0 ){
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
                        defaultValue = {start}
                        required     = {required.includes('start')}
                        onChange     = { date => setStart(date.ms)}
                    />
                </FormItemsContainer>
            </FormItemsStyle>

            <FormItemsStyle>
                <FormItemsLabel>* End date :</FormItemsLabel>
                <FormItemsContainer>
                    <DatePicker 
                        defaultValue = {end}
                        required     = {required.includes('end')}
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
            <FormItemsStyle>
                <button>Add Stroke</button>
            </FormItemsStyle>
        </FormWrapStyle>
    );
}

Index.prototype = {
    defaultStrok   : PropTypes.object,
    onHandleSubmit : PropTypes.func
}

export default Index;