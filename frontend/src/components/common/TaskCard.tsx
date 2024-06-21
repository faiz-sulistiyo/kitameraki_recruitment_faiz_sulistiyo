import React, {useState} from "react"
import {IIconProps, IconButton} from "@fluentui/react"
import ConfirmDeleteModal from "./ConfirmDeleteModal"

interface ITaskCardProps {
  description: string
  title: string
  id: number
  onClickEdit: (id: number) => void
  onConfirmDelet: (id: number) => void
  onClickView: (id: number) => void
}

const editIcon: IIconProps = {iconName: "Edit"}
const deleteIcon: IIconProps = {iconName: "Delete"}
const viewIcon: IIconProps = {iconName: "SeeDo"}

const TaskCard: React.FC<ITaskCardProps> = ({
  description,
  title,
  id,
  onConfirmDelet,
  onClickEdit,
  onClickView,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  return (
    <div className="flex flex-shrink-0 min-h-10 flex-col gap-4 py-2 px-6 rounded-md border">
      <div className="flex flex-col gap-4 items-center h-full">
        <div className="flex flex-col gap-1">
          <h2 className="text-center font-bold text-sm">{title}</h2>
          <h3 className="text-center text-sm">{description}</h3>
        </div>
        <div className="flex gap-2 mt-auto">
          <IconButton
            onClick={() => onClickEdit(id)}
            iconProps={editIcon}
            aria-label="Edit"
          />
          <IconButton
            onClick={() => onClickView(id)}
            iconProps={viewIcon}
            aria-label="View"
          />
          <IconButton
            onClick={() => {
              setIsOpenModal(true)
            }}
            iconProps={deleteIcon}
            aria-label="Delete"
          />
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isOpenModal}
        onHideModal={() => {
          console.log("first")
          setIsOpenModal(false)
        }}
        id={id}
        onConfirm={() => {
          onConfirmDelet(id)
        }}
        title="Confirm Delete"
        message={`Are u sure want to delete record with id: ${id}`}
      />
    </div>
  )
}

export default TaskCard
