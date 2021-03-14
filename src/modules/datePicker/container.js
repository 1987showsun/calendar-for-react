/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import toArray from 'dayjs/plugin/toArray';

// Stylesheets
import {
    YearItemStyle,
    ContainerWrapStyle,
    MonthItemStyle,
    DaysWrapStyle,
    DaysTitleItemStyle,
    DaysItemStyle,
    DateStyle,
    MarkStyle
} from "./stylesheets/style";

const YearContainer = ({
    propsCurrentYear   = 0,
    propsRangeYear     = [],
    onHandleSetYear    = () => {},
}) => {
    const renderYearRange = useCallback(() => {
        const yearArray = [];
        const startYaer = propsRangeYear[0];
        const endYear   = propsRangeYear[1];
        for( let i=startYaer ; i<=endYear ; i++ ){
            yearArray.push(i);
        }
        return yearArray.map(item => (
            <YearItemStyle  
                key              = {item}
                onClick          = {onHandleSetYear.bind(this, item)}
                data-selected    = {dayjs(`${propsCurrentYear}`).format('YYYY')===String(item)}
                data-current     = {dayjs().format('YYYY')===String(item)}
            >
                {item}
                {
                    dayjs().format('YYYY')===String(item) && 
                        <MarkStyle className= "mark" />
                }
            </YearItemStyle>
        ));
    },[propsRangeYear]);

    return (
        <DaysWrapStyle>
            {renderYearRange()}
        </DaysWrapStyle>
    );
}

const MonthContainer = ({
    propsCurrentYear   = 0,
    propsCurrentMonth  = 0,
    onHandleSetMonth   = () => {}
}) => {

    const Month = {
        "en": ["January","February","March","April","May","June","July","August","September","October","November","December"],
        "zh": ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
    }

    return (
        <DaysWrapStyle>
            { Month['en'].map((item, i) => (
                <MonthItemStyle
                    key            = {item}
                    data-selected  = {dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).format('YYYY/MM')===dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM')}
                    data-current   = {dayjs().format('YYYY/MM')===dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM')}
                    onClick        = {onHandleSetMonth.bind(this, i)}
                >
                    {item}
                    {
                        dayjs().format('YYYY/MM')===dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM') && 
                            <MarkStyle className="mark" />
                    }
                </MonthItemStyle>
            ))}
        </DaysWrapStyle>
    );
}

const DateContainer = ({
    propsCurrentYear       = 0,
    propsCurrentMonth      = 0,
    propsCurrentDay        = 0,
    propsSelectedDate      = [],
    onHandleSelectedDate   = () => {}
}) => {

    const renderCurrentDates = useCallback(() => {

        dayjs.extend(toArray);
        const prevTotalDays    = dayjs(`${propsCurrentYear}/${propsCurrentMonth-1}`).daysInMonth();
        const currentTotalDays = dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).daysInMonth();
        const prevEndDate      = Number(dayjs(`${propsCurrentYear}/${propsCurrentMonth-1}`).endOf('month').format('d'));
        const nextStartDate    = Number(dayjs(`${propsCurrentYear}/${propsCurrentMonth+1}`).startOf('month').format('d'));
        const loopDate         = (start, end, {yyyy, mm}) => {
            const array = [];
            for( let i=start ; i<=end ; i++ ){
                array.push( dayjs(`${yyyy}/${mm}/${i}`).format('YYYY/MM/DD') );
            }

            return array;
        }

        return [ 
            ...loopDate( (prevTotalDays-prevEndDate), prevTotalDays, { yyyy: propsCurrentYear, mm: propsCurrentMonth-1 } ),
            ...loopDate( 1, currentTotalDays, { yyyy: propsCurrentYear, mm: propsCurrentMonth } ),
            ...loopDate( 1, (7-nextStartDate), { yyyy: propsCurrentYear, mm: propsCurrentMonth+1 } )
        ].map( item => {
            return (
                <DaysItemStyle 
                    key           = {item}
                    data-istoday  = {dayjs().format('YYYY/MM/DD')===item}
                    data-selected = {dayjs(`${propsSelectedDate[0]}/${propsSelectedDate[1]+1}/${propsSelectedDate[2]}`).format('YYYY/MM/DD')===dayjs(item).format('YYYY/MM/DD')}
                    data-current  = {dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).format('YYYY/MM')===dayjs(item).format('YYYY/MM')}
                    onClick       = {onHandleSelectedDate.bind(this, dayjs(item).toArray())}
                >
                    <DateStyle className="date-set">{dayjs(item).format('DD')}</DateStyle>
                </DaysItemStyle>
            );
        });
    },[propsCurrentYear, propsCurrentMonth, propsCurrentDay]);

    return (
        <DaysWrapStyle>
            {renderCurrentDates()}
        </DaysWrapStyle>
    );
}

const DayContainer = () => {

    const dayTitle = {
        en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        zh: ["日","一","二","三","四","五","六"]
    }

    return(
        <DaysWrapStyle>
            { dayTitle['en'].map( item => <DaysTitleItemStyle key={item}>{item}</DaysTitleItemStyle>) }
        </DaysWrapStyle>
    );
}

const Container = ({
    propsToday            = [],
    propsRangeYear        = [],
    propsSelectedDate     = [],
    propsContainerType    = "date",
    propsCurrentYear      = 0,
    propsCurrentMonth     = 0,
    propsCurrentDay       = 0,
    onHandleSetYear       = () => {},
    onHandleSetMonth      = () => {},
    onHandleSelectedDate  = () => {},
    onHandleSelectedStroke= () => {}
}) => {

    const selectRenderView = useCallback(() => {
        switch( propsContainerType ){
            case "year":
                return (
                    <YearContainer 
                        propsRangeYear         = {propsRangeYear}
                        propsCurrentYear       = {propsCurrentYear}
                        propsCurrentMonth      = {propsCurrentMonth}
                        onHandleSetYear        = {onHandleSetYear}
                    />
                );

            case "month":
                return (
                    <MonthContainer 
                        propsCurrentYear       = {propsCurrentYear}
                        propsCurrentMonth      = {propsCurrentMonth}
                        onHandleSetMonth       = {onHandleSetMonth}
                    />
                );
            
            default:
                return (
                    <>
                        <DayContainer />
                        <DateContainer
                            propsToday             = {propsToday}
                            propsSelectedDate      = {propsSelectedDate}
                            propsCurrentYear       = {propsCurrentYear}
                            propsCurrentMonth      = {propsCurrentMonth}
                            propsCurrentDay        = {propsCurrentDay}
                            onHandleSelectedStroke = {onHandleSelectedStroke}
                            onHandleSelectedDate   = {onHandleSelectedDate}
                        />
                    </>
                );
        }
    },[propsContainerType, propsRangeYear, propsCurrentYear, propsCurrentMonth]);

    return (
        <ContainerWrapStyle>
            {selectRenderView()}
        </ContainerWrapStyle>
    );
}

Container.prototype = {
    propsContainerType     : PropTypes.string,
    propsCurrentYear       : PropTypes.number,
    propsCurrentMonth      : PropTypes.number,
    propsCurrentDay        : PropTypes.number,
    propsRangeYear         : PropTypes.array,
    propsSelectedDate      : PropTypes.array,
    onHandleSetYear        : PropTypes.func,
    onHandleSetMonth       : PropTypes.func,
    onHandleSelectedDate   : PropTypes.func,
    onHandleSelectedStroke : PropTypes.func
}

export default Container;