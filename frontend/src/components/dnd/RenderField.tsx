import {
  TextField,
  SpinButton,
  DatePicker,
  IconButton,
  IIconProps,
  Position,
} from "@fluentui/react"
import React from "react"
import {IOptionalField, IOptionalFieldItem} from "../../context/formSettingsContext"

interface IRenderFieldProps {
  data: IOptionalFieldItem
  handleClickField?: (field: IOptionalField) => void
  handleDeleteField?: (id: string) => void
  focus: boolean
  value?: string
  onChange?: (val: string) => void
  readonly?: boolean
  isEdit?: boolean
  className?:string
}

const deleteIcon: IIconProps = {iconName: "Delete"}

const RenderField: React.FC<IRenderFieldProps> = ({
  data,
  handleClickField,
  focus,
  handleDeleteField,
  isEdit = true,
  readonly,
  onChange,
  value,
  className
}) => {
  const renderElement = (data: IOptionalFieldItem) => {
    switch (data.component) {
      case "textField":
        return (
          <TextField
            readOnly={readonly}
            value={value}
            onChange={(e) => onChange && onChange(e.currentTarget.value)}
            className="flex-1"
            label={data.label}
            name={data.name}
          />
        )
      case "spinButton":
        return (
          <SpinButton
            value={value}
            onChange={(_, val) => onChange && onChange(val || "")}
            className="flex-1"
            labelPosition={Position.top}
            label={data.label}
          />
        )
      case "datePicker":
        return (
          <DatePicker
            disabled={readonly}
            value={value ? new Date(value) : undefined}
            onSelectDate={(date) => {
              onChange && onChange(date ? date.toISOString() : "")
            }}
            className="flex-1 !-mb-1"
            label={data.label}
            id={data.id}
          />
        )
    }
  }

  return (
    <div className={className}>
      {isEdit && (
        <div
          onClick={() => handleClickField && handleClickField(data)}
          className={`${
            focus && "opacity-100"
          } absolute flex flex-grow items-center justify-end px-2 top-0 left-0 z-40 w-full h-full opacity-0 bg-black hover:opacity-100 bg-opacity-30 transition-opacity duration-500`}
        >
          {focus && (
            <IconButton
              className="bg-gray-300"
              iconProps={deleteIcon}
              aria-label="Delete"
              onClick={() => handleDeleteField && handleDeleteField(data.id)}
            />
          )}
        </div>
      )}
      {renderElement(data)}
    </div>
  )
}

export default RenderField;