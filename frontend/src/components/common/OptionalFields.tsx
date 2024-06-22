import React, {useCallback, useState} from "react"
import {Droppable, Draggable} from "@hello-pangea/dnd"
import {
  DatePicker,
  IIconProps,
  IconButton,
  SpinButton,
  TextField,
} from "@fluentui/react"
import {IOptionalField} from "../../context/formSettingsContext"

interface IOptionalFieldsProps {
  fields: IOptionalField[]
  onClickField: (data: IOptionalField) => void
  onDeleteField: (id:string) => void
}

const deleteIcon: IIconProps = {iconName: "Delete"}

const OptionalFields: React.FC<IOptionalFieldsProps> = ({
  fields,
  onClickField,
  onDeleteField
}) => {
  const renderElement = (data:IOptionalField) => {
    switch (data.component) {
      case "textField":
        return <TextField label={data.label} name={data.name} />
      case "spinButton":
        return <SpinButton label={data.label} />
      case "datePicker":
        return <DatePicker label={data.label} id={data.id}/>
    }
  }
  const [activeField, setActiveField] = useState<string>("")

  const handleClickField = useCallback(
    (id: string, data: IOptionalField) => {
      setActiveField(id)
      onClickField(data)
    },
    [onClickField],
  )

  return (
    <Droppable droppableId="optional-fields">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col gap-2 w-full items-start h-full"
        >
          {!fields.length && <h1 className="self-center m-auto">Drop Here</h1>}
          {fields.map((field, index) => (
            <Draggable key={field.id} draggableId={field.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="relative w-full"
                >
                  {/* Edit layer */}
                  <div
                    onClick={() => handleClickField(field.id, field)}
                    className={`${
                      activeField === field.id && "opacity-100"
                    } absolute flex items-center justify-end px-2 top-0 z-40 w-full h-full opacity-0 bg-black hover:opacity-100 bg-opacity-30 transition-opacity duration-500`}
                  >
                    {activeField === field.id&&(<IconButton className="bg-gray-300" iconProps={deleteIcon} aria-label="Delete" onClick={()=>onDeleteField(field.id)}/>)}
                  </div>
                  {renderElement(field)}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default OptionalFields
