import {useCreateEditViewTask} from "./hook"
import {Card, LoadingOverlay, TaskForm} from "../../../components/"

const CreateEditViewTaskPage = () => {
  const {data, method} = useCreateEditViewTask()
  return (
    <>
      <LoadingOverlay isLoading={data.isLoading} />
      <Card>
        <div className="my-2">
          <h1 className="font-bold text-lg">Form {data.activeRoute?.id}</h1>
          <h2 className="text-sm">Fill your task detail below.</h2>
        </div>
        {!data.isLoading && (
          <TaskForm
            disabled={data.isReadOnly}
            onSubmit={method.handleSubmit}
            formSettings={data.optionalFields}
            value={data.task}
            onChange={method.handleChangeText}
          />
        )}
      </Card>
    </>
  )
}

export default CreateEditViewTaskPage
