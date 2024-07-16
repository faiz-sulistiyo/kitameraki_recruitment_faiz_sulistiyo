// formSettingsContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

interface FormSettingsContextProps {
  optionalFields: IOptionalField[]
  setOptionalFields: React.Dispatch<React.SetStateAction<IOptionalField[]>>
}

export interface IOptionalField {
  id: string
  component: string
  label:string
  name?:string
  items?: IOptionalField[]
}

const FormSettingsContext = createContext<FormSettingsContextProps | undefined>(
  undefined,
)

export const FormSettingsProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const initialOptionalFields: IOptionalField[] = JSON.parse(localStorage.getItem('optionalFields') || '[]');
  const [optionalFields, setOptionalFields] = useState<IOptionalField[]>(initialOptionalFields)

  // Update localStorage whenever optionalFields changes
  useEffect(() => {
    localStorage.setItem("optionalFields", JSON.stringify(optionalFields))
  }, [optionalFields])

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
