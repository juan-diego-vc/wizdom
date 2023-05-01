import { useState, DragEvent, useRef } from "react";
import "./ItemsList.css";

import { MdOutlineDragIndicator } from 'react-icons/md'

interface DraggableItemProps {
  id: number;
  content: string;
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
    className="draggable-handle">
    <MdOutlineDragIndicator/>
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
      <DraggableHandle onDragStart={handleDragStart} />
      {content}
    </div>
  );
};

const ItemsList = () => {
  const [items, setItems]: [Item[], Function] = useState([
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
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

  return (
    <div className="draggable-column">
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          content={item.content}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        />
      ))}
    </div>
  );
};

export default ItemsList;
