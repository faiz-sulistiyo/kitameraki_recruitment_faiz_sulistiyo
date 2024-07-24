import React from "react"
import {IOptionalFieldItem} from "../../context/formSettingsContext"
import InputText from "../common/InputText"
import InputDatePicker from "../common/InputDatePicker"
import InputSpinButton from "../common/InputSpinButton"
import {Button} from "@fluentui/react-components"
import {DeleteFilled} from "@fluentui/react-icons"

interface IRenderFieldProps {
  data: IOptionalFieldItem
  handleClickField?: (field: IOptionalFieldItem) => void
  handleDeleteField?: (id: string) => void
  focus: boolean
  value?: string
  onChange?: (val: string | number) => void
  readonly?: boolean
  isEdit?: boolean
  className?: string
}

const RenderField: React.FC<IRenderFieldProps> = ({
  data,
  handleClickField,
  focus,
  handleDeleteField,
  isEdit = true,
  readonly,
  onChange,
  value,
  className,
}) => {
  const renderElement = (data: IOptionalFieldItem) => {
    switch (data.component) {
      case "textField":
        return (
          <InputText
            id={data.name}
            readOnly={readonly}
            value={value}
            onChange={(e) => onChange && onChange(e.currentTarget.value)}
            className="flex-1"
            label={data.label}
            name={data.name}
            disabled={readonly}
          />
        )
      case "spinButton":
        return (
          <InputSpinButton
            id={data.name}
            value={parseInt(value || "0")}
            onChange={(_, data) => onChange && onChange(data.value || "")}
            className="flex-1"
            label={data.label}
            step={1}
            readOnly={readonly}
            disabled={readonly}
          />
        )
      case "datePicker":
        return (
          <InputDatePicker
            value={value ? new Date(value) : null}
            onSelectDate={(date) => {
              onChange && onChange(date ? date.toISOString() : "")
            }}
            className="flex-1 !-mb-1"
            label={data.label}
            id={data.name}
            today={new Date()}
            showGoToToday
            disabled={readonly}
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
            <Button
              className="bg-gray-300"
              icon={<DeleteFilled />}
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

export default RenderField
