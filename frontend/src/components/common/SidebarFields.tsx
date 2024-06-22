import React from "react"
import {Draggable, Droppable} from "@hello-pangea/dnd"
import {TextField, DatePicker, SpinButton} from "@fluentui/react"

const SidebarFields: React.FC = () => {
  const fields = [
    {id: "textfield", label: "Text Field", component: "textField"},
    {id: "datepicker", label: "Date Picker", component: "datePicker"},
    {id: "spinbutton", label: "Spin Button", component: "spinButton"},
  ]

  return (
    <Droppable droppableId="sidebar">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="flex gap-2 flex-wrap h-fit">
          {fields.map((field, index) => (
            <Draggable key={field.id} draggableId={field.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="h-20 w-20 p-2 border hover:bg-gray-400 flex items-center justify-center bg-gray-200"
                >
                  <span className="text-sm text-center">{field.label}</span>
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

export default SidebarFields
