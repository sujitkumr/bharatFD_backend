const express = require("express");
const FAQ = require("../models/FAQ");

const { createFAQ, getFAQs } = require("../controllers/faqController");

const router = express.Router();

router.post("/", createFAQ);
router.get("/", getFAQs);

module.exports = router;