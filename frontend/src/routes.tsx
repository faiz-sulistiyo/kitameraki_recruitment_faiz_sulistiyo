import {RouteObject} from "react-router-dom"
import ListTaskPage from "./pages/task"
import BaseLayout from "./components/layout/BaseLayout"
import HomePage from "./pages/home"
import CreateEditViewTaskPage from "./pages/task/createEditView"

export const routes: RouteObject[] = [
  {
    id: "Base Route",
    element: <BaseLayout />,
    children: [
      {
        id: "HomePage",
        path: "/",
        index:true,
        element: <HomePage />,
      },
      {
        id: "Task Management",
        path: "/task",
        children: [
          {
            id: "Task List",
            path: "/task",
            index:true,
            element: <ListTaskPage />,
          },
          {
            id: "Task Create",
            path: "create",
            element: <CreateEditViewTaskPage />,
          },
          {
            id: "Task Edit",
            path: "edit/:id",
            element: <CreateEditViewTaskPage />,
          },
          {
            id: "Task Detail",
            path: "detail/:id",
            element: <CreateEditViewTaskPage />,
          },
        ],
      },
      {
        id: "Form Setting",
        path: "/setting",
        index:true,
        element: <h1>Form Setting</h1>,
      },
    ],
  },
]
