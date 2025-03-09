const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// Get all applications
router.get("/", async (req, res) => {
    const applications = await Application.find();
    res.json(applications);
});

// Update application status
router.put("/:id", async (req, res) => {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(application);
});

// Add a new application
router.post("/", async (req, res) => {
    const newApp = new Application(req.body);
    await newApp.save();
    res.status(201).json(newApp);
});

// Delete application
router.delete("/:id", async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: "Error deleting application", error: error.message });
    }
});

module.exports = router;
