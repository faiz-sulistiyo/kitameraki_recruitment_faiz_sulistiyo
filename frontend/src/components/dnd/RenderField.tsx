import {
  TextField,
  SpinButton,
  DatePicker,
  IconButton,
  IIconProps,
} from "@fluentui/react"
import React from "react"
import {IOptionalField} from "../../context/formSettingsContext"

interface IRenderFieldProps {
  data: IOptionalField
  handleClickField: (field: IOptionalField) => void
  handleDeleteField: (id: string) => void
  focus: boolean
}

const deleteIcon: IIconProps = {iconName: "Delete"}

export const RenderField: React.FC<IRenderFieldProps> = ({
  data,
  handleClickField,
  focus,
  handleDeleteField,
}) => {
  const renderElement = (data: IOptionalField) => {
    switch (data.component) {
      case "textField":
        return <TextField className="flex-1" label={data.label} name={data.name} />
      case "spinButton":
        return <SpinButton className="flex-1" label={data.label} />
      case "datePicker":
        return <DatePicker className="flex-1" label={data.label} id={data.id} />
    }
  }

  return (
    <React.Fragment>
      <div
        onClick={() => handleClickField(data)}
        className={`${
          focus && "opacity-100"
        } absolute flex flex-grow items-center justify-end px-2 top-0 z-40 w-full h-full opacity-0 bg-black hover:opacity-100 bg-opacity-30 transition-opacity duration-500`}
      >
        {focus && (
          <IconButton
            className="bg-gray-300"
            iconProps={deleteIcon}
            aria-label="Delete"
            onClick={() => handleDeleteField(data.id)}
          />
        )}
      </div>
      {renderElement(data)}
    </React.Fragment>
  )
}
