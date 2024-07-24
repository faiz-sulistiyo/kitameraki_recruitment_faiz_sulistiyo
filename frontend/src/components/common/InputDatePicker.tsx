import {Field} from "@fluentui/react-components"
import {DatePicker, DatePickerProps} from "@fluentui/react-datepicker-compat"
import React from "react"

interface IDatePickerProps extends DatePickerProps {
  label: string
}
const InputDatePicker: React.FC<IDatePickerProps> = ({...props}) => {
  return (
    <Field label={props.label}>
      <DatePicker {...props} />
    </Field>
  )
}

export default InputDatePicker
