/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useCallback } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import { 
    HeaderWrapStyle, 
    HeaderItemStyle, 
    HeaderActionBtn,
    DateStyle, 
    ArrowStyle 
} from "./style/header";

const Header = ({
    propsToday            = [],
    propsRangeYear        = [],
    propsCurrentYear      = 0,
    propsCurrentMonth     = 0,
    propsContainerType    = "date",
    onHandleArrow         = () => {},
    onHandleSetToday      = () => {},
    onHandleOpenPopup     = () => {},
    onHandleContainerType = () => {},
}) => {

    const complement = useCallback(( val, length=1 ) => {
        const valLength = String(val).length;
        const missingQuantity = length - valLength;
        const valArray = [val];
        for( let i=0 ; i<missingQuantity ; i++ ){
            valArray.unshift('0');
        }
        return valArray.join('');
    },[]);

    return(
        <HeaderWrapStyle>
            <HeaderItemStyle>
                <ArrowStyle 
                    onClick = {onHandleArrow.bind(this, 'prev')}
                    backgroundImage = {"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjQwLjgyMyAyNDAuODIzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDAuODIzIDI0MC44MjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGlkPSJDaGV2cm9uX1JpZ2h0IiBkPSJNNTcuNjMzLDEyOS4wMDdMMTY1LjkzLDIzNy4yNjhjNC43NTIsNC43NCwxMi40NTEsNC43NCwxNy4yMTUsMGM0Ljc1Mi00Ljc0LDQuNzUyLTEyLjQzOSwwLTE3LjE3OQ0KCQlsLTk5LjcwNy05OS42NzFsOTkuNjk1LTk5LjY3MWM0Ljc1Mi00Ljc0LDQuNzUyLTEyLjQzOSwwLTE3LjE5MWMtNC43NTItNC43NC0xMi40NjMtNC43NC0xNy4yMTUsMEw1Ny42MjEsMTExLjgxNg0KCQlDNTIuOTQyLDExNi41MDcsNTIuOTQyLDEyNC4zMjcsNTcuNjMzLDEyOS4wMDd6Ii8+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="}
                />
                <DateStyle>
                    {
                        propsContainerType=='year'?(
                            <>
                                <span>{propsRangeYear[0]}</span>
                                <span>~</span>
                                <span>{propsRangeYear[1]}</span>
                            </>
                        ):(
                            <>
                                <span onClick={onHandleContainerType.bind(this,'year')}>{complement(propsCurrentYear, 4)}</span>
                                <span>/</span>
                                <span onClick={onHandleContainerType.bind(this,'month')}>{complement(propsCurrentMonth, 2)}</span>
                            </>
                        )
                    }
                </DateStyle>
                <ArrowStyle 
                    onClick = {onHandleArrow.bind(this, 'next')}
                    backgroundImage = {"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjQwLjgyMyAyNDAuODIzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDAuODIzIDI0MC44MjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGlkPSJDaGV2cm9uX1JpZ2h0XzFfIiBkPSJNMTgzLjE4OSwxMTEuODE2TDc0Ljg5MiwzLjU1NWMtNC43NTItNC43NC0xMi40NTEtNC43NC0xNy4yMTUsMGMtNC43NTIsNC43NC00Ljc1MiwxMi40MzksMCwxNy4xNzkNCgkJbDk5LjcwNyw5OS42NzFsLTk5LjY5NSw5OS42NzFjLTQuNzUyLDQuNzQtNC43NTIsMTIuNDM5LDAsMTcuMTkxYzQuNzUyLDQuNzQsMTIuNDYzLDQuNzQsMTcuMjE1LDBsMTA4LjI5Ny0xMDguMjYxDQoJCUMxODcuODgxLDEyNC4zMTUsMTg3Ljg4MSwxMTYuNDk1LDE4My4xODksMTExLjgxNnoiLz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"}
                />
            </HeaderItemStyle>
            <HeaderItemStyle>
                <HeaderActionBtn onClick={onHandleContainerType.bind(this,'year')} data-active={propsContainerType=="year"} className="type-btn-action">Year</HeaderActionBtn>
                <HeaderActionBtn onClick={onHandleContainerType.bind(this,'month')} data-active={propsContainerType=="month"} className="type-btn-action">Month</HeaderActionBtn>
                <HeaderActionBtn onClick={onHandleContainerType.bind(this,'date')} data-active={propsContainerType=="date"} className="type-btn-action">Day</HeaderActionBtn>
                <HeaderActionBtn onClick={onHandleSetToday.bind(this)} className="today-btn">Today</HeaderActionBtn>
                <HeaderActionBtn onClick={onHandleOpenPopup.bind(this)}>Add Stroke</HeaderActionBtn>
            </HeaderItemStyle>
        </HeaderWrapStyle>
    );
}

Header.propTypes = {
    propsToday            : PropTypes.array,
    propsRangeYear        : PropTypes.array,
    propsCurrentYear      : PropTypes.number,
    propsCurrentMonth     : PropTypes.number, 
    propsContainerType    : PropTypes.string,
    onHandleArrow         : PropTypes.func,
    onHandleSetToday      : PropTypes.func,
    onHandleOpenPopup     : PropTypes.func,
    onHandleContainerType : PropTypes.func
}

export default Header;