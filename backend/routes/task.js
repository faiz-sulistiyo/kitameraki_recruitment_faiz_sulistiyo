const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")

// Define the path to the JSON file
const dataFilePath = path.join(__dirname, "..", "data", "task.json")

// Helper function to read the JSON file
const readDataFromFile = () => {
  const fileData = fs.readFileSync(dataFilePath, "utf8")
  return JSON.parse(fileData)
}

// Helper function to write data to the JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

// GET endpoint to return all data from the JSON file
router.get("/", (req, res) => {
  const page = parseInt(req.query.page, 10) || 1 // Default to page 1 if not specified
  const perPage = parseInt(req.query.per_page, 10) || 10 // Default to 10 items per page if not specified

  try {
    const data = readDataFromFile()
    const totalItems = data.length
    const totalPages = Math.ceil(totalItems / perPage)
    const start = (page - 1) * perPage
    const end = page * perPage
    const paginatedData = data.slice(start, end)

    res.status(200).json({
      message: "Task list fetched Successfully",
      currentPage: page,
      perPage: perPage,
      totalItems: totalItems,
      totalPages: totalPages,
      data: paginatedData,
    })
  } catch (error) {
    res.status(500).json({message: "Error reading data"})
  }
})

// Get method to get task by specific id
router.get("/:id", (req, res) => {
  try {
    const {id} = req.params

    const data = readDataFromFile()
    const task = data?.find((task) => task.id === parseInt(id, 10));

    if (!task) {
      return res.status(404).json({message: "Task not found"})
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    })
  } catch (error) {
    console.error("Error updating data:", error)
    res.status(500).json({message: "Error updating data"})
  }
})

// POST endpoint to write data to the JSON file
router.post("/", (req, res) => {
  try {
    const newTask = req.body

    if (!newTask || typeof newTask !== "object") {
      return res.status(400).json({message: "Invalid data format"})
    }

    const data = readDataFromFile()

    // Generate new ID based on the highest existing ID
    const newId =
      data.length > 0 ? Math.max(...data.map((task) => task.id)) + 1 : 1
    newTask.id = newId

    // Add the new task to the existing data
    data.push(newTask)

    // Write the updated data to the file
    writeDataToFile(data)

    res.status(200).json({
      message: "Data written successfully",
      data: newTask,
    })
  } catch (error) {
    console.error("Error writing data:", error)
    res.status(500).json({message: "Error writing data"})
  }
})

// PUT endpoint to update a task by id
router.put("/:id", (req, res) => {
  try {
    const {id} = req.params
    const updatedTask = req.body

    if (!updatedTask || typeof updatedTask !== "object") {
      return res.status(400).json({message: "Invalid data format"})
    }

    const data = readDataFromFile()
    const taskIndex = data.findIndex((task) => task.id === parseInt(id, 10))

    if (taskIndex === -1) {
      return res.status(404).json({message: "Task not found"})
    }

    data[taskIndex] = {...data[taskIndex], ...updatedTask}
    writeDataToFile(data)

    res.status(200).json({
      message: "Task updated successfully",
      data: data[taskIndex],
    })
  } catch (error) {
    console.error("Error updating data:", error)
    res.status(500).json({message: "Error updating data"})
  }
})

// DELETE endpoint to delete a task by id
router.delete("/:id", (req, res) => {
  try {
    const {id} = req.params

    const data = readDataFromFile()
    const taskIndex = data.findIndex((task) => task.id === parseInt(id, 10))

    if (taskIndex === -1) {
      return res.status(404).json({message: "Task not found"})
    }

    const deletedTask = data.splice(taskIndex, 1)
    writeDataToFile(data)

    res.status(200).json({
      message: "Task deleted successfully",
      data: deletedTask[0],
    })
  } catch (error) {
    console.error("Error deleting data:", error)
    res.status(500).json({message: "Error deleting data"})
  }
})

// Export the router module so that server.js file can use it
module.exports = router
