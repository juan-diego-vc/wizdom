import './PaperSheet.css'
import { useRef, useEffect, useState } from 'react'

export default function PaperSheet(){
    const sheetRef = useRef<HTMLDivElement>(null)
    const focus = useRef<boolean>(false)

    const handleClick = () => {
        // alert('changing the focus')
        if(focus.current){
            sheetRef.current?.classList.add('focus')
            focus.current = false
        }else{
            sheetRef.current?.classList.remove('focus')
            focus.current = true
        }
    }

    useEffect(() => {
        if(sheetRef.current !== null){
            sheetRef.current.addEventListener('click', handleClick)
        }
    }, [])
    return <div className="paper-sheet" ref={sheetRef}></div>
}