import React, { ReactNode, useEffect, useRef } from 'react'

interface Proptypes{
    children : ReactNode,
    nodeRef : React.RefObject<HTMLDivElement>
}

export default function Draggable({ children, nodeRef } : Proptypes){
    const isMoving = useRef<boolean>(false)
    const x0 = useRef<number>(0)
    const y0 = useRef<number>(0)
    const lx = useRef<number>(0)
    const ly = useRef<number>(0)
    const left0 = useRef<number>(0)
    const top0 = useRef<number>(0)


    useEffect(() => {

        const handleMousedown = (e : MouseEvent) => {
            // console.log('handleMousedown()')
            e.stopPropagation()
            isMoving.current = true
            x0.current = e.clientX
            y0.current = e.clientY
            if(!nodeRef || !nodeRef.current) return
            left0.current = nodeRef.current.getBoundingClientRect().left
            top0.current = nodeRef.current.getBoundingClientRect().top
        }

        const handleMousemove = (e : MouseEvent) => {
            // console.log('handleMousemove()')
            e.stopPropagation()
            if(isMoving.current === true && nodeRef.current){
                // console.log(`${left0.current + e.clientX - x0.current}px`, `${top0.current + e.clientY - y0.current}px`)
                nodeRef.current.style.left = `${left0.current + e.clientX - x0.current}px`
                nodeRef.current.style.top = `${top0.current + e.clientY - y0.current}px`
                nodeRef.current.style.cursor = 'grabbing'
            }
        }

        const handleMouseup = (e : MouseEvent) => {
            // console.log('handleMouseup()')
            e.stopPropagation()
            isMoving.current = false
            if(nodeRef.current){
                nodeRef.current.style.cursor = 'grab'
                console.log(nodeRef.current.getBoundingClientRect().left, nodeRef.current.getBoundingClientRect().top)
            }
            // lx.current = e.clientX
            // ly.current = e.clientY
        }

        nodeRef.current?.addEventListener('mousedown', handleMousedown)
        document.addEventListener('mousemove', handleMousemove)
        nodeRef.current?.addEventListener('mouseup', handleMouseup)

        return () => {
            nodeRef.current?.removeEventListener('mousedown', handleMousedown)
            document.removeEventListener('mousemove', handleMousemove)
            nodeRef.current?.removeEventListener('mousedown', handleMouseup)
        }
    }, [])

    return <>{children}</>
}