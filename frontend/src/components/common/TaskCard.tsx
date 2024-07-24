import React from "react"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import {Button} from "@fluentui/react-components"
import {EyeFilled, EditFilled, DeleteFilled} from "@fluentui/react-icons"

interface ITaskCardProps {
  description: string
  title: string
  id: number
  onClickEdit: (id: number) => void
  onConfirmDelete: (id: number) => void
  onClickView: (id: number) => void
}

const TaskCard: React.FC<ITaskCardProps> = ({
  description,
  title,
  id,
  onConfirmDelete,
  onClickEdit,
  onClickView,
}) => {
  return (
    <div className="flex flex-shrink-0 min-h-10 flex-col gap-4 py-2 px-6 rounded-md border">
      <div className="flex flex-col gap-4 items-center h-full">
        <div className="flex flex-col gap-1">
          <h2 className="text-center font-bold text-sm">{title}</h2>
          <h3 className="text-center text-sm">{description}</h3>
        </div>
        <div className="flex gap-2 mt-auto">
          <Button
            className="flex-1"
            onClick={() => onClickEdit(id)}
            icon={<EditFilled className="text-blue-700" />}
            aria-label="Edit"
          />
          <Button
            className="flex-1"
            onClick={() => onClickView(id)}
            icon={<EyeFilled className="text-green-700"/>}
            aria-label="View"
          />
          <ConfirmDeleteModal
            title="Confirm Delete"
            message={`Are u sure want to delete record with id: ${id}`}
            onConfirm={onConfirmDelete}
            id={id}
            triggerButton={
              <Button
                icon={<DeleteFilled className="text-red-700"/>}
                aria-label="Delete"
                className="!min-w-fit"
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default TaskCard
