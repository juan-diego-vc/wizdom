import { useState, DragEvent, useRef, ReactElement, CSSProperties, ChangeEvent, FormEventHandler } from "react";
import "./ItemsList.css";

import { MdOutlineDragIndicator } from 'react-icons/md'
import { BsPlusLg, BsThreeDotsVertical } from 'react-icons/bs'
import IconBox from "./IconBox";

interface DraggableItemProps {
  id: number;
  content: ReactElement;
  onDragStart: Function;
  onDragOver: Function;
  onDrop: Function;
  onDragLeave: Function;
}

interface Item {
  id: number;
  content: string;
}

interface DraggableHandleProps {
  onDragStart : Function
}

const DraggableHandle = ({ onDragStart } : DraggableHandleProps) => {
  return <div
    draggable
    onDragStart={ (e) => onDragStart(e) }
    className="draggable-handle"
  >
    <IconBox bgColorHover="#333333" size="1.75rem">
      <MdOutlineDragIndicator/>
    </IconBox>
  </div>;
};

const DraggableItem = ({ id, content, onDragOver, onDrop, onDragLeave, onDragStart } : DraggableItemProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null)

  const handleDragStart = (e : DragEvent) => {
    e.stopPropagation();
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setDragImage(itemRef.current, offsetX, offsetY);
    }
    onDragStart(e, id);
  };

  return (
    <div
      ref={itemRef}
      onDragOver={(e) => onDragOver(e, id)}
      onDrop={(e) => onDrop(e, id)}
      onDragLeave={(e) => onDragLeave(e)}
      className="draggable-item"
    >
      <div className="space">
        {content}
      </div>
      <div className="options">
        <DraggableHandle onDragStart={handleDragStart} />
        <IconBox size="1.75rem" bgColorHover="#333333" clickable={true}>
          <BsPlusLg/>
        </IconBox>
        <IconBox size="1.75rem" bgColorHover="#333333" clickable={true}>
          <BsThreeDotsVertical/>
        </IconBox>
      </div>
    </div>
  );
};

const ItemsList = () => {
  const [items, setItems]: [Item[], Function] = useState([
    { id: 1, content: "Texto random generado solo para ejemplificar como funciona el componente en el cual se almacenará el texto" },
    { id: 2, content: "Otro texto de muestra para la lista" },
    { id: 3, content: "Item 3" },
    { id: 4, content: "Item 4" },
    { id: 5, content: "Item 5" },
  ]);

  const [draggedItemId, setDraggedItemId]: [number | null, Function] = useState(null);
  const [targetItemId, setTargetItemId]: [number | null, Function] = useState(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedItemId(id);
  };

  const handleDragOver = (e: DragEvent, id: number) => {
    e.preventDefault();
    setTargetItemId(id);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setTargetItemId(null);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (draggedItemId === null || targetItemId === null) return;

    const draggedIndex = items.findIndex((item) => item.id === draggedItemId);
    const targetIndex = items.findIndex((item) => item.id === targetItemId);

    if (draggedIndex === targetIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    setItems(newItems);
    setDraggedItemId(null);
    setTargetItemId(null);
  };

  const updateComponent = (id : number, changes : Object) => {
    const updatedItems = items.map(item =>
      item.id === id ? {...item, content : changes} : item
    )
    setItems(updatedItems)
  }

  return (
    <div className="draggable-column">
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          content={ <TextComponent content={item.content} onInput={(changes : Object) => updateComponent(item.id, changes) } /> }
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        />
      ))}
    </div>
  );
};


interface TextComponentProps{
  content : string,
  onInput : Function
}

function TextComponent({ content, onInput } : TextComponentProps){
  // const [contentState, setContentState] : [string, Function] = useState(content)
  const contentState = useRef(content)

  const handleInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    // setContentState(target.innerText)
    contentState.current = target.innerText
    // onInput(target.innerText)
  }
  
  const styles : CSSProperties = {
    outline: 'none',
    backgroundColor: '#1d1d1d',
    padding: '1rem 2rem'
  }
  return <div
    className="text-component"
    contentEditable={true}
    spellCheck={false}
    style={styles}
    onInput={handleInput}
    suppressContentEditableWarning={true}
  >
    {contentState.current}
  </div>
}

export default ItemsList;
