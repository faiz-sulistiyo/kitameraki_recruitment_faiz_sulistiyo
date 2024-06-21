import {useCreateEditViewTask} from "./hook"
import TaskForm from "../components/TaskForm"
import {Card} from "../../../components/common/Card"
import {TextField} from "@fluentui/react"

const CreateEditViewTaskPage = () => {
  const {data, method} = useCreateEditViewTask()

  return (
    <Card>
      <h1 className="font-bold">Form {data.activeRoute?.id}</h1>
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
      </TaskForm>
    </Card>
  )
}

export default CreateEditViewTaskPage
