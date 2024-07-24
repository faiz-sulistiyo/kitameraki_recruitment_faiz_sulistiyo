import {Field, Textarea, TextareaProps} from "@fluentui/react-components"
import React from "react"

interface IInputTextAreaProps extends TextareaProps {
    label:string
}
const InputTextArea: React.FC<IInputTextAreaProps> = ({...props}) => {
  return (
    <Field label={props.label}>
      <Textarea {...props} />
    </Field>
  )
}

export default InputTextArea
