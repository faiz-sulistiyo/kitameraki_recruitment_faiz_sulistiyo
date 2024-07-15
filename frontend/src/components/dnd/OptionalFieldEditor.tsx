import {PrimaryButton, TextField} from "@fluentui/react"
import React, {useCallback, useEffect, useState} from "react"
import {IOptionalField} from "../../context/formSettingsContext"

interface IOptionalFieldEditorProps {
  show?: boolean
  data: IOptionalField
  onSubmit: (data: IOptionalField) => void
}
const OptionalFieldEditor: React.FC<IOptionalFieldEditorProps> = ({
  show,
  data,
  onSubmit,
}) => {
  const [field, setField] = useState<IOptionalField>(data)
  useEffect(() => {
    setField(data)
  }, [data])

  const handleChangeText = useCallback((val: string, key: string) => {
    setField((prev) => ({...prev, [key]: val}))
  }, [])

  return (
    show && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(field)
        }}
        className="flex flex-col min-w-[20%] border p-2"
      >
        <TextField
          label="Field Label"
          placeholder="Enter your Field Label, Ex. 'Title'"
          value={field.label}
          onChange={(e) => handleChangeText(e.currentTarget.value, "label")}
        />
        <TextField
          label="Field Name"
          placeholder="Enter your field name, Ex. 'title'"
          value={field.name}
          onChange={(e) => handleChangeText(e.currentTarget.value, "name")}
        />
        <PrimaryButton text="Submit" type="submit" className="mt-6" />
      </form>
    )
  )
}

export default OptionalFieldEditor
