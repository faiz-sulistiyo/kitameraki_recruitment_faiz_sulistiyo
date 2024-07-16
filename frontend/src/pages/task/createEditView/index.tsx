import {useCreateEditViewTask} from "./hook"
import TaskForm from "../components/TaskForm"
import {Card,RenderField} from "../../../components/"
import {TextField} from "@fluentui/react"

const CreateEditViewTaskPage = () => {
  const {data, method} = useCreateEditViewTask()
  return (
    <Card>
      <div className="my-2">
        <h1 className="font-bold text-lg">Form {data.activeRoute?.id}</h1>
        <h2 className="text-sm">Fill your task detail below.</h2>
      </div>
      <TaskForm
        {...data.task}
        disabled={data.isReadOnly}
        onSubmit={method.handleSubmit}
      >
        <TextField
          label="Title"
          value={data.task.title}
          required
          readOnly={data.isReadOnly}
          onChange={(e) =>
            method.handleChangeText(e.currentTarget.value, "title")
          }
          placeholder="Ex. Going to supermarket"
        />
        <TextField
          label="Description"
          value={data.task.description}
          multiline
          rows={3}
          required
          readOnly={data.isReadOnly}
          placeholder="Ex. Buy some food to restock our fridge"
          onChange={(e) =>
            method.handleChangeText(e.currentTarget.value, "description")
          }
        />
        <div className="flex flex-col w-full gap-2 mt-4">
          {data.optionalFields.map((item) => (
            <div key={item.id} className="flex items-end gap-2">
              {item.items?.map((subItem) => {
                return (
                  <RenderField
                    key={subItem.id}
                    data={subItem}
                    value={data.task[subItem?.name || ""]?.toString()}
                    onChange={(val: string) =>
                      method.handleChangeText(val, subItem?.name || "")
                    }
                    focus={false}
                    isEdit={false}
                    readonly={data.isReadOnly}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </TaskForm>
    </Card>
  )
}

export default CreateEditViewTaskPage
