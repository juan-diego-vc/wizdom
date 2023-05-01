import { MouseEvent, CSSProperties } from 'react';
import './node.css'
import './Text.css'

interface Box{
    x : number
    y : number
    width : number
    height : number
}

interface Proptypes {
    text : string,
    shape : Box,
    onClick : ( e : MouseEvent<HTMLElement>) => void,
    style : CSSProperties
}

function Text({ text, onClick, style } : Proptypes){
  return (
    <p draggable onClick={onClick} className='text-node node' style={style}>{text}</p>
  );
};

export default Text;