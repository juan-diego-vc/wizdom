import { ReactElement } from "react"
import './IconBox.css'

interface proptypes {
    children : ReactElement
}

export default function IconBox({ children } : proptypes){
    return <div className="icon-box">
        { children }
    </div>
}