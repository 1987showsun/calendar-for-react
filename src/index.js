/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
import { useState } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

// Modules
import Calendar from "./modules/calendar";

// Data
import strokes from "./strokes.json";

const Index = ({
    propsStrokes = strokes
}) => {

    const [ stateStroks, setStroks ] = useState(propsStrokes);

    return(
        <Calendar 
          mode     = {["date", "time"]}
          local    = {'zh'}
          stroks   = {stateStroks}
          onChange = { stroks => console.log(stroks) }
        />
    );
}

Index.propTypes = {
  propsStrokes: PropTypes.array
}

render(
  <Index />,
  document.getElementById('root')
);