// import React, { CSSProperties, MouseEventHandler, RefAttributes } from 'react'
// import { forwardRef, ForwardRefExoticComponent } from 'react';

// import { useRef, useEffect } from 'react'

// import Draggable from './Draggable'
// import Resizable from './Resizable';

// interface proptypes {

// }

// type SquareType = ForwardRefExoticComponent< Omit<proptypes, "ref"> & RefAttributes<HTMLDivElement> >

// const Square: SquareType = forwardRef(function Square(props, ref) {
//     const styles: CSSProperties = {
//         cursor: 'se-resize',
//         position: 'absolute',
//         width: '1in',
//         height: '1in',
//         border: '1px solid dodgerblue',
//         color: 'dodgerblue'
//     }

//     return <div style={styles} {...props} ref={ref}></div>
// })

// function DynamicDiv(){
//     const ref = useRef<HTMLDivElement>(null)

//     const styles : CSSProperties = {
//         backgroundColor : 'dodgerblue',
//         width : '2in',
//         height : '2in'
//     }

//     useEffect(() => {
//         const handleDragstart = () => {
//             console.log('dragstart')
//         }
//         const handleDrag = () => {
//             console.log('drag')
//         }
//         const handleDragend = (e : DragEvent) => {
//             console.log('dragend')
//             console.log(e)
//         }

//         ref.current?.addEventListener('dragstart', handleDragstart)
//         ref.current?.addEventListener('drag', handleDrag)
//         ref.current?.addEventListener('dragend', handleDragend)
//     })

//     return <div className="dynamic" ref={ref} style={styles} draggable></div>
// }

// // DraggableResizableDiv.js
// import { useState } from 'react';
// interface Position {
//     x: number;
//     y: number;
//   }
  
//   interface Dimensions {
//     width: number;
//     height: number;
//   }
//   const DraggableResizableDiv: React.FC = () => {
//     const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
//     const [dimensions, setDimensions] = useState<Dimensions>({ width: 200, height: 200 });
//     const [isMoving, setIsMoving] = useState<boolean>(false);
//     const dragDataRef = useRef<{ offsetX: number; offsetY: number }>({ offsetX: 0, offsetY: 0 });
  
//     const onDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
//       setIsMoving(true);
//       dragDataRef.current = { offsetX: e.clientX - position.x, offsetY: e.clientY - position.y };
//       e.dataTransfer.setDragImage(new Image(), 0, 0);
//     };
  
//     const onDrag = (e: React.DragEvent<HTMLDivElement>): void => {
//       if (e.clientX === 0 && e.clientY === 0) return;
//       setPosition({ x: e.clientX - dragDataRef.current.offsetX, y: e.clientY - dragDataRef.current.offsetY });
//     };
  
//     const onDragEnd = (): void => {
//       setIsMoving(false);
//     };
  
//     const onDrop = (e: React.DragEvent<HTMLDivElement>): void => {
//       e.preventDefault();
//       const newWidth = e.clientX - position.x;
//       const newHeight = e.clientY - position.y;
//       setDimensions({ width: newWidth, height: newHeight });
//     };
  
//     return (
//       <div
//         style={{
//           position: 'absolute',
//           left: position.x,
//           top: position.y,
//           width: dimensions.width,
//           height: dimensions.height,
//           border: '1px solid #ccc',
//           background: '#f9f9f9',
//           cursor: isMoving ? 'grabbing' : 'grab',
//         }}
//         draggable
//         onDragStart={onDragStart}
//         onDrag={onDrag}
//         onDragEnd={onDragEnd}
//       >
//         <div
//           style={{
//             position: 'absolute',
//             right: -5,
//             bottom: -5,
//             width: 10,
//             height: 10,
//             background: '#ccc',
//             borderRadius: '50%',
//           }}
//           onDrop={onDrop}
//           onDragOver={(e) => e.preventDefault()}
//         />
//       </div>
//     );
//   };
// export default function App() {
//     const nodeRef = React.useRef<HTMLDivElement>(null);

//     const styles : CSSProperties = {
//         width: '100%',
//         height: '100vh',
//         backgroundColor: 'lightgray',
//         position: 'relative'
//     }

//     return <div style={styles}>
//         {/* <Draggable nodeRef={nodeRef}>
//             <Resizable node={nodeRef}>
//                 <Square ref={nodeRef} />
//             </Resizable>
//         </Draggable> */}
//         <DraggableResizableDiv/>
//     </div>
// }

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableDivProps {
  id: number;
  text: string;
  index: number;
  moveDiv: (fromIndex: number, toIndex: number) => void;
}

const ItemType = "div";

export const DraggableDiv: React.FC<DraggableDivProps> = ({
  id,
  text,
  index,
  moveDiv,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover(item: { id: number; index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveDiv(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  }));

  const ref = useRef<HTMLDivElement>(null);
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: isDragging ? "dodgerblue" : "red",
        cursor: "grab",
      }}
    >
      {text}
    </div>
  );
};