import {Draggable} from "@hello-pangea/dnd"
import React from "react"

interface IDraggableFieldProps {
  id: string
  draggableId: string
  index: number
  children: React.ReactNode
  useButton?: boolean
}


export const DraggableField: React.FC<IDraggableFieldProps> = ({
  draggableId,
  id,
  index,
  children,
  useButton = false,
}) => {
  return (
    <Draggable key={id} draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(!useButton && provided.dragHandleProps)}
          className="relative w-full flex"
        >
          {useButton && (
            <div {...provided.dragHandleProps} className="relative w-5 h-6 cursor-pointer grid grid-cols-2 gap-0.5 my-auto mr-4 ml-1 opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-1.5 w-1.5 bg-gray-500"></div>
              <div className="h-1.5 w-1.5 bg-gray-500"></div>
              <div className="h-1.5 w-1.5 bg-gray-500"></div>
              <div className="h-1.5 w-1.5 bg-gray-500"></div>
              <div className="h-1.5 w-1.5 bg-gray-500"></div>
              <div className="h-1.5 w-1.5 bg-gray-500"></div>
            </div>
          )}
          {children}
        </div>
      )}
    </Draggable>
  )
}
