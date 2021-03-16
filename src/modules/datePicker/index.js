/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';

// Components
import Calendar from "./calendar";

// Stylesheets
import { 
    DatetimeWrapStyle,
    DatetimeStyle,
} from "./stylesheets/style";

const Index = ({
    mode         = [],
    required     = [],
    defaultValue = "",
    disabledTime = "",
    onChange     = () => {}
}) => {

    dayjs.extend(toArray);
    const initDate = dayjs().toArray();
    const modeFormat = ['date', 'time'];
    const [ stateMode         , setMode          ] = useState(() => {
        if(Array.isArray(mode)){
            const filterMode = modeFormat.filter( item => mode.includes(item) );
            return filterMode.length!=0? filterMode:[modeFormat[0]];
        }
        return [modeFormat[0]];
    });
    const [ stateDisplay      , setDisplay       ] = useState( false );
    const [ stateCurrentYear  , setCurrentYear   ] = useState( initDate[0] );
    const [ stateCurrentMonth , setCurrentMonth  ] = useState( initDate[1] );
    const [ stateCurrentDay   , setCurrentDay    ] = useState( initDate[2] );
    const [ stateCurrentHour  , setCurrentHour   ] = useState( initDate[3] );
    const [ stateCurrentMinute, setCurrentMinute ] = useState( initDate[4] );
    const [ stateCurrentSecond, setCurrentSecond ] = useState( initDate[5] );

    useEffect(() => {
        const today   = defaultValue==""? dayjs().toArray():dayjs(defaultValue).toArray();
        const nowTime = disabledTime==""? dayjs().toArray():dayjs(`${today[0]}/${today[1]+1}/${today[2]} ${disabledTime}`).toArray();
        setCurrentYear( today[0] );
        setCurrentMonth( today[1] );
        setCurrentDay( today[2] );
        setCurrentHour( nowTime[3] );
        setCurrentMinute( nowTime[4] );
        setCurrentSecond( nowTime[5] );
    },[defaultValue]);

    useEffect(() => {
        const date   = mode.includes('time')? `${stateCurrentYear}/${stateCurrentMonth+1}/${stateCurrentDay} ${stateCurrentHour}:${stateCurrentMinute}:${stateCurrentSecond}`:`${stateCurrentYear}/${stateCurrentMonth+1}/${stateCurrentDay}`;
        const format = mode.includes('time')? 'YYYY/MM/DD HH:mm:ss':'YYYY/MM/DD';
        onChange({
            date : dayjs(date).format(format),
            ms   : dayjs(date).valueOf(),
        });
    },[stateCurrentDay, stateCurrentHour, stateCurrentMinute, stateCurrentSecond]);

    const showDatetime = useCallback(() => {
        const mergeView = [];
        const mergeDate = `${stateCurrentYear}/${stateCurrentMonth+1}/${stateCurrentDay} ${stateCurrentHour}:${stateCurrentMinute}:${stateCurrentSecond}`;
        if( stateMode.includes('date') ){
            mergeView.push(
                <span key={'Y'}>{dayjs(mergeDate).format('YYYY')}</span>,
                <span key={'/'}>/</span>,
                <span key={'M'}>{dayjs(mergeDate).format('MM')}</span>,
                <span key={'//'}>/</span>,
                <span key={'D'}>{dayjs(mergeDate).format('DD')}</span>
            )
        }
        if( stateMode.includes('time') ){
            mergeView.push(
                <span key={'h'}>{dayjs(mergeDate).format('HH')}</span>,
                <span key={':'}>:</span>,
                <span key={'m'}>{dayjs(mergeDate).format('mm')}</span>,
                <span key={'::'}>:</span>,
                <span key={'s'}>{dayjs(mergeDate).format('ss')}</span>
            )
        }
        return mergeView;
    },[stateMode, stateCurrentYear, stateCurrentMonth, stateCurrentDay, stateCurrentHour, stateCurrentMinute, stateCurrentSecond]);

    return(
        <DatetimeWrapStyle
            tabIndex  = {1}
            onClick   = {() => {
                if( !stateDisplay ){
                    setDisplay(true)
                }
            }}
            onBlur    = {() => setDisplay(false)}
        >
            <DatetimeStyle 
                className      = "show-date"
                data-required  = {required}
                onClick        = {() => setDisplay(stateDisplay? false:true)}
            >
                {showDatetime()}
            </DatetimeStyle>
            <Calendar
                tabIndex             = {1}
                propsMode            = {stateMode}
                propsDisplay         = {stateDisplay}
                propsSelectedYear    = {stateCurrentYear}
                propsSelectedMonth   = {stateCurrentMonth}
                propsSelectedDay     = {stateCurrentDay}
                propsSelectedHour    = {stateCurrentHour}
                propsSelectedMinute  = {stateCurrentMinute}
                propsSelectedSecond  = {stateCurrentSecond}
                onHandleSetYear      = { val => setCurrentYear(val)}
                onHandleSetMonth     = { val => setCurrentMonth(val)}
                onHandleSelectedDate = {(selectedDate) => {
                    setCurrentYear( selectedDate[0] );
                    setCurrentMonth( selectedDate[1] );
                    setCurrentDay( selectedDate[2] );
                }}
                onHandleSelectedTime = {(selectedTime) => {
                    setCurrentHour(selectedTime[0]);
                    setCurrentMinute(selectedTime[1]);
                    setCurrentSecond(selectedTime[2]);
                }}
            />
        </DatetimeWrapStyle>
    );
}

Index.prototype = {
    required    : PropTypes.bool,
    mode        : PropTypes.array,
    defaultValue: PropTypes.string,
    disabledTime: PropTypes.string,
    onChange    : PropTypes.func
}

export default Index;