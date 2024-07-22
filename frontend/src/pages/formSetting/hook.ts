import { DropResult } from "@hello-pangea/dnd"
import { IOptionalField, IOptionalFieldItem, useFormSettingsContext } from "../../context/formSettingsContext"
import { SyntheticEvent, useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { postFormSetting } from "../../services/api";
import { showErrorToast } from "../../utils/showErrorToast";

export const useFormSetting = () => {
  const { optionalFields, setOptionalFields } = useFormSettingsContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    if (!["sidebar", "optional-fields"].includes(destination.droppableId)) {
      handleUpdateLayoutHorizontal(result);
      return;
    }

    // Update form layout vertically
    if (type === "DEFAULT" && source.droppableId === "optional-fields") {
      handleUpdateLayoutVertical(result);
      return;
    }

    if (type === "DEFAULT" && !["sidebar", "optional-fields"].includes(source.droppableId) && destination.droppableId === "optional-fields") {
      handleUpdateLayoutHorizontalToVertical(result);
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

    if (parentIndex !== -1) {
      const sourceParent = newOptionalFields[sourceParentIndex];
      let draggedItem = sourceParent?.items?.find(
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
      }

      const uuid = uuidv4();
      draggedItem = {
        id: uuid,
        component: fieldList[source.index],
        name: `${fieldList[source.index]}-${uuid}`,
        label: "New Field"
      }

      // Add the dragged item to the destination parent's items array
      newOptionalFields[parentIndex] = {
        ...newOptionalFields[parentIndex],
        items: [...(newOptionalFields[parentIndex].items || [])],
      };
      // Add the dragged item to the destination index within the items array
      newOptionalFields[parentIndex].items?.splice(destination.index, 0, draggedItem);

      const filteredOptionalFields = newOptionalFields.filter((item) => !!item.items?.length);
      // Update state with the new array
      setOptionalFields(filteredOptionalFields);
    }
  };

    const handleUpdateLayoutHorizontalToVertical = (result:DropResult) => {
      const {destination,source,draggableId} = result;
      if (!destination) {
        return;
      }
      // 1. Clone the optionalFields array
      let newOptionalFields = [...optionalFields];

      // 2. Find the correct source index
      let sourceIndex = -1;
      let itemIndex = -1;

      // Iterate through newOptionalFields to find the source index and item index
      for (let i = 0; i < newOptionalFields.length; i++) {
        const items = newOptionalFields[i].items;
        if (items) {
          const foundIndex = items.findIndex((item) => item.id === draggableId);
          if (foundIndex !== -1) {
            sourceIndex = i;
            itemIndex = foundIndex;
            break;
          }
        }
      }
      if (sourceIndex !== -1) {
        const uuid = uuidv4();
        const item = newOptionalFields[sourceIndex].items?.[source.index];
        if (item) {
          const newItem:IOptionalField = {
            id:uuid,
            items:[
              ...[item]
            ]
          }
          newOptionalFields[source.index].items?.splice(sourceIndex,1);
    
          newOptionalFields.splice(destination.index,0,newItem);
        }
      }
      const filteredOptionalFields = newOptionalFields.filter((item) => !!item?.items?.length);
      setOptionalFields(filteredOptionalFields);
    }

  const handleUpdateLayoutVertical = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    // 1. Clone the optionalFields array
    let newOptionalFields = [...optionalFields];

    // 2. Remove the dragged item from source and clone the removed item
    const item = newOptionalFields[source.index];
    newOptionalFields.splice(source.index, 1);
    
    // 3. Insert Dragged item at destination
    newOptionalFields.splice(destination.index, 0, item);

    // 4. Filter out parents with empty items (Ensure data are sanitized)
    const filteredOptionalFields = newOptionalFields.filter((item) => !!item?.items?.length);

    // 5. Update the state with the new array
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

  const handleSubmitSetting = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await postFormSetting(optionalFields);
      setIsLoading(false)
    } catch (error) {
      showErrorToast(error);
      setIsLoading(false);
    }
  }
  return {
    data: { optionalFields, isLoading, currentField, showFieldEditor },
    method: { onDragEnd, handleClickField, handleDeleteField, handleUpdateField, handleSubmitSetting }
  }
}