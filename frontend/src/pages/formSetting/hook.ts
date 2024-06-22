import { DropResult } from "@hello-pangea/dnd"
import { IOptionalField, useFormSettingsContext } from "../../context/formSettingsContext"
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useFormSetting = ()=>{
    const {optionalFields, setOptionalFields} = useFormSettingsContext();
    const [showFieldEditor, setShowFieldEditor] = useState<boolean>(false);
    const [currentField, setCurrentField] = useState<IOptionalField>({
        component:"",
        id:"",
        label:"",
        name:""
    })

    const fieldList = ["textField", "datePicker", "spinButton"]
    const onDragEnd = (result: DropResult) => {
      const {source, destination} = result
      if (!destination) return
      if (
        source.droppableId === "sidebar" &&
        destination.droppableId === "optional-fields"
      ) {
        const draggedField = fieldList[Number(source.index)] // Assuming fieldList is defined somewhere
  
        // Generete uuid to make sure each id are unique
        const uuid = uuidv4();

        // Create a new field object
        const newField:IOptionalField = {
          id: uuid,
          component: draggedField,
          name: "newField",
          label: "New Field"
        }
  
        // Clone optionalFields array
        const newOptionalFields = [...optionalFields]
  
        // Insert the new field at the specified destination index
        newOptionalFields.splice(destination.index, 0, newField)
  
        // Update state with the new array
        setOptionalFields(newOptionalFields)
      }
      if (
        source.droppableId === "optional-fields" &&
        destination.droppableId === "optional-fields" &&
        source.droppableId === destination.droppableId
      ) {
        const newFields = Array.from(optionalFields)
  
        // Remove the item from source index
        const [movedField] = newFields.splice(source.index, 1)
  
        // Insert the item into destination index
        newFields.splice(destination.index, 0, movedField)
  
        // Update state with the new array
        setOptionalFields(newFields)
      }
    }

    const handleClickField = useCallback((data:IOptionalField)=>{
        setCurrentField(data);
        setShowFieldEditor(true);
    },[])

    const handleDeleteField = useCallback((id:string)=>{
        const newData = optionalFields.filter((item)=>item.id != id);
        setOptionalFields(newData);
    },[optionalFields]);

    const handleUpdateField = useCallback((data:IOptionalField)=>{
        const newData = Array.from(optionalFields);
        const taskIndex = optionalFields.findIndex((task)=>task.id === data.id);

        newData[taskIndex] = {...newData[taskIndex], ...data};

        setOptionalFields(newData);
    },[optionalFields]);

    return {
        data:{optionalFields, currentField, showFieldEditor},
        method:{onDragEnd,handleClickField,handleDeleteField,handleUpdateField}
    }
}