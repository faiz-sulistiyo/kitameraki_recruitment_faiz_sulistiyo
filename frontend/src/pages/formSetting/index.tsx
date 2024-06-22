import React from "react"
import {DragDropContext} from "@hello-pangea/dnd"
import SidebarFields from "../../components/common/SidebarFields"
import OptionalFields from "../../components/common/OptionalFields"
import OptionalFieldEditor from "../../components/common/OptionalFiledEditor"
import {TextField} from "@fluentui/react"
import {useFormSetting} from "./hook"

const FormSettings: React.FC = () => {
  const {data, method} = useFormSetting()

  return (
    <DragDropContext onDragEnd={method.onDragEnd}>
      <div className="flex gap-5">
        <SidebarFields />
        <div className="border w-full py-2 px-4 flex flex-col gap-4">
          <div className="my-2">
            <h1 className="font-bold text-lg">Form Task</h1>
            <h2 className="text-sm">Fill your task detail below.</h2>
          </div>
          <span className="font-bold text-sm">Standar Field</span>
          <TextField
            label="Title"
            required
            name="title"
            placeholder="Ex. Going to supermarket"
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            required
            name="title"
            placeholder="Ex. Buy some food to restock our fridge"
          />
          <span className="font-bold my-2 text-sm">Optional Field</span>
          <OptionalFields
            fields={data.optionalFields}
            onClickField={method.handleClickField}
            onDeleteField={method.handleDeleteField}
          />
        </div>
        <OptionalFieldEditor
          show={data.showFieldEditor}
          data={data.currentField}
          onSubmit={method.handleUpdateField}
        />
      </div>
    </DragDropContext>
  )
}

export default FormSettings
