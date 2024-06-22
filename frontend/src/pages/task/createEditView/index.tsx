import {useCreateEditViewTask} from "./hook"
import TaskForm from "../components/TaskForm"
import {Card} from "../../../components/common/Card"
import {DatePicker, SpinButton, TextField} from "@fluentui/react"
import {IOptionalField} from "../../../context/formSettingsContext"

const CreateEditViewTaskPage = () => {
  const {data, method} = useCreateEditViewTask()

  const renderElement = (task: IOptionalField) => {
    switch (task.component) {
      case "textField":
        return (
          <TextField
            key={task.id}
            {...task}
            value={data.task[task.name || ""]?.toString()}
            onChange={(e) =>
              task.name &&
              method.handleChangeText(e.currentTarget.value, task.name)
            }
            readOnly={data.isReadOnly}
          />
        )
      case "spinButton":
        const spinButtonValue = data.task[task.name || ""]
        return (
          <SpinButton
            key={task.id}
            {...task}
            value={String(spinButtonValue)}
            onChange={(_, value) => {
              if (value && task.name) {
                method.handleChangeText(value, task.name)
              }
            }}
            disabled={data.isReadOnly}
          />
        )
      case "datePicker":
        let dateValue = new Date();
        return (
          <DatePicker
            key={task.id}
            {...task}
            value={dateValue}
            disabled={data.isReadOnly}
            onSelectDate={(val) => {
              if (val && task.name) {
                method.handleChangeText(val.getTime(), task.name)
              }
            }}
          />
        )
    }
  }
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
        <div className="flex flex-col w-full gap-4">

        {data.optionalFields.map((data) => renderElement(data))}
        </div>
      </TaskForm>
    </Card>
  )
}

export default CreateEditViewTaskPage
