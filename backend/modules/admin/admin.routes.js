const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin.middleware");

const { getAllComplaints, updateStatus,  deleteComplaint, getDashboardStats, } = require("./admin.controller");

// Get all complaints
router.get("/complaints", authMiddleware, isAdmin, getAllComplaints);

// Update complaint status
router.put("/complaints/:id", authMiddleware, isAdmin, updateStatus);

// Delete a complaint
router.delete("/complaints/:id", authMiddleware, isAdmin, deleteComplaint);

// Get dashboard stats
router.get("/dashboard", authMiddleware, isAdmin, getDashboardStats);

module.exports = router;