import {Field, Input, InputProps} from "@fluentui/react-components"
import React from "react"

interface IInputTextProps extends InputProps {
  label: string
}
const InputText: React.FC<IInputTextProps> = ({...props}) => {
  return (
    <Field label={props.label}>
        <Input id={props.id} {...props} />
    </Field>
  )
}

export default InputText
