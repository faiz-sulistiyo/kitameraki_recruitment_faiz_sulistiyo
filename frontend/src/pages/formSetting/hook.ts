import { DropResult } from "@hello-pangea/dnd"
import { IOptionalField, IOptionalFieldItem, useFormSettingsContext } from "../../context/formSettingsContext"
import { SyntheticEvent, useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { postFormSetting } from "../../services/api";
import { showErrorToast } from "../../utils/showErrorToast";

export const useFormSetting = () => {
  const { optionalFields, setOptionalFields } = useFormSettingsContext();
  const [showFieldEditor, setShowFieldEditor] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<IOptionalField>({
    id: "",
    items: []
  })

  const fieldList = ["textField", "datePicker", "spinButton"]

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Prevent drop when there's destination
    if (!destination) return;
  
    // Update form layout horizontally
    if (type === "blockRow") {
      handleUpdateLayoutHorizontal(result);
      return;
    }

    // Update form layout vertically
    if (type === "DEFAULT" && source.droppableId !== "sidebar") {
      handleUpdateLayoutVertical(result);
      return;
    }

    // Adding new items from sidebar
    if (type === "DEFAULT" && source.droppableId === "sidebar" && destination.droppableId !== "sidebar") {
      handleAddNewElement(result);
      return;
    }
  };

  const handleAddNewElement = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
  
    const draggedField = fieldList[Number(source.index)]; // Assuming fieldList is defined somewhere
  
    // Generate uuid to make sure each id is unique
    const uuid = uuidv4();
    const subId = uuidv4();

    const fieldType = fieldList[source.index];
  
    // Create a new field object
    const newField: IOptionalFieldItem = {
      id: subId,
      component: draggedField,
      name: `${fieldType}-${uuid}`,
      label: "New Field",
    };
  
    const newParentField: IOptionalField = {
      id: uuid,
      items: [newField],
    };
  
    // Clone optionalFields array
    const newOptionalFields = [...optionalFields];
  
    // Insert the new field at the specified destination index
    newOptionalFields.splice(destination.index, 0, newParentField);
  
    // Update state with the new array
    setOptionalFields(newOptionalFields);
  };

  const handleUpdateLayoutHorizontal = (result: DropResult) => {
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
          items: [...(newOptionalFields[parentIndex].items || [])],
        };
        // Add the dragged item to the destination index within the items array
        newOptionalFields[parentIndex].items?.splice(destination.index, 0, draggedItem);
  
        const filteredOptionalFields = newOptionalFields.filter((item)=>!!item.items?.length);
        // Update state with the new array
        setOptionalFields(filteredOptionalFields);
      }
    }
  };

  const handleUpdateLayoutVertical = (result: DropResult) => {
    const { destination, source, draggableId } = result;
  
    // If there's no destination, exit the function
    if (!destination) {
      return;
    }
  
    // Clone the optionalFields array
    let newOptionalFields = [...optionalFields];
  
    // Find the dragged item
    const draggedItemIndex = newOptionalFields.findIndex(item => item.id === draggableId);
    const draggedItem = newOptionalFields[draggedItemIndex];
  
    // Remove the dragged item from the source index
    newOptionalFields.splice(source.index, 1);
  
    // Insert the dragged item at the destination index
    newOptionalFields.splice(destination.index, 0, draggedItem);
  
    const filteredOptionalFields = newOptionalFields.filter((item)=>!!item.items?.length);
    // Update the state with the new array
    setOptionalFields(filteredOptionalFields);
  };
  
  


  const handleClickField = useCallback((data: IOptionalField) => {
    setCurrentField(data);
    setShowFieldEditor(true);
  }, [])

  const handleDeleteField = useCallback((id: string) => {
    const deleteFieldById = (fields: IOptionalField[]): IOptionalField[] => {
      return fields.map((field) => ({
        ...field,
        items: field.items
          ? field.items.filter((item) => item.id !== id)
          : [],
      }));
    };
  
    setOptionalFields((prevFields) => {
      // Update fields by deleting the item with the specified id
      const updatedFields = deleteFieldById(prevFields);
  
      // Remove parent fields with empty items
      const filteredFields = updatedFields.filter(
        (field) => !field.items || field.items.length > 0
      );
  
      return filteredFields;
    });
  }, [setOptionalFields]);

  const handleUpdateField = useCallback((data: IOptionalField) => {
    // Recursively update fields by ID
    const updateFieldById = (fields: IOptionalField[]): IOptionalField[] => {
      return fields.map((field) => {
        if (field.id === data.id) {
          // Update the field with new data
          return { ...field, ...data };
        }
        if (field.items) {
          // Recursively update nested items
          return { ...field, items: updateFieldById(field.items) };
        }
        return field;
      }) as IOptionalField[];
    };
  
    setOptionalFields((prevFields) => {
      // Update fields with updatedFieldById function
      const updatedFields = updateFieldById(prevFields);
  
      // Filter out parent fields with empty items
      const filteredFields = updatedFields.filter(
        (field) => !field.items || field.items.length > 0
      );
  
      return filteredFields;
    });
  }, [setOptionalFields]);

  const handleSubmitSetting = async (e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postFormSetting(optionalFields);
      
    } catch (error) {
      showErrorToast(error)
    }
  }
  return {
    data: { optionalFields, currentField, showFieldEditor },
    method: { onDragEnd, handleClickField, handleDeleteField, handleUpdateField, handleSubmitSetting }
  }
}