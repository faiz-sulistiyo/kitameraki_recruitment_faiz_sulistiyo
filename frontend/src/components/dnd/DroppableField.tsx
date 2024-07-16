import {Direction, Droppable} from "@hello-pangea/dnd"
import React, {ReactNode} from "react"

interface DroppableFieldProps {
  children: ReactNode,
  droppableId: string,
  direction:Direction,
  type?:string;
  className?:string
}
const DroppableField: React.FC<DroppableFieldProps> = ({children,droppableId,direction,type="DEFAULT",className}) => {
  return (
    <Droppable droppableId={droppableId} direction={direction} type={type}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${direction==="horizontal"?"flex-row":"flex-col"} flex gap-2 w-full items-end h-full ${className}`}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DroppableField;