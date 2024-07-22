import {Draggable, DraggableProvided, DraggableStateSnapshot} from "@hello-pangea/dnd"
import React from "react"

interface IDraggableFieldProps {
  id: string
  draggableId: string
  index: number
  children: (provided:DraggableProvided,snapshot:DraggableStateSnapshot) => React.ReactNode
  useButton?: boolean
}


const DraggableField: React.FC<IDraggableFieldProps> = ({
  draggableId,
  id,
  index,
  children,
  useButton = false,
}) => {
  return (
    <Draggable key={id} draggableId={draggableId} index={index}>
      {(provided,snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(!useButton && provided.dragHandleProps)}
          className={`${!snapshot.isDragging && "w-full"} relative flex`}
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
          {children(provided,snapshot)}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableField;