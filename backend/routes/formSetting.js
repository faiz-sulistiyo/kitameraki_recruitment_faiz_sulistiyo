const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// Define the path to the JSON file
const dataFilePath = path.join(__dirname, "..", "data", "formSetting.json");

// Helper function to read the JSON file
const readDataFromFile = async () => {
  const fileData = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(fileData);
};

// Helper function to write data to the JSON file
const writeDataToFile = async (data) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};

// GET endpoint to return all form settings from the JSON file
router.get("/", async (req, res) => {
  try {
    const data = await readDataFromFile();
    res.status(200).json({
      message: "Form settings fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ message: "Error reading data" });
  }
});

// POST endpoint to write form settings to the JSON file
router.post("/", async (req, res) => {
  try {
    const formSettings = req.body;

    if (!formSettings || typeof formSettings !== "object") {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Write the form settings to the file
    await writeDataToFile(formSettings);

    res.status(200).json({
      message: "Form settings updated successfully",
      data: formSettings,
    });
  } catch (error) {
    console.error("Error writing data:", error);
    res.status(500).json({ message: "Error writing data" });
  }
});

// Export the router module so that server.js file can use it
module.exports = router;
