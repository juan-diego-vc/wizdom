import { CSSProperties, ReactElement, useRef, useState } from "react"
import './IconBox.css'

interface proptypes {
    children : ReactElement,
    size? : string,
    bgColor? : string,
    bgColorHover? : string,
    clickable? : boolean
}

export default function IconBox({ children, size, bgColor, bgColorHover, clickable } : proptypes){
    const [ isHovered , setIsHovered] = useState(false);

    const container = useRef<HTMLDivElement>(null)

    const styles : CSSProperties = {
        width : size,
        height : size,
        backgroundColor : isHovered ? bgColorHover : bgColor,
        cursor : clickable ? 'pointer' : undefined
    }

    const handleHover = () => setIsHovered(true)
    const handleBlur = () => setIsHovered(false)

    return <div
        className="icon-box"
        style={styles}
        ref={container}
        onMouseEnter={handleHover}
        onMouseLeave={handleBlur}
    >
        { children }
    </div>
}