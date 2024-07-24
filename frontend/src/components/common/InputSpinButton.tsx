import { Field, SpinButton, SpinButtonProps } from '@fluentui/react-components'
import React from 'react'

interface IInputSpinButtonProps extends SpinButtonProps{
    label:string
}
const InputSpinButton:React.FC<IInputSpinButtonProps> = ({...props}) => {
  return (
    <Field label={props.label}>
        <SpinButton {...props}/>
    </Field>
  )
}

export default InputSpinButton