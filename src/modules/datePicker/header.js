/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// Stylesheets
import { 
    HeaderStyle,
    CalendarArrowStyle
} from "./stylesheets/style";

const Header = ({
    propsCurrentYear      = 0,
    propsCurrentMonth     = 0,
    onHandleArrow         = () => {},
    onHandleContainerType = () => {}
}) => {
    return(
        <HeaderStyle>
            <CalendarArrowStyle
                type    = "button"
                image   = {"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjQwLjgyMyAyNDAuODIzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDAuODIzIDI0MC44MjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGlkPSJDaGV2cm9uX1JpZ2h0IiBkPSJNNTcuNjMzLDEyOS4wMDdMMTY1LjkzLDIzNy4yNjhjNC43NTIsNC43NCwxMi40NTEsNC43NCwxNy4yMTUsMGM0Ljc1Mi00Ljc0LDQuNzUyLTEyLjQzOSwwLTE3LjE3OQ0KCQlsLTk5LjcwNy05OS42NzFsOTkuNjk1LTk5LjY3MWM0Ljc1Mi00Ljc0LDQuNzUyLTEyLjQzOSwwLTE3LjE5MWMtNC43NTItNC43NC0xMi40NjMtNC43NC0xNy4yMTUsMEw1Ny42MjEsMTExLjgxNg0KCQlDNTIuOTQyLDExNi41MDcsNTIuOTQyLDEyNC4zMjcsNTcuNjMzLDEyOS4wMDd6Ii8+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="}
                onClick = {onHandleArrow.bind(this, 'prev')}
            />
            <div className="show-current-date">
                <span onClick={onHandleContainerType.bind(this,'year')}>{dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).format('YYYY')}</span>
                <span>/</span>
                <span onClick={onHandleContainerType.bind(this,'year')}>{dayjs(`${propsCurrentYear}/${propsCurrentMonth}`).format('MM')}</span>
            </div>
            <CalendarArrowStyle 
                type    = "button"
                image   = {"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjQwLjgyMyAyNDAuODIzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDAuODIzIDI0MC44MjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGlkPSJDaGV2cm9uX1JpZ2h0XzFfIiBkPSJNMTgzLjE4OSwxMTEuODE2TDc0Ljg5MiwzLjU1NWMtNC43NTItNC43NC0xMi40NTEtNC43NC0xNy4yMTUsMGMtNC43NTIsNC43NC00Ljc1MiwxMi40MzksMCwxNy4xNzkNCgkJbDk5LjcwNyw5OS42NzFsLTk5LjY5NSw5OS42NzFjLTQuNzUyLDQuNzQtNC43NTIsMTIuNDM5LDAsMTcuMTkxYzQuNzUyLDQuNzQsMTIuNDYzLDQuNzQsMTcuMjE1LDBsMTA4LjI5Ny0xMDguMjYxDQoJCUMxODcuODgxLDEyNC4zMTUsMTg3Ljg4MSwxMTYuNDk1LDE4My4xODksMTExLjgxNnoiLz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCgk8Zz4NCgk8L2c+DQoJPGc+DQoJPC9nPg0KCTxnPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"}
                onClick = {onHandleArrow.bind(this, 'next')}
            />
        </HeaderStyle>
    );
}

Header.prototype = {
    propsCurrentYear      : PropTypes.number,
    propsCurrentMonth     : PropTypes.number,
    onHandleArrow         : PropTypes.func,
    onHandleContainerType : PropTypes.func
}

export default Header;