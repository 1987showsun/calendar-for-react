/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Stylesheets
import { 
    MarkStyle,
    ContainerWrapStyle, 
    DaysWrapStyle, 
    DaysTitleItemStyle,
    YearItemStyle,
    MonthItemStyle,
    DaysItemStyle, 
    DateStyle, 
    DaysStrokeItem,
    StrokeSort,
    StrokeTitle,
    StrokeContainerStyle
} from "./style/container";

const YearContainer = ({
    propsColor         = "",
    propsCurrentYear   = 0,
    propsStrokes       = [],
    propsRangeYear     = [],
    onHandleSetYear    = () => {}
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
                propsColor       = {propsColor}
                onClick          = {onHandleSetYear.bind(this, item)}
                data-selected    = {dayjs(`${propsCurrentYear}`).format('YYYY')===String(item)}
                data-current     = {dayjs().format('YYYY')===String(item)}
            >
                {item}
                {
                    propsStrokes.some(strokeItem => (
                        dayjs(strokeItem.start).format('YYYY')==String(item) || dayjs(strokeItem.end).format('YYYY')==String(item)
                    )) &&
                        <MarkStyle className="have-stroke"/>
                }
                { dayjs().format('YYYY')===String(item) && <MarkStyle className="current-set"/> }
            </YearItemStyle>
        ));
    },[propsStrokes, propsRangeYear]);

    return (
        <DaysWrapStyle>
            {renderYearRange()}
        </DaysWrapStyle>
    );
}

const MonthContainer = ({
    propsColor         = "",
    propsStrokes       = [],
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
                    key              = {item}
                    propsColor       = {propsColor}
                    data-selected    = {dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).format('YYYY/MM')===dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM')}
                    data-current     = {dayjs().format('YYYY/MM')===dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM')}
                    onClick          = {onHandleSetMonth.bind(this, i+1)}
                >
                    {item}
                    {
                        propsStrokes.some(strokeItem => {
                            const { start, end } = strokeItem;
                            return (dayjs(start).format('YYYY/MM')==dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM') || dayjs(end).format('YYYY/MM')==dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM'))? true:false;

                        }) &&
                            <MarkStyle className="have-stroke"/>
                    }
                    { dayjs().format('YYYY/MM')===dayjs(`${propsCurrentYear}/${i+1}`).format('YYYY/MM') && <MarkStyle className="current-set"/> }
                </MonthItemStyle>
            ))}
        </DaysWrapStyle>
    );
}

const DateContainer = ({
    propsColor             = "",
    propsStrokes           = [],
    propsCurrentYear       = 0,
    propsCurrentMonth      = 0,
    onHandleSelectedStrok  = () => {}
}) => {

    const renderCurrentDates = useCallback(() => {

        const prevTotalDays    = dayjs(`${propsCurrentYear}/${propsCurrentMonth-1}`).daysInMonth();
        const currentTotalDays = dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).daysInMonth();
        const prevEndDate      = Number(dayjs(`${propsCurrentYear}/${propsCurrentMonth-1}`).endOf('month').format('d'));
        const nextStartDate    = Number(dayjs(`${propsCurrentYear}/${propsCurrentMonth+1}`).startOf('month').format('d'));
        const loopDate         = (start, end, {yyyy, mm, dd}) => {
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
            const currentMonthStroke = propsStrokes.filter( strokeItem => {
                const { start, end } = strokeItem;
                const dayStartToMs   = dayjs(`${item} 00:00`).valueOf();
                const dayEndToMs     = dayjs(`${item} 24:00`).valueOf();
                if( end>=dayStartToMs && start<=dayEndToMs ){
                    return strokeItem;
                }
            });
            return (
                <DaysItemStyle 
                    key         = {item}
                    propsColor  = {propsColor}
                    data-active = {dayjs().format('YYYY/MM/DD')===item}
                    data-current= {dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).format('YYYY/MM')===dayjs(item).format('YYYY/MM')}
                >
                    <DateStyle className="date-set">{dayjs(item).format('DD')}</DateStyle>
                    <StrokeContainer 
                        propsStrokes           = {currentMonthStroke}
                        onHandleSelectedStrok  = {onHandleSelectedStrok}
                    />
                </DaysItemStyle>
            );
        });
    },[propsStrokes, propsCurrentYear, propsCurrentMonth]);

    return (
        <DaysWrapStyle>
            {renderCurrentDates()}
        </DaysWrapStyle>
    );
}

const StrokeContainer = ({
    propsStrokes           = [],
    onHandleSelectedStrok  = () => {}
}) => {
    return (
        <StrokeContainerStyle>
            {
                propsStrokes.map((item, i) => {
                    const { strok_id="", title="" } = item;
                    return(
                        <DaysStrokeItem 
                            key     = {strok_id}
                            onClick = {onHandleSelectedStrok.bind(this, item)}
                        >
                            <StrokeSort>{i+1}</StrokeSort>
                            <StrokeTitle>{title}</StrokeTitle>
                        </DaysStrokeItem>
                    );
                })
            }
        </StrokeContainerStyle>
    );
}

const DayContainer = ({
    propsLocal   = "zh"
}) => {

    const dayTitle = {
        en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        zh: ["日","一","二","三","四","五","六"]
    }

    return(
        <DaysWrapStyle>
            { dayTitle[propsLocal].map( item => <DaysTitleItemStyle key={item}>{item}</DaysTitleItemStyle>) }
        </DaysWrapStyle>
    );
}

const Container = ({
    propsColor            = "",
    propsLocal            = "zh",
    propsToday            = [],
    propsStrokes          = [],
    propsRangeYear        = [],
    propsContainerType    = "date",
    propsCurrentYear      = 0,
    propsCurrentMonth     = 0,
    onHandleSetYear       = () => {},
    onHandleSetMonth      = () => {},
    onHandleContainerType = () => {},
    onHandleSelectedStrok = () => {}
}) => {
    const [ stateStroks, setStroks ] = useState([]);
    const selectRenderView = useCallback(() => {
        switch( propsContainerType ){
            case "year":
                return (
                    <YearContainer 
                        propsColor             = {propsColor}
                        propsStrokes           = {stateStroks}
                        propsRangeYear         = {propsRangeYear}
                        propsCurrentYear       = {propsCurrentYear}
                        propsCurrentMonth      = {propsCurrentMonth}
                        onHandleSetYear        = {onHandleSetYear}
                    />
                );

            case "month":
                return (
                    <MonthContainer 
                        propsColor             = {propsColor}
                        propsStrokes           = {stateStroks}
                        propsCurrentYear       = {propsCurrentYear}
                        propsCurrentMonth      = {propsCurrentMonth}
                        onHandleSetMonth       = {onHandleSetMonth}
                    />
                );
            
            default:
                return (
                    <>
                        <DayContainer 
                            propsLocal             = {propsLocal}
                        />
                        <DateContainer
                            propsColor             = {propsColor}
                            propsToday             = {propsToday}
                            propsStrokes           = {stateStroks}
                            propsCurrentYear       = {propsCurrentYear}
                            propsCurrentMonth      = {propsCurrentMonth}
                            onHandleSelectedStrok  = {onHandleSelectedStrok}
                        />
                    </>
                );
        }
    },[propsContainerType, propsRangeYear, propsCurrentYear, propsCurrentMonth, stateStroks]);

    useEffect(() => {
        setStroks(propsStrokes);
    },[propsStrokes]);

    return(
        <ContainerWrapStyle>
            {selectRenderView()}
        </ContainerWrapStyle>
    );
}

Container.propTypes = {
    propsColor            : PropTypes.string,
    propsToday            : PropTypes.array,
    propsStrokes          : PropTypes.array,
    propsRangeYear        : PropTypes.array,
    propsCurrentYear      : PropTypes.number,
    propsCurrentMonth     : PropTypes.number,
    propsLocal            : PropTypes.string,
    propsContainerType    : PropTypes.string,
    onHandleSetMonth      : PropTypes.func,
    onHandleContainerType : PropTypes.func,
    onHandleSelectedStrok : PropTypes.func
}

export default Container;