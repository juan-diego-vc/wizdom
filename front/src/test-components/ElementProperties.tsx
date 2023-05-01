import React, { useState } from "react";

interface ElementPropertiesProps {
    selectedElementId: string;
    selectedElementType: string;
    elementProps: object;
    onEditProps: (newProps: object) => void;
}

const ElementProperties: React.FC<ElementPropertiesProps> = ({
    selectedElementId,
    selectedElementType,
    elementProps,
    onEditProps
}) => {
    const [updatedProps, setUpdatedProps] = useState(elementProps);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onEditProps(updatedProps);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedProps((prevProps) => ({ ...prevProps, [name]: value }));
    };

    const handleCreateChild = (elementType: string) => {
        
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Aquí puedes agregar campos de texto para editar las propiedades del elemento seleccionado */}
        <button type="submit">Actualizar propiedades</button>
      </form>
      <button onClick={() => handleCreateChild("group")}>Agregar Group</button>
      <button onClick={() => handleCreateChild("text")}>Agregar Text</button>
    </div>
  );
};

export default ElementProperties;
