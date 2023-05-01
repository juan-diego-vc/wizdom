import './Group.css'
import './node.css'
import React, { MouseEvent, CSSProperties, useRef } from 'react';

import Draggable from 'react-draggable';


interface Box{
    x : number
    y : number
    width : number
    height : number
}

interface Proptypes {
    children: React.ReactNode,
    shape : Box,
    onClick : ( e : MouseEvent<HTMLElement>) => void,
    style : CSSProperties
}

function Group({ children, onClick, style }: Proptypes) {

    const nodeRef = useRef(null)

    return (
        <Draggable nodeRef={nodeRef}>
            <div className='group node' draggable onClick={onClick} style = {style} ref={nodeRef}>
                {children}
            </div>
        </Draggable>
    );
};

export default Group;