import './ElementProperties.css'
import React from 'react'

interface PropTypes{
    selection : React.RefObject<HTMLElement>
}

export default function ElementProperties({ selection } : PropTypes){
    if(selection && selection.current){
        console.log(selection)
    }
    return <div className="element-properties">
        <button>Add</button>
    </div>
}