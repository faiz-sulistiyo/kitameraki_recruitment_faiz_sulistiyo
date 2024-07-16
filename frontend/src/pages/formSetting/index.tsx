import React from "react"
import {DragDropContext} from "@hello-pangea/dnd"
import {PrimaryButton, TextField} from "@fluentui/react"
import {useFormSetting} from "./hook"
import {
  DroppableField,
  DraggableField,
  RenderField,
  SidebarFields,
  OptionalFieldEditor,
} from "../../components"

const FormSettings: React.FC = () => {
  const {data, method} = useFormSetting()

  return (
    <DragDropContext onDragEnd={method.onDragEnd}>
      <div className="flex gap-5">
        <SidebarFields />
        <form onSubmit={method.handleSubmitSetting} className="border w-full py-2 px-4 flex flex-col gap-4">
          <div className="my-2">
            <h1 className="font-bold text-lg">Form Task</h1>
            <h2 className="text-sm">Fill your task detail below.</h2>
          </div>
          <span className="font-bold text-sm">Standar Field</span>
          <TextField
            label="Title"
            name="title"
            placeholder="Ex. Going to supermarket"
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            name="title"
            placeholder="Ex. Buy some food to restock our fridge"
          />
          <span className="font-bold my-2 text-sm">Optional Field</span>
          <div className="border py-4 px-2">
            <DroppableField direction="vertical" droppableId="optional-fields">
              {!data.optionalFields.length && (
                <div className="h-10 flex justify-center items-center w-full">
                  Drop Here
                </div>
              )}
              {data.optionalFields.map((field, index) => {
                return (
                  <DraggableField
                    draggableId={field.id}
                    index={index}
                    id={field.id}
                    key={index}
                    useButton
                  >
                    <DroppableField
                      type="blockRow"
                      key={field.id}
                      direction="horizontal"
                      droppableId={field.id}
                    >
                      {field.items?.map((subField, index) => {
                        return (
                          <DraggableField
                            draggableId={subField.id}
                            id={subField.id}
                            index={index}
                            key={index}
                          >
                            <RenderField
                              data={subField}
                              handleClickField={method.handleClickField}
                              handleDeleteField={method.handleDeleteField}
                              focus={data.currentField.id === subField.id}
                            />
                          </DraggableField>
                        )
                      })}
                    </DroppableField>
                  </DraggableField>
                )
              })}
            </DroppableField>
          </div>
          <PrimaryButton type="submit" text="Save Form"/>
        </form>
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
