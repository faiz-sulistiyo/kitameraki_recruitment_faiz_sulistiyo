import { DropResult } from "@hello-pangea/dnd"
import { IOptionalField, useFormSettingsContext } from "../../context/formSettingsContext"
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useFormSetting = () => {
  const { optionalFields, setOptionalFields } = useFormSettingsContext();
  const [showFieldEditor, setShowFieldEditor] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<IOptionalField>({
    component: "",
    id: "",
    label: "",
    name: "",
    items: []
  })

  const fieldList = ["textField", "datePicker", "spinButton"]

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
  
    if (result.type === "blockRow" && source.droppableId !== "sidebar") {
      handleBlockRowDrag(result);
      return;
    } 

    if (source.droppableId === "sidebar" && destination.droppableId === "optional-fields") {
      handleSidebarToOptionalFieldsDrag(result);
      return;
    }
  };

  const handleSidebarToOptionalFieldsDrag = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
  
    const draggedField = fieldList[Number(source.index)]; // Assuming fieldList is defined somewhere
  
    // Generate uuid to make sure each id is unique
    const uuid = uuidv4();
    const subId = uuidv4();
  
    // Create a new field object
    const newField: IOptionalField = {
      id: subId,
      component: draggedField,
      name: "newField",
      label: "New Field",
    };
  
    const newParentField: IOptionalField = {
      id: uuid,
      component: draggedField,
      name: "parentField",
      label: "",
      items: [newField],
    };
  
    // Clone optionalFields array
    const newOptionalFields = [...optionalFields];
  
    // Insert the new field at the specified destination index
    newOptionalFields.splice(destination.index, 0, newParentField);
  
    // Update state with the new array
    setOptionalFields(newOptionalFields);
  };

  const handleBlockRowDrag = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    
    // Clone the optionalFields array
    let newOptionalFields = [...optionalFields];
  
    // Find the parent droppable field
    const parentIndex = newOptionalFields.findIndex(
      (item) => item.id === destination?.droppableId
    );
  
    // Find the source parent and dragged item
    const sourceParentIndex = newOptionalFields.findIndex(
      (item) => item.id === source.droppableId
    );
  
    if (parentIndex !== -1 && sourceParentIndex !== -1) {
      const sourceParent = newOptionalFields[sourceParentIndex];
      const draggedItem = sourceParent.items?.find(
        (item) => item.id === result.draggableId
      );
  
      if (draggedItem) {
        // Remove the dragged item from the source parent
        newOptionalFields[sourceParentIndex] = {
          ...sourceParent,
          items: sourceParent.items?.filter(
            (item) => item.id !== result.draggableId
          ),
        };
  
        // Add the dragged item to the destination parent's items array
        newOptionalFields[parentIndex] = {
          ...newOptionalFields[parentIndex],
          items: [...(newOptionalFields[parentIndex].items || []), draggedItem],
        };
  
        // Update state with the new array
        setOptionalFields(newOptionalFields);
      }
    }
  };
  


  const handleClickField = useCallback((data: IOptionalField) => {
    setCurrentField(data);
    setShowFieldEditor(true);
  }, [])

  const handleDeleteField = useCallback((id: string) => {
    const deleteFieldById = (fields: IOptionalField[]): IOptionalField[] => {
      return fields
        .filter((field) => field.id !== id)
        .map((field) => ({
          ...field,
          items: field.items ? deleteFieldById(field.items) : [],
        }));
    };

    setOptionalFields((prevFields) => deleteFieldById(prevFields));
  }, []);


  const handleUpdateField = useCallback((data: IOptionalField) => {
    const updateFieldById = (fields: IOptionalField[]): IOptionalField[] => {
      return fields.map((field) => {
        if (field.id === data.id) {
          return { ...field, ...data };
        }
        return {
          ...field,
          items: field.items ? updateFieldById(field.items) : [],
        };
      });
    };

    setOptionalFields((prevFields) => updateFieldById(prevFields));
  }, []);

  return {
    data: { optionalFields, currentField, showFieldEditor },
    method: { onDragEnd, handleClickField, handleDeleteField, handleUpdateField }
  }
}