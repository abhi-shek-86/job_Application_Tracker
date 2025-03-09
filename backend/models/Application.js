const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    candidateName: String,
    jobRole: String,
    status: { type: String, enum: ["Screening", "Shortlisted", "Rejected"], default: "Screening" }
});

module.exports = mongoose.model("Application", ApplicationSchema);
