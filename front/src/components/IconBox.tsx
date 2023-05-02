import { CSSProperties, ReactElement, useRef, useState } from "react"
import './IconBox.css'

interface proptypes {
    children : ReactElement,
    size? : string,
    bgColor? : string,
    bgColorHover? : string,
    clickable? : boolean,
    onClick? : Function
}

export default function IconBox({ children, size, bgColor, bgColorHover, clickable, onClick = () => {} } : proptypes){
    const [ isHovered , setIsHovered] = useState(false);

    const container = useRef<HTMLDivElement>(null)

    const styles : CSSProperties = {
        width : size,
        height : size,
        cursor : clickable ? 'pointer' : undefined,
        backgroundColor : isHovered ? bgColorHover : bgColor,
    }

    const handleHover = () => setIsHovered(true)
    const handleBlur = () => setIsHovered(false)

    return <div
        className="icon-box"
        style={styles}
        ref={container}
        onMouseEnter={handleHover}
        onMouseLeave={handleBlur}
        onClick={(e) => onClick(e) }
    >
        { children }
    </div>
}