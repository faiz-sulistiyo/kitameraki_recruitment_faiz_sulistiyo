import { Route, Routes } from 'react-router-dom'
import BaseLayout from './components/layout/BaseLayout'
import TasksListPage from './pages/task'
import EditTaskPage from './pages/task/edit'
import CreateTaskPage from './pages/task/create'

function App() {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout/>}>
        <Route index element={<TasksListPage/>}/>
        <Route path='/create' element={<CreateTaskPage/>}/>
        <Route path='/edit/:id' element={<EditTaskPage/>}/>
        <Route path='/detail/:id' element={<EditTaskPage/>}/>
      </Route>
    </Routes>
  )
}

export default App;
