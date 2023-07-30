import React from 'react';
import cl from './DatePicker.module.css'

const DatePicker = ({...props}) => {
    return (
        <input type="date" className={cl.input} {...props}/>
    );
};

export default DatePicker;