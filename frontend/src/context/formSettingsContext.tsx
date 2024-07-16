// formSettingsContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { getFormSettings } from "../services/api"

interface FormSettingsContextProps {
  optionalFields: IOptionalField[]
  setOptionalFields: React.Dispatch<React.SetStateAction<IOptionalField[]>>
}

export interface IOptionalField {
  id: string
  items?: IOptionalFieldItem[]
}

export interface IOptionalFieldItem {
  id: string
  component: string
  label:string
  name?:string
}

const FormSettingsContext = createContext<FormSettingsContextProps | undefined>(
  undefined,
)

export const FormSettingsProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  
  // const initialOptionalFields: IOptionalField[] = data;
  const [optionalFields, setOptionalFields] = useState<IOptionalField[]>([])

  // get initialform
  const getInitialForm = async () => {
    const {data} =await getFormSettings();
    setOptionalFields(data as IOptionalField[]);
  }

  useEffect(()=>{
    getInitialForm();
  },[])

  return (
    <FormSettingsContext.Provider value={{optionalFields, setOptionalFields}}>
      {children}
    </FormSettingsContext.Provider>
  )
}

export const useFormSettingsContext = () => {
  const context = useContext(FormSettingsContext)
  if (!context) {
    throw new Error(
      "useFormSettings must be used within a FormSettingsProvider",
    )
  }
  return context
}
