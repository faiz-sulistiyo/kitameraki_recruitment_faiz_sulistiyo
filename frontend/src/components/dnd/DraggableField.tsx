import {Draggable} from "@hello-pangea/dnd"
import React from "react"

interface IDraggableFieldProps {
  id: string
  draggableId: string
  index: number
  children: React.ReactNode
}
export const DraggableField: React.FC<IDraggableFieldProps> = ({
  draggableId,
  id,
  index,
  children,
}) => {
  return (
    <Draggable key={id} draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative w-full flex"
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}
