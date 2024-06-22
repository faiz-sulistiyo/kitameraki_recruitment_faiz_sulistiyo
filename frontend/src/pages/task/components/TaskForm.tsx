import React, {useCallback} from "react"
import {PrimaryButton} from "@fluentui/react"
import {useNavigate} from "react-router-dom"

interface ITaskFormProps {
  onSubmit?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

const TaskForm: React.FC<ITaskFormProps> = ({
  disabled,
  onSubmit,
  children,
}) => {
  const navigate = useNavigate()
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit && onSubmit()
    },
    [onSubmit],
  )
  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:max-w-[80%]">
      {children}
      <div className="flex gap-3 self-end">
        <PrimaryButton
          type="button"
          text="Back"
          onClick={() => navigate(-1)}
          className="mt-4 w-fit bg-red-700 border-red-700 hover:bg-red-600 hover:border-red-600"
        />
        <PrimaryButton
          disabled={disabled}
          type="submit"
          text="Submit"
          className="mt-4 w-fit"
        />
      </div>
    </form>
  )
}

export default TaskForm
