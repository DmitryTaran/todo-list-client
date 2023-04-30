import React from 'react';
import classes from './Form.module.css'

const Form = ({children, ...props}) => {
    return (
        <form
            className={classes.form}
            {...props}
            onSubmit={(e) => e.preventDefault()}
        >
            {children}
        </form>
    );
};

export default Form;