import React from 'react';
import cl from './checkBox.module.css'
import {BsCheckLg, RxCross2} from "react-icons/all.js";

const CheckBox = ({isCompleted, isFailed, setIsCompleted, update}) => {
    return (
        <div
            className={isFailed && !isCompleted ? `${cl.failed} ${cl.checkbox}` : cl.checkbox}
            onClick={(e) => {
                e.stopPropagation()
                update()
                setIsCompleted(!isCompleted)
            }}>
            {isCompleted &&
                <BsCheckLg size={35} color={'green'}/>
            }
            {isFailed && !isCompleted &&
                <RxCross2 size={35} color={'red'}/>
            }
        </div>
    );
};

export default CheckBox;