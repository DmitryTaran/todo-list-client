import React, {useState} from 'react';
import cl from './Accordion.module.css'

const Accordion = ({head, body, ...props}) => {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div id="dragging" className={cl.accordionHead} onClick={() => setIsExpanded(!isExpanded)} {...props}>
            {head}
            <div className={isExpanded ? cl.accordionBodyActive : cl.accordionBody}>
                {body}
            </div>
        </div>
    );
};

export default Accordion;