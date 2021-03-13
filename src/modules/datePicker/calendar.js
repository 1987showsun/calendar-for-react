/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';

// Components
import Header from './header';
import Container from "./container";
import TimeContainer from "./time";

// Stylesheets
import { 
    CalendarWrapStyle,
} from "./stylesheets/style";

const Calendar = ({
    propsMode            = [],
    propsDisplay         = false,
    propsSelectedYear    = 0,
    propsSelectedMonth   = 0,
    propsSelectedDay     = 0,
    propsSelectedHour    = 0,
    propsSelectedMinute  = 0,
    propsSelectedSecond  = 0,
    onHandleSelectedDate = () => {},
    onHandleSelectedTime = () => {}
}) => {

    const [ stateSelectedDate , setSelectedDate  ] = useState( [] );
    const [ stateCurrentYear  , setCurrentYear   ] = useState( 0 );
    const [ stateCurrentMonth , setCurrentMonth  ] = useState( 0 );
    const [ stateCurrentDay   , setCurrentDay    ] = useState( 0 );
    const [ stateCurrentHour  , setCurrentHour   ] = useState( 0 );
    const [ stateCurrentMinute, setCurrentMinute ] = useState( 0 );
    const [ stateCurrentSecond, setCurrentSecond ] = useState( 0 );
    const [ stateRangeYear    , setRangeYear     ] = useState( [0,0] );
    const [ stateContainerType, setContainerType ] = useState( 'date' );

    const handleChangeMonth = (type) => {

        if( stateContainerType=="year" ){
            let val = stateRangeYear;
            switch( type ){
                case "prev":
                    val = [ val[0]-15, val[1]-15 ];
                break;
        
                default:
                    val = [ val[0]+15, val[1]+15 ];
                break;
            }
            setRangeYear( val );
        }else{
            let val = stateContainerType=="month"? stateCurrentYear:stateCurrentMonth;
            switch( type ){
                case "prev":
                    val = val-1;
                break;
        
                default:
                    val = val+1;
                break;
            }
            if( stateContainerType=="month" ){
                setCurrentYear( Number(dayjs(`${val}/${stateCurrentMonth}`).format('YYYY')) );
            }else{
                setCurrentYear( Number(dayjs(`${stateCurrentYear}/${val}`).format('YYYY')) );
                setCurrentMonth( Number(dayjs(`${stateCurrentYear}/${val}`).format('MM')) );
            }
        }
    };

    useEffect(() => {

        dayjs.extend(toArray);
        const today   = dayjs().toArray();
        const Year    = today[0]!=propsSelectedYear   ? propsSelectedYear    : today[0];
        const month   = today[1]!=propsSelectedMonth  ? propsSelectedMonth+1 : today[1]+1;
        const day     = today[2]!=propsSelectedDay    ? propsSelectedDay     : today[2];
        const hour    = today[3]!=propsSelectedHour   ? propsSelectedHour    : today[3];
        const minute  = today[4]!=propsSelectedMinute ? propsSelectedMinute  : today[4];
        const second  = today[5]!=propsSelectedSecond ? propsSelectedSecond  : today[5];

        setCurrentYear( Year );
        setCurrentMonth( month );
        setCurrentDay( day );
        setCurrentHour( hour );
        setCurrentMinute( minute );
        setCurrentSecond( second );
        setRangeYear( [Year-7, Year+7] );
        setSelectedDate( [propsSelectedYear, propsSelectedMonth, propsSelectedDay, propsSelectedHour, propsSelectedMinute, propsSelectedSecond] );
    }, [propsSelectedYear, propsSelectedMonth, propsSelectedDay, propsSelectedHour, propsSelectedMinute, propsSelectedSecond]);

    return(
        <CalendarWrapStyle 
            className   = "calendar-wrap"
            propsSwitch = {propsDisplay}
        >
            {
                propsMode.includes('date') &&
                    <>
                        <Header 
                            propsCurrentYear      = {stateCurrentYear}
                            propsCurrentMonth     = {stateCurrentMonth}
                            propsRangeYear        = {stateRangeYear}
                            onHandleArrow         = {handleChangeMonth}
                            onHandleContainerType = {(type) => setContainerType(type)}
                        />
                        <Container 
                            propsSelectedDate     = {stateSelectedDate}
                            propsCurrentYear      = {stateCurrentYear}
                            propsCurrentMonth     = {stateCurrentMonth}
                            propsCurrentDay       = {stateCurrentDay}
                            propsRangeYear        = {stateRangeYear}
                            propsContainerType    = {stateContainerType}
                            onHandleSelectedDate  = {onHandleSelectedDate}
                        />
                    </>
            }
            {
                propsMode.includes('time') &&
                    <TimeContainer
                        propsSelectedHour    = {stateCurrentHour}
                        propsSelectedMinute  = {stateCurrentMinute}
                        propsSelectedSecond  = {stateCurrentSecond}
                        onHandleSelectedTime = {onHandleSelectedTime}
                    />
            }
        </CalendarWrapStyle>
    );
}

Calendar.propTypes = {
    propsMode             : PropTypes.array,
    propsDisplay          : PropTypes.bool,
    propsSelectedYear     : PropTypes.number,
    propsSelectedMonth    : PropTypes.number,
    propsSelectedDay      : PropTypes.number,
    propsSelectedHour     : PropTypes.number,
    propsSelectedMinute   : PropTypes.number,
    propsSelectedSecond   : PropTypes.number,
    onHandleSelectedDate  : PropTypes.func,
    onHandleSelectedTime  : PropTypes.func
}

export default Calendar;