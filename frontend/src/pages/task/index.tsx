import {useListTask} from "./hook"
import {Card} from "../../components/common/Card"
import TaskCard from "../../components/common/TaskCard"

const ListTaskPage = () => {
  const {data,method} = useListTask()
  return (
    <Card className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-4 py-6">
        <h1 className="font-bold text-lg">Welcome to the Task List page!</h1>
        <p className="text-sm font-medium lg:max-w-[60%] text-center">
          This page allows you to manage your tasks efficiently with basic CRUD
          (Create, Read, Update, Delete) operations. Keep track of your tasks
          and make sure nothing falls through the cracks.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {data.listTask.map((task) => {
          return (
            <TaskCard
              key={task.id}
              onConfirmDelet={method.handleConfirmDelete}
              onClickEdit={method.handleClickEdit}
              onClickView={method.handleClickView}
              {...task}
            />
          )
        })}
      </div>
    </Card>
  )
}

export default ListTaskPage
