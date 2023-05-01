import React, { ReactNode, useEffect, useRef, CSSProperties } from 'react'

import './Resizable.css'

interface Proptypes{
    children : ReactNode,
    node : React.RefObject<HTMLDivElement>
}

class Vec{
    x : number = -1
    y : number = -1

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(vector : Vec) : Vec{
        return new Vec(this.x + vector.x, this.y + vector.y)
    }

    sub(vector : Vec) : Vec{
        return new Vec(this.x - vector.x, this.y - vector.y)
    }

    mutAdd(vector : Vec) : void {
        this.x += vector.x
        this.y += vector.y
    }

    static from(e : MouseEvent) : Vec {
        return new Vec(e.clientX, e.clientY)
    }
}

class Box {

    left : number = 0
    top : number = 0
    width : number = 0
    height : number = 0
    outerLeft : number = 0
    outerTop : number = 0
    element : HTMLElement | null = null

    constructor(element? : HTMLElement) {
        if(element !== undefined){
            this.element = element
            const { left, top, width, height } = element.getBoundingClientRect()
            this.left = left
            this.top = top
            this.width = width
            this.height = height
            this.outerTop = top + height
            this.outerLeft = left + width
        }
    }

    static fromRef(element : HTMLElement | null) : Box {
        if(element === null){
            return new Box()
        }else{
            return new Box(element)
        }
    }
}

export default function Resizable({ children, node } : Proptypes){
    const dotRef = useRef<HTMLDivElement>(null)
    const isResizing = useRef<boolean>(false)
    const resizeInitClick = useRef(new Vec(-1, -1))
    const resizeInitCorner = useRef<Vec>(new Vec(-1, -1))

    useEffect(() => {

        const handleMousedown = (e : MouseEvent) => {
            e.stopPropagation()
            console.log('handleMousedown')
            isResizing.current = true

            resizeInitClick.current = Vec.from(e)

            if(node.current){
                let box = Box.fromRef(node.current)
                resizeInitCorner.current = new Vec(box.outerLeft, box.outerTop)
                node.current.style.backgroundColor = 'lightgreen'
            }
        }

        const handleMousemove = (e : MouseEvent) => {
            e.stopPropagation()
            console.log('handleMousemove')
            let box = Box.fromRef(node.current)
            let move = Vec.from(e).sub(resizeInitClick.current)

            if(isResizing.current && node.current && dotRef.current){
                // resizeInitCorner.current.x + move.x  esto dice donde estará la nueva esquina de la div
                node.current.style.width = `${resizeInitCorner.current.x + move.x - box.left}px`
                node.current.style.height = `${resizeInitCorner.current.y + move.y - box.top}px`

                dotRef.current.style.left = `${box.outerLeft + 5}px`
                dotRef.current.style.top = `${box.outerTop + 5}px`
            }
        }

        const handleMouseup = (e : MouseEvent) => {
            e.stopPropagation()
            console.log('handleMouseup')
            isResizing.current = false
            if(node.current){
                node.current.style.backgroundColor = 'lightgrey'
                let box = Box.fromRef(node.current)
                if(dotRef.current){
                    dotRef.current.style.left = `${box.outerLeft + 5}px`
                    dotRef.current.style.top = `${box.outerTop + 5}px`
                }
            }
        }

        dotRef.current?.addEventListener('mousedown', handleMousedown)
        document.addEventListener('mousemove', handleMousemove)
        document.addEventListener('mouseup', handleMouseup)
    
        const initialBox = Box.fromRef(node.current)
        console.log('initialBox', initialBox)
    
        if(dotRef.current){
            dotRef.current.style.left = `${initialBox.left + initialBox.width + 5}px`
            dotRef.current.style.top = `${initialBox.top + initialBox.height + 5}px`
        }

        return () => {
            dotRef.current?.removeEventListener('mousedown', handleMousedown)
            document.removeEventListener('mousemove', handleMousemove)
            document.removeEventListener('mouseup', handleMouseup)
        }
    }, [])

    return <>{children}<div className='resize' ref={dotRef}></div></>
}