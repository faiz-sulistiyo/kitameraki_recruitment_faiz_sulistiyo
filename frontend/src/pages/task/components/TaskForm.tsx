import React, {useCallback, useRef} from "react"
import {PrimaryButton, TextField} from "@fluentui/react"
import {useNavigate} from "react-router-dom"
import {RenderField} from "../../../components"
import {ITask} from "../../../types/task"
import {IOptionalField} from "../../../context/formSettingsContext"

interface ITaskFormProps {
  onSubmit?: (data?: ITask) => void
  disabled?: boolean
  value?: ITask
  formSettings?: IOptionalField[]
  onChange?: (key: string, value: string) => void
}

const TaskForm: React.FC<ITaskFormProps> = ({
  disabled,
  onSubmit,
  formSettings,
  value,
  onChange,
}) => {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      // Ensure Onsubmit props passed
      if (onSubmit) {
        if (!onChange && formRef?.current) {
          // Handle when component used as uncontrolled component
          const formData = new FormData(formRef.current);
          const data: { [key: string]: any } = {};
          formData.forEach((value, key) => {
            data[key] = value;
          });
          onSubmit(data as ITask)
          return;
        }
        // Otherwise let the parent handle form value itself
        onSubmit()
      }
    },
    [onSubmit, value, formRef?.current],
  )

  const handleChange = (key: string, val: string) => {
    if (onChange) {
      onChange(key, val)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col md:max-w-[80%]">
      <TextField
        label="Title"
        id="title"
        name="title"
        defaultValue={value?.title?.toString() || ""}
        required
        readOnly={disabled}
        onChange={(_, newVal) => handleChange("title", newVal || "")}
        placeholder="Ex. Going to supermarket"
      />
      <TextField
        label="Description"
        id="description"
        name="description"
        defaultValue={value?.description?.toString() || ""}
        multiline
        rows={3}
        required
        readOnly={disabled}
        placeholder="Ex. Buy some food to restock our fridge"
        onChange={(_, newVal) => handleChange("description", newVal || "")}
      />
      {formSettings?.map((item) => (
        <div key={item.id} className="flex flex-1 items-end gap-2">
          {item.items?.map((subItem) => {
            return (
              <RenderField
                key={subItem.id}
                data={subItem}
                value={value?.[subItem?.name || ""]?.toString()}
                onChange={(val) => handleChange(subItem?.name || "", val)}
                focus={false}
                isEdit={false}
                className="flex-1"
                readonly={disabled}
              />
            )
          })}
        </div>
      ))}
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
