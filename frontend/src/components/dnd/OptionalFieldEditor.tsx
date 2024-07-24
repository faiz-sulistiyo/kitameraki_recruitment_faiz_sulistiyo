import React, {useCallback, useEffect, useState} from "react"
import {IOptionalFieldItem} from "../../context/formSettingsContext"
import InputText from "../common/InputText"
import { Button } from "@fluentui/react-components"

interface IOptionalFieldEditorProps {
  show?: boolean
  data: IOptionalFieldItem
  onSubmit: (data: IOptionalFieldItem) => void
}
const OptionalFieldEditor: React.FC<IOptionalFieldEditorProps> = ({
  show,
  data,
  onSubmit,
}) => {
  const [field, setField] = useState<IOptionalFieldItem>(data)
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
        className="flex flex-col gap-4 min-w-[20%] border p-2"
      >
        <InputText
          placeholder="Enter your Field Label, Ex. 'Title'"
          value={field.label}
          contentBefore={<div className="font-bold">Label :</div>}
          onChange={(e) => handleChangeText(e.currentTarget.value, "label")}
        />
        <InputText
          placeholder="Enter your field name, Ex. 'title'"
          value={field.name}
          contentBefore={<div className="font-bold">Name :</div>}
          onChange={(e) => handleChangeText(e.currentTarget.value, "name")}
        />
        <Button appearance="primary" type="submit">Save</Button>
      </form>
    )
  )
}

export default OptionalFieldEditor
