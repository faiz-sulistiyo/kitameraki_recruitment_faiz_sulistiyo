import {useListTask} from "./hook"
import {Card,TaskCard} from "../../components/"
import {AddFilled} from "@fluentui/react-icons"
import { Button } from "@fluentui/react-components"

const ListTaskPage = () => {
  const {data, method} = useListTask()
  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-lg">Welcome to the Task List page!</h1>
        <p className="text-sm font-medium lg:max-w-[60%] text-center">
          This page allows you to manage your tasks efficiently with basic CRUD
          (Create, Read, Update, Delete) operations. Keep track of your tasks
          and make sure nothing falls through the cracks.
        </p>
      </div>
      <Button appearance="primary"  onClick={method.handleClickAdd} icon={<AddFilled />} className="w-fit">Add Task</Button>
      <div className="grid grid-cols-2 gap-2">
        {data.listTask.map((task) => {
          return (
            <TaskCard
              id={task.id || 0}
              description={task.description}
              title={task.title}
              key={task.id}
              onConfirmDelete={method.handleConfirmDelete}
              onClickEdit={method.handleClickEdit}
              onClickView={method.handleClickView}
            />
          )
        })}
      </div>
    </Card>
  )
}

export default ListTaskPage
