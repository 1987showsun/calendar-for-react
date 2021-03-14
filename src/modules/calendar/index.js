/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Components
import Header from "./header";
import Container from "./container";
import Form from '../../components/form';

// Modules
import Popup from "../popup";

// Stylesheets
import { CalendarWrapStyle } from "./style";

const garbled = (len = 16) => {
  let $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let maxPos = $chars.length;
  let pwd = [];
  for (let i = 0; i < len; i++) {
    pwd = [...pwd, $chars.charAt(Math.floor(Math.random() * maxPos))];
  }
  return pwd.join("");
};

const Index = ({
  mode     = [],
  stroks   = [],
  local    = 'zh',
  onChange = () => {}
}) => {

  const today = [ Number(dayjs().format('YYYY')), Number(dayjs().format('MM')), Number(dayjs().format('DD')) ];
  const [ stateStroks       , setStroks        ] = useState( [] );
  const [ stateFormType     , setFormType      ] = useState( null );
  const [ statePopupDisplay , setPopupDisplay  ] = useState( false );
  const [ stateCurrentYear  , setCurrentYear   ] = useState( today[0] );
  const [ stateCurrentMonth , setCurrentMonth  ] = useState( today[1] );
  const [ stateRangeYear    , setRangeYear     ] = useState( [ today[0]-7, today[0]+7 ] );
  const [ stateContainerType, setContainerType ] = useState('date');
  const [ stateSelectedStrok, setSelectedStrok ] = useState( {} );

  const handleChangeMonth = (type) => {

    if( stateContainerType=="year" ){
      let val = stateRangeYear;
      val = type=="prev"? [ val[0]-15, val[1]-15 ]:[ val[0]+15, val[1]+15 ];
      setRangeYear( val );
    }else{
      let val = stateContainerType=="month"? stateCurrentYear:stateCurrentMonth;
      val = type=="prev"? val-1:val+1;
      if( stateContainerType=="month" ){
        setCurrentYear( Number(dayjs(`${val}/${stateCurrentMonth}`).format('YYYY')) );
      }else{
        setCurrentYear( Number(dayjs(`${stateCurrentYear}/${val}`).format('YYYY')) );
        setCurrentMonth( Number(dayjs(`${stateCurrentYear}/${val}`).format('MM')) );
      }
    }
  };

  const handleStrok = ( formObj ) => {
    let stroks = [];
    if( stateFormType=='add' ){
      stroks = [...stateStroks, { ...formObj, strok_id: garbled(128) }];
    }else if( stateFormType=='update' ){
      stroks = stateStroks.map( item => ( item.strok_id==formObj.strok_id? formObj:item));
    }
    onChange({
      actionType      : stateFormType,
      [stateFormType] : formObj,
      stroks          : stroks
    });
    setStroks(stroks);
    setPopupDisplay(false);
  }

  useEffect(() => {
    setRangeYear([ stateCurrentYear-7, stateCurrentYear+7 ]);
  },[stateCurrentYear]);

  useEffect(() => {
    setStroks(stroks.map( item => ({ ...item, strok_id: garbled(128) })));
  },[stroks]);

  return(
    <>
      <CalendarWrapStyle>
        <Header
          propsToday            = {today}
          propsRangeYear        = {stateRangeYear}
          propsCurrentYear      = {stateCurrentYear}
          propsCurrentMonth     = {stateCurrentMonth}
          propsContainerType    = {stateContainerType}
          onHandleArrow         = {handleChangeMonth}
          onHandleSetToday      = {() => {
            setCurrentYear(Number(dayjs().format('YYYY')));
            setCurrentMonth(Number(dayjs().format('MM')));
            setContainerType('date');
          }}
          onHandleOpenPopup     = {() => {
            setFormType('add');
            setSelectedStrok({});
            setPopupDisplay(true)
          }}
          onHandleContainerType = {(type) => setContainerType(type)}
        />
        <Container 
          propsLocal            = {local}
          propsToday            = {today}
          propsStrokes          = {stateStroks}
          propsRangeYear        = {stateRangeYear}
          propsContainerType    = {stateContainerType}
          propsCurrentYear      = {stateCurrentYear}
          propsCurrentMonth     = {stateCurrentMonth}
          onHandleContainerType = {(type) => setContainerType(type)}
          onHandleSetYear       = {(val) => {
            setCurrentYear(val);
            setContainerType('month');
          }}
          onHandleSetMonth      = {(val)  => {
            setCurrentMonth(val);
            setContainerType('date');
          }}
          onHandleSelectedStrok = {(selectItem) => {
            setFormType('update');
            setPopupDisplay(true);
            setSelectedStrok(selectItem);
          }}
        />
      </CalendarWrapStyle>

      <Popup 
        propsPadding         = {10}
        propsDisplay         = {statePopupDisplay}
        onHandleOpenPopup    = {(status) => setPopupDisplay(status)}
      >
        <Form 
          mode               = { mode }
          defaultStrok       = { stateSelectedStrok }
          onHandleSubmit     = { handleStrok.bind(this) }
        />
      </Popup>
    </>
  );
}

Index.propTypes = {
  mode     : PropTypes.array,
  stroks   : PropTypes.array,
  local    : PropTypes.string,
  onChange : PropTypes.func
}

export default Index;